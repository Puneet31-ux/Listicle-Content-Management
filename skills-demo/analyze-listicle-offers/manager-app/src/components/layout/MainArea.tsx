import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useUIStore } from '../../stores/uiStore';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { QuestionView } from '../questions/QuestionView';
import { CopyView } from '../copy/CopyView';
import { InfoView } from './InfoView';
import { exportProjectToPDF, exportProgressReportToPDF } from '../../lib/pdfExport';
import { useQuestions } from '../../hooks/useQuestions';
import { useCopyLinks } from '../../hooks/useCopyLinks';
import { CATEGORY_INFO } from '../../types';

export function MainArea() {
  const { selectedProject } = useProjects();
  const { viewMode, setViewMode, addToast } = useUIStore();
  const { questions } = useQuestions();
  const { copyLinks } = useCopyLinks();
  const [isExporting, setIsExporting] = useState(false);

  if (!selectedProject) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-500">
          <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">No project selected</p>
          <p className="text-sm mt-2">Select a project from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  const categoryInfo = CATEGORY_INFO[selectedProject.category];

  const handleExportFull = async () => {
    setIsExporting(true);
    try {
      exportProjectToPDF(selectedProject, questions, copyLinks);
      addToast('PDF exported successfully!', 'success');
    } catch (error) {
      addToast('Failed to export PDF', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportProgress = async () => {
    setIsExporting(true);
    try {
      exportProgressReportToPDF(selectedProject, questions);
      addToast('Progress report exported!', 'success');
    } catch (error) {
      addToast('Failed to export progress report', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden min-w-0">
      {/* Header - Fixed */}
      <div className="border-b border-gray-200 p-4 space-y-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl flex-shrink-0">{categoryInfo.icon}</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold truncate">{selectedProject.name}</h2>
                <p className="text-sm text-gray-500">{categoryInfo.label}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportProgress}
              disabled={isExporting}
            >
              Export Progress
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleExportFull}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </div>

        <Progress
          value={selectedProject.progress.answered}
          max={selectedProject.progress.total}
          showLabel
        />

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 -mb-3">
          {(['questions', 'copy', 'info'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                viewMode === mode
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-hidden min-h-0">
        {viewMode === 'questions' && <QuestionView />}
        {viewMode === 'copy' && <CopyView />}
        {viewMode === 'info' && <InfoView />}
      </div>
    </div>
  );
}
