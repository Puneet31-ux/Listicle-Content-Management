import { NextRequest, NextResponse } from 'next/server'
import { CopyVariation } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { variations, taskTitle, taskDescription } = await req.json()

    if (!variations || !Array.isArray(variations) || variations.length === 0) {
      return NextResponse.json(
        { error: 'At least one copy variation is required' },
        { status: 400 }
      )
    }

    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!openaiApiKey) {
      return NextResponse.json(
        {
          error: 'OPENAI_API_KEY not configured. Please add it to your .env.local file.',
        },
        { status: 500 }
      )
    }

    // Evaluate each variation using OpenAI
    const evaluationPromises = variations.map(async (variation: CopyVariation, index: number) => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are an expert direct-response copywriter and conversion optimizer. Evaluate listicle copy for effectiveness, persuasion, and conversion potential.

Evaluate the copy on these criteria:
1. **Headline Impact** (1-10): Does it grab attention and promise value?
2. **Hook Strength** (1-10): Does the opening hook immediately engage?
3. **Value Clarity** (1-10): Is the value proposition clear and compelling?
4. **CTA Effectiveness** (1-10): Is the CTA specific, benefit-driven, and urgent?
5. **Trust Building** (1-10): Does it include proof, credentials, or social proof?

Provide:
- Overall score (1-10)
- Top 3 strengths
- Top 3 areas for improvement
- Specific suggestions for refinement

Return ONLY a valid JSON object.`,
              },
              {
                role: 'user',
                content: `Task: ${taskTitle}
${taskDescription ? `Description: ${taskDescription}` : ''}

Copy Variation #${index + 1}:
Strategic Approach: ${variation.strategicApproach}

Headline: ${variation.headline}
Subheadline: ${variation.subheadline}

Opening Hook:
${variation.openingHook}

Body Copy:
${variation.bodyCopy}

Value Articulation:
${variation.valueArticulation}

CTA Section:
${variation.ctaSection.interactiveElement}
Button: ${variation.ctaSection.buttonText}
Risk Reversal: ${variation.ctaSection.riskReversal}

Evaluate this copy and return a JSON object with:
{
  "score": <number 1-10>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "suggestions": "Detailed suggestions for refinement...",
  "criteriaScores": {
    "headlineImpact": <1-10>,
    "hookStrength": <1-10>,
    "valueClarity": <1-10>,
    "ctaEffectiveness": <1-10>,
    "trustBuilding": <1-10>
  }
}`,
              },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
          }),
        })

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.statusText}`)
        }

        const data = await response.json()
        const evaluation = JSON.parse(data.choices[0].message.content || '{}')

        return {
          variationId: variation.id,
          ...evaluation,
        }
      } catch (error) {
        console.error(`Error evaluating variation ${index}:`, error)
        return {
          variationId: variation.id,
          error: error instanceof Error ? error.message : 'Evaluation failed',
        }
      }
    })

    const evaluations = await Promise.all(evaluationPromises)

    // Calculate average score
    const successfulEvals = evaluations.filter(e => !e.error)
    const averageScore = successfulEvals.length > 0
      ? successfulEvals.reduce((sum, e) => sum + (e.score || 0), 0) / successfulEvals.length
      : 0

    return NextResponse.json({
      evaluations,
      averageScore,
      evaluatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Copy evaluation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to evaluate copy',
      },
      { status: 500 }
    )
  }
}
