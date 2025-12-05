export type TaskPriority = 'low' | 'normal' | 'high'

export type ResearchDepth = 'surface' | 'medium' | 'deep'

export interface Task {
  id: string
  title: string
  description?: string // Markdown support
  columnId: string
  order: number
  createdAt: string
  priority?: TaskPriority
  assignee?: string // Initials for avatar
  braveInput?: string // Specific input for Brave search to find relevant articles
  sourceUrls?: string[] // URLs to scrape with Bright Data for deep content analysis
  researchDepth?: ResearchDepth // Depth level for research (surface/medium/deep)

  // AI Research fields
  aiResearch?: {
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
    researchedAt: string
    isLoading?: boolean
    researchSources?: {
      braveSearch: boolean
      brightData: boolean
    }
    scrapedUrlsCount?: number
    depth?: ResearchDepth
    iteration?: number
    researchFile?: string // Filename of the saved markdown research file
  }

  // Copy Generation & Iteration (moved from WARP)
  copyGeneration?: {
    variations?: CopyVariation[]
    metadata?: CopyGenerationMetadata
    isGenerating?: boolean
    generatedAt?: string
    iterationHistory?: IterationRecord[]
    currentIteration?: number
    needsRefinement?: boolean
  }
}

export interface IterationRecord {
  iterationNumber: number
  generatedAt: string
  variations: CopyVariation[]
  evaluation?: {
    feedback: string
    score: number // 1-10
    strengths: string[]
    improvements: string[]
  }
  researchUpdate?: {
    additionalSourceUrls?: string[]
    newInsights?: string
  }
}

export interface CopyVariation {
  id: string
  strategicApproach: string
  headline: string
  subheadline: string
  openingHook: string
  bodyCopy: string
  valueArticulation: string
  qualificationLanguage: string
  socialProofElement: string
  ctaSection: {
    interactiveElement: string
    buttonText: string
    riskReversal: string
  }
  rationale: string
  emotionalTemperature: 'high' | 'medium' | 'low'
  ctaType: string
  informationDensity: 'brief' | 'moderate' | 'detailed'
  bestFor: string
}

export interface CopyGenerationMetadata {
  generatedAt: string
  category?: string
  researchSummary?: string
  conversationContext: string
}

export interface Column {
  id: string
  title: string
  order: number
  color?: string // Optional accent color
  description?: string // Helpful description of what this column is for
}

export interface KanbanState {
  columns: Column[]
  tasks: Task[]

  // Column operations
  addColumn: (column: Omit<Column, 'id'>) => void
  updateColumn: (id: string, updates: Partial<Column>) => void
  deleteColumn: (id: string) => void
  reorderColumns: (sourceIdx: number, destIdx: number) => void

  // Task operations
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, targetColumnId: string, newOrder: number) => void

  // AI Research
  setTaskResearchLoading: (taskId: string, isLoading: boolean) => void
  setTaskResearch: (taskId: string, research: Task['aiResearch']) => void

  // Copy Generation & Iteration
  setTaskCopyGenerating: (taskId: string, isGenerating: boolean) => void
  setTaskCopyVariations: (taskId: string, variations: CopyVariation[], metadata: CopyGenerationMetadata) => void
  clearTaskCopyVariations: (taskId: string) => void
  addIterationRecord: (taskId: string, iterationRecord: IterationRecord) => void
  setTaskNeedsRefinement: (taskId: string, needsRefinement: boolean) => void
}
