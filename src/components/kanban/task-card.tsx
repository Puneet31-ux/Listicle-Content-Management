'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { Task } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PRIORITY_COLORS, AVATAR_COLORS } from '@/lib/constants'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onResearch: (task: Task) => void
  onBraveSearch?: (task: Task) => void
  onWarpSkill?: (task: Task) => void
}

export function TaskCard({ task, onEdit, onResearch, onBraveSearch, onWarpSkill }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    onEdit(task)
  }

  const priority = task.priority || 'normal'
  const priorityColors = PRIORITY_COLORS[priority]

  // Generate a consistent color for the assignee based on their initials
  const getAvatarColor = (initials?: string) => {
    if (!initials) return AVATAR_COLORS[0]
    const index = initials.charCodeAt(0) % AVATAR_COLORS.length
    return AVATAR_COLORS[index]
  }

  const avatarColor = getAvatarColor(task.assignee)

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={cn(
        'group bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer mb-3',
        'border border-gray-300 overflow-hidden',
        'w-full shadow-sm hover:shadow-lg hover:bg-white',
        'border-l-4',
        isDragging && 'opacity-50 shadow-2xl scale-105 rotate-2',
        priority === 'high' && 'border-l-red-500',
        priority === 'normal' && 'border-l-blue-500',
        priority === 'low' && 'border-l-gray-400'
      )}
      onClick={handleCardClick}
      {...attributes}
      {...listeners}
    >
      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          {/* Avatar Circle */}
          <div
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm',
              avatarColor
            )}
          >
            {task.assignee || task.title.substring(0, 2).toUpperCase()}
          </div>

          {/* Research Buttons */}
          <div className="flex flex-col gap-1.5">
            {/* AI Research Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onResearch(task)
              }}
              disabled={task.aiResearch?.isLoading}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200',
                task.aiResearch?.isLoading
                  ? 'bg-indigo-100 text-indigo-700 cursor-wait'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.02] shadow-sm hover:shadow-md'
              )}
              title="AI Research (requires OpenAI)"
            >
              {task.aiResearch?.isLoading ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Researching...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>AI Research</span>
                </>
              )}
            </button>

            {/* Brave Results Button */}
            {onBraveSearch && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onBraveSearch(task)
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:scale-[1.02] shadow-sm hover:shadow-md"
                title="Brave Search Results"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Brave Results</span>
              </button>
            )}

            {/* WARP Skill Button - Analyze Offer */}
            {onWarpSkill && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onWarpSkill(task)
                }}
                disabled={task.warpSkill?.isLoading}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200',
                  task.warpSkill?.isLoading
                    ? 'bg-purple-100 text-purple-700 cursor-wait'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 hover:scale-[1.02] shadow-sm hover:shadow-md'
                )}
                title="Analyze Offer with WARP Skill"
              >
                {task.warpSkill?.isLoading ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span>Analyze Offer</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Task Title */}
        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">
          {task.title}
        </h4>

        {/* Priority Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={cn(
              'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
              priorityColors.bg,
              priorityColors.text
            )}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>

        {/* Description Preview */}
        {task.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Bottom Section - Icons and Indicators */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {/* Attachments/Notes Icon */}
            {task.description && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            )}

            {/* AI Research Indicator */}
            {task.aiResearch && !task.aiResearch.isLoading && (
              <div className="flex items-center gap-1 text-primary-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}

            {/* Phone Icon */}
            <button
              className="hover:text-gray-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                alert('Phone action')
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>

            {/* Email Icon */}
            <button
              className="hover:text-gray-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                alert('Email action')
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
