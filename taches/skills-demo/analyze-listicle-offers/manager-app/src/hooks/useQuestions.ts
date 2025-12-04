import { useCallback } from 'react';
import { useProjectStore } from '../stores/projectStore';
import { updateQuestion, createQuestion, createQuestions } from '../lib/db';
import type { Question } from '../types';

/**
 * Hook for managing questions
 */
export function useQuestions() {
  const { questions, refreshCurrentProject } = useProjectStore();

  const updateQuestionAnswer = useCallback(async (
    questionId: string,
    answer: string,
    answered: boolean = true
  ) => {
    await updateQuestion(questionId, {
      answer,
      answered,
      answeredAt: answered ? new Date() : undefined
    });
    await refreshCurrentProject();
  }, [refreshCurrentProject]);

  const toggleQuestionAnswered = useCallback(async (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      await updateQuestion(questionId, {
        answered: !question.answered,
        answeredAt: !question.answered ? new Date() : undefined
      });
      await refreshCurrentProject();
    }
  }, [questions, refreshCurrentProject]);

  const addQuestion = useCallback(async (question: Omit<Question, 'id'>) => {
    await createQuestion(question);
    await refreshCurrentProject();
  }, [refreshCurrentProject]);

  const addQuestions = useCallback(async (newQuestions: Omit<Question, 'id'>[]) => {
    await createQuestions(newQuestions);
    await refreshCurrentProject();
  }, [refreshCurrentProject]);

  // Group questions by section
  const questionsBySection = questions.reduce((acc, question) => {
    if (!acc[question.categorySection]) {
      acc[question.categorySection] = [];
    }
    acc[question.categorySection].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  // Get section progress
  const getSectionProgress = useCallback((sectionName: string) => {
    const sectionQuestions = questionsBySection[sectionName] || [];
    const answered = sectionQuestions.filter(q => q.answered).length;
    const total = sectionQuestions.length;
    const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

    return { answered, total, percentage };
  }, [questionsBySection]);

  return {
    questions,
    questionsBySection,
    updateQuestionAnswer,
    toggleQuestionAnswered,
    addQuestion,
    addQuestions,
    getSectionProgress
  };
}
