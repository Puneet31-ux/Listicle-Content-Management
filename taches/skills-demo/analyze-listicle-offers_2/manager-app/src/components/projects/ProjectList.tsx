import { useProjects } from '../../hooks/useProjects';
import { useUIStore } from '../../stores/uiStore';
import { ProjectCard } from './ProjectCard';
import { Button } from '../ui/Button';

export function ProjectList() {
  const { projects, selectedProjectId, selectProject, isLoading } = useProjects();
  const { openNewProjectModal } = useUIStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={openNewProjectModal}
          className="w-full"
        >
          + New Project
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-2">No projects yet</p>
            <p className="text-sm">Click "New Project" to get started</p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={project.id === selectedProjectId}
              onClick={() => selectProject(project.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
