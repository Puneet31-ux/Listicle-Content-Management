export type TaskPriority = 'low' | 'normal' | 'high'

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
  }

  // WARP Skill fields
  warpSkill?: {
    messages: Array<{
      role: 'user' | 'assistant'
      content: string
      timestamp: string
    }>
    category?: string // Financial, Home Services, etc.
    isLoading?: boolean
    lastUpdated?: string
  }
}

export interface Column {
  id: string
  title: string
  order: number
  color?: string // Optional accent color
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

  // WARP Skill
  setTaskWarpLoading: (taskId: string, isLoading: boolean) => void
  addWarpMessage: (taskId: string, message: { role: 'user' | 'assistant'; content: string }) => void
  setTaskWarpCategory: (taskId: string, category: string) => void
  clearWarpConversation: (taskId: string) => void
}
