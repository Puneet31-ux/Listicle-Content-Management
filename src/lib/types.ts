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

  // AI Research fields
  aiResearch?: {
    finalPrompt: string
    backstory: {
      unique_differentiators: string[]
      emotional_angles: string[]
      audience_pain_points: string[]
      seo_keywords: string[]
      trust_builders: string[]
    }
    researchedAt: string
    isLoading?: boolean
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
}
