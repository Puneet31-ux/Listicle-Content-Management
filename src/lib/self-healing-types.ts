// Self-Healing System Types

export interface SelfHealingImprovement {
  id: string
  timestamp: string
  type: 'api_optimization' | 'prompt_refinement' | 'scraping_enhancement' | 'quality_improvement'
  component: 'brave_search' | 'bright_data' | 'openai_prompts' | 'orchestrator'
  description: string
  reasoning: string
  changes: {
    before: string
    after: string
    diff?: string
  }
  metrics: {
    beforeScore?: number
    afterScore?: number
    improvement?: number
  }
  status: 'pending' | 'approved' | 'applied' | 'rolled_back'
  approvedBy?: string
  approvedAt?: string
  rollbackData?: {
    reason: string
    timestamp: string
    restoredFrom: string
  }
}

export interface ResearchMetrics {
  researchId: string
  taskId: string
  timestamp: string
  depth: 'surface' | 'medium' | 'deep'
  apisUsed: {
    braveSearch: boolean
    brightData: boolean
    openAI: boolean
  }
  performance: {
    totalTime: number
    braveSearchTime?: number
    brightDataTime?: number
    openAITime?: number
  }
  results: {
    braveResultsCount?: number
    scrapedPagesCount?: number
    extractedInsightsCount?: number
  }
  qualityScore?: number // 1-10 scale
  userFeedback?: {
    rating: number // 1-5 stars
    helpful: boolean
    comments?: string
  }
}

export interface APIPerformanceMetrics {
  braveSearch: {
    totalCalls: number
    successRate: number
    averageResultsCount: number
    averageResponseTime: number
    errorPatterns: string[]
  }
  brightData: {
    totalCalls: number
    successRate: number
    averageScrapedPages: number
    averageResponseTime: number
    failedUrls: string[]
    errorPatterns: string[]
  }
  openAI: {
    totalCalls: number
    successRate: number
    averageResponseTime: number
    averageTokensUsed: number
    errorPatterns: string[]
  }
}

export interface SelfHealingLog {
  version: string
  lastUpdated: string
  improvements: SelfHealingImprovement[]
  metrics: {
    totalResearches: number
    successRate: number
    averageQualityScore: number
    apiPerformance: APIPerformanceMetrics
  }
  researchHistory: ResearchMetrics[]
}

export interface ImprovementSuggestion {
  id: string
  type: SelfHealingImprovement['type']
  component: SelfHealingImprovement['component']
  priority: 'low' | 'medium' | 'high' | 'critical'
  confidence: number // 0-100%
  description: string
  reasoning: string
  proposedChanges: {
    file: string
    changes: string
  }
  expectedImpact: {
    qualityImprovement: number // estimated %
    performanceImpact: number // estimated ms
    successRateIncrease: number // estimated %
  }
  basedOnData: {
    sampleSize: number
    pattern: string
    evidence: string[]
  }
}
