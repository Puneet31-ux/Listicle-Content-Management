'use client'

import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useKanbanStore } from '@/store/kanban-store'
import { Task } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  columnId?: string
}

export function TaskDialog({
  open,
  onOpenChange,
  task,
  columnId,
}: TaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedColumnId, setSelectedColumnId] = useState('')
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal')
  const [assignee, setAssignee] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [expandedBackstory, setExpandedBackstory] = useState(false)

  const columns = useKanbanStore((state) => state.columns)
  const addTask = useKanbanStore((state) => state.addTask)
  const updateTask = useKanbanStore((state) => state.updateTask)
  const deleteTask = useKanbanStore((state) => state.deleteTask)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setSelectedColumnId(task.columnId)
      setPriority(task.priority || 'normal')
      setAssignee(task.assignee || '')
    } else if (columnId) {
      setTitle('')
      setDescription('')
      setSelectedColumnId(columnId)
      setPriority('normal')
      setAssignee('')
    }
  }, [task, columnId, open])

  const handleSave = () => {
    if (!title.trim()) return

    if (task) {
      updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
        columnId: selectedColumnId,
        priority,
        assignee: assignee.trim() || undefined,
      })
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        columnId: selectedColumnId,
        priority,
        assignee: assignee.trim() || undefined,
        order: 0,
      })
    }

    onOpenChange(false)
  }

  const handleDelete = () => {
    if (task && confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id)
      onOpenChange(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-danger-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              autoFocus
            />
          </div>

          {/* Column */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Column
            </label>
            <select
              value={selectedColumnId}
              onChange={(e) => setSelectedColumnId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          {/* Priority and Assignee Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'normal' | 'high')}
                className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Assignee */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Assignee (2-3 letters)
              </label>
              <Input
                value={assignee}
                onChange={(e) => setAssignee(e.target.value.toUpperCase().slice(0, 3))}
                placeholder="e.g., JD"
                maxLength={3}
              />
            </div>
          </div>

          {/* Description with Preview Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Description (Markdown supported)
              </label>
              <Button
                variant="ghost"
                onClick={() => setShowPreview(!showPreview)}
                className="h-10 px-4 text-sm"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>

            {showPreview ? (
              <div className="w-full min-h-[200px] px-4 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg prose prose-sm max-w-none">
                {description ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-400">No description yet</p>
                )}
              </div>
            ) : (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (supports markdown)..."
                rows={8}
              />
            )}
          </div>

          {/* AI Research Display */}
          {task?.aiResearch && !task.aiResearch.isLoading && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  AI Research Results
                </h4>
                <Badge variant="success">
                  Researched on{' '}
                  {new Date(task.aiResearch.researchedAt).toLocaleDateString()}
                </Badge>
              </div>

              {/* Final Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Final Prompt
                  </label>
                  <Button
                    variant="ghost"
                    onClick={() => copyToClipboard(task.aiResearch!.finalPrompt)}
                    className="h-10 px-4 text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 max-h-48 overflow-y-auto">
                  {task.aiResearch.finalPrompt}
                </div>
              </div>

              {/* Backstory */}
              <div className="space-y-2">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedBackstory(!expandedBackstory)}
                >
                  <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                    Research Backstory
                  </label>
                  <svg
                    className={cn(
                      'w-5 h-5 text-gray-500 transition-transform',
                      expandedBackstory && 'transform rotate-180'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {expandedBackstory && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
                    {/* Unique Differentiators */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">
                        Unique Differentiators
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {task.aiResearch.backstory.unique_differentiators.map(
                          (item, i) => (
                            <li key={i} className="text-xs text-gray-600">
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Emotional Angles */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">
                        Emotional Angles
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {task.aiResearch.backstory.emotional_angles.map(
                          (item, i) => (
                            <li key={i} className="text-xs text-gray-600">
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Audience Pain Points */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">
                        Audience Pain Points
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {task.aiResearch.backstory.audience_pain_points.map(
                          (item, i) => (
                            <li key={i} className="text-xs text-gray-600">
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* SEO Keywords */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">
                        SEO Keywords
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {task.aiResearch.backstory.seo_keywords.map((keyword, i) => (
                          <Badge key={i} variant="default" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Trust Builders */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">
                        Trust Builders
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {task.aiResearch.backstory.trust_builders.map(
                          (item, i) => (
                            <li key={i} className="text-xs text-gray-600">
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {task && (
            <Button variant="danger" onClick={handleDelete} className="mr-auto h-10 px-4 text-sm">
              Delete
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="secondary" className="h-10 px-4 text-sm">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!title.trim()} className="h-10 px-4 text-sm">
            {task ? 'Save Changes' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
