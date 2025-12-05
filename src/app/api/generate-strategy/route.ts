import { NextRequest, NextResponse } from 'next/server'
import { detectOfferCategory, getAnalysisQuestions } from '@/lib/analysis-framework'
import { buildMasterResearchPrompt } from '@/lib/master-research-prompt'

export async function POST(req: NextRequest) {
  try {
    const { topic, depth = 'medium' } = await req.json()

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    console.log(`🎯 Generating strategic analysis for: "${topic}"`)

    // STEP 1: Detect category
    const offerCategory = detectOfferCategory(topic)
    console.log(`📂 Detected category: ${offerCategory}`)

    // STEP 2: Load question framework for this category and depth
    const analysisFramework = getAnalysisQuestions(offerCategory, depth)
    console.log(`📋 Loaded ${analysisFramework.totalQuestions} questions for ${offerCategory} (${depth} depth)`)

    // STEP 3: Build master research prompt (without executing anything)
    const formattedQuestions = analysisFramework.categories.flatMap(cat =>
      cat.questions.map(q => ({
        id: q.id,
        category: cat.name,
        subcategory: q.subcategory,
        question: q.question,
        purpose: q.purpose
      }))
    )

    // Build the strategic prompt (this is what will be sent to GPT in Step 2)
    const masterPrompt = buildMasterResearchPrompt(
      topic,
      offerCategory,
      formattedQuestions,
      [], // No scraped content yet - this is just the strategy preview
      []  // No Brave results yet - this is just the strategy preview
    )

    console.log(`✅ Strategy generated (${masterPrompt.length} chars)`)

    // Return the strategy preview
    return NextResponse.json({
      category: offerCategory,
      depth,
      totalQuestions: analysisFramework.totalQuestions,
      categories: analysisFramework.categories.map(cat => ({
        name: cat.name,
        description: cat.description,
        questionCount: cat.questions.length
      })),
      strategyPreview: {
        prompt: masterPrompt,
        promptLength: masterPrompt.length,
        estimatedTokens: Math.ceil(masterPrompt.length / 4), // Rough estimate
      },
      skillPrinciples: [
        'Offer-to-Reader Resonance ("this is me" moments)',
        'CTA Engagement Over Generic Links',
        'Information Balance (qualify without overwhelming)',
        'Behavioral Psychology Foundations',
        'Conversion = Sale, Not Click'
      ],
      nextStep: 'Execute Research (run APIs with this strategic guidance)'
    })

  } catch (error) {
    console.error('Strategy generation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate strategy'
      },
      { status: 500 }
    )
  }
}
