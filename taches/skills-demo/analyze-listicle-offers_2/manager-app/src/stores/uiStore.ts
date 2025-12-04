import { create } from 'zustand';
import type { OfferCategory } from '../types';

type ViewMode = 'questions' | 'copy' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface UIStore {
  // State
  selectedCategory: OfferCategory | 'all';
  viewMode: ViewMode;
  isNewProjectModalOpen: boolean;
  isSidebarCollapsed: boolean;
  toasts: ToastMessage[];
  fileWatchEnabled: boolean;

  // Actions
  setSelectedCategory: (category: OfferCategory | 'all') => void;
  setViewMode: (mode: ViewMode) => void;
  openNewProjectModal: () => void;
  closeNewProjectModal: () => void;
  toggleSidebar: () => void;
  addToast: (message: string, type: ToastMessage['type'], duration?: number) => void;
  removeToast: (id: string) => void;
  setFileWatchEnabled: (enabled: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Initial state
  selectedCategory: 'all',
  viewMode: 'questions',
  isNewProjectModalOpen: false,
  isSidebarCollapsed: false,
  toasts: [],
  fileWatchEnabled: true,

  // Set selected category
  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  // Set view mode
  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  // Open new project modal
  openNewProjectModal: () => {
    set({ isNewProjectModalOpen: true });
  },

  // Close new project modal
  closeNewProjectModal: () => {
    set({ isNewProjectModalOpen: false });
  },

  // Toggle sidebar
  toggleSidebar: () => {
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }));
  },

  // Add toast notification
  addToast: (message, type, duration = 5000) => {
    const id = `${Date.now()}-${Math.random()}`;
    const toast: ToastMessage = { id, message, type, duration };

    set((state) => ({
      toasts: [...state.toasts, toast]
    }));

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter(t => t.id !== id)
        }));
      }, duration);
    }
  },

  // Remove toast
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(t => t.id !== id)
    }));
  },

  // Set file watch enabled
  setFileWatchEnabled: (enabled) => {
    set({ fileWatchEnabled: enabled });
  }
}));
