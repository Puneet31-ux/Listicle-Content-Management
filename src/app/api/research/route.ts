import { NextRequest, NextResponse } from 'next/server'
import { saveResearchToMarkdown, ResearchResults } from '@/lib/save-research'
import { detectOfferCategory, getAnalysisQuestions } from '@/lib/analysis-framework'

type ResearchDepth = 'surface' | 'medium' | 'deep'

interface ResearchRequest {
  topic: string
  sourceUrls?: string[]
  depth?: ResearchDepth
  iteration?: number
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

    // PHASE 2 & 3: If OpenAI key is available, use it for insights
    if (openaiApiKey) {
      try {
        // Extract insights using OpenAI
        const insightsResponse = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-5-mini', // Cheapest model - will auto-upgrade if quality issues detected
              messages: [
                {
                  role: 'system',
                  content: `You are an expert direct-response copywriter analyzing high-converting listicle content. Your job is to reverse-engineer the exact persuasion tactics used in competitor content.

CRITICAL ANALYSIS FOCUS:

**CTA Language Analysis** (MOST IMPORTANT):
Extract the EXACT persuasive language used in calls-to-action. Look for:
- Specific benefit amounts: "get up to $500,000", "save $2,000/month", "qualify for $50K"
- Urgency language: "act now", "limited time", "before it's too late", "vital you act now"
- Action-oriented phrases: "see if you qualify", "check your eligibility", "find out if you're eligible"
- Benefit-driven CTAs: "without refinancing", "no credit check required", "completely free"
- Emotional urgency: "don't miss out", "before rates increase", "while funds last"

**Title Analysis**: Extract power words, numbers, and hooks used (e.g., "Top 10", "Hidden", "Secret")

**Targeting Angles**: Find SPECIFIC demographic qualifiers (e.g., "homeowners with $50K+ equity", "seniors 62+", "credit scores below 600")

**Trust Elements**: Look for EXACT proof points (e.g., "2.5M+ homeowners helped", "BBB A+ rated", "featured on CNN")

--- FEW-SHOT EXAMPLES (Learn from these) ---

EXAMPLE 1:
Input snippet: "Homeowners 62+ with at least $50,000 in home equity can get up to $500,000 cash without monthly payments through a reverse mortgage."
Output:
{
  "targeting_angles": ["homeowners age 62 or older", "with at least $50,000 in home equity"],
  "cta_strategies": ["get up to $500,000 cash without monthly payments"]
}

EXAMPLE 2:
Input snippet: "Act now before interest rates increase. See if you qualify for up to $2,000/month in debt relief. No credit check required."
Output:
{
  "cta_strategies": ["act now before interest rates increase", "see if you qualify for up to $2,000/month in debt relief", "no credit check required"]
}

EXAMPLE 3:
Input snippet: "Over 2.5 million seniors have already accessed their home equity. AARP-approved lenders. Featured on CNN Money."
Output:
{
  "trust_builders": ["over 2.5 million seniors helped", "AARP-approved lenders", "featured on CNN Money"]
}

--- END EXAMPLES ---

Return ONLY a valid JSON object with this exact structure:
{
  "unique_differentiators": ["specific unique value propositions found"],
  "emotional_angles": ["emotional triggers like urgency, fear, hope"],
  "audience_pain_points": ["specific pain points mentioned"],
  "seo_keywords": ["high-value search terms"],
  "trust_builders": ["EXACT trust elements: 'AARP-approved', 'over 2M helped', specific statistics"],
  "targeting_angles": ["EXACT demographic criteria: 'homeowners 62+', 'with $50K equity', 'credit score 580+'"],
  "cta_strategies": ["FULL CTA text with benefits: 'see if you qualify for up to $500K without refinancing', 'act now and check if you could get $2,000/month', 'find out if you're eligible before rates increase'"]
}

DO NOT write generic CTAs. Extract the ACTUAL persuasive copy from the content snippets provided, including dollar amounts, timeframes, and specific benefits. Look in extra_snippets and deep_results for the best content.`,
                },
                {
                  role: 'user',
                  content: `Topic: ${topic}\n\nCompetitor Content Analysis:\n${JSON.stringify(
                    combinedContent,
                    null,
                    2
                  )}\n\nPay special attention to entries marked "bright-data" as they contain FULL PAGE CONTENT with exact CTAs, offers, and T&Cs. Extract EXACT language from the titles, descriptions, fullContent (for bright-data sources), extra_snippets, and deep_results. Do not make up generic phrases.`,
                },
              ],
              response_format: { type: 'json_object' },
              temperature: 0.3,
            }),
          }
        )

        if (!insightsResponse.ok) {
          throw new Error(`OpenAI API error: ${insightsResponse.statusText}`)
        }

        const insightsData = await insightsResponse.json()
        const backstory = JSON.parse(
          insightsData.choices[0].message.content || '{}'
        )

        // Validate outputs aren't generic
        if (backstory.cta_strategies && Array.isArray(backstory.cta_strategies)) {
          const genericTerms = ['learn more', 'get started', 'find out more', 'click here', 'read more']
          const hasSpecifics = backstory.cta_strategies.some((cta: string) => {
            const lowerCta = cta.toLowerCase()
            // Check if CTA has dollar signs, numbers, or is long/specific (not just generic 2 words)
            return cta.includes('$') || /\d+/.test(cta) || (cta.length > 30 && !genericTerms.some(term => lowerCta === term))
          })

          if (!hasSpecifics) {
            console.warn('⚠️ Generic CTAs detected - source content may lack specific details. CTAs:', backstory.cta_strategies)
          } else {
            console.log('✅ Specific CTAs found with numbers/benefits:', backstory.cta_strategies.filter((cta: string) =>
              cta.includes('$') || /\d+/.test(cta)
            ))
          }
        }

        // Generate final prompt
        const promptResponse = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-5-mini', // Cheapest model - will auto-upgrade if quality issues detected
              messages: [
                {
                  role: 'system',
                  content: `You are an expert listicle content brief creator who analyzes competitor content to create winning strategies.

Generate a comprehensive, actionable content creation prompt that includes:

1. **Structure**: How to organize the listicle (title format, number of items, section breakdown)
2. **Targeting Strategy**: Specific demographic/psychographic angles to use based on competitor analysis
3. **Emotional Hooks**: Which emotional triggers to leverage and where
4. **Pain Point Addressing**: How to acknowledge and solve specific problems
5. **Trust Building**: Specific credentials, stats, or proof elements to include
6. **CTA Framework**: Exact CTAs to use, where to place them, and urgency tactics to employ
7. **SEO Optimization**: Keyword placement strategy

Make the prompt specific and actionable - not generic advice. Reference actual elements found in competitor content.`,
                },
                {
                  role: 'user',
                  content: `Topic: ${topic}\n\nBackstory:\n${JSON.stringify(
                    backstory,
                    null,
                    2
                  )}\n\nGenerate a detailed content creation prompt.`,
                },
              ],
              temperature: 0.8,
            }),
          }
        )

        if (!promptResponse.ok) {
          throw new Error(`OpenAI API error: ${promptResponse.statusText}`)
        }

        const promptData = await promptResponse.json()
        const finalPrompt = promptData.choices[0].message.content || ''

        // PHASE 2.5: Comprehensive Analysis Framework
        // Detect offer category and load appropriate questions
        console.log(`🔍 Detecting offer category for: "${topic}"`)
        const offerCategory = detectOfferCategory(topic)
        const analysisFramework = getAnalysisQuestions(offerCategory, depth)

        console.log(`📋 Generating comprehensive analysis (${analysisFramework.totalQuestions} questions) for category: ${offerCategory}`)

        // Format all questions for AI analysis
        const formattedQuestions = analysisFramework.categories
          .map(category => {
            const questionsList = category.questions
              .map(q => `${q.id}. ${q.question}`)
              .join('\n\n')
            return `## ${category.name}\n${category.description}\n\n${questionsList}`
          })
          .join('\n\n---\n\n')

        // Use OpenAI to answer all questions based on scraped content
        const analysisResponse = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-5-mini', // Cheapest model for comprehensive analysis - auto-upgrades to gpt-5.1 if needed
              messages: [
                {
                  role: 'system',
                  content: `You are an expert listicle offer analyst. Your job is to answer comprehensive deep-dive questions about an offer based on competitor content analysis.

**Your Analysis Must:**
1. Be specific and detailed - cite actual phrases, numbers, and examples from the content provided
2. Identify gaps - if information is missing, say "Information not found in source content - recommend gathering [specific data]"
3. Extract exact language - when analyzing CTAs, pain points, or messaging, quote directly from sources
4. Think psychologically - understand reader motivations, fears, and desires
5. Be actionable - every answer should help a copywriter craft better listicle content

**Answer Format:**
For each question, provide:
- **Direct Answer:** The specific answer based on source analysis
- **Evidence:** Quotes or specific details from the scraped content that support your answer
- **Gaps:** What information is missing that would strengthen the analysis
- **Copywriting Insight:** How this answer should inform the listicle copy

Return your analysis as a JSON object with this structure:
{
  "category": "offer category",
  "analysis": {
    "Core Offer Mechanics": [
      {
        "question_id": 1,
        "question": "...",
        "answer": "...",
        "evidence": ["quote 1", "quote 2"],
        "gaps": "...",
        "copywriting_insight": "..."
      }
    ],
    "Reader Psychology & Pain Points": [...],
    ...
  }
}`
                },
                {
                  role: 'user',
                  content: `**Offer Topic:** ${topic}

**Research Sources:**
${JSON.stringify(combinedContent, null, 2)}

**Basic Insights Already Extracted:**
${JSON.stringify(backstory, null, 2)}

---

**COMPREHENSIVE ANALYSIS QUESTIONS:**

${formattedQuestions}

---

Analyze all provided content and answer each question thoroughly. Be specific, cite evidence, identify gaps, and provide actionable copywriting insights.`
                }
              ],
              response_format: { type: 'json_object' },
              temperature: 0.4,
              max_tokens: 4000
            }),
          }
        )

        let comprehensiveAnalysis = null
        let modelUsed = 'gpt-5-mini'
        let finalQualityScore: any = null

        if (analysisResponse.ok) {
          const analysisData = await analysisResponse.json()
          comprehensiveAnalysis = JSON.parse(
            analysisData.choices[0].message.content || '{}'
          )

          // Self-Healing: Check analysis quality
          const qualityScore = checkAnalysisQuality(comprehensiveAnalysis, analysisFramework.totalQuestions)
          finalQualityScore = qualityScore
          console.log(`📊 Analysis quality score: ${qualityScore.score}/100 (${qualityScore.rating})`)

          // If quality is poor, retry with better model
          if (qualityScore.score < 60) {
            console.log(`⚠️ Quality too low (${qualityScore.score}/100). Auto-upgrading to gpt-5.1...`)
            console.log(`   Issues: ${qualityScore.issues.join(', ')}`)

            try {
              const retryResponse = await fetch(
                'https://api.openai.com/v1/chat/completions',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${openaiApiKey}`,
                  },
                  body: JSON.stringify({
                    model: 'gpt-5.1', // Upgraded model for better quality
                    messages: [
                      {
                        role: 'system',
                        content: `You are an expert listicle offer analyst. Your job is to answer comprehensive deep-dive questions about an offer based on competitor content analysis.

**Your Analysis Must:**
1. Be specific and detailed - cite actual phrases, numbers, and examples from the content provided
2. Identify gaps - if information is missing, say "Information not found in source content - recommend gathering [specific data]"
3. Extract exact language - when analyzing CTAs, pain points, or messaging, quote directly from sources
4. Think psychologically - understand reader motivations, fears, and desires
5. Be actionable - every answer should help a copywriter craft better listicle content

**Answer Format:**
For each question, provide:
- **Direct Answer:** The specific answer based on source analysis
- **Evidence:** Quotes or specific details from the scraped content that support your answer
- **Gaps:** What information is missing that would strengthen the analysis
- **Copywriting Insight:** How this answer should inform the listicle copy

Return your analysis as a JSON object with this structure:
{
  "category": "offer category",
  "analysis": {
    "Core Offer Mechanics": [
      {
        "question_id": 1,
        "question": "...",
        "answer": "...",
        "evidence": ["quote 1", "quote 2"],
        "gaps": "...",
        "copywriting_insight": "..."
      }
    ],
    "Reader Psychology & Pain Points": [...],
    ...
  }
}`
                      },
                      {
                        role: 'user',
                        content: `**Offer Topic:** ${topic}

**Research Sources:**
${JSON.stringify(combinedContent, null, 2)}

---

**COMPREHENSIVE ANALYSIS QUESTIONS:**

${formattedQuestions}

---

Analyze all provided content and answer each question thoroughly. Be specific, cite evidence, identify gaps, and provide actionable copywriting insights.`
                      }
                    ],
                    response_format: { type: 'json_object' },
                    temperature: 0.4,
                    max_tokens: 8000 // More tokens for better model
                  }),
                }
              )

              if (retryResponse.ok) {
                const retryData = await retryResponse.json()
                comprehensiveAnalysis = JSON.parse(
                  retryData.choices[0].message.content || '{}'
                )
                modelUsed = 'gpt-5.1'
                const newQualityScore = checkAnalysisQuality(comprehensiveAnalysis, analysisFramework.totalQuestions)
                finalQualityScore = newQualityScore
                console.log(`✅ Upgraded analysis complete. New quality score: ${newQualityScore.score}/100 (${newQualityScore.rating})`)
              } else {
                console.warn(`⚠️ Upgrade to gpt-5.1 failed, using gpt-5-mini results`)
              }
            } catch (retryError) {
              console.error('Auto-upgrade error:', retryError)
              console.log(`   Continuing with gpt-5-mini results`)
            }
          } else {
            console.log(`✅ Comprehensive analysis complete with ${analysisFramework.totalQuestions} questions answered using ${modelUsed}`)
          }
        } else {
          console.warn('⚠️ Comprehensive analysis failed, continuing with basic insights only')
        }

        // Collect OpenAI insights for markdown file
        collectedOpenAIInsights = {
          finalPrompt,
          backstory,
          comprehensiveAnalysis: comprehensiveAnalysis || undefined,
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
