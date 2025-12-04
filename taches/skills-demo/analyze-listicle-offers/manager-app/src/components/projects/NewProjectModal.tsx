import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useUIStore } from '../../stores/uiStore';
import { useProjects } from '../../hooks/useProjects';
import { createProject } from '../../lib/db';
import { detectCategory, getDetectionConfidence } from '../../lib/categoryDetector';
import { CATEGORY_INFO, type OfferCategory } from '../../types';
import { cn } from '../../lib/utils';

export function NewProjectModal() {
  const { isNewProjectModalOpen, closeNewProjectModal, addToast } = useUIStore();
  const { reloadProjects } = useProjects();

  const [input, setInput] = useState('');
  const [detectedCategory, setDetectedCategory] = useState<OfferCategory | null>(null);
  const [confidence, setConfidence] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (input.trim().length > 0) {
      const category = detectCategory(input);
      const conf = getDetectionConfidence(input);
      setDetectedCategory(category);
      setConfidence(conf);
    } else {
      setDetectedCategory(null);
      setConfidence('none');
    }
  }, [input]);

  const handleCreate = async () => {
    if (!detectedCategory || input.trim().length === 0) return;

    setIsCreating(true);
    try {
      await createProject(input.trim(), detectedCategory);
      addToast('Project created successfully!', 'success');
      setInput('');
      setDetectedCategory(null);
      closeNewProjectModal();
      await reloadProjects();
    } catch (error) {
      addToast('Failed to create project', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setInput('');
    setDetectedCategory(null);
    closeNewProjectModal();
  };

  const confidenceColors = {
    high: 'text-green-600',
    medium: 'text-yellow-600',
    low: 'text-orange-600',
    none: 'text-gray-400'
  };

  return (
    <Modal
      isOpen={isNewProjectModalOpen}
      onClose={handleClose}
      title="Create New Project"
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <Input
            label="Describe your offer"
            placeholder="e.g., 'solar panel installation with 0% financing' or 'debt relief program for homeowners'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <p className="text-sm text-gray-500 mt-1">
            Just describe the offer in your own words. We'll automatically detect the category.
          </p>
        </div>

        {detectedCategory && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Category detected:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{CATEGORY_INFO[detectedCategory].icon}</span>
                <span className="font-semibold">{CATEGORY_INFO[detectedCategory].label}</span>
                <span className={cn('text-sm', confidenceColors[confidence])}>
                  ({confidence} confidence)
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {CATEGORY_INFO[detectedCategory].description}
            </p>
          </div>
        )}

        {input.length > 3 && !detectedCategory && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-700">
              No category detected yet. Try adding more keywords about your offer type
              (e.g., "loan", "roof", "software", "course", etc.)
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!detectedCategory || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
