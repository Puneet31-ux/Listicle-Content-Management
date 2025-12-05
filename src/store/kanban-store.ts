'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { KanbanState, Task, Column } from '@/lib/types'
import { DEFAULT_COLUMNS, STORAGE_KEY } from '@/lib/constants'

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      columns: DEFAULT_COLUMNS,
      tasks: [],

      // Column operations
      addColumn: (column) =>
        set((state) => ({
          columns: [
            ...state.columns,
            {
              ...column,
              id: uuidv4(),
            },
          ],
        })),

      updateColumn: (id, updates) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, ...updates } : col
          ),
        })),

      deleteColumn: (id) =>
        set((state) => {
          // Move tasks from deleted column to the first column
          const firstColumnId = state.columns[0]?.id
          if (!firstColumnId) return state

          return {
            columns: state.columns.filter((col) => col.id !== id),
            tasks: state.tasks.map((task) =>
              task.columnId === id
                ? { ...task, columnId: firstColumnId }
                : task
            ),
          }
        }),

      reorderColumns: (sourceIdx, destIdx) =>
        set((state) => {
          const newColumns = [...state.columns]
          const [removed] = newColumns.splice(sourceIdx, 1)
          newColumns.splice(destIdx, 0, removed)

          // Update order property
          return {
            columns: newColumns.map((col, idx) => ({
              ...col,
              order: idx,
            })),
          }
        }),

      // Task operations
      addTask: (task) =>
        set((state) => {
          // Calculate next order for this column
          const columnTasks = state.tasks.filter(
            (t) => t.columnId === task.columnId
          )
          const nextOrder =
            columnTasks.length > 0
              ? Math.max(...columnTasks.map((t) => t.order)) + 1
              : 0

          return {
            tasks: [
              ...state.tasks,
              {
                ...task,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                order: nextOrder,
              },
            ],
          }
        }),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      moveTask: (taskId, targetColumnId, newOrder) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId)
          if (!task) return state

          const oldColumnId = task.columnId
          const targetTasks = state.tasks.filter(
            (t) => t.columnId === targetColumnId && t.id !== taskId
          )

          // Insert task at new position
          targetTasks.splice(newOrder, 0, { ...task, columnId: targetColumnId })

          // Reorder tasks in target column
          const reorderedTargetTasks = targetTasks.map((t, idx) => ({
            ...t,
            order: idx,
          }))

          // Reorder tasks in old column if different
          let reorderedOldTasks: Task[] = []
          if (oldColumnId !== targetColumnId) {
            const oldTasks = state.tasks
              .filter((t) => t.columnId === oldColumnId && t.id !== taskId)
              .sort((a, b) => a.order - b.order)
            reorderedOldTasks = oldTasks.map((t, idx) => ({
              ...t,
              order: idx,
            }))
          }

          // Merge all tasks
          const otherTasks = state.tasks.filter(
            (t) =>
              t.columnId !== targetColumnId &&
              t.columnId !== oldColumnId &&
              t.id !== taskId
          )

          return {
            tasks: [...reorderedTargetTasks, ...reorderedOldTasks, ...otherTasks],
          }
        }),

      // Strategic Analysis operations (Step 1)
      setTaskStrategyGenerating: (taskId, isGenerating) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  strategicAnalysis: {
                    ...(task.strategicAnalysis || {
                      category: '',
                      depth: 'medium',
                      totalQuestions: 0,
                      categories: [],
                      strategyPreview: {
                        prompt: '',
                        promptLength: 0,
                        estimatedTokens: 0
                      },
                      skillPrinciples: [],
                      generatedAt: ''
                    }),
                    isGenerating,
                  },
                }
              : task
          ),
        })),

      setTaskStrategy: (taskId, strategy) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  strategicAnalysis: strategy,
                }
              : task
          ),
        })),

      // AI Research operations (Step 2)
      setTaskResearchLoading: (taskId, isLoading) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  aiResearch: {
                    ...(task.aiResearch || {
                      finalPrompt: '',
                      backstory: {
                        unique_differentiators: [],
                        emotional_angles: [],
                        audience_pain_points: [],
                        seo_keywords: [],
                        trust_builders: [],
                      },
                      researchedAt: '',
                    }),
                    isLoading,
                  },
                }
              : task
          ),
        })),

      setTaskResearch: (taskId, research) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  aiResearch: research,
                }
              : task
          ),
        })),

      // Copy Generation operations
      setTaskCopyGenerating: (taskId, isGenerating) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  copyGeneration: {
                    ...(task.copyGeneration || {}),
                    isGenerating,
                  },
                }
              : task
          ),
        })),

      setTaskCopyVariations: (taskId, variations, metadata, currentIteration, iterationHistory) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  copyGeneration: {
                    ...(task.copyGeneration || {}),
                    variations,
                    metadata,
                    isGenerating: false,
                    generatedAt: new Date().toISOString(),
                    currentIteration: currentIteration || task.copyGeneration?.currentIteration || 1,
                    iterationHistory: iterationHistory || task.copyGeneration?.iterationHistory || [],
                  },
                }
              : task
          ),
        })),

      clearTaskCopyVariations: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  copyGeneration: undefined,
                }
              : task
          ),
        })),

      // Iteration & Refinement operations
      addIterationRecord: (taskId, iterationRecord) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  copyGeneration: {
                    ...(task.copyGeneration || {}),
                    iterationHistory: [
                      ...(task.copyGeneration?.iterationHistory || []),
                      iterationRecord,
                    ],
                    currentIteration: iterationRecord.iterationNumber,
                  },
                }
              : task
          ),
        })),

      setTaskNeedsRefinement: (taskId, needsRefinement) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  copyGeneration: {
                    ...(task.copyGeneration || {}),
                    needsRefinement,
                  },
                }
              : task
          ),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Important for Next.js SSR
    }
  )
)
