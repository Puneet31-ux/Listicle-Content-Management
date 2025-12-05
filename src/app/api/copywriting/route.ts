import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { CopyVariation, CopyGenerationMetadata } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, taskTitle, researchFile, passLevel = 'draft' } = body

    if (!researchFile) {
      return NextResponse.json(
        { error: 'Research file is required to generate copy' },
        { status: 400 }
      )
    }

    console.log(`\n🎨 COPYWRITING REQUEST`)
    console.log(`Task: ${taskTitle}`)
    console.log(`Research File: ${researchFile}`)
    console.log(`Pass Level: ${passLevel}`)

    // Load research data from markdown file
    const researchFilePath = path.join(process.cwd(), 'research-results', researchFile)
    const researchContent = await fs.readFile(researchFilePath, 'utf-8')

    console.log(`✓ Research loaded (${researchContent.length} chars)`)

    // Call OpenAI API with master copywriting workflow
    const copywritingPrompt = buildCopywritingPrompt(researchContent, taskTitle, passLevel)

    console.log(`\n📝 Generating copywriting with GPT-4o...`)
    console.log(`Pass Level: ${passLevel}`)
    console.log(`Prompt Length: ${copywritingPrompt.length} chars`)

    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY is not configured')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: copywritingPrompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7, // More creative for copywriting
        max_completion_tokens: 16000
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API Error:', errorData)
      throw new Error(`OpenAI API failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    console.log(`✓ Copywriting generated (${content.length} chars)`)

    // Parse JSON response
    const result = JSON.parse(content)

    // Transform to our CopyVariation format
    const variations: CopyVariation[] = result.variations.map((v: any, index: number) => ({
      id: `var-${taskId}-${Date.now()}-${index}`,
      strategicApproach: v.strategicApproach || v.approach || 'Balanced approach',
      headline: v.headline,
      subheadline: v.subheadline || '',
      openingHook: v.openingHook || v.opening || '',
      bodyCopy: v.bodyCopy || v.body || '',
      valueArticulation: v.valueArticulation || v.value || '',
      qualificationLanguage: v.qualificationLanguage || v.qualification || '',
      socialProofElement: v.socialProofElement || v.socialProof || '',
      ctaSection: {
        interactiveElement: v.ctaSection?.interactiveElement || v.interactiveElement || '',
        buttonText: 'LEARN MORE', // Standardized CTA
        riskReversal: v.ctaSection?.riskReversal || v.riskReversal || ''
      },
      rationale: v.rationale || v.whyThisWorks || '',
      emotionalTemperature: v.emotionalTemperature || 'medium',
      ctaType: v.ctaType || 'standard',
      informationDensity: v.informationDensity || 'moderate',
      bestFor: v.bestFor || 'General audience'
    }))

    const metadata: CopyGenerationMetadata = {
      generatedAt: new Date().toISOString(),
      category: result.category || 'financial',
      researchSummary: result.researchSummary || '',
      conversationContext: `Generated ${variations.length} variations with ${passLevel} pass level`
    }

    console.log(`✓ Generated ${variations.length} variations`)
    console.log(`✓ Pass Level: ${passLevel}`)

    // Include TOP PICK if available
    const topPick = result.topPick || null

    return NextResponse.json({
      success: true,
      variations,
      metadata,
      topPick,
      passLevel,
      generatedAt: metadata.generatedAt
    })

  } catch (error) {
    console.error('Copywriting error:', error)
    return NextResponse.json(
      {
        error: 'Copywriting generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function buildCopywritingPrompt(researchContent: string, taskTitle: string, passLevel: string): string {
  const passInstructions = {
    'draft': 'Generate Pass 1-2: Structure and Value checks. Focus on core copy structure.',
    'ai-removal': 'Apply Pass 3: AI Pattern Removal. Remove all AI tells, cliches, hedging words. Em dash count ≤ 2 total.',
    'polish': 'Apply Pass 4-7: Full polish with read-aloud test, competitive edge, emotional resonance, mobile optimization.'
  }

  return `# MASTER COPYWRITING TASK: Generate Listicle Copy Variations

## Task
${taskTitle}

## Pass Level
${passInstructions[passLevel as keyof typeof passInstructions] || passInstructions.draft}

## Research Data
${researchContent}

## Instructions

### CRITICAL REQUIREMENTS:

1. **Smart Variation Selection** (DO NOT default to Pain + Logic every time!)
   - Analyze the offer and competitor strategies
   - Pick the TOP 2 BEST angles from:
     * Pain-Focused - Opens with acute struggle
     * Logic-Focused - Opens with data/math, cost comparisons
     * Aspiration-Focused - Opens with desired future state
     * Urgency-Focused - Opens with consequence of inaction
     * Social Proof-Focused - Opens with success stories
     * Authority-Focused - Opens with expert endorsement
     * Curiosity-Focused - Opens with surprising fact
   - Select 2-3 angles that give strongest competitive advantage
   - Default only if nothing stands out: Pain-Focused + Logic-Focused

2. **ALL CTA Buttons Say "LEARN MORE"**
   - Standardized button text across all variations
   - Interactive elements are SEPARATE (maps, calculators, selectors)

3. **Interactive Elements** (different from CTA buttons!)
   - State/ZIP map selectors
   - Debt amount selectors (6 buttons)
   - Vehicle type selectors
   - Qualification checklists
   - Calculators ("Estimate Your Monthly Savings")
   - Quiz/Assessments

4. **7-Pass Copy-Check Process:**
   ${passLevel === 'draft' ? '✓ Pass 1-2: Structure + Value (automatic)' : ''}
   ${passLevel === 'ai-removal' ? '✓ Pass 3: AI Pattern Removal - Em dash count ≤ 2, zero AI cliches, replace hedging' : ''}
   ${passLevel === 'polish' ? '✓ Pass 4-7: Read-aloud test, competitive edge, emotional resonance, mobile optimization' : ''}

5. **Competitor Analysis:**
   - Review competitor strategies from research
   - Identify gaps (what they're NOT saying)
   - Execute better than top competitors
   - Don't plagiarize, but match/beat their strategies

6. **TOP PICK Recommendation:**
   - Select the best-performing variation
   - Explain why this should perform best
   - Include testing hypothesis and CTR prediction
   - Provide test plan (7 days, metrics to track)

## Output Format (JSON)

{
  "category": "financial",
  "researchSummary": "Brief summary of key research insights",
  "variations": [
    {
      "strategicApproach": "Logic-Focused" or "Pain-Focused" etc,
      "headline": "Main headline",
      "subheadline": "Supporting subheadline",
      "openingHook": "First 2-3 sentences that grab attention",
      "bodyCopy": "Full listicle body copy with sections",
      "valueArticulation": "How value is communicated",
      "qualificationLanguage": "How qualification criteria are presented",
      "socialProofElement": "Trust signals and social proof",
      "ctaSection": {
        "interactiveElement": "Description of interactive element (map, calculator, selector)",
        "buttonText": "LEARN MORE",
        "riskReversal": "Risk reversal language"
      },
      "rationale": "Why this approach works for this offer",
      "emotionalTemperature": "high" | "medium" | "low",
      "ctaType": "interactive" | "standard",
      "informationDensity": "brief" | "moderate" | "detailed",
      "bestFor": "Analytical decision-makers in financial niche"
    }
  ],
  "topPick": {
    "variationIndex": 0,
    "reasoning": "Why this variation should perform best",
    "testingHypothesis": "Rational decision-makers in this niche respond to data",
    "ctrPrediction": "10-12% (vs. 8% baseline)",
    "testPlan": "Run for 7 days, track CTR, interaction rate, conversion rate. If CTR < 9%, switch to Variation 2."
  }
}

Generate ${passLevel === 'draft' ? '2-3' : 'refined'} variations now with complete 7-pass checking.`
}
