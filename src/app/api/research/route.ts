import { NextRequest, NextResponse } from 'next/server'

type ResearchDepth = 'surface' | 'medium' | 'deep'

interface ResearchRequest {
  topic: string
  sourceUrls?: string[]
  depth?: ResearchDepth
  iteration?: number
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  let braveStartTime = 0, braveEndTime = 0
  let brightDataStartTime = 0, brightDataEndTime = 0
  let openAIStartTime = 0, openAIEndTime = 0

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
        } else {
          console.warn('⚠️ Bright Data scraping failed, continuing with Brave Search only')
        }
      } catch (error) {
        console.error('Bright Data error:', error)
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
          country: 'us',
          search_lang: 'en',
        })}`,
        {
          headers: {
            'X-Subscription-Token': braveApiKey,
            Accept: 'application/json',
          },
        }
      )

      if (!searchResponse.ok) {
        throw new Error(`Brave Search API error: ${searchResponse.statusText}`)
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
          country: 'us',
          search_lang: 'en',
          freshness: 'py', // Past year for recent content
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
              model: 'gpt-3.5-turbo',
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
              model: 'gpt-3.5-turbo',
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

        return NextResponse.json({
          finalPrompt,
          backstory,
          researchedAt: new Date().toISOString(),
          researchSources,
          scrapedUrlsCount: scrapedContent.length,
          depth,
          iteration,
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
        // Store error for fallback note
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

    return NextResponse.json({
      finalPrompt: fallbackPrompt,
      backstory: fallbackBackstory,
      researchedAt: new Date().toISOString(),
      researchSources,
      scrapedUrlsCount: scrapedContent.length,
      depth,
      iteration,
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
