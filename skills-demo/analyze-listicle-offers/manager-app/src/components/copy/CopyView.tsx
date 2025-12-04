import { useState } from 'react';
import { useCopyLinks } from '../../hooks/useCopyLinks';
import { useProjects } from '../../hooks/useProjects';
import { Button } from '../ui/Button';
import { CopyEditor } from './CopyEditor';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDateTime } from '../../lib/utils';

export function CopyView() {
  const { copyLinks } = useCopyLinks();
  const { selectedProject } = useProjects();
  const [selectedCopyId, setSelectedCopyId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  if (!selectedProject) return null;

  const selectedCopy = copyLinks.find(c => c.id === selectedCopyId);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Copy list sidebar */}
      <div className="w-80 border-r border-gray-200 overflow-y-auto p-4 space-y-3 flex-shrink-0">
        <Button
          onClick={() => {
            setIsCreating(true);
            setSelectedCopyId(null);
          }}
          className="w-full"
        >
          + New Copy Section
        </Button>

        {copyLinks.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-8">
            No copy sections yet
          </p>
        ) : (
          copyLinks.map((copy) => (
            <Card
              key={copy.id}
              hover
              onClick={() => {
                setSelectedCopyId(copy.id);
                setIsCreating(false);
              }}
              className={selectedCopyId === copy.id ? 'ring-2 ring-blue-500' : ''}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{copy.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500 capitalize">{copy.type}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDateTime(copy.updatedAt)}
                </p>
                {copy.linkedQuestionIds.length > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    {copy.linkedQuestionIds.length} linked questions
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Copy editor */}
      <div className="flex-1 overflow-hidden min-w-0">
        {isCreating || selectedCopy ? (
          <CopyEditor
            copy={selectedCopy}
            onClose={() => {
              setIsCreating(false);
              setSelectedCopyId(null);
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <p>Select a copy section or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
