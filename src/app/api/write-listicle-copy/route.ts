import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const SKILL_SYSTEM_PROMPT = `You are an expert listicle copywriter specializing in high-converting offer copy. Your role is to analyze conversation history from offer analysis and generate 3-5 distinct copy variations.

## Core Copywriting Philosophy

### 1. Depth Over Surface
Produce deeply researched, psychologically-grounded copy—NOT generic templates. Every line must:
- Connect to specific answered questions from the analysis
- Resonate with identified pain points and motivators
- Use language that mirrors the reader's internal dialogue
- Create "this is me!" recognition moments

### 2. Active Engagement Architecture
Copy must activate readers, not just inform them:
- Interactive CTAs that trigger self-reflection
- Personalization opportunities (select amount, choose state, calculate savings)
- Curiosity gaps that can only be resolved by clicking
- Micro-commitments that build psychological investment

### 3. Research-Backed Authenticity
Every claim, benefit, and psychological trigger must be:
- Grounded in the analysis answers
- Specific and measurable (not "save money" but "reduce debt by 30-50%")
- Authentic to the offer's actual value proposition

### 4. Conversion-Focused Journey
Success = reader clicking through AND converting on landing page:
- Set accurate expectations (no bait-and-switch)
- Bridge listicle → landing page seamlessly
- Maintain emotional temperature from awareness to action
- Address objections preemptively

### 5. Multiple Variations for Testing
Generate 3-5 distinct variations that test:
- Different opening hooks (pain-focused vs aspiration-focused vs urgency-focused)
- CTA approaches (calculator-based vs selection-based vs direct)
- Information density (brief vs detailed)
- Emotional temperature (empathetic vs empowering vs urgent)

## Your Task

You will receive a conversation history from the analyze-listicle-offer skill. Your job is to:

1. **Extract key insights** from the conversation (pain points, value proposition, eligibility, target audience, objections, etc.)
2. **Generate 3-5 variations** of listicle copy, each with a different psychological approach
3. **Return ONLY valid JSON** matching this exact structure:

\`\`\`json
{
  "variations": [
    {
      "id": "variation-1",
      "strategicApproach": "Pain-focused approach targeting readers in acute financial distress",
      "headline": "Drowning in Debt? This Program Could Reduce What You Owe by 30-50%",
      "subheadline": "Thousands have already slashed their monthly payments—see if you qualify in under 2 minutes",
      "openingHook": "If you're losing sleep over mounting credit card bills, you're not alone. But what if there was a way to dramatically reduce what you actually owe—without bankruptcy or ruining your credit?",
      "bodyCopy": "This isn't another gimmick. This is a proven debt relief program that's helped over 500,000 Americans reduce their unsecured debt by 30-50% on average.\\n\\nHere's how it works:\\n- Free consultation to assess your situation\\n- Negotiation with creditors on your behalf\\n- One affordable monthly payment\\n- Debt-free in 24-48 months (typical)\\n\\nYou could be saving $300-$800/month within weeks.",
      "valueArticulation": "Instead of paying $25,000 in credit card debt, you could settle for $12,500-$17,500. That's real money back in your pocket—money for emergencies, retirement, or just breathing room.",
      "qualificationLanguage": "You may qualify if you have:\\n- $10,000+ in unsecured debt (credit cards, medical bills, personal loans)\\n- At least $500/month available for your debt program\\n- A genuine financial hardship (job loss, medical emergency, divorce, etc.)",
      "socialProofElement": "\\"I was $32,000 in debt and settled for $18,000. My stress levels dropped immediately.\\" - Sarah M., Colorado",
      "ctaSection": {
        "interactiveElement": "Select your total unsecured debt amount:\\n[$10K-$25K] [$25K-$50K] [$50K-$75K] [$75K+]",
        "buttonText": "See My Savings Estimate",
        "riskReversal": "✓ Free consultation • Won't affect credit score • No obligation"
      },
      "rationale": "This variation leads with the primary pain point (debt stress) and uses specific numbers to build credibility. The interactive CTA creates self-reflection and investment.",
      "emotionalTemperature": "high",
      "ctaType": "amount-selector",
      "informationDensity": "moderate",
      "bestFor": "Readers in active debt crisis seeking immediate relief"
    }
  ],
  "metadata": {
    "generatedAt": "${new Date().toISOString()}",
    "category": "Financial",
    "researchSummary": "Analyzed conversation for pain points, value prop, and eligibility criteria",
    "conversationContext": "User discussed debt relief offer targeting consumers with $10K+ unsecured debt"
  }
}
\`\`\`

## Critical Requirements

- Generate exactly 3-5 variations
- Each variation MUST have a distinct psychological approach
- All copy must be specific and measurable (use numbers, percentages, timeframes)
- CTAs must be interactive (not just "Learn More")
- Return ONLY the JSON object, no other text
- Ensure all required fields are present for each variation

## Variation Strategy

Variation 1: **Pain-focused** - Lead with the acute problem they're experiencing NOW
Variation 2: **Aspiration-focused** - Lead with the desired future state after problem is solved
Variation 3: **Logic/Data-focused** - Lead with statistics and rational benefits
Variation 4: **Urgency-focused** (optional) - Lead with consequences of inaction
Variation 5: **Social Proof-focused** (optional) - Lead with "people like you" success stories

Now analyze the conversation history provided by the user and generate the variations.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { conversationHistory, taskTitle, taskDescription, category } = body

    // Validation
    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { error: 'conversationHistory array is required' },
        { status: 400 }
      )
    }

    if (conversationHistory.length < 5) {
      return NextResponse.json(
        { error: 'Insufficient conversation history. At least 5 messages required for quality copy generation.' },
        { status: 400 }
      )
    }

    // Check for Anthropic API key
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      return NextResponse.json(
        {
          error: 'ANTHROPIC_API_KEY not configured',
          note: 'Please add your Anthropic API key to .env.local'
        },
        { status: 500 }
      )
    }

    // Initialize Anthropic client
    const client = new Anthropic({
      apiKey: anthropicApiKey,
    })

    // Build the user message with conversation context
    const userMessage = `
Here is the conversation history from the listicle offer analysis:

Task Title: ${taskTitle}
${taskDescription ? `Task Description: ${taskDescription}` : ''}
${category ? `Offer Category: ${category}` : ''}

Conversation Messages:
${conversationHistory.map((m: any, idx: number) =>
  `Message ${idx + 1} (${m.role.toUpperCase()}):\n${m.content}`
).join('\n\n---\n\n')}

---

Please analyze this conversation, extract key insights about the offer, and generate 3-5 distinct listicle copy variations.
Return ONLY valid JSON following the required format. Do not include any markdown code blocks or additional text.
`

    // Call Anthropic API
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8000,
      temperature: 0.7,
      system: SKILL_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    // Extract the assistant's response
    const assistantMessage = response.content[0]

    if (assistantMessage.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic API')
    }

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonText = assistantMessage.text.trim()

    // Remove markdown code block markers if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '')
    }

    // Find JSON object in response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('No JSON found in response:', jsonText.substring(0, 500))
      throw new Error('No valid JSON found in AI response. Please try again.')
    }

    const result = JSON.parse(jsonMatch[0])

    // Validate response structure
    if (!result.variations || !Array.isArray(result.variations)) {
      throw new Error('Invalid response structure: missing variations array')
    }

    if (result.variations.length === 0) {
      throw new Error('No variations generated')
    }

    // Ensure metadata exists
    if (!result.metadata) {
      result.metadata = {
        generatedAt: new Date().toISOString(),
        category: category || 'Unknown',
        researchSummary: 'Generated from conversation analysis',
        conversationContext: `Analyzed ${conversationHistory.length} messages`
      }
    }

    return NextResponse.json({
      variations: result.variations,
      metadata: result.metadata,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      }
    })

  } catch (error: any) {
    console.error('Write Listicle Copy API Error:', error)

    // Provide helpful error messages
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Failed to parse AI response as JSON',
          details: 'The AI generated invalid JSON. Please try again.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to generate listicle copy',
        details: error.message
      },
      { status: 500 }
    )
  }
}
