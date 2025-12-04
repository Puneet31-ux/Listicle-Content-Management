import { useState } from 'react';
import type { Question } from '../../types';
import { QuestionItem } from './QuestionItem';
import { useQuestions } from '../../hooks/useQuestions';
import { cn } from '../../lib/utils';

interface QuestionSectionProps {
  sectionName: string;
  questions: Question[];
}

export function QuestionSection({ sectionName, questions }: QuestionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { getSectionProgress } = useQuestions();

  const progress = getSectionProgress(sectionName);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg
            className={cn('w-5 h-5 transition-transform', isExpanded && 'rotate-90')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h3 className="font-semibold text-left">{sectionName}</h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {progress.answered}/{progress.total} ({progress.percentage}%)
          </span>
          {progress.percentage === 100 && (
            <span className="text-green-600">✓</span>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {questions
            .sort((a, b) => a.number - b.number)
            .map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
        </div>
      )}
    </div>
  );
}
