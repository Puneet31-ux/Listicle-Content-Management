import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
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

    // PHASE 1: Web Research using Brave Search API
    const searchResponse = await fetch(
      `https://api.search.brave.com/res/v1/web/search?${new URLSearchParams({
        q: topic,
        count: '10',
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
    const searchResults = searchData.web?.results || []
    const researchSummary = searchResults
      .slice(0, 10)
      .map((result: any) => ({
        title: result.title,
        description: result.description,
        url: result.url,
      }))

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
                  content: `You are a content research analyst. Analyze the provided research and extract:
1. Unique differentiators (what makes this topic unique)
2. Emotional angles (emotional triggers and appeals)
3. Audience pain points (problems users face)
4. SEO keywords (high-value search terms)
5. Trust builders (credibility factors, statistics, expert opinions)

Return ONLY a valid JSON object with this exact structure:
{
  "unique_differentiators": ["..."],
  "emotional_angles": ["..."],
  "audience_pain_points": ["..."],
  "seo_keywords": ["..."],
  "trust_builders": ["..."]
}`,
                },
                {
                  role: 'user',
                  content: `Topic: ${topic}\n\nResearch Data:\n${JSON.stringify(
                    researchSummary,
                    null,
                    2
                  )}`,
                },
              ],
              response_format: { type: 'json_object' },
              temperature: 0.7,
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
                  content: `You are an expert content brief creator. Generate a comprehensive prompt for creating a high-quality listicle based on the research insights provided. The prompt should:
- Incorporate unique differentiators to make content stand out
- Leverage emotional angles for engagement
- Address audience pain points directly
- Include SEO keywords naturally
- Reference trust builders for credibility
- Be specific, actionable, and optimized for AI content generation`,
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
        })
      } catch (aiError) {
        console.error('AI processing error:', aiError)
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
      note: openaiApiKey
        ? 'AI processing failed, using fallback'
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
