import { NextRequest, NextResponse } from 'next/server'

// Types for Bright Data scraping
type ScrapeMode = 'scrape' | 'extract'

interface BrightDataRequest {
  urls: string[]
  mode?: ScrapeMode
  extractFields?: string[] // For extract mode: 'cta', 'headline', 'terms', 'eligibility', etc.
}

interface ScrapedContent {
  url: string
  content: string
  scrapedAt: string
  mode: ScrapeMode
  extracted?: {
    ctas?: string[]
    headlines?: string[]
    terms?: string
    eligibility?: string
    prices?: string[]
    offers?: string[]
  }
  error?: string
}

// Helper to extract structured data from markdown content
function extractStructuredData(markdown: string, fields: string[]): ScrapedContent['extracted'] {
  const extracted: ScrapedContent['extracted'] = {}

  if (fields.includes('cta')) {
    // Extract CTAs - look for action-oriented phrases
    const ctaPatterns = [
      /(?:apply now|get started|learn more|sign up|claim (?:offer|discount)|see if you qualify|check eligibility|compare rates|free quote|call now|get quote|start saving|claim (?:your|this)|act now|limited time)[^.!?\n]*/gi,
      /\*\*(?:apply now|get started|learn more|sign up|claim|see if you qualify|check eligibility).*?\*\*/gi,
    ]
    const ctas = new Set<string>()
    ctaPatterns.forEach(pattern => {
      const matches = markdown.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const cleaned = match.replace(/\*\*/g, '').trim()
          if (cleaned.length > 5 && cleaned.length < 200) {
            ctas.add(cleaned)
          }
        })
      }
    })
    extracted.ctas = Array.from(ctas).slice(0, 15)
  }

  if (fields.includes('headline')) {
    // Extract headlines from H1, H2, bold text
    const headlines = new Set<string>()
    const headlinePatterns = [
      /^#\s+(.+)$/gm,
      /^##\s+(.+)$/gm,
      /\*\*(.{10,100})\*\*/g,
    ]
    headlinePatterns.forEach(pattern => {
      const matches = markdown.matchAll(pattern)
      for (const match of matches) {
        if (match[1]) {
          headlines.add(match[1].trim())
        }
      }
    })
    extracted.headlines = Array.from(headlines).slice(0, 10)
  }

  if (fields.includes('terms')) {
    // Extract T&Cs and disclaimers
    const termsPatterns = [
      /(?:terms?.{0,15}conditions?|disclaimer|fine print|restrictions apply|eligibility requirements?)[:\s]*([^#]+?)(?=\n#|\n\n|$)/gi,
      /\*(?:terms|disclaimer|restrictions).*?\*/gi,
    ]
    let termsText = ''
    termsPatterns.forEach(pattern => {
      const matches = markdown.match(pattern)
      if (matches && matches[0]) {
        termsText += matches[0] + '\n'
      }
    })
    if (termsText) {
      extracted.terms = termsText.substring(0, 1000).trim()
    }
  }

  if (fields.includes('eligibility')) {
    // Extract eligibility criteria
    const eligibilityPatterns = [
      /(?:eligibility|qualify|requirements?|criteria|must be|you must|to qualify)[:\s]*([^#]+?)(?=\n#|\n\n|$)/gi,
      /(?:age \d+|homeowners?|credit score|income|must have)/gi,
    ]
    const eligibilityCriteria = new Set<string>()
    eligibilityPatterns.forEach(pattern => {
      const matches = markdown.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const cleaned = match.trim()
          if (cleaned.length > 10 && cleaned.length < 300) {
            eligibilityCriteria.add(cleaned)
          }
        })
      }
    })
    if (eligibilityCriteria.size > 0) {
      extracted.eligibility = Array.from(eligibilityCriteria).join('; ')
    }
  }

  if (fields.includes('prices') || fields.includes('offers')) {
    // Extract pricing and offer details
    const pricePatterns = [
      /\$\d+(?:,\d{3})*(?:\.\d{2})?(?:\s*(?:\/month|\/year|per month|annually|monthly))?/g,
      /\d+%\s*(?:APR|off|discount|cashback|back|savings?)/gi,
      /(?:up to|save|get|earn)\s+\$?\d+(?:,\d{3})*(?:\.\d{2})?/gi,
      /(?:rates? (?:as low as|from|starting at))\s+\d+\.?\d*%/gi,
    ]
    const prices = new Set<string>()
    pricePatterns.forEach(pattern => {
      const matches = markdown.match(pattern)
      if (matches) {
        matches.forEach(match => prices.add(match.trim()))
      }
    })
    extracted.prices = Array.from(prices).slice(0, 20)
    extracted.offers = Array.from(prices).slice(0, 20) // Same for offers
  }

  return extracted
}

export async function POST(req: NextRequest) {
  try {
    const { urls, mode = 'scrape', extractFields = [] } = await req.json() as BrightDataRequest

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'At least one URL is required' },
        { status: 400 }
      )
    }

    if (urls.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 URLs per request' },
        { status: 400 }
      )
    }

    // Check for Bright Data API key
    const brightDataApiKey = process.env.BRIGHT_DATA_API_KEY
    if (!brightDataApiKey) {
      return NextResponse.json(
        {
          error: 'Bright Data API key missing. Please add BRIGHT_DATA_API_KEY to your .env.local file.',
        },
        { status: 500 }
      )
    }

    console.log(`🔍 Bright Data: Scraping ${urls.length} URLs in "${mode}" mode...`)

    // Check if we're in development mode (test without actual API call)
    const isDevelopment = process.env.NODE_ENV === 'development'

    // Scrape all URLs
    const scrapePromises = urls.map(async (url: string): Promise<ScrapedContent> => {
      try {
        let html = ''

        if (isDevelopment) {
          // DEVELOPMENT MODE: Fetch directly (bypass Bright Data for testing)
          console.log(`⚠️ DEV MODE: Fetching ${url} directly (not using Bright Data)`)
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            },
          })

          if (!response.ok) {
            throw new Error(`Fetch error: ${response.statusText}`)
          }

          html = await response.text()
        } else {
          // PRODUCTION MODE: Use Bright Data API
          const response = await fetch('https://api.brightdata.com/request', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${brightDataApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              zone: process.env.BRIGHT_DATA_ZONE,
              url: url,
              format: 'html',
              country: 'us',
            }),
          })

          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Bright Data API error (${response.status}): ${errorText}`)
          }

          html = await response.text()
        }

        // Simple HTML to markdown conversion
        // In production, consider using a library like turndown
        let content = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
          .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
          .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
          .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
          .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
          .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
          .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
          .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
          .replace(/<[^>]+>/g, '')
          .replace(/\n{3,}/g, '\n\n')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .trim()

        const scrapedContent: ScrapedContent = {
          url,
          content,
          scrapedAt: new Date().toISOString(),
          mode,
        }

        // If extract mode, analyze the content
        if (mode === 'extract' && extractFields.length > 0) {
          scrapedContent.extracted = extractStructuredData(content, extractFields)
        }

        return scrapedContent

      } catch (error) {
        console.error(`❌ Error scraping ${url}:`, error)
        return {
          url,
          content: '',
          scrapedAt: new Date().toISOString(),
          mode,
          error: error instanceof Error ? error.message : 'Failed to scrape URL',
        }
      }
    })

    const results = await Promise.all(scrapePromises)

    // Separate successful and failed scrapes
    const successful = results.filter(r => !r.error)
    const failed = results.filter(r => r.error)

    console.log(`✅ Scraped: ${successful.length} | ❌ Failed: ${failed.length}`)

    return NextResponse.json({
      scrapedContent: successful,
      failed,
      totalRequested: urls.length,
      totalSuccessful: successful.length,
      totalFailed: failed.length,
      mode,
    })
  } catch (error) {
    console.error('Bright Data scraping error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to perform Bright Data scraping',
      },
      { status: 500 }
    )
  }
}
