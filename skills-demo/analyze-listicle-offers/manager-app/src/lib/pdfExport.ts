import { jsPDF } from 'jspdf';
import type { Project, Question, CopyLink } from '../types';
import { CATEGORY_INFO } from '../types';
import { formatDateTime, sanitizeFilename } from './utils';

/**
 * Exports a complete project analysis to PDF
 * @param project - The project to export
 * @param questions - All questions for the project
 * @param copyLinks - All copy links for the project
 */
export function exportProjectToPDF(
  project: Project,
  questions: Question[],
  copyLinks: CopyLink[]
): void {
  const doc = new jsPDF();
  let yPos = 20;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const maxWidth = doc.internal.pageSize.width - (margin * 2);

  // Helper function to add new page if needed
  const checkNewPage = (requiredSpace: number = 20) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
    }
  };

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(project.name, margin, yPos);
  yPos += 12;

  // Category and metadata
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const categoryInfo = CATEGORY_INFO[project.category];
  doc.text(`Category: ${categoryInfo.label}`, margin, yPos);
  yPos += 7;

  doc.text(`Status: ${project.status.toUpperCase()}`, margin, yPos);
  yPos += 7;

  doc.text(
    `Progress: ${project.progress.answered}/${project.progress.total} questions (${project.progress.percentage}%)`,
    margin,
    yPos
  );
  yPos += 7;

  doc.text(`Created: ${formatDateTime(project.createdAt)}`, margin, yPos);
  yPos += 7;

  doc.text(`Last Updated: ${formatDateTime(project.updatedAt)}`, margin, yPos);
  yPos += 15;

  // Metadata section if present
  if (project.metadata.offerUrl || project.metadata.targetAudience || project.metadata.notes) {
    checkNewPage(30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Details', margin, yPos);
    yPos += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    if (project.metadata.offerUrl) {
      doc.text(`Offer URL: ${project.metadata.offerUrl}`, margin, yPos);
      yPos += 7;
    }

    if (project.metadata.targetAudience) {
      doc.text(`Target Audience: ${project.metadata.targetAudience}`, margin, yPos);
      yPos += 7;
    }

    if (project.metadata.notes) {
      doc.text('Notes:', margin, yPos);
      yPos += 7;
      const noteLines = doc.splitTextToSize(project.metadata.notes, maxWidth);
      doc.text(noteLines, margin + 5, yPos);
      yPos += noteLines.length * 7 + 10;
    }
  }

  // Group questions by section
  const questionsBySection = questions.reduce((acc, question) => {
    if (!acc[question.categorySection]) {
      acc[question.categorySection] = [];
    }
    acc[question.categorySection].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  // Export questions by section
  for (const [sectionName, sectionQuestions] of Object.entries(questionsBySection)) {
    checkNewPage(40);

    // Section header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(sectionName, margin, yPos);
    yPos += 10;

    // Section progress
    const answeredInSection = sectionQuestions.filter(q => q.answered).length;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(
      `${answeredInSection}/${sectionQuestions.length} answered`,
      margin,
      yPos
    );
    yPos += 10;

    // Questions
    for (const question of sectionQuestions.sort((a, b) => a.number - b.number)) {
      checkNewPage(30);

      // Question number and title
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const questionHeader = `${question.number}. ${question.title}`;
      doc.text(questionHeader, margin, yPos);
      yPos += 7;

      // Question text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const questionLines = doc.splitTextToSize(question.questionText, maxWidth - 5);
      doc.text(questionLines, margin + 5, yPos);
      yPos += questionLines.length * 6;

      // Answer
      if (question.answered && question.answer) {
        yPos += 3;
        doc.setFont('helvetica', 'bolditalic');
        doc.text('Answer:', margin + 5, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        const answerLines = doc.splitTextToSize(question.answer, maxWidth - 10);
        doc.text(answerLines, margin + 10, yPos);
        yPos += answerLines.length * 6 + 5;

        if (question.answeredAt) {
          doc.setFontSize(8);
          doc.setFont('helvetica', 'italic');
          doc.text(`Answered: ${formatDateTime(question.answeredAt)}`, margin + 10, yPos);
          yPos += 5;
        }
      } else {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Not answered yet', margin + 5, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      yPos += 8;
    }

    yPos += 5;
  }

  // Copy sections if any
  if (copyLinks.length > 0) {
    checkNewPage(40);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Copy Sections', margin, yPos);
    yPos += 15;

    for (const copy of copyLinks) {
      checkNewPage(30);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${copy.title} (${copy.type})`, margin, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const copyLines = doc.splitTextToSize(copy.content, maxWidth - 5);
      doc.text(copyLines, margin + 5, yPos);
      yPos += copyLines.length * 6 + 5;

      if (copy.linkedQuestionIds.length > 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.text(
          `Linked to ${copy.linkedQuestionIds.length} question(s)`,
          margin + 5,
          yPos
        );
        yPos += 8;
      }

      yPos += 10;
    }
  }

  // Save PDF
  const filename = `${sanitizeFilename(project.name)}-analysis.pdf`;
  doc.save(filename);
}

/**
 * Exports only answered questions to PDF
 * @param project - The project to export
 * @param questions - All questions for the project
 */
export function exportAnsweredQuestionsToPDF(
  project: Project,
  questions: Question[]
): void {
  const answeredQuestions = questions.filter(q => q.answered);
  exportProjectToPDF(project, answeredQuestions, []);
}

/**
 * Exports a single copy section to PDF
 * @param project - The project this copy belongs to
 * @param copy - The copy section to export
 * @param relatedQuestions - Questions linked to this copy
 */
export function exportCopyToPDF(
  project: Project,
  copy: CopyLink,
  relatedQuestions: Question[]
): void {
  const doc = new jsPDF();
  let yPos = 20;
  const margin = 20;
  const maxWidth = doc.internal.pageSize.width - (margin * 2);

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(copy.title, margin, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project: ${project.name}`, margin, yPos);
  yPos += 7;

  doc.text(`Type: ${copy.type.toUpperCase()}`, margin, yPos);
  yPos += 7;

  doc.text(`Created: ${formatDateTime(copy.createdAt)}`, margin, yPos);
  yPos += 15;

  // Copy content
  doc.setFontSize(11);
  const copyLines = doc.splitTextToSize(copy.content, maxWidth);
  doc.text(copyLines, margin, yPos);
  yPos += copyLines.length * 7 + 15;

  // Related questions
  if (relatedQuestions.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Source Questions', margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    for (const question of relatedQuestions) {
      doc.setFont('helvetica', 'bold');
      doc.text(`Q${question.number}: ${question.title}`, margin, yPos);
      yPos += 6;

      if (question.answer) {
        doc.setFont('helvetica', 'normal');
        const answerLines = doc.splitTextToSize(question.answer, maxWidth - 5);
        doc.text(answerLines, margin + 5, yPos);
        yPos += answerLines.length * 6 + 8;
      }
    }
  }

  // Save PDF
  const filename = `${sanitizeFilename(copy.title)}-copy.pdf`;
  doc.save(filename);
}

/**
 * Exports a progress report to PDF
 * @param project - The project to export
 * @param questions - All questions for the project
 */
export function exportProgressReportToPDF(
  project: Project,
  questions: Question[]
): void {
  const doc = new jsPDF();
  const margin = 20;

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Progress Report', margin, 30);

  doc.setFontSize(16);
  doc.text(project.name, margin, 42);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(CATEGORY_INFO[project.category].label, margin, 52);
  doc.text(formatDateTime(new Date()), margin, 60);

  // Overall progress
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Overall Progress', margin, 75);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${project.progress.answered} of ${project.progress.total} questions answered (${project.progress.percentage}%)`,
    margin,
    85
  );

  // Progress by section
  const questionsBySection = questions.reduce((acc, question) => {
    if (!acc[question.categorySection]) {
      acc[question.categorySection] = [];
    }
    acc[question.categorySection].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  let yPos = 100;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Progress by Section', margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  for (const [sectionName, sectionQuestions] of Object.entries(questionsBySection)) {
    const answeredInSection = sectionQuestions.filter(q => q.answered).length;
    const sectionPercentage = Math.round(
      (answeredInSection / sectionQuestions.length) * 100
    );

    doc.text(
      `${sectionName}: ${answeredInSection}/${sectionQuestions.length} (${sectionPercentage}%)`,
      margin,
      yPos
    );
    yPos += 7;
  }

  // Save PDF
  const filename = `${sanitizeFilename(project.name)}-progress.pdf`;
  doc.save(filename);
}
