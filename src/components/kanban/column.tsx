'use client'

import React, { useMemo } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnType, Task } from '@/lib/types'
import { TaskCard } from './task-card'
import { Button } from '@/components/ui/button'
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
  onResearchTask: (task: Task) => void
  onEditColumn: (column: ColumnType) => void
}

export function Column({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onResearchTask,
  onEditColumn,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  })

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order)

  // Memoize light background color for performance
  const lightBg = useMemo(() => getLightBackground(column.color || '#3b82f6'), [column.color])

  return (
    <div className="flex-shrink-0 w-80 md:w-96">
      <div className="flex flex-col h-full">
        {/* Column Header - Colorful */}
        <div
          className={cn(
            'rounded-t-lg px-4 py-3 flex items-center justify-between shadow-sm'
          )}
          style={{
            backgroundColor: column.color || '#3b82f6',
          }}
        >
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
                  onResearch={onResearchTask}
                />
              ))}
            </SortableContext>

            {/* Empty state */}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg bg-white/50">
                <svg
                  className="w-12 h-12 text-gray-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm text-gray-400 font-medium">No tasks yet</p>
                <p className="text-xs text-gray-400 mt-1">Add a task to get started</p>
              </div>
            )}
          </div>

          {/* Add Task Button - Sticky at bottom */}
          <div className="p-3 border-t border-white/30" style={{ backgroundColor: lightBg }}>
            <Button
              variant="ghost"
              className="w-full justify-start hover:scale-[1.01] transition-transform h-10 px-4 text-sm"
              style={{
                color: column.color,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
              onMouseEnter={(e) => {
                const rgb = hexToRgb(column.color || '#3b82f6')
                if (rgb) {
                  e.currentTarget.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
              }}
              onClick={() => onAddTask(column.id)}
            >
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
              Add task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
