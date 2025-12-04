import { useState, useCallback } from 'react';
import type { CopyLink, CopyType } from '../../types';
import { useProjects } from '../../hooks/useProjects';
import { useCopyLinks } from '../../hooks/useCopyLinks';
import { useQuestions } from '../../hooks/useQuestions';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { debounce } from '../../lib/utils';
import { useUIStore } from '../../stores/uiStore';

interface CopyEditorProps {
  copy?: CopyLink;
  onClose: () => void;
}

export function CopyEditor({ copy, onClose }: CopyEditorProps) {
  const { selectedProject } = useProjects();
  const { addCopyLink, updateCopy, deleteCopy, getLinkedQuestions } = useCopyLinks();
  const { questions } = useQuestions();
  const { addToast } = useUIStore();

  const [title, setTitle] = useState(copy?.title || '');
  const [content, setContent] = useState(copy?.content || '');
  const [type, setType] = useState<CopyType>(copy?.type || 'other');
  const [linkedQuestionIds, setLinkedQuestionIds] = useState<string[]>(copy?.linkedQuestionIds || []);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);

  if (!selectedProject) return null;

  const isNew = !copy;

  const debouncedSave = useCallback(
    debounce((updates: Partial<CopyLink>) => {
      if (copy) {
        updateCopy(copy.id, updates);
      }
    }, 1000),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copy?.id]
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isNew) {
      debouncedSave({ title: value });
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (!isNew) {
      debouncedSave({ content: value });
    }
  };

  const handleTypeChange = (value: CopyType) => {
    setType(value);
    if (!isNew) {
      debouncedSave({ type: value });
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      addToast('Please enter a title', 'error');
      return;
    }

    await addCopyLink({
      projectId: selectedProject.id,
      title: title.trim(),
      content: content.trim(),
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
      linkedQuestionIds
    });

    addToast('Copy section created!', 'success');
    onClose();
  };

  const handleDelete = async () => {
    if (copy && confirm('Delete this copy section?')) {
      await deleteCopy(copy.id);
      addToast('Copy section deleted', 'success');
      onClose();
    }
  };

  const handleToggleQuestion = async (questionId: string) => {
    const newLinkedIds = linkedQuestionIds.includes(questionId)
      ? linkedQuestionIds.filter(id => id !== questionId)
      : [...linkedQuestionIds, questionId];

    setLinkedQuestionIds(newLinkedIds);

    if (!isNew && copy) {
      await updateCopy(copy.id, { linkedQuestionIds: newLinkedIds });
    }
  };

  const linkedQuestions = copy ? getLinkedQuestions(copy.id) : [];

  const copyTypes: CopyType[] = ['hook', 'value-prop', 'cta', 'proof', 'qualification', 'other'];

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isNew ? 'New Copy Section' : 'Edit Copy Section'}
          </h3>
          <div className="flex gap-2">
            {!isNew && (
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <Input
          label="Title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g., Opening Hook"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value as CopyType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {copyTypes.map((t) => (
              <option key={t} value={t}>
                {t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowQuestionPicker(!showQuestionPicker)}
        >
          {showQuestionPicker ? 'Hide' : 'Show'} Questions ({linkedQuestionIds.length} linked)
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Write your copy here..."
            rows={15}
          />

          {isNew && (
            <div className="mt-4">
              <Button onClick={handleCreate}>Create Copy Section</Button>
            </div>
          )}
        </div>

        {showQuestionPicker && (
          <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
            <h4 className="font-medium mb-3">Link Questions</h4>
            <div className="space-y-2">
              {questions.map((q) => (
                <label
                  key={q.id}
                  className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={linkedQuestionIds.includes(q.id)}
                    onChange={() => handleToggleQuestion(q.id)}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    Q{q.number}: {q.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {linkedQuestions.length > 0 && !showQuestionPicker && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Linked Questions:</h4>
          <div className="flex flex-wrap gap-2">
            {linkedQuestions.map((q) => (
              <span
                key={q.id}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                Q{q.number}: {q.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
