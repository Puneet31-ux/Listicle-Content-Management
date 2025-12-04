import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { formatDateTime } from '../../lib/utils';

export function InfoView() {
  const { selectedProject, updateProject } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [offerUrl, setOfferUrl] = useState(selectedProject?.metadata.offerUrl || '');
  const [targetAudience, setTargetAudience] = useState(selectedProject?.metadata.targetAudience || '');
  const [notes, setNotes] = useState(selectedProject?.metadata.notes || '');

  if (!selectedProject) return null;

  const handleSave = async () => {
    await updateProject(selectedProject.id, {
      metadata: {
        offerUrl: offerUrl.trim() || undefined,
        targetAudience: targetAudience.trim() || undefined,
        notes: notes.trim() || undefined
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setOfferUrl(selectedProject.metadata.offerUrl || '');
    setTargetAudience(selectedProject.metadata.targetAudience || '');
    setNotes(selectedProject.metadata.notes || '');
    setIsEditing(false);
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Project Information</h3>
          {!isEditing && (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <Input
              label="Offer URL"
              value={offerUrl}
              onChange={(e) => setOfferUrl(e.target.value)}
              placeholder="https://example.com/offer"
            />

            <Input
              label="Target Audience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Homeowners aged 35-55 with $50k+ income"
            />

            <Textarea
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes about this project..."
              rows={6}
            />

            <div className="flex gap-2">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Offer URL</h4>
              {selectedProject.metadata.offerUrl ? (
                <a
                  href={selectedProject.metadata.offerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {selectedProject.metadata.offerUrl}
                </a>
              ) : (
                <p className="text-gray-500 italic">Not set</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Target Audience</h4>
              <p className="text-gray-900">
                {selectedProject.metadata.targetAudience || <span className="text-gray-500 italic">Not set</span>}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Notes</h4>
              <p className="text-gray-900 whitespace-pre-wrap">
                {selectedProject.metadata.notes || <span className="text-gray-500 italic">No notes</span>}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-1">
              <p>Created: {formatDateTime(selectedProject.createdAt)}</p>
              <p>Last updated: {formatDateTime(selectedProject.updatedAt)}</p>
              <p>Status: <span className="capitalize">{selectedProject.status.replace('-', ' ')}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
