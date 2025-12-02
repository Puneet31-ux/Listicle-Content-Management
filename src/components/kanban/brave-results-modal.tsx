'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

interface BraveResult {
  title: string
  url: string
  description: string
  extraSnippets?: string[]
  deepResults?: Array<{ title: string; description: string }>
}

interface BraveResultsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskTitle: string
  results: BraveResult[]
  keywords?: string[]
  isLoading?: boolean
  searchQuery?: string
}

export function BraveResultsModal({
  open,
  onOpenChange,
  taskTitle,
  results,
  keywords = [],
  isLoading = false,
  searchQuery,
}: BraveResultsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden flex flex-col p-0 gap-0"
        style={{
          width: '550px',
          maxWidth: '95%',
          maxHeight: '85vh',
          backgroundColor: '#f9fafb',
          color: '#111',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-300 bg-white">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Brave Search Results
          </DialogTitle>
          <p className="text-xs text-gray-600 mt-1">{taskTitle}</p>
          {searchQuery && searchQuery !== taskTitle && (
            <p className="text-xs text-indigo-600 mt-1.5 italic">
              Search: "{searchQuery}"
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="w-8 h-8 animate-spin text-indigo-600"
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
                <p className="text-sm text-gray-600">Searching Brave...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Top Results */}
              {results.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Top {Math.min(5, results.length)} Results
                  </h3>
                  {results.slice(0, 5).map((result, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:border-indigo-300 transition-colors"
                    >
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h4 className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 mb-1">
                          {result.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {result.description}
                        </p>

                        {/* Display extra content snippets */}
                        {result.extraSnippets && result.extraSnippets.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-100 space-y-1.5">
                            <p className="text-xs font-semibold text-gray-700">Content Excerpts:</p>
                            {result.extraSnippets.slice(0, 3).map((snippet, snippetIdx) => (
                              <div key={snippetIdx} className="bg-indigo-50 border-l-2 border-indigo-400 pl-2 py-1">
                                <p className="text-xs text-gray-700 italic">"{snippet}"</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Display deep results if available */}
                        {result.deepResults && result.deepResults.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                            <p className="text-xs font-semibold text-gray-700">Related Sections:</p>
                            {result.deepResults.slice(0, 2).map((deep, deepIdx) => (
                              <div key={deepIdx} className="bg-blue-50 pl-2 py-1">
                                <p className="text-xs font-medium text-blue-700">{deep.title}</p>
                                <p className="text-xs text-gray-600 line-clamp-1">{deep.description}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-gray-400 truncate mt-2">
                          {result.url}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">No results found</p>
                </div>
              )}

              {/* Keywords */}
              {keywords.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Related Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-300 bg-white flex justify-end">
          <DialogClose asChild>
            <button className="text-xs font-medium text-gray-700 hover:text-gray-900 px-4 py-2 border border-gray-400 rounded-lg transition-colors hover:bg-gray-50">
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
