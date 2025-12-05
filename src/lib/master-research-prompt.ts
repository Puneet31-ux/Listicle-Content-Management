/**
 * Master Research Orchestrator
 *
 * This layer connects the analyze-listicle-offers skill intelligence to the research process.
 * It creates strategic research prompts that guide API searches and analysis.
 */

interface AnalysisQuestion {
  id: number
  category: string
  subcategory?: string
  question: string
  purpose: string
}

/**
 * Get category-specific focus areas based on offer type
 */
function getCategoryFocus(category: string): string {
  const focusMap: Record<string, string> = {
    financial: `
- **Value Proposition**: Exact dollar amounts, rates, savings, cash back
- **Eligibility**: Credit scores, income requirements, age limits, location
- **Process**: Application steps, approval time, funding timeline
- **Fees & Costs**: APR, closing costs, monthly fees, penalties
- **Trust Signals**: Credentials, success rates, customer testimonials
- **Pain Points**: Debt stress, rate anxiety, qualification fears
- **CTAs**: Calculators, pre-qualification tools, "see my rate" buttons
- **Competitive Angles**: Rate comparison, no-fee promises, instant approval`,

    'home-services': `
- **Value Proposition**: Cost savings, quality improvements, warranty coverage
- **Eligibility**: Home age, location, ownership status
- **Process**: Consultation, quote, installation timeline
- **Pricing**: Upfront costs, financing options, rebates
- **Trust Signals**: Certifications, BBB rating, local reviews
- **Pain Points**: Home damage anxiety, contractor trust issues
- **CTAs**: Free estimates, instant quotes, virtual consultations
- **Competitive Angles**: Local expertise, warranty length, financing`,

    'health-wellness': `
- **Value Proposition**: Health outcomes, pain relief, quality of life
- **Eligibility**: Age, health conditions, insurance coverage
- **Process**: Consultation, approval, treatment timeline
- **Costs**: Insurance coverage, out-of-pocket, payment plans
- **Trust Signals**: FDA approval, clinical studies, doctor endorsements
- **Pain Points**: Health anxiety, treatment fears, insurance confusion
- **CTAs**: Risk-free trials, consultations, insurance checks
- **Competitive Angles**: Clinical proof, side effects, success rates`,

    technology: `
- **Value Proposition**: Features, time savings, productivity gains
- **Eligibility**: Platform compatibility, technical requirements
- **Process**: Signup, onboarding, learning curve
- **Pricing**: Subscription tiers, free trials, annual discounts
- **Trust Signals**: User reviews, security certifications, uptime
- **Pain Points**: Tech overwhelm, switching friction, learning curve
- **CTAs**: Free trials, interactive demos, "try it now"
- **Competitive Angles**: Ease of use, integrations, support quality`,

    education: `
- **Value Proposition**: Career outcomes, salary increase, skill gains
- **Eligibility**: Prerequisites, time commitment, location
- **Process**: Enrollment, learning format, completion timeline
- **Costs**: Tuition, payment plans, ROI timeline
- **Trust Signals**: Accreditation, job placement rates, testimonials
- **Pain Points**: Career stagnation, time constraints, ROI uncertainty
- **CTAs**: Free courses, career assessments, enrollment deadlines
- **Competitive Angles**: Completion rates, job outcomes, flexibility`,

    automotive: `
- **Value Proposition**: Savings, reliability, protection coverage
- **Eligibility**: Vehicle age, mileage, condition
- **Process**: Quote, inspection, coverage activation
- **Pricing**: Monthly premiums, deductibles, coverage limits
- **Trust Signals**: Industry ratings, claim approval rates
- **Pain Points**: Breakdown anxiety, repair costs, resale value
- **CTAs**: Instant quotes, coverage calculators, VIN lookups
- **Competitive Angles**: Coverage breadth, claim ease, pricing`,

    other: `
- **Value Proposition**: Core benefits, outcomes, results
- **Eligibility**: Basic requirements, qualifications
- **Process**: Steps to access, timeline
- **Costs**: Pricing structure, payment options
- **Trust Signals**: Credibility indicators, social proof
- **Pain Points**: Primary frustrations, anxieties
- **CTAs**: Primary actions, engagement methods
- **Competitive Angles**: Key differentiators`
  }

  return focusMap[category] || focusMap.other
}

/**
 * Format questions for the master prompt
 */
function formatQuestionsForPrompt(questions: AnalysisQuestion[]): string {
  return questions.map(q =>
    `**Q${q.id}**: ${q.question}\n   *Purpose*: ${q.purpose}`
  ).join('\n\n')
}

/**
 * Build the master research prompt that orchestrates the entire analysis
 */
export function buildMasterResearchPrompt(
  topic: string,
  category: string,
  questions: AnalysisQuestion[],
  scrapedContent: any[],
  braveResults: any[]
): string {
  return `# MASTER RESEARCH ORCHESTRATOR

You are an **expert listicle offer analyst** with deep knowledge of conversion psychology, behavioral triggers, and direct-response copywriting.

## MISSION
Analyze the offer **"${topic}"** to create comprehensive, copywriting-ready research that will power high-converting listicle content.

## ESSENTIAL PRINCIPLES (From analyze-listicle-offers skill)

### 1. Offer-to-Reader Resonance
Successful listicles create "this is me" moments. Readers must see themselves in the offer description before they act. Identify every possible reader persona and their specific pain points.

### 2. CTA Engagement Over Generic Links
Strong CTAs activate readers immediately (selecting amounts, choosing locations, etc.) rather than passive "learn more" links. This triggers:
- Self-reflection (how much debt DO I have?)
- Curiosity (what will happen when I click?)
- Automatic progression without conscious decision fatigue

### 3. Information Balance
- **Too little info** → reader arrives at landing page confused/disappointed
- **Too much info** → copy becomes overwhelming, reader never clicks

Identify the MINIMUM information needed to qualify the reader and the MAXIMUM information that maintains curiosity.

### 4. Behavioral Psychology Foundations
- **Dopamine trigger**: When readers see themselves in the story, dopamine releases, creating trust
- **Automatic action**: Engaged interactions bypass rational decision-making
- **Storytelling immersion**: Readers in "character role" mode convert better

### 5. Conversion = Sale, Not Click
Success is measured at offer conversion (form fill, survey, purchase), not listicle click. Trace the full journey: listicle → landing page → conversion.

---

## CATEGORY-SPECIFIC ANALYSIS

**Offer Category**: ${category.toUpperCase()}

**Key Focus Areas**:
${getCategoryFocus(category)}

---

## RESEARCH SOURCES PROVIDED

### Brave Search Results (${braveResults.length} competitor articles found)
${braveResults.map((r: any, i: number) =>
  `${i + 1}. **${r.title}**
   URL: ${r.url}
   Preview: ${r.description}`
).join('\n\n')}

### Scraped Competitor Content (${scrapedContent.length} pages analyzed)
${scrapedContent.map((page: any, i: number) =>
  `**Page ${i + 1}**: ${page.url}
   Content Length: ${page.content?.length || 0} characters
   ${page.extracted?.ctas ? `CTAs Found: ${page.extracted.ctas.length}` : 'No CTAs extracted'}
   ${page.extracted?.headlines ? `Headlines Found: ${page.extracted.headlines.length}` : 'No headlines extracted'}`
).join('\n\n')}

---

## YOUR COMPREHENSIVE ANALYSIS MISSION

Answer ALL ${questions.length} questions below using the provided research sources.

### Question Framework:

${formatQuestionsForPrompt(questions)}

---

## OUTPUT FORMAT REQUIREMENTS

Return a JSON object with this EXACT structure:

\`\`\`json
{
  "category": "${category}",
  "research_strategy": {
    "target_audience": "Detailed description of who this offer is for",
    "primary_pain_points": ["pain point 1", "pain point 2", "pain point 3"],
    "key_motivators": ["motivator 1", "motivator 2", "motivator 3"],
    "competitive_landscape": "Summary of competitor positioning",
    "differentiation_opportunities": ["opportunity 1", "opportunity 2"]
  },
  "analysis": {
    "Core Offer Mechanics": [
      {
        "question_id": 1,
        "question": "Full question text",
        "answer": "Specific, detailed answer based on scraped content",
        "evidence": ["Direct quote from source 1", "Direct quote from source 2"],
        "gaps": "What information is missing from sources",
        "copywriting_insight": "How to use this answer in listicle copy"
      }
    ],
    "Reader Psychology & Pain Points": [...],
    "CTA & Engagement Mechanics": [...],
    "Information Balance": [...],
    "Reader Personas & Segmentation": [...],
    "Conversion Pathway": [...]
  },
  "copywriting_ready_output": {
    "positioning_statement": "How to position this offer in the listicle",
    "primary_hook": "The main attention-grabbing angle",
    "cta_recommendations": ["Specific CTA text recommendation 1", "CTA 2"],
    "pain_to_solution_map": [
      {
        "pain": "Specific reader pain point",
        "solution": "How this offer solves it",
        "proof": "Evidence from research"
      }
    ],
    "trust_building_elements": ["element 1", "element 2", "element 3"],
    "urgency_triggers": ["trigger 1", "trigger 2"]
  }
}
\`\`\`

## ANALYSIS GUIDELINES

1. **Be Specific**: Cite exact numbers, quotes, and examples from sources
2. **Identify Gaps**: If information is missing, say exactly what needs to be gathered
3. **Extract Exact Language**: Quote CTAs, headlines, and emotional triggers verbatim
4. **Think Psychologically**: Explain WHY certain approaches work
5. **Be Actionable**: Every insight should tell copywriters exactly what to do

## REMEMBER

This analysis feeds directly into the **write-listicle-copy skill**. The copywriting team needs:
- Clear positioning
- Specific pain points with evidence
- Proven CTA patterns
- Trust signals to emphasize
- Competitive differentiation angles

Make every answer valuable for conversion-focused listicle creation.

Begin your comprehensive analysis now.`
}

/**
 * Build search queries optimized for listicle research
 */
export function buildStrategicSearchQueries(topic: string, category: string): string[] {
  const baseQueries = [
    `${topic} listicle examples best 2025`,
    `${topic} comparison guide review`,
    `${topic} benefits features pricing`
  ]

  const categoryQueries: Record<string, string[]> = {
    financial: [
      `${topic} eligibility requirements credit score`,
      `${topic} rates fees costs 2025`,
      `${topic} calculator quote tool`
    ],
    'home-services': [
      `${topic} cost estimate pricing`,
      `${topic} contractor reviews ratings`,
      `${topic} warranty guarantee coverage`
    ],
    'health-wellness': [
      `${topic} results success rate`,
      `${topic} insurance coverage Medicare`,
      `${topic} side effects safety`
    ],
    technology: [
      `${topic} features pricing comparison`,
      `${topic} free trial demo`,
      `${topic} reviews ratings user experience`
    ],
    education: [
      `${topic} job placement salary outcomes`,
      `${topic} accreditation certification`,
      `${topic} cost tuition financial aid`
    ],
    automotive: [
      `${topic} coverage deductible pricing`,
      `${topic} claim process reviews`,
      `${topic} warranty comparison best`
    ]
  }

  const specificQueries = categoryQueries[category] || categoryQueries.financial
  return [...baseQueries, ...specificQueries]
}

/**
 * Extract key insights from the master analysis response
 */
export function extractKeyInsights(analysisResponse: any): {
  positioning: string
  primaryHook: string
  painPoints: string[]
  ctaRecommendations: string[]
  trustElements: string[]
} {
  const copywritingOutput = analysisResponse.copywriting_ready_output || {}

  return {
    positioning: copywritingOutput.positioning_statement || 'Positioning not identified',
    primaryHook: copywritingOutput.primary_hook || 'Hook not identified',
    painPoints: copywritingOutput.pain_to_solution_map?.map((p: any) => p.pain) || [],
    ctaRecommendations: copywritingOutput.cta_recommendations || [],
    trustElements: copywritingOutput.trust_building_elements || []
  }
}
