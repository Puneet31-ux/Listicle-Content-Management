import { Column } from './types'

export const DEFAULT_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'TODO',
    order: 0,
    color: '#3b82f6', // blue-500
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    order: 1,
    color: '#f59e0b', // amber-500
  },
  {
    id: 'completed',
    title: 'Completed',
    order: 2,
    color: '#10b981', // emerald-500
  },
]

export const STORAGE_KEY = 'kanban-storage'

// Priority color mappings
export const PRIORITY_COLORS = {
  low: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-300',
    avatar: 'bg-gray-500',
  },
  normal: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    avatar: 'bg-blue-500',
  },
  high: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-300',
    avatar: 'bg-red-500',
  },
}

// Avatar background colors (rotating for variety)
export const AVATAR_COLORS = [
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
]
