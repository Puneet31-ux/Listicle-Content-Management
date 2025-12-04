import { useState, useCallback } from 'react';
import type { Question } from '../../types';
import { useQuestions } from '../../hooks/useQuestions';
import { Textarea } from '../ui/Textarea';
import { debounce, cn } from '../../lib/utils';

interface QuestionItemProps {
  question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
  const [isExpanded, setIsExpanded] = useState(question.answered);
  const [answer, setAnswer] = useState(question.answer || '');
  const { updateQuestionAnswer, toggleQuestionAnswered } = useQuestions();

  const debouncedSave = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        updateQuestionAnswer(question.id, value, true);
      }
    }, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id]
  );

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    debouncedSave(value);
  };

  const handleToggle = () => {
    if (!isExpanded && !question.answered) {
      setIsExpanded(true);
    } else if (isExpanded && question.answered) {
      toggleQuestionAnswered(question.id);
      setIsExpanded(false);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="p-4 bg-white">
      <button
        onClick={handleToggle}
        className="w-full flex items-start gap-3 text-left"
      >
        <div className="flex-shrink-0 mt-1">
          <div
            className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center',
              question.answered
                ? 'bg-green-600 border-green-600'
                : 'border-gray-300'
            )}
          >
            {question.answered && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium">
                {question.number}. {question.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                {question.questionText}
              </p>
            </div>
            <svg
              className={cn(
                'w-5 h-5 ml-2 flex-shrink-0 transition-transform',
                isExpanded && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3 ml-8">
          <Textarea
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            rows={4}
          />
          {answer && answer !== question.answer && (
            <p className="text-xs text-gray-500 mt-1">Saving...</p>
          )}
        </div>
      )}
    </div>
  );
}
