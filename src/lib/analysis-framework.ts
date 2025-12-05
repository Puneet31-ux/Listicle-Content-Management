/**
 * Comprehensive Listicle Offer Analysis Framework
 * Based on analyze-listicle-offers skill
 *
 * Generates 30-50 deep-dive questions to understand:
 * - Reader psychology and pain points
 * - CTA engagement mechanics
 * - Conversion pathways
 * - Offer positioning and messaging
 */

export type OfferCategory =
  | 'financial'
  | 'home-services'
  | 'health-wellness'
  | 'technology'
  | 'education'
  | 'automotive'
  | 'other'

export interface AnalysisQuestion {
  id: number
  category: string
  subcategory: string
  question: string
  purpose: string // What this question helps uncover
}

export interface AnalysisFramework {
  category: OfferCategory
  totalQuestions: number
  categories: {
    name: string
    description: string
    questions: AnalysisQuestion[]
  }[]
}

/**
 * Detect offer category from topic/title
 */
export function detectOfferCategory(topic: string): OfferCategory {
  const lower = topic.toLowerCase()

  // Financial keywords
  if (
    /\b(debt|loan|credit|heloc|mortgage|refinanc|insurance|invest|401k|ira|bank|financial|money|cash|savings|interest)\b/i.test(lower)
  ) {
    return 'financial'
  }

  // Home services keywords
  if (
    /\b(roof|hvac|solar|remodel|home improvement|real estate|contractor|renovation|repair|plumb|electric)\b/i.test(lower)
  ) {
    return 'home-services'
  }

  // Health & wellness keywords
  if (
    /\b(health|medical|doctor|hospital|treatment|therapy|supplement|wellness|fitness|medicare|medicaid)\b/i.test(lower)
  ) {
    return 'health-wellness'
  }

  // Technology keywords
  if (
    /\b(software|app|saas|tech|digital|platform|device|gadget|computer|phone|tablet)\b/i.test(lower)
  ) {
    return 'technology'
  }

  // Education keywords
  if (
    /\b(course|training|certification|education|learn|school|university|online class|bootcamp)\b/i.test(lower)
  ) {
    return 'education'
  }

  // Automotive keywords
  if (
    /\b(car|auto|vehicle|truck|suv|warranty|insurance|lease|finance|dealership)\b/i.test(lower)
  ) {
    return 'automotive'
  }

  return 'other'
}

/**
 * Get financial offer analysis questions (50 questions)
 */
export function getFinancialOfferQuestions(): AnalysisFramework {
  return {
    category: 'financial',
    totalQuestions: 50,
    categories: [
      {
        name: 'Core Offer Mechanics',
        description: 'Understanding the fundamental value proposition, eligibility, process, and costs',
        questions: [
          {
            id: 1,
            category: 'Core Offer Mechanics',
            subcategory: 'Value Proposition',
            question: 'What is the exact financial benefit being offered? (e.g., "reduce debt by X%", "save $X per month", "get $X cash") Include specific dollar amounts, percentages, and timeframes.',
            purpose: 'Identify the core hook and quantifiable value'
          },
          {
            id: 2,
            category: 'Core Offer Mechanics',
            subcategory: 'Eligibility & Qualification',
            question: 'Who qualifies for this offer? List ALL eligibility criteria: credit score ranges, income levels, debt amounts, employment status, age requirements, and location restrictions. What are the MINIMUM and MAXIMUM thresholds?',
            purpose: 'Define the target audience and self-qualification criteria'
          },
          {
            id: 3,
            category: 'Core Offer Mechanics',
            subcategory: 'Process & Commitment',
            question: 'What are the exact steps from clicking the CTA to getting the benefit? How long does each step take? What information must the user provide? Is there a hard credit check or soft inquiry? What is the user committing to by clicking?',
            purpose: 'Understand friction points and commitment levels'
          },
          {
            id: 4,
            category: 'Core Offer Mechanics',
            subcategory: 'Costs & Fees',
            question: 'Is this offer truly free, or are there hidden costs? List all fees (origination, monthly, annual, processing, etc.), when they apply, and how pricing compares to alternatives.',
            purpose: 'Identify transparency needs and objection handling'
          },
          {
            id: 5,
            category: 'Core Offer Mechanics',
            subcategory: 'Provider Details',
            question: 'Who is providing this offer? Company name, years in business, credentials, ratings (BBB, Trustpilot, etc.), and any notable achievements or recognitions.',
            purpose: 'Build trust and authority'
          },
          {
            id: 6,
            category: 'Core Offer Mechanics',
            subcategory: 'Unique Differentiators',
            question: 'What makes this offer unique compared to competitors? What can this offer do that others cannot? What proprietary processes, technologies, or approaches are used?',
            purpose: 'Position against competition'
          },
          {
            id: 7,
            category: 'Core Offer Mechanics',
            subcategory: 'Success Metrics',
            question: 'What are the success rates? How many people have used this? What are typical results (average savings, debt reduction, approval rates)? Include any statistics or case studies.',
            purpose: 'Provide social proof and realistic expectations'
          },
          {
            id: 8,
            category: 'Core Offer Mechanics',
            subcategory: 'Risk & Guarantees',
            question: 'What guarantees are offered? What happens if it doesn\'t work? What are the risks or downsides? Can users cancel or get a refund?',
            purpose: 'Address risk aversion and build confidence'
          }
        ]
      },
      {
        name: 'Reader Psychology & Pain Points',
        description: 'Deep understanding of emotional triggers, motivations, and objections',
        questions: [
          {
            id: 9,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Primary Pain Points',
            question: 'What is the #1 painful situation this reader is experiencing RIGHT NOW? Describe the specific scenario, emotions (stress, shame, fear, anxiety), and daily triggers that remind them of this pain.',
            purpose: 'Create emotional resonance'
          },
          {
            id: 10,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Secondary Pain Points',
            question: 'What related problems compound the main issue? How is this affecting relationships, sleep, future planning, self-worth, and identity? What opportunities are they missing?',
            purpose: 'Deepen emotional connection'
          },
          {
            id: 11,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Immediate Triggers',
            question: 'What happened recently that makes them need this NOW? What is the consequence if they don\'t act? What deadline or urgency exists?',
            purpose: 'Create immediate relevance'
          },
          {
            id: 12,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Aspirational State',
            question: 'What does life look like after this problem is solved? What specific activities can they do? How will they FEEL? Who do they become in their own eyes?',
            purpose: 'Paint the transformation'
          },
          {
            id: 13,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Past Failed Attempts',
            question: 'What have they already tried that failed? Why did those solutions not work? What lessons did they learn? What makes them hesitant to try again?',
            purpose: 'Address skepticism from past failures'
          },
          {
            id: 14,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Skepticism & Objections',
            question: 'Why would they think "this sounds too good to be true"? What specific doubts will they have? (credit impact, cost, effectiveness, legitimacy, time commitment)',
            purpose: 'Preemptively handle objections'
          },
          {
            id: 15,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Social Proof Needs',
            question: 'Who do they need to hear has used this successfully? What testimonial elements matter most? What kind of "people like me" stories resonate?',
            purpose: 'Guide social proof selection'
          },
          {
            id: 16,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Comparison Frame',
            question: 'What alternatives are they considering? (other programs, DIY solutions, doing nothing, more drastic measures) How does this compare on key factors?',
            purpose: 'Position against alternatives'
          },
          {
            id: 17,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Identity & Self-Image',
            question: 'What kind of person do they see themselves as? How does using this offer align with or challenge their identity? What story will they tell themselves about taking this action?',
            purpose: 'Align with reader self-concept'
          },
          {
            id: 18,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Decision-Making Factors',
            question: 'What are the top 3 factors that will determine if they click? (trust, ease, cost, time, effectiveness) Which one is most important?',
            purpose: 'Prioritize messaging'
          },
          {
            id: 19,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Information Seeking Behavior',
            question: 'What questions are they asking Google? What forums or communities are they reading? What information sources do they trust?',
            purpose: 'Match their research patterns'
          },
          {
            id: 20,
            category: 'Reader Psychology & Pain Points',
            subcategory: 'Emotional Journey',
            question: 'Map the emotional journey: What do they feel when they realize they have this problem? When they start researching? When they find this offer? When they click? When they convert?',
            purpose: 'Guide emotional arc of copy'
          }
        ]
      },
      {
        name: 'CTA & Engagement Mechanics',
        description: 'Optimizing calls-to-action and interactive elements for maximum engagement',
        questions: [
          {
            id: 21,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Personalization Opportunities',
            question: 'What specific details can we ask for that trigger self-reflection and engagement? (debt amount, monthly payment, credit score range, zip code) How can we turn passive reading into active participation?',
            purpose: 'Design interactive elements'
          },
          {
            id: 22,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'CTA Psychology',
            question: 'What is the user DOING when they click, not just WHERE they\'re going? ("See my savings" vs "Learn more") What curiosity gap opens? What immediate reward follows the click?',
            purpose: 'Craft compelling CTA language'
          },
          {
            id: 23,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'CTA Language Variants',
            question: 'List 5-10 variations of CTA language that could work, from low-commitment to high-commitment. ("Learn more", "Check eligibility", "Get my quote", "Apply now", "Calculate savings")',
            purpose: 'Provide testing options'
          },
          {
            id: 24,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Risk Reversal',
            question: 'What assurances reduce clicking friction? (no obligation, no credit check to start, free quote, instant results, won\'t affect credit, no spam)',
            purpose: 'Remove barriers to action'
          },
          {
            id: 25,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Urgency Mechanisms',
            question: 'Is there legitimate time pressure? What happens if they wait? How can we communicate urgency authentically without seeming fake or pushy?',
            purpose: 'Create appropriate urgency'
          },
          {
            id: 26,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Engagement Sequence',
            question: 'What is the FIRST thing they see after clicking? What is the flow of information collection? At what point might they feel "this is too much work" and bounce?',
            purpose: 'Optimize post-click experience'
          },
          {
            id: 27,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Mobile Experience',
            question: 'How does the engagement work on mobile? Are there button selections vs typing? Sliders vs dropdowns? What mobile-specific friction exists?',
            purpose: 'Ensure mobile optimization'
          },
          {
            id: 28,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Micro-Commitments',
            question: 'What small commitments can we get before the main CTA? (read a story, watch a video, answer a quiz question, use a calculator)',
            purpose: 'Build investment gradually'
          },
          {
            id: 29,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'CTA Placement',
            question: 'Where should CTAs appear? (After pain point? After benefit? After social proof?) Should there be multiple CTAs or just one?',
            purpose: 'Strategic CTA positioning'
          },
          {
            id: 30,
            category: 'CTA & Engagement Mechanics',
            subcategory: 'Visual Design',
            question: 'What visual elements make the CTA stand out? (color, size, surrounding whitespace, icons, buttons vs links) What trust badges or icons should be near the CTA?',
            purpose: 'Maximize visual appeal'
          }
        ]
      },
      {
        name: 'Information Balance',
        description: 'What to reveal, what to hide, and how to maintain curiosity while building trust',
        questions: [
          {
            id: 31,
            category: 'Information Balance',
            subcategory: 'Must-Know Before Click',
            question: 'What information, if missing, causes bounce from landing page? What details make them feel informed enough to click with confidence?',
            purpose: 'Define minimum information threshold'
          },
          {
            id: 32,
            category: 'Information Balance',
            subcategory: 'Must-Hide to Maintain Curiosity',
            question: 'What specific details should be revealed only on landing page to maintain intrigue? What information revealed too early kills the click?',
            purpose: 'Preserve curiosity gap'
          },
          {
            id: 33,
            category: 'Information Balance',
            subcategory: 'Qualification Checkpoints',
            question: 'What self-qualification happens in the listicle? What final qualification happens on landing page? Where might mismatched expectations cause abandonment?',
            purpose: 'Align expectations'
          },
          {
            id: 34,
            category: 'Information Balance',
            subcategory: 'Transparency vs Mystery',
            question: 'Which program details build trust when disclosed? (company name, years in business, basic process) Which details create intrigue when withheld? (exact savings, personalized strategies)',
            purpose: 'Balance disclosure'
          },
          {
            id: 35,
            category: 'Information Balance',
            subcategory: 'Complexity Management',
            question: 'What aspects of this offer are complex or confusing? How can we simplify without oversimplifying? What analogies or comparisons make it easy to understand?',
            purpose: 'Ensure clarity'
          },
          {
            id: 36,
            category: 'Information Balance',
            subcategory: 'Objection Handling Timing',
            question: 'Which objections should be handled in the listicle vs landing page? What concerns are critical to address immediately?',
            purpose: 'Strategic objection placement'
          },
          {
            id: 37,
            category: 'Information Balance',
            subcategory: 'Detail Density',
            question: 'How much detail is appropriate for this audience? Do they want comprehensive information or quick highlights? Are they researchers or quick decision-makers?',
            purpose: 'Match audience preferences'
          },
          {
            id: 38,
            category: 'Information Balance',
            subcategory: 'Bait & Switch Prevention',
            question: 'What details, if missing from listicle but present on landing page, feel like bait-and-switch? (unexpected fees, harder requirements, longer processes)',
            purpose: 'Maintain trust'
          }
        ]
      },
      {
        name: 'Reader Personas & Segmentation',
        description: 'Understanding who this is for (and who it\'s not for)',
        questions: [
          {
            id: 39,
            category: 'Reader Personas & Segmentation',
            subcategory: 'Primary Persona',
            question: 'Who is the IDEAL reader? Age, income, debt level, employment, family situation, geographic location, tech-savviness. What is their typical day like? When/where/how are they reading this?',
            purpose: 'Define target audience'
          },
          {
            id: 40,
            category: 'Reader Personas & Segmentation',
            subcategory: 'Persona Language',
            question: 'What language/terms does this persona use to describe their situation? How formal or casual is their communication style? What jargon do they understand vs what confuses them?',
            purpose: 'Match communication style'
          },
          {
            id: 41,
            category: 'Reader Personas & Segmentation',
            subcategory: 'Secondary Personas',
            question: 'Who else could benefit but needs different positioning? (retirees vs working parents vs young professionals) How do pain points and motivations differ?',
            purpose: 'Expand addressable market'
          },
          {
            id: 42,
            category: 'Reader Personas & Segmentation',
            subcategory: 'Anti-Personas',
            question: 'Who should self-select OUT of this offer? How can we ethically disqualify wrong-fit readers early? What language helps them move on without feeling rejected?',
            purpose: 'Filter unqualified traffic'
          },
          {
            id: 43,
            category: 'Reader Personas & Segmentation',
            subcategory: 'Life Stage Considerations',
            question: 'At what life stage is this offer most relevant? What life events trigger the need? How does offer positioning change based on life stage?',
            purpose: 'Target life stage timing'
          },
          {
            id: 44,
            category: 'Reader Personas & Segmentation',
            subcategory: 'Cultural & Demographic Factors',
            question: 'Are there cultural, regional, or demographic factors that influence how this audience perceives the offer? What values or beliefs affect their decision-making?',
            purpose: 'Cultural sensitivity'
          }
        ]
      },
      {
        name: 'Conversion Pathway',
        description: 'Mapping the journey from listicle to landing page to conversion',
        questions: [
          {
            id: 45,
            category: 'Conversion Pathway',
            subcategory: 'Listicle-to-Landing Bridge',
            question: 'What expectation is set in listicle that MUST be met on landing page? What is the emotional temperature when they click vs what converts? How does landing page maintain momentum?',
            purpose: 'Ensure continuity'
          },
          {
            id: 46,
            category: 'Conversion Pathway',
            subcategory: 'Landing Page Requirements',
            question: 'What MUST be above the fold? What proof/credibility is needed? What objections must be handled? Describe the ideal landing page structure.',
            purpose: 'Guide landing page design'
          },
          {
            id: 47,
            category: 'Conversion Pathway',
            subcategory: 'Conversion Actions',
            question: 'What is the FINAL conversion action? (form submission, phone call, quiz completion, purchase) What information is required? Where do users typically drop off?',
            purpose: 'Optimize conversion points'
          },
          {
            id: 48,
            category: 'Conversion Pathway',
            subcategory: 'Friction Points',
            question: 'What causes users to abandon the conversion process? (long forms, invasive questions, unexpected costs, complexity) How can each friction point be reduced?',
            purpose: 'Remove barriers'
          },
          {
            id: 49,
            category: 'Conversion Pathway',
            subcategory: 'Post-Conversion Experience',
            question: 'What happens immediately after conversion? What assurance is needed? Where might buyer\'s remorse happen? How does the experience reinforce the decision?',
            purpose: 'Reduce remorse'
          },
          {
            id: 50,
            category: 'Conversion Pathway',
            subcategory: 'Full Journey Metrics',
            question: 'What are typical conversion rates at each stage? (listicle click, landing page arrival, form start, form completion) Where is the biggest drop-off?',
            purpose: 'Identify optimization priorities'
          }
        ]
      }
    ]
  }
}

/**
 * Get analysis questions based on category and depth
 */
export function getAnalysisQuestions(
  category: OfferCategory,
  depth: 'surface' | 'medium' | 'deep' = 'medium'
): AnalysisFramework {
  // For now, only financial offers fully implemented
  // TODO: Add other categories
  const fullFramework = getFinancialOfferQuestions()

  // Adjust questions based on depth
  if (depth === 'surface') {
    // Top 20 most critical questions
    return {
      ...fullFramework,
      totalQuestions: 20,
      categories: fullFramework.categories.map(cat => ({
        ...cat,
        questions: cat.questions.slice(0, Math.ceil(cat.questions.length / 2.5))
      }))
    }
  } else if (depth === 'medium') {
    // Top 35 important questions
    return {
      ...fullFramework,
      totalQuestions: 35,
      categories: fullFramework.categories.map(cat => ({
        ...cat,
        questions: cat.questions.slice(0, Math.ceil(cat.questions.length / 1.5))
      }))
    }
  }

  // Deep = all 50 questions
  return fullFramework
}
