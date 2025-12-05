'use client'

import React, { useState, useEffect } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { useKanbanStore } from '@/store/kanban-store'
import { Column } from './column'
import { TaskCard } from './task-card'
import { Task as TaskType, Column as ColumnType } from '@/lib/types'

interface BoardProps {
  onAddTask: (columnId: string) => void
  onEditTask: (task: TaskType) => void
  onGenerateStrategy: (task: TaskType) => void
  onResearchTask: (task: TaskType) => void
  onBraveSearch?: (task: TaskType) => void
  onGenerateCopy?: (task: TaskType, passLevel: 'draft' | 'ai-removal' | 'polish') => void
  onViewCopy?: (task: TaskType) => void
  onEditColumn: (column: ColumnType) => void
}

export function Board({
  onAddTask,
  onEditTask,
  onGenerateStrategy,
  onResearchTask,
  onBraveSearch,
  onGenerateCopy,
  onViewCopy,
  onEditColumn,
}: BoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  const columns = useKanbanStore((state) => state.columns)
  const tasks = useKanbanStore((state) => state.tasks)
  const moveTask = useKanbanStore((state) => state.moveTask)

  // Handle hydration
  useEffect(() => {
    useKanbanStore.persist.rehydrate()
    setIsHydrated(true)
  }, [])

  // Configure sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Prevents accidental drags
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the active task
    const activeTask = tasks.find((t) => t.id === activeId)
    if (!activeTask) return

    // Determine target column
    let targetColumnId: string | null = null

    // Check if over is a task
    const overTask = tasks.find((t) => t.id === overId)
    if (overTask) {
      targetColumnId = overTask.columnId
    } else {
      // Check if over is a column
      const overColumn = columns.find((c) => c.id === overId)
      if (overColumn) {
        targetColumnId = overColumn.id
      }
    }

    if (!targetColumnId || targetColumnId === activeTask.columnId) return

    // Calculate new order
    const targetTasks = tasks.filter((t) => t.columnId === targetColumnId && t.id !== activeId)
    const newOrder = overTask
      ? targetTasks.findIndex((t) => t.id === overTask.id)
      : targetTasks.length

    moveTask(activeId, targetColumnId, newOrder >= 0 ? newOrder : 0)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeTask = tasks.find((t) => t.id === activeId)
    if (!activeTask) return

    // Determine target column and position
    let targetColumnId: string | null = null
    let newOrder = 0

    const overTask = tasks.find((t) => t.id === overId)
    if (overTask) {
      targetColumnId = overTask.columnId
      const targetTasks = tasks.filter(
        (t) => t.columnId === targetColumnId && t.id !== activeId
      )
      newOrder = targetTasks.findIndex((t) => t.id === overTask.id)
      if (newOrder === -1) newOrder = 0
    } else {
      const overColumn = columns.find((c) => c.id === overId)
      if (overColumn) {
        targetColumnId = overColumn.id
        const targetTasks = tasks.filter((t) => t.columnId === targetColumnId)
        newOrder = targetTasks.length
      }
    }

    if (targetColumnId) {
      moveTask(activeId, targetColumnId, newOrder)
    }
  }

  if (!isHydrated) {
    return (
      <div className="flex gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 md:w-96 bg-gray-50 rounded-lg p-4 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
            <div className="space-y-3">
              <div className="h-32 bg-gray-200 rounded" />
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order)
  const activeTask = tasks.find((t) => t.id === activeId)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 kanban-scrollbar">
        {sortedColumns.map((column) => {
          const columnTasks = tasks.filter((t) => t.columnId === column.id)
          return (
            <Column
              key={column.id}
              column={column}
              tasks={columnTasks}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onGenerateStrategy={onGenerateStrategy}
              onResearchTask={onResearchTask}
              onBraveSearch={onBraveSearch}
              onGenerateCopy={onGenerateCopy}
              onViewCopy={onViewCopy}
              onEditColumn={onEditColumn}
            />
          )
        })}
      </div>

      <DragOverlay>
        {activeTask && (
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: 1.05,
              rotate: 8,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-lg transform scale-110" />

            {/* Actual card */}
            <div className="relative">
              <TaskCard task={activeTask} onEdit={() => {}} onGenerateStrategy={() => {}} onResearch={() => {}} />
            </div>
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
