'use client'

import { useState } from 'react'
import { Board } from '@/components/kanban/board'
import { TaskDialog } from '@/components/kanban/task-dialog'
import { ColumnDialog } from '@/components/kanban/column-dialog'
import { BraveResultsModal } from '@/components/kanban/brave-results-modal'
import { CopyPreviewModal } from '@/components/kanban/copy-preview-modal'
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
  const [braveSearchQuery, setBraveSearchQuery] = useState('')
  const [copyPreviewOpen, setCopyPreviewOpen] = useState(false)
  const [copyPreviewTask, setCopyPreviewTask] = useState<Task | undefined>()

  const setTaskStrategyGenerating = useKanbanStore((state) => state.setTaskStrategyGenerating)
  const setTaskStrategy = useKanbanStore((state) => state.setTaskStrategy)
  const setTaskResearchLoading = useKanbanStore((state) => state.setTaskResearchLoading)
  const setTaskResearch = useKanbanStore((state) => state.setTaskResearch)
  const setTaskCopyGenerating = useKanbanStore((state) => state.setTaskCopyGenerating)
  const setTaskCopyVariations = useKanbanStore((state) => state.setTaskCopyVariations)
  const moveTask = useKanbanStore((state) => state.moveTask)
  const tasks = useKanbanStore((state) => state.tasks)
  const columns = useKanbanStore((state) => state.columns)

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

  const handleGenerateStrategy = async (task: Task) => {
    if (task.strategicAnalysis?.isGenerating) return

    try {
      setTaskStrategyGenerating(task.id, true)

      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: task.title,
          depth: task.researchDepth || 'medium',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Strategy generation failed')
      }

      const data = await response.json()

      setTaskStrategy(task.id, {
        category: data.category,
        depth: data.depth,
        totalQuestions: data.totalQuestions,
        categories: data.categories,
        strategyPreview: data.strategyPreview,
        skillPrinciples: data.skillPrinciples,
        generatedAt: new Date().toISOString(),
        isGenerating: false,
      })

      alert(`✅ Strategic analysis generated!\n\nCategory: ${data.category}\nQuestions: ${data.totalQuestions}\n\nClick "View Strategy" to see the full prompt.`)
    } catch (error) {
      console.error('Strategy generation error:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to generate strategy. Please try again.'
      )
      setTaskStrategyGenerating(task.id, false)
    }
  }

  const handleResearchTask = async (task: Task) => {
    if (task.aiResearch?.isLoading) return

    try {
      setTaskResearchLoading(task.id, true)

      // Determine iteration number (if re-researching, increment)
      const iteration = (task.aiResearch?.iteration || 0) + 1

      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: task.title,
          sourceUrls: task.sourceUrls, // Pass source URLs for Bright Data scraping
          depth: task.researchDepth || 'medium', // Default to medium depth
          iteration, // Track iteration number
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
        researchSources: data.researchSources,
        scrapedUrlsCount: data.scrapedUrlsCount,
        depth: data.depth,
        iteration: data.iteration,
        researchFile: data.researchFile, // Save the markdown filename for viewing
        isLoading: false,
      })

      // Move task to next column after successful research
      const currentColumnIndex = columns.findIndex(col => col.id === task.columnId)
      if (currentColumnIndex >= 0 && currentColumnIndex < columns.length - 1) {
        const nextColumn = columns[currentColumnIndex + 1]
        const nextColumnTasks = tasks.filter(t => t.columnId === nextColumn.id)
        const nextOrder = nextColumnTasks.length

        console.log(`✅ Research complete! Moving task to "${nextColumn.title}"`)
        moveTask(task.id, nextColumn.id, nextOrder)
      }

      if (data.note) {
        // Show toast for OpenAI missing key
        if (data.note.includes('OPENAI_API_KEY')) {
          alert('⚠️ OpenAI key missing — advanced prompt generation disabled.')
        } else {
          alert(data.note)
        }
      } else {
        alert(`✅ Research complete!\n\nView the full analysis by clicking "View Search Results"`)
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
          braveInput: task.braveInput,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Brave search failed')
      }

      const data = await response.json()
      setBraveResults(data.results || [])
      setBraveKeywords(data.keywords || [])
      setBraveSearchQuery(data.query || task.title)
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

  const handleViewCopy = (task: Task) => {
    setCopyPreviewTask(task)
    setCopyPreviewOpen(true)
  }

  const handleRollback = async (iterationNumber: number) => {
    if (!copyPreviewTask) return

    const iteration = copyPreviewTask.copyGeneration?.iterationHistory?.find(i => i.iterationNumber === iterationNumber)
    if (!iteration) return

    // Update task with rollback version
    setTaskCopyVariations(
      copyPreviewTask.id,
      iteration.variations,
      copyPreviewTask.copyGeneration?.metadata || {
        generatedAt: new Date().toISOString(),
        conversationContext: `Rolled back to Version ${iterationNumber}`
      },
      iterationNumber,
      copyPreviewTask.copyGeneration?.iterationHistory || []
    )

    alert(`✅ Rolled back to Version ${iterationNumber}`)
    setCopyPreviewOpen(false)
  }

  const handleGenerateCopy = async (task: Task, passLevel: 'draft' | 'ai-removal' | 'polish') => {
    if (task.copyGeneration?.isGenerating) return

    if (!task.aiResearch?.researchFile) {
      alert('❌ Please complete research first before generating copy')
      return
    }

    try {
      setTaskCopyGenerating(task.id, true)

      const response = await fetch('/api/copywriting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: task.id,
          taskTitle: task.title,
          researchFile: task.aiResearch.researchFile,
          passLevel,
          currentIterationHistory: task.copyGeneration?.iterationHistory || [],
          currentIteration: task.copyGeneration?.currentIteration || 0,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Copywriting generation failed')
      }

      const data = await response.json()

      // Update with version stacking
      setTaskCopyVariations(task.id, data.variations, data.metadata, data.currentIteration, data.iterationHistory)

      // Show success message with version info and TOP PICK if available
      const versionInfo = `Version ${data.currentIteration} (${data.iterationHistory.length} total versions)`
      if (data.topPick) {
        alert(`✅ Copy variations generated!\n\n${versionInfo}\n${data.variations.length} variations created\n\n🏆 TOP PICK: Variation ${data.topPick.variationIndex + 1}\n\nReasoning: ${data.topPick.reasoning}\n\nClick "View Copy" to see all variations and version history.`)
      } else {
        alert(`✅ ${data.variations.length} copy variations generated!\n\n${versionInfo}\n\nClick "View Copy" to review all variations and version history.`)
      }
    } catch (error) {
      console.error('Copywriting error:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to generate copy. Please check your API key.'
      )
      setTaskCopyGenerating(task.id, false)
    }
  }

  const [showGuide, setShowGuide] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Listicle Content Manager
                </h1>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How it Works
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                AI-powered competitor research → Extract CTAs, offers, and insights → Write better copy
              </p>

              {/* Guide Panel */}
              {showGuide && (
                <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">1</div>
                        <h3 className="font-semibold text-gray-900">Research</h3>
                      </div>
                      <ul className="space-y-1 text-gray-700 leading-relaxed">
                        <li>• Add listicle offer tasks</li>
                        <li>• Paste competitor URLs (optional)</li>
                        <li>• Click "AI Research" button</li>
                        <li>• Get insights & CTAs extracted</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xs">2</div>
                        <h3 className="font-semibold text-gray-900">APIs Used</h3>
                      </div>
                      <ul className="space-y-1 text-gray-700 leading-relaxed">
                        <li>• <strong>Brave:</strong> Find headlines & news</li>
                        <li>• <strong>Bright Data:</strong> Scrape exact copy</li>
                        <li>• <strong>OpenAI:</strong> Generate insights</li>
                        <li>• Depth: Surface/Medium/Deep</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">3</div>
                        <h3 className="font-semibold text-gray-900">Write & Publish</h3>
                      </div>
                      <ul className="space-y-1 text-gray-700 leading-relaxed">
                        <li>• Review research results</li>
                        <li>• Copy insights to clipboard</li>
                        <li>• Write compelling copy</li>
                        <li>• Move to "Ready to Publish"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleAddColumn} className="h-10 px-4 text-sm ml-4">
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
          onGenerateStrategy={handleGenerateStrategy}
          onResearchTask={handleResearchTask}
          onBraveSearch={handleBraveSearch}
          onGenerateCopy={handleGenerateCopy}
          onViewCopy={handleViewCopy}
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
        searchQuery={braveSearchQuery}
      />

      {/* Copy Preview Modal */}
      {copyPreviewTask && copyPreviewTask.copyGeneration?.variations && (
        <CopyPreviewModal
          open={copyPreviewOpen}
          onOpenChange={setCopyPreviewOpen}
          variations={copyPreviewTask.copyGeneration.variations}
          iterationHistory={copyPreviewTask.copyGeneration.iterationHistory}
          currentIteration={copyPreviewTask.copyGeneration.currentIteration}
          taskTitle={copyPreviewTask.title}
          onRollback={handleRollback}
        />
      )}
    </div>
  )
}
