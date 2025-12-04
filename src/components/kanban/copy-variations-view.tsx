'use client'

import React, { useState } from 'react'
import { CopyVariation, CopyGenerationMetadata } from '@/lib/types'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

interface CopyVariationsViewProps {
  variations?: CopyVariation[]
  metadata?: CopyGenerationMetadata
}

export function CopyVariationsView({ variations, metadata }: CopyVariationsViewProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  if (!variations || variations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-lg font-medium">No copy variations generated yet</p>
        <p className="text-sm mt-2">Complete the analysis and click "Generate Copy Variations"</p>
      </div>
    )
  }

  const currentVariation = variations[activeTab]

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(label)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Metadata Summary */}
      {metadata && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-blue-900 mb-2">Generation Context</h3>
          <div className="text-xs text-blue-800 space-y-1">
            <p><strong>Category:</strong> {metadata.category || 'Not specified'}</p>
            <p><strong>Generated:</strong> {new Date(metadata.generatedAt).toLocaleString()}</p>
            {metadata.researchSummary && (
              <p><strong>Research:</strong> {metadata.researchSummary}</p>
            )}
            {metadata.conversationContext && (
              <p><strong>Context:</strong> {metadata.conversationContext}</p>
            )}
          </div>
        </div>
      )}

      {/* Variation Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {variations.map((variation, index) => (
          <button
            key={variation.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === index
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            Variation {index + 1}
          </button>
        ))}
      </div>

      {/* Current Variation Content */}
      <div className="space-y-6 pb-4">
        {/* Strategic Approach */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm text-purple-900">Strategic Approach</h3>
            <CopyButton
              onClick={() => copyToClipboard(currentVariation.strategicApproach, 'Strategic Approach')}
              copied={copiedSection === 'Strategic Approach'}
              color="purple"
            />
          </div>
          <p className="text-sm text-purple-800 mb-3">{currentVariation.strategicApproach}</p>
          <div className="flex flex-wrap gap-2 text-xs text-purple-700">
            <span className="bg-purple-100 px-2 py-1 rounded">Best for: {currentVariation.bestFor}</span>
            <span className="bg-purple-100 px-2 py-1 rounded">Emotional: {currentVariation.emotionalTemperature}</span>
            <span className="bg-purple-100 px-2 py-1 rounded">Density: {currentVariation.informationDensity}</span>
            <span className="bg-purple-100 px-2 py-1 rounded">CTA: {currentVariation.ctaType}</span>
          </div>
        </div>

        {/* Headline */}
        <CopySection
          title="Headline"
          content={currentVariation.headline}
          onCopy={() => copyToClipboard(currentVariation.headline, 'Headline')}
          copied={copiedSection === 'Headline'}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
          textSize="text-lg font-bold"
        />

        {/* Subheadline */}
        <CopySection
          title="Subheadline"
          content={currentVariation.subheadline}
          onCopy={() => copyToClipboard(currentVariation.subheadline, 'Subheadline')}
          copied={copiedSection === 'Subheadline'}
          className="bg-gray-50 border-gray-200"
          textSize="text-base font-semibold"
        />

        {/* Opening Hook */}
        <CopySection
          title="Opening Hook"
          content={currentVariation.openingHook}
          onCopy={() => copyToClipboard(currentVariation.openingHook, 'Opening Hook')}
          copied={copiedSection === 'Opening Hook'}
          className="bg-gray-50 border-gray-200"
        />

        {/* Body Copy */}
        <CopySection
          title="Body Copy"
          content={currentVariation.bodyCopy}
          onCopy={() => copyToClipboard(currentVariation.bodyCopy, 'Body Copy')}
          copied={copiedSection === 'Body Copy'}
          markdown
          className="bg-white border-gray-200"
        />

        {/* Value Articulation */}
        <CopySection
          title="Value Articulation"
          content={currentVariation.valueArticulation}
          onCopy={() => copyToClipboard(currentVariation.valueArticulation, 'Value Articulation')}
          copied={copiedSection === 'Value Articulation'}
          className="bg-green-50 border-green-200"
        />

        {/* Qualification Language */}
        <CopySection
          title="Qualification Language"
          content={currentVariation.qualificationLanguage}
          onCopy={() => copyToClipboard(currentVariation.qualificationLanguage, 'Qualification Language')}
          copied={copiedSection === 'Qualification Language'}
          className="bg-blue-50 border-blue-200"
        />

        {/* Social Proof */}
        <CopySection
          title="Social Proof Element"
          content={currentVariation.socialProofElement}
          onCopy={() => copyToClipboard(currentVariation.socialProofElement, 'Social Proof')}
          copied={copiedSection === 'Social Proof'}
          className="bg-yellow-50 border-yellow-200"
        />

        {/* CTA Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-sm text-green-900">CTA Section</h3>
            <CopyButton
              onClick={() => copyToClipboard(
                `Interactive Element:\n${currentVariation.ctaSection.interactiveElement}\n\nButton Text:\n${currentVariation.ctaSection.buttonText}\n\nRisk Reversal:\n${currentVariation.ctaSection.riskReversal}`,
                'CTA Section'
              )}
              copied={copiedSection === 'CTA Section'}
              color="green"
            />
          </div>
          <div className="space-y-3 text-sm text-green-800">
            <div>
              <strong className="block mb-1">Interactive Element:</strong>
              <p className="whitespace-pre-wrap">{currentVariation.ctaSection.interactiveElement}</p>
            </div>
            <div>
              <strong className="block mb-1">Button Text:</strong>
              <div className="bg-green-600 text-white px-6 py-3 rounded-lg inline-block font-medium text-center">
                {currentVariation.ctaSection.buttonText}
              </div>
            </div>
            <div>
              <strong className="block mb-1">Risk Reversal:</strong>
              <p className="text-xs italic">{currentVariation.ctaSection.riskReversal}</p>
            </div>
          </div>
        </div>

        {/* Rationale */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm text-gray-900">Why This Variation Works</h3>
            <CopyButton
              onClick={() => copyToClipboard(currentVariation.rationale, 'Rationale')}
              copied={copiedSection === 'Rationale'}
              color="gray"
            />
          </div>
          <p className="text-sm text-gray-700">{currentVariation.rationale}</p>
        </div>
      </div>
    </div>
  )
}

// Helper Components
interface CopyButtonProps {
  onClick: () => void
  copied: boolean
  color?: 'purple' | 'green' | 'gray'
}

function CopyButton({ onClick, copied, color = 'gray' }: CopyButtonProps) {
  const colorClasses = {
    purple: 'text-purple-600 hover:text-purple-800',
    green: 'text-green-600 hover:text-green-800',
    gray: 'text-gray-600 hover:text-gray-900',
  }

  return (
    <button
      onClick={onClick}
      className={`transition-colors ${colorClasses[color]}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  )
}

interface CopySectionProps {
  title: string
  content: string
  onCopy: () => void
  copied: boolean
  markdown?: boolean
  className?: string
  textSize?: string
}

function CopySection({
  title,
  content,
  onCopy,
  copied,
  markdown = false,
  className = 'bg-gray-50 border-gray-200',
  textSize = 'text-sm'
}: CopySectionProps) {
  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
        <CopyButton onClick={onCopy} copied={copied} />
      </div>
      {markdown ? (
        <div className={`prose prose-sm max-w-none ${textSize}`}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <p className={`text-gray-700 whitespace-pre-wrap ${textSize}`}>{content}</p>
      )}
    </div>
  )
}
