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
  const [braveInput, setBraveInput] = useState('')
  const [sourceUrls, setSourceUrls] = useState('')
  const [selectedColumnId, setSelectedColumnId] = useState('')
  const [priority, setPriority] = useState<'low' | 'normal' | 'high'>('normal')
  const [researchDepth, setResearchDepth] = useState<'surface' | 'medium' | 'deep'>('medium')
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
      setBraveInput(task.braveInput || '')
      setSourceUrls(task.sourceUrls?.join('\n') || '')
      setSelectedColumnId(task.columnId)
      setPriority(task.priority || 'normal')
      setResearchDepth(task.researchDepth || 'medium')
      setAssignee(task.assignee || '')
    } else if (columnId) {
      setTitle('')
      setDescription('')
      setBraveInput('')
      setSourceUrls('')
      setSelectedColumnId(columnId)
      setPriority('normal')
      setResearchDepth('medium')
      setAssignee('')
    }
  }, [task, columnId, open])

  const handleSave = () => {
    if (!title.trim()) return

    // Parse source URLs (split by newline, filter empty lines, trim each)
    const parsedSourceUrls = sourceUrls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0)

    if (task) {
      updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
        braveInput: braveInput.trim() || undefined,
        sourceUrls: parsedSourceUrls.length > 0 ? parsedSourceUrls : undefined,
        columnId: selectedColumnId,
        priority,
        researchDepth,
        assignee: assignee.trim() || undefined,
      })
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        braveInput: braveInput.trim() || undefined,
        sourceUrls: parsedSourceUrls.length > 0 ? parsedSourceUrls : undefined,
        columnId: selectedColumnId,
        priority,
        researchDepth,
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

  // Get selected column to use its color
  const selectedColumn = columns.find((col) => col.id === selectedColumnId)
  const accentColor = selectedColumn?.color || '#3b82f6'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden flex flex-col p-0 gap-0 border"
        style={{
          width: '380px',
          maxWidth: '90%',
          maxHeight: '85vh',
          backgroundColor: '#f5f5f7',
          color: '#1f2937',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Clean Header */}
        <div className="px-5 py-4 border-b border-gray-300">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {task ? 'Edit Task' : 'New Task'}
          </DialogTitle>
        </div>

        <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Title <span className="text-indigo-600">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              autoFocus
              className="h-9 text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          {/* Column */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Column
            </label>
            <select
              value={selectedColumnId}
              onChange={(e) => setSelectedColumnId(e.target.value)}
              className="w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          {/* Two Column Layout: Priority + Assignee */}
          <div className="grid grid-cols-2 gap-3">
            {/* Priority */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'normal' | 'high')}
                className="w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Assignee */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700">
                Assignee
              </label>
              <Input
                value={assignee}
                onChange={(e) => setAssignee(e.target.value.toUpperCase().slice(0, 3))}
                placeholder="e.g., JD"
                maxLength={3}
                className="h-9 text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </div>

          {/* Research Depth */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Research Depth
              <span className="ml-1 text-xs font-normal text-gray-500">(controls API usage)</span>
            </label>
            <select
              value={researchDepth}
              onChange={(e) => setResearchDepth(e.target.value as 'surface' | 'medium' | 'deep')}
              className="w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            >
              <option value="surface">Surface - Quick Brave Search only</option>
              <option value="medium">Medium - Brave + Bright Data (if URLs)</option>
              <option value="deep">Deep - Full scraping + analysis</option>
            </select>
            <p className="text-xs text-gray-500">
              Higher depth = more API calls, better insights
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task description (optional)..."
              rows={3}
              className="text-sm resize-none bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          {/* Brave Search Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Brave Search Query
              <span className="ml-1 text-xs font-normal text-gray-500">(for finding relevant articles)</span>
            </label>
            <Textarea
              value={braveInput}
              onChange={(e) => setBraveInput(e.target.value)}
              placeholder="e.g., 'recent listicles about debt relief programs 2024' or 'best credit card debt consolidation articles'"
              rows={2}
              className="text-sm resize-none bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
            <p className="text-xs text-gray-500">
              Specify what you want to find. The more specific, the better the results.
            </p>
          </div>

          {/* Source URLs for Deep Scraping */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
              Source URLs
              <span className="ml-1 text-xs font-normal text-indigo-600">(💡 PRIORITY: Scraped first!)</span>
            </label>

            {/* Info Box - Dual API Reminder */}
            {!sourceUrls.trim() && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-lg p-3 mb-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xs text-indigo-900">
                    <p className="font-semibold mb-1">💡 Pro Tip: Add URLs for better research</p>
                    <ul className="space-y-0.5 text-indigo-800">
                      <li>• <strong>With URLs:</strong> Get exact CTAs, T&Cs, and offer details</li>
                      <li>• <strong>Without URLs:</strong> Only surface-level headlines from Brave</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <Textarea
              value={sourceUrls}
              onChange={(e) => setSourceUrls(e.target.value)}
              placeholder="Enter URLs (one per line)&#10;https://example.com/article-1&#10;https://example.com/article-2"
              rows={3}
              className={cn(
                "text-sm resize-none bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 font-mono",
                !sourceUrls.trim() && "border-indigo-300 focus:border-indigo-500"
              )}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
            <p className="text-xs text-gray-600">
              <strong>Paste competitor URLs here.</strong> We'll extract their exact copy, CTAs, offers, and T&Cs for your research.
            </p>
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

                    {/* Targeting Angles */}
                    {task.aiResearch.backstory.targeting_angles && task.aiResearch.backstory.targeting_angles.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-indigo-700 mb-2">
                          🎯 Targeting Angles
                        </h5>
                        <ul className="list-disc list-inside space-y-1">
                          {task.aiResearch.backstory.targeting_angles.map(
                            (item, i) => (
                              <li key={i} className="text-xs text-indigo-600 font-medium">
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* CTA Strategies */}
                    {task.aiResearch.backstory.cta_strategies && task.aiResearch.backstory.cta_strategies.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-green-700 mb-2">
                          💬 CTA Strategies
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {task.aiResearch.backstory.cta_strategies.map((cta, i) => (
                            <Badge key={i} variant="default" className="text-xs bg-green-100 text-green-800 border-green-300">
                              {cta}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clean Footer */}
        <div className="px-5 py-3 border-t border-gray-300 flex items-center justify-between gap-2" style={{ backgroundColor: '#ececee' }}>
          {task && (
            <button
              onClick={handleDelete}
              className="text-xs font-medium text-red-600 hover:text-red-700 px-4 py-1.5 border border-red-400 rounded-lg transition-colors hover:bg-red-50"
            >
              Delete
            </button>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {!task && (
              <DialogClose asChild>
                <button className="text-xs font-medium text-gray-700 hover:text-gray-900 px-4 py-1.5 border border-gray-400 rounded-lg transition-colors hover:bg-gray-100">
                  Cancel
                </button>
              </DialogClose>
            )}
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="text-xs font-semibold text-white px-5 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{
                backgroundColor: title.trim() ? '#4F46E5' : '#9ca3af',
              }}
            >
              {task ? 'Save' : 'Create'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
