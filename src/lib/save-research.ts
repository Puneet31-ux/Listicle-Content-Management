import { promises as fs } from 'fs'
import path from 'path'

export interface ResearchResults {
  taskId: string
  taskTitle: string
  depth: string
  iteration: number
  timestamp: string
  sourceUrls: string[]
  braveSearchResults?: {
    query: string
    results: Array<{
      title: string
      description: string
      url: string
    }>
    keywords: string[]
  }
  brightDataResults?: {
    scrapedPages: Array<{
      url: string
      content: string
      extracted?: {
        ctas?: string[]
        headlines?: string[]
        terms?: string
        eligibility?: string
        prices?: string[]
        offers?: string[]
      }
    }>
  }
  openAIInsights?: {
    finalPrompt: string
    backstory: {
      unique_differentiators: string[]
      emotional_angles: string[]
      audience_pain_points: string[]
      seo_keywords: string[]
      trust_builders: string[]
      targeting_angles?: string[]
      cta_strategies?: string[]
    }
  }
  errors?: {
    brave?: string
    brightData?: string
    openAI?: string
  }
  fallbackUsed?: boolean
}

export async function saveResearchToMarkdown(results: ResearchResults): Promise<string> {
  const sanitizedTitle = results.taskTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const filename = `${sanitizedTitle}-${results.timestamp}.md`
  const filepath = path.join(process.cwd(), 'research-results', filename)

  const markdown = generateMarkdown(results)

  await fs.writeFile(filepath, markdown, 'utf-8')

  return filename
}

function generateMarkdown(results: ResearchResults): string {
  const { taskTitle, depth, iteration, timestamp, sourceUrls, braveSearchResults, brightDataResults, openAIInsights, errors, fallbackUsed } = results

  let md = `# Research Results: ${taskTitle}\n\n`
  md += `**Generated:** ${new Date(timestamp).toLocaleString()}\n`
  md += `**Depth:** ${depth}\n`
  md += `**Iteration:** ${iteration}\n`
  md += `${fallbackUsed ? '⚠️ **Fallback Mode** - AI processing unavailable\n' : ''}\n`
  md += `---\n\n`

  // Errors Section
  if (errors && Object.keys(errors).length > 0) {
    md += `## ⚠️ Errors Encountered\n\n`
    if (errors.brave) md += `- **Brave Search:** ${errors.brave}\n`
    if (errors.brightData) md += `- **Bright Data:** ${errors.brightData}\n`
    if (errors.openAI) md += `- **OpenAI:** ${errors.openAI}\n`
    md += `\n---\n\n`
  }

  // Source URLs
  if (sourceUrls && sourceUrls.length > 0) {
    md += `## 📎 Source URLs (${sourceUrls.length})\n\n`
    sourceUrls.forEach((url, i) => {
      md += `${i + 1}. ${url}\n`
    })
    md += `\n---\n\n`
  }

  // Bright Data Results
  if (brightDataResults && brightDataResults.scrapedPages.length > 0) {
    md += `## 🔍 Bright Data Scraped Content\n\n`
    md += `**Pages Scraped:** ${brightDataResults.scrapedPages.length}\n\n`

    brightDataResults.scrapedPages.forEach((page, i) => {
      md += `### Page ${i + 1}: ${page.url}\n\n`

      if (page.extracted) {
        if (page.extracted.ctas && page.extracted.ctas.length > 0) {
          md += `#### CTAs Extracted:\n`
          page.extracted.ctas.forEach(cta => md += `- ${cta}\n`)
          md += `\n`
        }

        if (page.extracted.headlines && page.extracted.headlines.length > 0) {
          md += `#### Headlines:\n`
          page.extracted.headlines.forEach(headline => md += `- ${headline}\n`)
          md += `\n`
        }

        if (page.extracted.offers && page.extracted.offers.length > 0) {
          md += `#### Offers/Pricing:\n`
          page.extracted.offers.forEach(offer => md += `- ${offer}\n`)
          md += `\n`
        }

        if (page.extracted.terms) {
          md += `#### Terms & Conditions:\n`
          md += `${page.extracted.terms}\n\n`
        }

        if (page.extracted.eligibility) {
          md += `#### Eligibility Criteria:\n`
          md += `${page.extracted.eligibility}\n\n`
        }
      }

      if (page.content) {
        md += `#### Full Content:\n\n`
        md += `\`\`\`\n${page.content.substring(0, 3000)}${page.content.length > 3000 ? '...\n(truncated)' : ''}\n\`\`\`\n\n`
      }

      md += `---\n\n`
    })
  }

  // Brave Search Results
  if (braveSearchResults && braveSearchResults.results.length > 0) {
    md += `## 🔎 Brave Search Results\n\n`
    md += `**Query:** "${braveSearchResults.query}"\n`
    md += `**Results Found:** ${braveSearchResults.results.length}\n\n`

    if (braveSearchResults.keywords && braveSearchResults.keywords.length > 0) {
      md += `**Keywords:** ${braveSearchResults.keywords.join(', ')}\n\n`
    }

    braveSearchResults.results.forEach((result, i) => {
      md += `### ${i + 1}. ${result.title}\n\n`
      md += `**URL:** ${result.url}\n\n`
      md += `${result.description}\n\n`
    })

    md += `---\n\n`
  }

  // OpenAI Insights
  if (openAIInsights) {
    md += `## 🤖 AI-Generated Insights\n\n`

    md += `### Final Prompt\n\n`
    md += `${openAIInsights.finalPrompt}\n\n`

    md += `### Backstory & Strategic Insights\n\n`

    const { backstory } = openAIInsights

    if (backstory.unique_differentiators.length > 0) {
      md += `#### Unique Differentiators:\n`
      backstory.unique_differentiators.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }

    if (backstory.emotional_angles.length > 0) {
      md += `#### Emotional Angles:\n`
      backstory.emotional_angles.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }

    if (backstory.audience_pain_points.length > 0) {
      md += `#### Audience Pain Points:\n`
      backstory.audience_pain_points.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }

    if (backstory.seo_keywords.length > 0) {
      md += `#### SEO Keywords:\n`
      backstory.seo_keywords.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }

    if (backstory.trust_builders.length > 0) {
      md += `#### Trust Builders:\n`
      backstory.trust_builders.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }

    if (backstory.targeting_angles && backstory.targeting_angles.length > 0) {
      md += `#### Targeting Angles:\n`
      backstory.targeting_angles.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }

    if (backstory.cta_strategies && backstory.cta_strategies.length > 0) {
      md += `#### CTA Strategies:\n`
      backstory.cta_strategies.forEach(item => md += `- ${item}\n`)
      md += `\n`
    }
  }

  md += `\n---\n\n`
  md += `*Research completed at ${new Date(timestamp).toLocaleString()}*\n`

  return md
}
