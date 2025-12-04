import { useEffect } from 'react';
import { useProjectStore } from '../stores/projectStore';
import { useUIStore } from '../stores/uiStore';

/**
 * Hook for managing projects
 * Automatically loads projects based on selected category
 */
export function useProjects() {
  const {
    projects,
    selectedProjectId,
    selectedProject,
    isLoading,
    error,
    loadProjects,
    loadProjectsByCategory,
    selectProject,
    updateProject,
    deleteProject,
    refreshCurrentProject,
    clearSelection
  } = useProjectStore();

  const { selectedCategory } = useUIStore();

  // Load projects when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      loadProjects();
    } else {
      loadProjectsByCategory(selectedCategory);
    }
  }, [selectedCategory, loadProjects, loadProjectsByCategory]);

  return {
    projects,
    selectedProjectId,
    selectedProject,
    isLoading,
    error,
    selectProject,
    updateProject,
    deleteProject,
    refreshCurrentProject,
    clearSelection,
    reloadProjects: selectedCategory === 'all' ? loadProjects : () => loadProjectsByCategory(selectedCategory)
  };
}
