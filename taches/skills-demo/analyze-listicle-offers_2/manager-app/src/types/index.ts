// Core type definitions for the Listicle Offer Manager

export type OfferCategory =
  | 'financial'
  | 'home-services'
  | 'health-wellness'
  | 'technology'
  | 'education'
  | 'automotive';

export type ProjectStatus = 'not-started' | 'in-progress' | 'completed';

export type CopyType = 'hook' | 'value-prop' | 'cta' | 'proof' | 'qualification' | 'other';

export interface Project {
  id: string;
  name: string;
  category: OfferCategory;
  createdAt: Date;
  updatedAt: Date;
  status: ProjectStatus;
  progress: {
    answered: number;
    total: number;
    percentage: number;
  };
  metadata: {
    offerUrl?: string;
    targetAudience?: string;
    notes?: string;
  };
}

export interface Question {
  id: string;
  projectId: string;
  categorySection: string;
  number: number;
  title: string;
  questionText: string;
  answered: boolean;
  answer?: string;
  answeredAt?: Date;
  tags: string[];
  linkedCopyIds: string[];
}

export interface CopyLink {
  id: string;
  projectId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  linkedQuestionIds: string[];
  type: CopyType;
}

// Template structures for question imports
export interface QuestionTemplateItem {
  number: number;
  title: string;
  questions: string[];
}

export interface QuestionSection {
  name: string;
  description?: string;
  questions: QuestionTemplateItem[];
}

export interface QuestionTemplate {
  category: OfferCategory;
  sections: QuestionSection[];
}

// Skill output parsing
export interface SkillOutput {
  category: OfferCategory;
  offerName: string;
  sections: ParsedSection[];
}

export interface ParsedSection {
  title: string;
  questions: ParsedQuestion[];
}

export interface ParsedQuestion {
  number: number;
  title: string;
  content: string[];
}

// Category metadata
export interface CategoryInfo {
  id: OfferCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export const CATEGORY_INFO: Record<OfferCategory, CategoryInfo> = {
  'financial': {
    id: 'financial',
    label: 'Financial',
    icon: '💰',
    color: 'bg-green-500',
    description: 'Debt relief, loans, credit cards, insurance'
  },
  'home-services': {
    id: 'home-services',
    label: 'Home Services',
    icon: '🏠',
    color: 'bg-blue-500',
    description: 'Roofing, HVAC, solar, remodeling, real estate'
  },
  'health-wellness': {
    id: 'health-wellness',
    label: 'Health & Wellness',
    icon: '💊',
    color: 'bg-red-500',
    description: 'Medical devices, treatments, supplements'
  },
  'technology': {
    id: 'technology',
    label: 'Technology',
    icon: '💻',
    color: 'bg-purple-500',
    description: 'Software, devices, subscriptions, SaaS'
  },
  'education': {
    id: 'education',
    label: 'Education',
    icon: '📚',
    color: 'bg-yellow-500',
    description: 'Courses, certifications, training programs'
  },
  'automotive': {
    id: 'automotive',
    label: 'Automotive',
    icon: '🚗',
    color: 'bg-gray-500',
    description: 'Vehicles, insurance, repairs, warranties'
  }
};
