import { create } from 'zustand';
import type { Project, Question, CopyLink, OfferCategory } from '../types';
import {
  getAllProjects,
  getProjectsByCategory,
  getQuestionsByProjectId,
  getCopyLinksByProjectId,
  updateProject as updateProjectDb,
  deleteProject as deleteProjectDb
} from '../lib/db';

interface ProjectStore {
  // State
  projects: Project[];
  selectedProjectId: string | null;
  selectedProject: Project | null;
  questions: Question[];
  copyLinks: CopyLink[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProjects: () => Promise<void>;
  loadProjectsByCategory: (category: OfferCategory) => Promise<void>;
  selectProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  refreshCurrentProject: () => Promise<void>;
  clearSelection: () => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Initial state
  projects: [],
  selectedProjectId: null,
  selectedProject: null,
  questions: [],
  copyLinks: [],
  isLoading: false,
  error: null,

  // Load all projects
  loadProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await getAllProjects();
      set({ projects, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load projects';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Load projects by category
  loadProjectsByCategory: async (category: OfferCategory) => {
    set({ isLoading: true, error: null });
    try {
      const projects = await getProjectsByCategory(category);
      set({ projects, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load projects';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Select a project and load its details
  selectProject: async (projectId: string) => {
    set({ isLoading: true, error: null, selectedProjectId: projectId });
    try {
      const projects = get().projects;
      const project = projects.find(p => p.id === projectId);

      if (!project) {
        throw new Error('Project not found');
      }

      const [questions, copyLinks] = await Promise.all([
        getQuestionsByProjectId(projectId),
        getCopyLinksByProjectId(projectId)
      ]);

      set({
        selectedProject: project,
        questions,
        copyLinks,
        isLoading: false
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load project';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Update a project
  updateProject: async (projectId: string, updates: Partial<Project>) => {
    try {
      await updateProjectDb(projectId, updates);

      // Update in local state
      set(state => ({
        projects: state.projects.map(p =>
          p.id === projectId ? { ...p, ...updates, updatedAt: new Date() } : p
        ),
        selectedProject: state.selectedProject?.id === projectId
          ? { ...state.selectedProject, ...updates, updatedAt: new Date() }
          : state.selectedProject
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
      set({ error: errorMessage });
    }
  },

  // Delete a project
  deleteProject: async (projectId: string) => {
    try {
      await deleteProjectDb(projectId);

      set(state => ({
        projects: state.projects.filter(p => p.id !== projectId),
        selectedProject: state.selectedProject?.id === projectId ? null : state.selectedProject,
        selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
        questions: state.selectedProjectId === projectId ? [] : state.questions,
        copyLinks: state.selectedProjectId === projectId ? [] : state.copyLinks
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
      set({ error: errorMessage });
    }
  },

  // Refresh current project data
  refreshCurrentProject: async () => {
    const { selectedProjectId } = get();
    if (selectedProjectId) {
      await get().selectProject(selectedProjectId);
    }
  },

  // Clear selection
  clearSelection: () => {
    set({
      selectedProjectId: null,
      selectedProject: null,
      questions: [],
      copyLinks: []
    });
  },

  // Set error
  setError: (error: string | null) => {
    set({ error });
  }
}));
