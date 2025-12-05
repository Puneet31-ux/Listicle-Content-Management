'use client'

import React, { useMemo } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnType, Task } from '@/lib/types'
import { TaskCard } from './task-card'
import { cn } from '@/lib/utils'

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// Helper function to get light background tint
function getLightBackground(color: string): string {
  const rgb = hexToRgb(color)
  if (!rgb) return 'rgba(249, 250, 251, 1)' // fallback to gray-50
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`
}

interface ColumnProps {
  column: ColumnType
  tasks: Task[]
  onAddTask: (columnId: string) => void
  onEditTask: (task: Task) => void
  onGenerateStrategy: (task: Task) => void
  onResearchTask: (task: Task) => void
  onBraveSearch?: (task: Task) => void
  onGenerateCopy?: (task: Task, passLevel: 'draft' | 'ai-removal' | 'polish') => void
  onViewCopy?: (task: Task) => void
  onEditColumn: (column: ColumnType) => void
}

export function Column({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onGenerateStrategy,
  onResearchTask,
  onBraveSearch,
  onGenerateCopy,
  onViewCopy,
  onEditColumn,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order)

  // Memoize light background color for performance
  const lightBg = useMemo(() => getLightBackground(column.color || '#3b82f6'), [column.color])

  return (
    <div className="flex-shrink-0 w-[300px]">
      <div className="flex flex-col h-full">
        {/* Column Header - Colorful */}
        <div
          className={cn(
            'rounded-t-lg px-4 py-3 shadow-sm'
          )}
          style={{
            backgroundColor: column.color || '#3b82f6',
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <h3
                className="text-sm font-semibold text-white"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
              >
                {column.title}
              </h3>
              <div className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-white/20 text-white">
                <span className="text-xs font-semibold">{tasks.length}</span>
              </div>
            </div>

            <button
              onClick={() => onEditColumn(column)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
            >
              <svg
                className="w-4 h-4 text-white/80 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>

          {/* Column Description */}
          {column.description && (
            <p className="text-xs text-white/90 leading-relaxed">
              {column.description}
            </p>
          )}
        </div>

        {/* Tasks Container */}
        <div
          className={cn(
            'rounded-b-lg flex-1 overflow-hidden flex flex-col transition-all duration-200',
            isOver && 'ring-2 ring-offset-2'
          )}
          style={{
            background: `linear-gradient(to bottom, ${lightBg}, ${lightBg})`,
            ...(isOver && { '--tw-ring-color': column.color } as React.CSSProperties),
          }}
        >
          <div
            ref={setNodeRef}
            className={cn(
              'flex-1 overflow-y-auto p-3 space-y-3 kanban-scrollbar relative',
              'min-h-[400px]'
            )}
          >
            {/* Drop indicator */}
            {isOver && (
              <div
                className="absolute top-2 left-3 right-3 px-4 py-2 rounded-lg text-sm font-medium text-center text-white z-10 animate-fadeIn"
                style={{
                  backgroundColor: column.color,
                  opacity: 0.9,
                }}
              >
                Drop task here
              </div>
            )}
            <SortableContext
              items={sortedTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {sortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onGenerateStrategy={onGenerateStrategy}
                  onResearch={onResearchTask}
                  onBraveSearch={onBraveSearch}
                  onGenerateCopy={onGenerateCopy}
                  onViewCopy={onViewCopy}
                />
              ))}
            </SortableContext>

            {/* Empty state */}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg bg-white/50 px-4"
                style={{ borderColor: `${column.color}40` }}
              >
                {column.id === 'todo' && (
                  <>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${column.color}20` }}
                    >
                      <svg
                        className="w-7 h-7"
                        style={{ color: column.color }}
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
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Start Your Research</p>
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      Click "Add Task" below to create your first listicle offer
                    </p>
                  </>
                )}
                {column.id === 'in-progress' && (
                  <>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${column.color}20` }}
                    >
                      <svg
                        className="w-7 h-7"
                        style={{ color: column.color }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Ready to Write</p>
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      Tasks with research will appear here for copywriting
                    </p>
                  </>
                )}
                {column.id === 'completed' && (
                  <>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${column.color}20` }}
                    >
                      <svg
                        className="w-7 h-7"
                        style={{ color: column.color }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">All Done!</p>
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      Finished copy will appear here
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Add Task Button - Sticky at bottom */}
          <div className="p-3 flex justify-center" style={{ backgroundColor: lightBg }}>
            <button
              className="flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{
                width: '140px',
                height: '36px',
                fontSize: '14px',
                color: 'white',
                backgroundColor: column.color || '#3b82f6',
              }}
              onClick={() => onAddTask(column.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
