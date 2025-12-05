'use client'

import React, { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { CopyVariation, IterationRecord } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CopyPreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  variations: CopyVariation[]
  iterationHistory?: IterationRecord[]
  currentIteration?: number
  taskTitle: string
  onRollback?: (iterationNumber: number) => void
}

export function CopyPreviewModal({
  open,
  onOpenChange,
  variations,
  iterationHistory = [],
  currentIteration = 1,
  taskTitle,
  onRollback,
}: CopyPreviewModalProps) {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [selectedIterationNumber, setSelectedIterationNumber] = useState(currentIteration)

  const selectedVariation = variations[selectedVariationIndex]

  // Get the selected iteration's variations
  const selectedIterationRecord = iterationHistory.find(i => i.iterationNumber === selectedIterationNumber)
  const displayVariations = selectedIterationRecord ? selectedIterationRecord.variations : variations
  const displayVariation = displayVariations[selectedVariationIndex] || selectedVariation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange(false)}>
        <div
          className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between border-b border-emerald-700">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">Copy Preview: {taskTitle}</h2>
              <p className="text-emerald-100 text-sm">
                {displayVariations.length} variation{displayVariations.length > 1 ? 's' : ''} • Version {selectedIterationNumber}
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={() => setViewMode('desktop')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  viewMode === 'desktop'
                    ? 'bg-white text-emerald-700'
                    : 'bg-emerald-500/30 text-white hover:bg-emerald-500/50'
                )}
              >
                <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  viewMode === 'mobile'
                    ? 'bg-white text-emerald-700'
                    : 'bg-emerald-500/30 text-white hover:bg-emerald-500/50'
                )}
              >
                <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile
              </button>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex h-[calc(90vh-80px)]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
              {/* Version History */}
              {iterationHistory.length > 0 && (
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase mb-2">Version History</h3>
                  <div className="space-y-1">
                    {iterationHistory.map((iteration) => (
                      <button
                        key={iteration.iterationNumber}
                        onClick={() => {
                          setSelectedIterationNumber(iteration.iterationNumber)
                          setSelectedVariationIndex(0)
                        }}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-xs transition-all',
                          selectedIterationNumber === iteration.iterationNumber
                            ? 'bg-emerald-100 text-emerald-800 font-medium'
                            : 'hover:bg-gray-100 text-gray-600'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>Version {iteration.iterationNumber}</span>
                          {iteration.iterationNumber === currentIteration && (
                            <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px]">LATEST</span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {new Date(iteration.generatedAt).toLocaleDateString()}
                        </div>
                        {iteration.evaluation && (
                          <div className="text-[10px] text-emerald-600 mt-1">
                            ⭐ Score: {iteration.evaluation.score}/10
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {onRollback && selectedIterationNumber !== currentIteration && (
                    <button
                      onClick={() => onRollback(selectedIterationNumber)}
                      className="w-full mt-2 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 transition-colors"
                    >
                      Rollback to Version {selectedIterationNumber}
                    </button>
                  )}
                </div>
              )}

              {/* Variations */}
              <div className="p-4">
                <h3 className="text-xs font-semibold text-gray-700 uppercase mb-2">Variations</h3>
                <div className="space-y-2">
                  {displayVariations.map((variation, idx) => (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariationIndex(idx)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg text-xs transition-all',
                        selectedVariationIndex === idx
                          ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500'
                          : 'bg-white border border-gray-200 hover:border-emerald-300'
                      )}
                    >
                      <div className="font-semibold mb-1">{variation.strategicApproach}</div>
                      <div className="text-gray-600 line-clamp-2">{variation.headline}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
              <div className="mx-auto" style={{ maxWidth: viewMode === 'mobile' ? '375px' : '800px' }}>
                {/* Listicle Preview */}
                <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Headline */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {displayVariation.headline}
                    </h1>
                    {displayVariation.subheadline && (
                      <h2 className="text-lg text-gray-600">
                        {displayVariation.subheadline}
                      </h2>
                    )}
                  </div>

                  {/* Opening Hook */}
                  {displayVariation.openingHook && (
                    <div className="p-6 border-b border-gray-200">
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {displayVariation.openingHook}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Body Copy */}
                  {displayVariation.bodyCopy && (
                    <div className="p-6 border-b border-gray-200">
                      <div className="prose max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {displayVariation.bodyCopy}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Value Articulation */}
                  {displayVariation.valueArticulation && (
                    <div className="p-6 bg-emerald-50 border-b border-emerald-100">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">Why This Works</h3>
                      <div className="prose max-w-none">
                        <p className="text-emerald-800 whitespace-pre-line">
                          {displayVariation.valueArticulation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Interactive Element */}
                  {displayVariation.ctaSection.interactiveElement && (
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-indigo-100">
                      <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
                        <p className="text-sm text-indigo-900 font-medium mb-2">
                          {displayVariation.ctaSection.interactiveElement}
                        </p>
                        <div className="flex items-center justify-center p-4 bg-indigo-50 rounded">
                          <span className="text-xs text-indigo-600">Interactive Element Preview</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Section */}
                  <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-600">
                    <div className="text-center">
                      <button className="px-8 py-3 bg-white text-emerald-700 font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        {displayVariation.ctaSection.buttonText}
                      </button>
                      {displayVariation.ctaSection.riskReversal && (
                        <p className="mt-3 text-white text-sm">
                          {displayVariation.ctaSection.riskReversal}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-gray-200 rounded">
                        {displayVariation.strategicApproach}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {displayVariation.emotionalTemperature} emotion
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {displayVariation.informationDensity} detail
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      <strong>Best For:</strong> {displayVariation.bestFor}
                    </div>
                    {displayVariation.rationale && (
                      <div className="mt-2 text-xs text-gray-600">
                        <strong>Rationale:</strong> {displayVariation.rationale}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
