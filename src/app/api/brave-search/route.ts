import { NextRequest, NextResponse } from 'next/server'

// Helper function to extract insights from search results
function analyzeSearchResults(results: any[], topic: string) {
  // Extract keywords (from topic and common words in titles/descriptions)
  const allText = results.map((r) => `${r.title} ${r.description}`).join(' ')
  const words = allText.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
  const wordFreq = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word)
    .filter((word) => word !== 'the' && word !== 'and' && word !== 'for' && word !== 'with')

  // Extract competitors (domains from URLs)
  const competitors = results
    .map((r) => {
      try {
        const url = new URL(r.url)
        return url.hostname.replace('www.', '')
      } catch {
        return null
      }
    })
    .filter(Boolean)
    .slice(0, 5)

  // Extract value points (benefits mentioned in descriptions)
  const valueKeywords = ['save', 'free', 'easy', 'fast', 'simple', 'best', 'top', 'affordable', 'guaranteed', 'expert']
  const valuePoints = results
    .map((r) => {
      const desc = r.description.toLowerCase()
      return valueKeywords.find((keyword) => desc.includes(keyword))
    })
    .filter(Boolean)
    .map((keyword) => `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)} solution`)
    .slice(0, 5)

  // Extract emotional angles (emotion-triggering words)
  const emotionalWords = ['stress', 'worry', 'peace', 'relief', 'freedom', 'hope', 'trust', 'secure', 'confident', 'overwhelmed']
  const emotionalAngles = results
    .flatMap((r) => {
      const text = `${r.title} ${r.description}`.toLowerCase()
      return emotionalWords.filter((word) => text.includes(word))
    })
    .filter((v, i, a) => a.indexOf(v) === i) // unique
    .map((word) => `Addressing ${word}`)
    .slice(0, 5)

  // Extract pain points (problems mentioned)
  const painKeywords = ['problem', 'issue', 'struggle', 'difficult', 'challenge', 'debt', 'bills', 'credit', 'payment']
  const painPoints = results
    .flatMap((r) => {
      const text = `${r.title} ${r.description}`.toLowerCase()
      return painKeywords.filter((word) => text.includes(word))
    })
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((word) => `Dealing with ${word}`)
    .slice(0, 5)

  // Extract differentiators (unique selling points)
  const differentiators = [
    'Proven track record',
    'Industry expertise',
    'Customer-focused approach',
    'Comprehensive solution',
    'No hidden fees',
  ]

  return {
    keywords: [...new Set([...topic.split(' '), ...topKeywords])].slice(0, 10),
    competitors,
    valuePoints: valuePoints.length > 0 ? valuePoints : ['Cost-effective', 'Reliable service', 'Expert guidance'],
    emotionalAngles: emotionalAngles.length > 0 ? emotionalAngles : ['Peace of mind', 'Financial freedom', 'Stress relief'],
    painPoints: painPoints.length > 0 ? painPoints : ['Financial burden', 'Overwhelming debt', 'Credit concerns'],
    differentiators,
  }
}

export async function POST(req: NextRequest) {
  try {
    const { topic, braveInput } = await req.json()

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

    // Build intelligent search query
    let searchQuery = topic

    if (braveInput && braveInput.trim()) {
      // Use the user's specific search input
      searchQuery = braveInput.trim()
    } else {
      // Create an intelligent query to find relevant articles/listicles
      const currentYear = new Date().getFullYear()
      searchQuery = `"${topic}" (listicle OR article OR guide) ${currentYear} OR ${currentYear - 1}`
    }

    // Brave Search API call
    const searchResponse = await fetch(
      `https://api.search.brave.com/res/v1/web/search?${new URLSearchParams({
        q: searchQuery,
        count: '10',
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

    if (!searchResponse.ok) {
      throw new Error(`Brave Search API error: ${searchResponse.statusText}`)
    }

    const searchData = await searchResponse.json()

    // Extract search results with extra_snippets for more content
    const searchResults = searchData.web?.results || []
    const results = searchResults.slice(0, 10).map((result: any) => ({
      title: result.title,
      description: result.description,
      url: result.url,
      // Extract additional content snippets if available
      extraSnippets: result.extra_snippets || [],
      // Deep results can contain more detailed content
      deepResults: result.deep_results?.results || [],
    }))

    // Analyze results for insights
    const insights = analyzeSearchResults(results, topic)

    return NextResponse.json({
      results,
      query: searchQuery,
      originalTopic: topic,
      totalResults: results.length,
      ...insights,
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
