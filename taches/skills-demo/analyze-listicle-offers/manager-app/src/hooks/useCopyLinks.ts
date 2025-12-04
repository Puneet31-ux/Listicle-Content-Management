import { useCallback } from 'react';
import { useProjectStore } from '../stores/projectStore';
import { createCopyLink, updateCopyLink, deleteCopyLink } from '../lib/db';
import type { CopyLink } from '../types';

/**
 * Hook for managing copy links
 */
export function useCopyLinks() {
  const { copyLinks, questions, refreshCurrentProject } = useProjectStore();

  const addCopyLink = useCallback(async (copyLink: Omit<CopyLink, 'id'>) => {
    await createCopyLink(copyLink);
    await refreshCurrentProject();
  }, [refreshCurrentProject]);

  const updateCopy = useCallback(async (copyLinkId: string, updates: Partial<CopyLink>) => {
    await updateCopyLink(copyLinkId, updates);
    await refreshCurrentProject();
  }, [refreshCurrentProject]);

  const deleteCopy = useCallback(async (copyLinkId: string) => {
    await deleteCopyLink(copyLinkId);
    await refreshCurrentProject();
  }, [refreshCurrentProject]);

  // Get questions linked to a copy
  const getLinkedQuestions = useCallback((copyLinkId: string) => {
    const copyLink = copyLinks.find(c => c.id === copyLinkId);
    if (!copyLink) return [];

    return questions.filter(q => copyLink.linkedQuestionIds.includes(q.id));
  }, [copyLinks, questions]);

  // Get copies linked to a question
  const getCopiesForQuestion = useCallback((questionId: string) => {
    return copyLinks.filter(c => c.linkedQuestionIds.includes(questionId));
  }, [copyLinks]);

  // Link a question to a copy
  const linkQuestionToCopy = useCallback(async (copyLinkId: string, questionId: string) => {
    const copyLink = copyLinks.find(c => c.id === copyLinkId);
    if (!copyLink) return;

    const linkedQuestionIds = [...copyLink.linkedQuestionIds];
    if (!linkedQuestionIds.includes(questionId)) {
      linkedQuestionIds.push(questionId);
      await updateCopyLink(copyLinkId, { linkedQuestionIds });
      await refreshCurrentProject();
    }
  }, [copyLinks, refreshCurrentProject]);

  // Unlink a question from a copy
  const unlinkQuestionFromCopy = useCallback(async (copyLinkId: string, questionId: string) => {
    const copyLink = copyLinks.find(c => c.id === copyLinkId);
    if (!copyLink) return;

    const linkedQuestionIds = copyLink.linkedQuestionIds.filter(id => id !== questionId);
    await updateCopyLink(copyLinkId, { linkedQuestionIds });
    await refreshCurrentProject();
  }, [copyLinks, refreshCurrentProject]);

  return {
    copyLinks,
    addCopyLink,
    updateCopy,
    deleteCopy,
    getLinkedQuestions,
    getCopiesForQuestion,
    linkQuestionToCopy,
    unlinkQuestionFromCopy
  };
}
