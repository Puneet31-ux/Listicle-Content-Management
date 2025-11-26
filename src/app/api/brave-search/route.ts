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

    // Check for Brave API key
    const braveApiKey = process.env.BRAVE_SEARCH_API_KEY

    if (!braveApiKey) {
      return NextResponse.json(
        {
          error: 'Brave API key missing. Please add BRAVE_SEARCH_API_KEY to your .env.local file.',
        },
        { status: 500 }
      )
    }

    // Brave Search API call
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
    const results = searchResults.slice(0, 10).map((result: any) => ({
      title: result.title,
      description: result.description,
      url: result.url,
    }))

    // Extract keywords from the topic
    const keywords = topic.split(' ').filter((word: string) => word.length > 3)

    return NextResponse.json({
      results,
      keywords,
      query: topic,
      totalResults: results.length,
    })
  } catch (error) {
    console.error('Brave Search API error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to perform Brave search',
      },
      { status: 500 }
    )
  }
}
