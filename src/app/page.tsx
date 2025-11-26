'use client'

import { useState } from 'react'
import { Board } from '@/components/kanban/board'
import { TaskDialog } from '@/components/kanban/task-dialog'
import { ColumnDialog } from '@/components/kanban/column-dialog'
import { BraveResultsModal } from '@/components/kanban/brave-results-modal'
import { Button } from '@/components/ui/button'
import { Task, Column } from '@/lib/types'
import { useKanbanStore } from '@/store/kanban-store'

interface BraveResult {
  title: string
  url: string
  description: string
}

export default function Home() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [columnDialogOpen, setColumnDialogOpen] = useState(false)
  const [braveModalOpen, setBraveModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | undefined>()
  const [selectedColumn, setSelectedColumn] = useState<Column | undefined>()
  const [selectedColumnId, setSelectedColumnId] = useState<string | undefined>()
  const [braveResults, setBraveResults] = useState<BraveResult[]>([])
  const [braveKeywords, setBraveKeywords] = useState<string[]>([])
  const [braveLoading, setBraveLoading] = useState(false)
  const [braveTaskTitle, setBraveTaskTitle] = useState('')

  const setTaskResearchLoading = useKanbanStore((state) => state.setTaskResearchLoading)
  const setTaskResearch = useKanbanStore((state) => state.setTaskResearch)

  const handleAddTask = (columnId: string) => {
    setSelectedTask(undefined)
    setSelectedColumnId(columnId)
    setTaskDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setSelectedColumnId(undefined)
    setTaskDialogOpen(true)
  }

  const handleAddColumn = () => {
    setSelectedColumn(undefined)
    setColumnDialogOpen(true)
  }

  const handleEditColumn = (column: Column) => {
    setSelectedColumn(column)
    setColumnDialogOpen(true)
  }

  const handleResearchTask = async (task: Task) => {
    if (task.aiResearch?.isLoading) return

    try {
      setTaskResearchLoading(task.id, true)

      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: task.title,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Research failed')
      }

      const data = await response.json()

      setTaskResearch(task.id, {
        finalPrompt: data.finalPrompt,
        backstory: data.backstory,
        researchedAt: data.researchedAt,
        isLoading: false,
      })

      if (data.note) {
        // Show toast for OpenAI missing key
        if (data.note.includes('OPENAI_API_KEY')) {
          alert('⚠️ OpenAI key missing — advanced prompt generation disabled.')
        } else {
          alert(data.note)
        }
      }
    } catch (error) {
      console.error('Research error:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to perform research. Please check your API keys.'
      )
      setTaskResearchLoading(task.id, false)
    }
  }

  const handleBraveSearch = async (task: Task) => {
    try {
      setBraveLoading(true)
      setBraveTaskTitle(task.title)
      setBraveModalOpen(true)
      setBraveResults([])
      setBraveKeywords([])

      const response = await fetch('/api/brave-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: task.title,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Brave search failed')
      }

      const data = await response.json()
      setBraveResults(data.results || [])
      setBraveKeywords(data.keywords || [])
    } catch (error) {
      console.error('Brave search error:', error)
      setBraveModalOpen(false)
      alert(
        '❌ ' + (error instanceof Error
          ? error.message
          : 'Failed to perform Brave search. Please check your API key.')
      )
    } finally {
      setBraveLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Listicle Content Manager
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your content creation workflow with AI-powered research
              </p>
            </div>
            <Button onClick={handleAddColumn} className="h-10 px-4 text-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Column
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Board
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onResearchTask={handleResearchTask}
          onBraveSearch={handleBraveSearch}
          onEditColumn={handleEditColumn}
        />
      </main>

      {/* Dialogs */}
      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        task={selectedTask}
        columnId={selectedColumnId}
      />

      <ColumnDialog
        open={columnDialogOpen}
        onOpenChange={setColumnDialogOpen}
        column={selectedColumn}
      />

      <BraveResultsModal
        open={braveModalOpen}
        onOpenChange={setBraveModalOpen}
        taskTitle={braveTaskTitle}
        results={braveResults}
        keywords={braveKeywords}
        isLoading={braveLoading}
      />
    </div>
  )
}
