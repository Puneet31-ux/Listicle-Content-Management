import { NextRequest, NextResponse } from 'next/server'
import { saveResearchToMarkdown, ResearchResults } from '@/lib/save-research'
import { detectOfferCategory, getAnalysisQuestions } from '@/lib/analysis-framework'
import { buildMasterResearchPrompt, buildStrategicSearchQueries, extractKeyInsights } from '@/lib/master-research-prompt'

type ResearchDepth = 'surface' | 'medium' | 'deep'

interface ResearchRequest {
  topic: string
  sourceUrls?: string[]
  depth?: ResearchDepth
  iteration?: number
}

// Retry function with exponential backoff for OpenAI API
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3,
  baseDelay = 1000
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      // If success or non-retriable error, return immediately
      if (response.ok || (response.status !== 429 && response.status !== 500 && response.status !== 503)) {
        return response
      }

      // If rate limited and not last attempt, retry with backoff
      if (response.status === 429 && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt) // Exponential backoff: 1s, 2s, 4s
        console.log(`⏳ Rate limited. Retrying in ${delay/1000}s (attempt ${attempt + 1}/${maxRetries})...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }

      return response
    } catch (error) {
      if (attempt === maxRetries) throw error
      const delay = baseDelay * Math.pow(2, attempt)
      console.log(`⏳ Network error. Retrying in ${delay/1000}s (attempt ${attempt + 1}/${maxRetries})...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw new Error('Max retries exceeded')
}

// Quality scoring function for self-healing
function checkAnalysisQuality(analysis: any, expectedQuestions: number): {
  score: number
  rating: string
  issues: string[]
} {
  const issues: string[] = []
  let score = 100

  // Check if analysis exists
  if (!analysis || !analysis.analysis) {
    return { score: 0, rating: 'Failed', issues: ['No analysis data'] }
  }

  // Count questions answered
  let questionsAnswered = 0
  let questionsWithEvidence = 0
  let questionsWithInsights = 0
  let totalAnswerLength = 0

  Object.values(analysis.analysis).forEach((category: any) => {
    if (Array.isArray(category)) {
      category.forEach((q: any) => {
        questionsAnswered++

        // Check answer quality
        if (q.answer) {
          totalAnswerLength += q.answer.length
          if (q.answer.length < 50) {
            score -= 2 // Penalty for shallow answers
          }
        } else {
          score -= 5 // Penalty for missing answer
          issues.push(`Question ${q.question_id} missing answer`)
        }

        // Check for evidence
        if (q.evidence && q.evidence.length > 0) {
          questionsWithEvidence++
        }

        // Check for copywriting insights
        if (q.copywriting_insight && q.copywriting_insight.length > 20) {
          questionsWithInsights++
        }
      })
    }
  })

  // Calculate coverage
  const coverage = (questionsAnswered / expectedQuestions) * 100
  if (coverage < 80) {
    score -= 20
    issues.push(`Only ${questionsAnswered}/${expectedQuestions} questions answered`)
  }

  // Evidence coverage
  const evidenceRate = (questionsWithEvidence / questionsAnswered) * 100
  if (evidenceRate < 50) {
    score -= 15
    issues.push(`Only ${evidenceRate.toFixed(0)}% of answers have evidence`)
  }

  // Insight coverage
  const insightRate = (questionsWithInsights / questionsAnswered) * 100
  if (insightRate < 50) {
    score -= 10
    issues.push(`Only ${insightRate.toFixed(0)}% of answers have copywriting insights`)
  }

  // Average answer length
  const avgAnswerLength = totalAnswerLength / questionsAnswered
  if (avgAnswerLength < 100) {
    score -= 10
    issues.push(`Answers are too brief (avg ${avgAnswerLength.toFixed(0)} chars)`)
  }

  // Determine rating
  let rating = 'Excellent'
  if (score < 60) rating = 'Poor'
  else if (score < 75) rating = 'Fair'
  else if (score < 90) rating = 'Good'

  return { score: Math.max(0, score), rating, issues }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  let braveStartTime = 0, braveEndTime = 0
  let brightDataStartTime = 0, brightDataEndTime = 0
  let openAIStartTime = 0, openAIEndTime = 0

  // Variables to collect ALL research data for markdown file
  let collectedBraveResults: any = null
  let collectedBrightDataResults: any = null
  let collectedOpenAIInsights: any = null
  let researchErrors: { brave?: string; brightData?: string; openAI?: string } = {}

  try {
    const {
      topic,
      sourceUrls = [],
      depth = 'medium',
      iteration = 1,
    } = await req.json() as ResearchRequest

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    console.log(`📊 Research Request - Topic: "${topic}" | Depth: ${depth} | Iteration: ${iteration} | Source URLs: ${sourceUrls.length}`)

    // Track which APIs were used
    const researchSources = {
      braveSearch: false,
      brightData: false,
    }

    // Check for API keys
    const braveApiKey = process.env.BRAVE_SEARCH_API_KEY
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!braveApiKey) {
      return NextResponse.json(
        {
          error:
            'BRAVE_SEARCH_API_KEY not configured. Please add it to your .env.local file.',
        },
        { status: 500 }
      )
    }

    // PHASE 0: Deep scraping with Bright Data
    // PRIORITY: User-provided source URLs → Always scrape these first
    // DECISION: Use extract mode for medium depth, scrape mode for deep
    let scrapedContent: any[] = []

    const shouldUseBrightData =
      sourceUrls.length > 0 || // User provided URLs (PRIORITY)
      depth === 'deep' || // Deep research always scrapes competitors
      iteration > 1 // Iterations need deeper data

    if (shouldUseBrightData && sourceUrls.length > 0) {
      try {
        console.log(`🔍 PRIORITY: Scraping ${sourceUrls.length} user-provided URLs with Bright Data...`)

        // Determine mode and extract fields based on depth
        const mode = depth === 'deep' ? 'scrape' : 'extract'
        const extractFields = ['cta', 'headline', 'terms', 'eligibility', 'prices']

        const brightDataResponse = await fetch(
          `${req.nextUrl.protocol}//${req.nextUrl.host}/api/bright-data`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              urls: sourceUrls,
              mode,
              extractFields: mode === 'extract' ? extractFields : undefined,
            }),
          }
        )

        if (brightDataResponse.ok) {
          const brightDataResult = await brightDataResponse.json()
          scrapedContent = brightDataResult.scrapedContent || []
          researchSources.brightData = true
          console.log(`✅ Scraped ${scrapedContent.length} URLs in "${mode}" mode`)

          // Collect Bright Data results for markdown file
          collectedBrightDataResults = {
            scrapedPages: scrapedContent.map((scraped: any) => ({
              url: scraped.url,
              content: scraped.content,
              extracted: scraped.metadata,
            })),
          }
        } else {
          const errorText = await brightDataResponse.text()
          console.warn('⚠️ Bright Data scraping failed, continuing with Brave Search only')
          researchErrors.brightData = `Bright Data error (${brightDataResponse.status}): ${errorText}`
        }
      } catch (error) {
        console.error('Bright Data error:', error)
        researchErrors.brightData = error instanceof Error ? error.message : 'Bright Data request failed'
        // Continue with Brave Search even if Bright Data fails
      }
    }

    // PHASE 1: Web Research using Brave Search API
    // DECISION: Skip if deep mode with sufficient scraped content (5+ URLs)
    // Otherwise, use for discovery and competitor finding
    const shouldUseBraveSearch =
      depth === 'surface' || // Surface always uses Brave for quick discovery
      depth === 'medium' || // Medium uses both
      scrapedContent.length < 5 // Even deep needs more if not enough scraped

    let searchResults: any[] = []
    let researchSummary: any[] = []

    if (shouldUseBraveSearch) {
      console.log(`🔎 Using Brave Search for ${depth} level discovery...`)

      const searchResponse = await fetch(
        `https://api.search.brave.com/res/v1/web/search?${new URLSearchParams({
          q: topic,
          count: depth === 'surface' ? '5' : '10',
        })}`,
        {
          headers: {
            'X-Subscription-Token': braveApiKey,
            Accept: 'application/json',
          },
        }
      )

      if (!searchResponse.ok) {
        const errorBody = await searchResponse.text()
        console.error('Brave Search API error:', errorBody)
        researchErrors.brave = `Brave Search API error (${searchResponse.status}): ${searchResponse.statusText}`
        throw new Error(`Brave Search API error (${searchResponse.status}): ${searchResponse.statusText}`)
      }

      const searchData = await searchResponse.json()

      // Extract search results
      searchResults = searchData.web?.results || []
      researchSummary = searchResults
        .slice(0, depth === 'surface' ? 5 : 10)
        .map((result: any) => ({
          title: result.title,
          description: result.description,
          url: result.url,
        }))

      // Collect Brave results for markdown file
      collectedBraveResults = {
        query: topic,
        results: researchSummary,
        keywords: searchData.query?.altered_keywords || [],
      }

      researchSources.braveSearch = true
      console.log(`✅ Found ${researchSummary.length} results from Brave Search`)
    } else {
      console.log(`⏭️  Skipping Brave Search - sufficient data from Bright Data (${scrapedContent.length} sources)`)
    }

    // PHASE 1.5: Get rich content with snippets for AI analysis (only if using Brave)
    let richContent: any[] = []

    if (shouldUseBraveSearch && depth !== 'surface') {
      const richContentResponse = await fetch(
        `https://api.search.brave.com/res/v1/web/search?${new URLSearchParams({
          q: `"${topic}" (listicle OR article)`,
          count: '5',
        })}`,
        {
          headers: {
            'X-Subscription-Token': braveApiKey,
            Accept: 'application/json',
          },
        }
      )

      if (richContentResponse.ok) {
        const richContentData = await richContentResponse.json()
        const richResults = richContentData.web?.results || []
        richContent = richResults.map((result: any) => ({
          title: result.title,
          description: result.description,
          url: result.url,
          extra_snippets: result.extra_snippets || [],
          deep_results: result.deep_results?.results || [],
        }))
      }
    } else {
      // Fallback to basic summaries if we skipped rich content
      richContent = researchSummary.slice(0, 5)
    }

    // Combine Bright Data scraped content with Brave Search results
    // Prioritize scraped content as it has the full page data
    const combinedContent = [
      ...scrapedContent.map((scraped: any) => ({
        title: scraped.title,
        description: `SCRAPED CONTENT: ${scraped.content.substring(0, 500)}...`,
        url: scraped.url,
        metadata: scraped.metadata,
        source: 'bright-data',
        fullContent: scraped.content, // Include full scraped markdown
      })),
      ...richContent.map((result: any) => ({
        ...result,
        source: 'brave-search',
      })),
    ]

    // PHASE 2: MASTER RESEARCH ORCHESTRATOR
    // This is the intelligence layer that connects the analyze-listicle-offers skill
    // to the research process - creating ONE strategic analysis instead of multiple disconnected calls
    if (openaiApiKey) {
      try {
        console.log(`🎯 Activating Master Research Orchestrator...`)
        console.log(`🔍 Detecting offer category for: "${topic}"`)

        // Detect category and get analysis framework
        const offerCategory = detectOfferCategory(topic)
        const analysisFramework = getAnalysisQuestions(offerCategory, depth)

        console.log(`📋 Strategic Analysis - Category: ${offerCategory} | Questions: ${analysisFramework.totalQuestions} | Depth: ${depth}`)

        // Build the master prompt that includes ALL skill intelligence
        const masterPrompt = buildMasterResearchPrompt(
          topic,
          offerCategory,
          analysisFramework.categories.flatMap(cat =>
            cat.questions.map(q => ({
              id: q.id,
              category: cat.name,
              subcategory: q.subcategory,
              question: q.question,
              purpose: q.purpose
            }))
          ),
          scrapedContent,
          researchSummary
        )

        console.log(`🚀 Sending strategic prompt to gpt-4o-mini (${masterPrompt.length} chars)`)

        // SINGLE strategic call with all context
        const analysisResponse = await fetchWithRetry(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini', // Start with cheapest - auto-upgrade if quality issues
              messages: [
                {
                  role: 'user',
                  content: masterPrompt
                }
              ],
              response_format: { type: 'json_object' },
              temperature: 0.4,
              max_completion_tokens: 8000
            }),
          }
        )

        if (!analysisResponse.ok) {
          const errorText = await analysisResponse.text()
          throw new Error(`OpenAI API error (${analysisResponse.status}): ${errorText}`)
        }

        let modelUsed = 'gpt-4o-mini'
        let finalQualityScore: any = null

        const analysisData = await analysisResponse.json()
        let comprehensiveAnalysis = JSON.parse(
          analysisData.choices[0].message.content || '{}'
        )

        // Self-Healing: Check analysis quality
        const qualityScore = checkAnalysisQuality(comprehensiveAnalysis, analysisFramework.totalQuestions)
        finalQualityScore = qualityScore
        console.log(`📊 Analysis quality score: ${qualityScore.score}/100 (${qualityScore.rating})`)

        // If quality is poor, auto-upgrade to gpt-4o
        if (qualityScore.score < 60) {
          console.log(`⚠️ Quality too low (${qualityScore.score}/100). Auto-upgrading to gpt-4o...`)
          console.log(`   Issues: ${qualityScore.issues.join(', ')}`)

          try {
            const retryResponse = await fetchWithRetry(
              'https://api.openai.com/v1/chat/completions',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${openaiApiKey}`,
                },
                body: JSON.stringify({
                  model: 'gpt-4o', // Upgraded model for better quality
                  messages: [
                    {
                      role: 'user',
                      content: masterPrompt
                    }
                  ],
                  response_format: { type: 'json_object' },
                  temperature: 0.4,
                  max_completion_tokens: 16000 // More tokens for better model
                }),
              }
            )

            if (retryResponse.ok) {
              const retryData = await retryResponse.json()
              comprehensiveAnalysis = JSON.parse(
                retryData.choices[0].message.content || '{}'
              )
              modelUsed = 'gpt-4o'
              const newQualityScore = checkAnalysisQuality(comprehensiveAnalysis, analysisFramework.totalQuestions)
              finalQualityScore = newQualityScore
              console.log(`✅ Upgraded analysis complete. New quality score: ${newQualityScore.score}/100 (${newQualityScore.rating})`)
            } else {
              console.warn(`⚠️ Upgrade to gpt-4o failed, using gpt-4o-mini results`)
            }
          } catch (retryError) {
            console.error('Auto-upgrade error:', retryError)
            console.log(`   Continuing with gpt-4o-mini results`)
          }
        } else {
          console.log(`✅ Master analysis complete with ${analysisFramework.totalQuestions} questions answered using ${modelUsed}`)
        }

        // Extract copywriting-ready insights from the comprehensive analysis
        const insights = extractKeyInsights(comprehensiveAnalysis)

        // Build backwards-compatible backstory for frontend
        const backstory = {
          unique_differentiators: comprehensiveAnalysis.research_strategy?.differentiation_opportunities || [],
          emotional_angles: comprehensiveAnalysis.research_strategy?.key_motivators || [],
          audience_pain_points: comprehensiveAnalysis.research_strategy?.primary_pain_points || [],
          seo_keywords: [], // Will be populated from analysis
          trust_builders: comprehensiveAnalysis.copywriting_ready_output?.trust_building_elements || [],
          targeting_angles: [comprehensiveAnalysis.research_strategy?.target_audience || 'General audience'],
          cta_strategies: comprehensiveAnalysis.copywriting_ready_output?.cta_recommendations || []
        }

        // Generate final prompt from the copywriting-ready output
        const finalPrompt = `# COPYWRITING BRIEF: ${topic}

## Positioning
${insights.positioning}

## Primary Hook
${insights.primaryHook}

## Target Pain Points
${insights.painPoints.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

## Recommended CTAs
${insights.ctaRecommendations.map((cta: string, i: number) => `${i + 1}. ${cta}`).join('\n')}

## Trust Elements to Emphasize
${insights.trustElements.map((t: string, i: number) => `${i + 1}. ${t}`).join('\n')}

## Strategic Direction
${comprehensiveAnalysis.research_strategy?.competitive_landscape || 'Focus on delivering clear value and addressing reader pain points.'}

---

*This brief is powered by the 50-question analyze-listicle-offers framework and ready for the write-listicle-copy skill.*`

        // Collect OpenAI insights for markdown file
        collectedOpenAIInsights = {
          finalPrompt,
          backstory,
          comprehensiveAnalysis,
          analysisFramework: {
            category: offerCategory,
            totalQuestions: analysisFramework.totalQuestions,
            depth,
            modelUsed,
            qualityScore: finalQualityScore?.score,
            qualityRating: finalQualityScore?.rating
          }
        }

        // Save all research results to markdown file
        const researchFile = await saveResearchToMarkdown({
          taskId: 'auto-generated', // Will be updated by frontend when task ID is known
          taskTitle: topic,
          depth,
          iteration,
          timestamp: new Date().toISOString(),
          sourceUrls,
          braveSearchResults: collectedBraveResults,
          brightDataResults: collectedBrightDataResults,
          openAIInsights: collectedOpenAIInsights,
          errors: Object.keys(researchErrors).length > 0 ? researchErrors : undefined,
        })

        console.log(`✅ Research results saved to: ${researchFile}`)

        return NextResponse.json({
          finalPrompt,
          backstory,
          researchedAt: new Date().toISOString(),
          researchSources,
          scrapedUrlsCount: scrapedContent.length,
          depth,
          iteration,
          researchFile, // Return filename for frontend to display
        })
      } catch (aiError) {
        console.error('AI processing error:', aiError)
        // Extract error message for user
        let errorMessage = 'AI processing failed, using fallback'
        if (aiError instanceof Error) {
          if (aiError.message.includes('Too Many Requests')) {
            errorMessage = 'OpenAI rate limit exceeded - using fallback research (upgrade your OpenAI plan for higher limits)'
          } else if (aiError.message.includes('401') || aiError.message.includes('Unauthorized')) {
            errorMessage = 'OpenAI API key invalid - using fallback research'
          } else if (aiError.message.includes('429')) {
            errorMessage = 'OpenAI quota exceeded - using fallback research'
          }
        }
        // Store error for fallback note and in researchErrors
        researchErrors.openAI = errorMessage
        ;(globalThis as any).__lastAiError = errorMessage
        // Fall through to fallback response
      }
    }

    // FALLBACK: Return a simple research summary if AI is not available
    const fallbackBackstory = {
      unique_differentiators: researchSummary
        .slice(0, 3)
        .map((r: any) => r.title),
      emotional_angles: [
        'Focus on user benefits and outcomes',
        'Address common frustrations',
      ],
      audience_pain_points: ['Need for reliable information', 'Time constraints'],
      seo_keywords: [topic, ...topic.split(' ')],
      trust_builders: researchSummary.slice(0, 2).map((r: any) => r.url),
      targeting_angles: ['General audience', 'Value-seeking consumers'],
      cta_strategies: ['Learn More', 'Get Started', 'Find Out More'],
    }

    const fallbackPrompt = `Create a comprehensive listicle about "${topic}".

Key points to cover:
${researchSummary
  .slice(0, 5)
  .map((r: any, i: number) => `${i + 1}. ${r.title}`)
  .join('\n')}

Make sure to:
- Use engaging headlines
- Include actionable advice
- Back up claims with data when possible
- Address common questions and concerns
- Optimize for search intent around: ${topic}

Sources for reference:
${researchSummary.slice(0, 3).map((r: any) => `- ${r.url}`).join('\n')}`

    // Collect fallback OpenAI insights for markdown file
    collectedOpenAIInsights = {
      finalPrompt: fallbackPrompt,
      backstory: fallbackBackstory,
    }

    // Save all research results to markdown file (including fallback)
    const researchFile = await saveResearchToMarkdown({
      taskId: 'auto-generated', // Will be updated by frontend when task ID is known
      taskTitle: topic,
      depth,
      iteration,
      timestamp: new Date().toISOString(),
      sourceUrls,
      braveSearchResults: collectedBraveResults,
      brightDataResults: collectedBrightDataResults,
      openAIInsights: collectedOpenAIInsights,
      errors: Object.keys(researchErrors).length > 0 ? researchErrors : undefined,
      fallbackUsed: true,
    })

    console.log(`✅ Research results saved to: ${researchFile} (fallback mode)`)

    return NextResponse.json({
      finalPrompt: fallbackPrompt,
      backstory: fallbackBackstory,
      researchedAt: new Date().toISOString(),
      researchSources,
      scrapedUrlsCount: scrapedContent.length,
      depth,
      iteration,
      researchFile, // Return filename for frontend to display
      note: openaiApiKey
        ? ((globalThis as any).__lastAiError || 'AI processing failed, using fallback')
        : 'Add OPENAI_API_KEY to .env.local for AI-powered insights',
    })
  } catch (error) {
    console.error('Research API error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to perform research',
      },
      { status: 500 }
    )
  }
}
