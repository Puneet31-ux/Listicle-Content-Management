import { useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import { QuestionSection } from './QuestionSection';
import { Input } from '../ui/Input';

export function QuestionView() {
  const { questionsBySection } = useQuestions();
  const [searchQuery, setSearchQuery] = useState('');

  const sectionNames = Object.keys(questionsBySection);

  const filteredSections = searchQuery
    ? sectionNames.reduce((acc, sectionName) => {
        const questions = questionsBySection[sectionName].filter(
          q =>
            q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        if (questions.length > 0) {
          acc[sectionName] = questions;
        }
        return acc;
      }, {} as typeof questionsBySection)
    : questionsBySection;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <Input
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.keys(filteredSections).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? 'No questions match your search' : 'No questions yet'}
          </div>
        ) : (
          Object.entries(filteredSections).map(([sectionName, questions]) => (
            <QuestionSection
              key={sectionName}
              sectionName={sectionName}
              questions={questions}
            />
          ))
        )}
      </div>
    </div>
  );
}
