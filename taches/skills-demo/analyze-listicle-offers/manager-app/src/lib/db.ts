import Dexie, { type EntityTable } from 'dexie';
import type { Project, Question, CopyLink } from '../types';

// Database class
class ListicleDB extends Dexie {
  projects!: EntityTable<Project, 'id'>;
  questions!: EntityTable<Question, 'id'>;
  copyLinks!: EntityTable<CopyLink, 'id'>;

  constructor() {
    super('ListicleOfferManager');

    this.version(1).stores({
      projects: 'id, category, status, createdAt, updatedAt',
      questions: 'id, projectId, categorySection, answered, answeredAt',
      copyLinks: 'id, projectId, type, createdAt, updatedAt'
    });
  }
}

// Export singleton instance
export const db = new ListicleDB();

// Helper functions
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function createProject(
  name: string,
  category: Project['category'],
  metadata?: Project['metadata']
): Promise<Project> {
  const project: Project = {
    id: generateId(),
    name,
    category,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'not-started',
    progress: {
      answered: 0,
      total: 0,
      percentage: 0
    },
    metadata: metadata || {}
  };

  await db.projects.add(project);
  return project;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return await db.projects.get(id);
}

export async function getProjectsByCategory(category: Project['category']): Promise<Project[]> {
  return await db.projects.where('category').equals(category).toArray();
}

export async function getAllProjects(): Promise<Project[]> {
  return await db.projects.toArray();
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  await db.projects.update(id, {
    ...updates,
    updatedAt: new Date()
  });
}

export async function deleteProject(id: string): Promise<void> {
  // Delete associated questions and copy links
  await db.questions.where('projectId').equals(id).delete();
  await db.copyLinks.where('projectId').equals(id).delete();
  await db.projects.delete(id);
}

export async function getQuestionsByProjectId(projectId: string): Promise<Question[]> {
  return await db.questions.where('projectId').equals(projectId).toArray();
}

export async function updateQuestion(id: string, updates: Partial<Question>): Promise<void> {
  await db.questions.update(id, updates);

  // Update project progress
  if (updates.answered !== undefined) {
    const question = await db.questions.get(id);
    if (question) {
      await updateProjectProgress(question.projectId);
    }
  }
}

export async function updateProjectProgress(projectId: string): Promise<void> {
  const questions = await getQuestionsByProjectId(projectId);
  const answered = questions.filter(q => q.answered).length;
  const total = questions.length;
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  await updateProject(projectId, {
    progress: { answered, total, percentage },
    status: answered === 0 ? 'not-started' : answered === total ? 'completed' : 'in-progress'
  });
}

export async function createQuestion(question: Omit<Question, 'id'>): Promise<Question> {
  const newQuestion: Question = {
    ...question,
    id: generateId()
  };

  await db.questions.add(newQuestion);
  await updateProjectProgress(question.projectId);
  return newQuestion;
}

export async function createQuestions(questions: Omit<Question, 'id'>[]): Promise<void> {
  const newQuestions = questions.map(q => ({
    ...q,
    id: generateId()
  }));

  await db.questions.bulkAdd(newQuestions);

  if (newQuestions.length > 0) {
    await updateProjectProgress(newQuestions[0].projectId);
  }
}

export async function getCopyLinksByProjectId(projectId: string): Promise<CopyLink[]> {
  return await db.copyLinks.where('projectId').equals(projectId).toArray();
}

export async function createCopyLink(copyLink: Omit<CopyLink, 'id'>): Promise<CopyLink> {
  const newCopyLink: CopyLink = {
    ...copyLink,
    id: generateId()
  };

  await db.copyLinks.add(newCopyLink);
  return newCopyLink;
}

export async function updateCopyLink(id: string, updates: Partial<CopyLink>): Promise<void> {
  await db.copyLinks.update(id, {
    ...updates,
    updatedAt: new Date()
  });
}

export async function deleteCopyLink(id: string): Promise<void> {
  await db.copyLinks.delete(id);
}
