import type { OfferCategory } from '../types';

// Keyword mappings for each category
const CATEGORY_KEYWORDS: Record<OfferCategory, string[]> = {
  'financial': [
    'debt', 'loan', 'credit', 'mortgage', 'refinance', 'insurance',
    'investment', 'bank', 'card', 'relief', 'consolidation', 'apr',
    'finance', 'money', 'savings', 'interest', 'borrow', 'lender',
    'equity', 'cash', 'payment', 'personal loan', 'auto loan'
  ],
  'home-services': [
    'roof', 'hvac', 'solar', 'remodel', 'real estate', 'contractor',
    'home', 'house', 'property', 'renovation', 'repair', 'panel',
    'installation', 'heating', 'cooling', 'air conditioning', 'furnace',
    'siding', 'window', 'door', 'kitchen', 'bathroom', 'basement',
    'deck', 'patio', 'landscaping', 'gutter', 'plumbing', 'electrical'
  ],
  'health-wellness': [
    'health', 'medical', 'treatment', 'wellness', 'supplement', 'therapy',
    'doctor', 'clinic', 'patient', 'disease', 'condition', 'medication',
    'prescription', 'healthcare', 'hospital', 'care', 'diagnosis',
    'symptom', 'cure', 'healing', 'pain relief', 'fitness', 'nutrition'
  ],
  'technology': [
    'software', 'app', 'saas', 'tech', 'device', 'subscription',
    'platform', 'digital', 'cloud', 'api', 'service', 'online',
    'web', 'mobile', 'computer', 'laptop', 'phone', 'tablet',
    'program', 'application', 'system', 'tool', 'solution'
  ],
  'education': [
    'course', 'training', 'certification', 'learn', 'education',
    'bootcamp', 'degree', 'program', 'university', 'school',
    'class', 'lesson', 'study', 'teach', 'instructor', 'student',
    'college', 'academy', 'tutorial', 'workshop', 'seminar',
    'certificate', 'diploma', 'skill', 'knowledge'
  ],
  'automotive': [
    'car', 'vehicle', 'auto', 'automotive', 'warranty', 'repair',
    'lease', 'insurance', 'maintenance', 'dealership', 'truck',
    'suv', 'sedan', 'van', 'motor', 'engine', 'tire', 'brake',
    'transmission', 'mechanic', 'service', 'parts', 'oil change'
  ]
};

/**
 * Detects the most likely category based on input text using keyword matching
 * @param input - User's input text (offer name, description, URL, etc.)
 * @returns The detected OfferCategory or null if no match found
 */
export function detectCategory(input: string): OfferCategory | null {
  if (!input || input.trim().length === 0) {
    return null;
  }

  const normalized = input.toLowerCase().trim();

  // Initialize scores for each category
  const scores: Record<OfferCategory, number> = {
    'financial': 0,
    'home-services': 0,
    'health-wellness': 0,
    'technology': 0,
    'education': 0,
    'automotive': 0
  };

  // Count keyword matches for each category
  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      // Use word boundaries to avoid partial matches
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalized)) {
        scores[category as OfferCategory]++;
      }
    });
  });

  // Sort categories by score
  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);

  // Return category with highest score if it's greater than 0
  const topCategory = sortedCategories[0];
  return topCategory[1] > 0 ? topCategory[0] as OfferCategory : null;
}

/**
 * Gets all category scores for debugging/display purposes
 * @param input - User's input text
 * @returns Object with scores for each category
 */
export function getCategoryScores(input: string): Record<OfferCategory, number> {
  if (!input || input.trim().length === 0) {
    return {
      'financial': 0,
      'home-services': 0,
      'health-wellness': 0,
      'technology': 0,
      'education': 0,
      'automotive': 0
    };
  }

  const normalized = input.toLowerCase().trim();
  const scores: Record<OfferCategory, number> = {
    'financial': 0,
    'home-services': 0,
    'health-wellness': 0,
    'technology': 0,
    'education': 0,
    'automotive': 0
  };

  Object.entries(CATEGORY_KEYWORDS).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalized)) {
        scores[category as OfferCategory]++;
      }
    });
  });

  return scores;
}

/**
 * Gets the confidence level of a category detection
 * @param input - User's input text
 * @returns Confidence level: 'high', 'medium', 'low', or 'none'
 */
export function getDetectionConfidence(input: string): 'high' | 'medium' | 'low' | 'none' {
  const scores = getCategoryScores(input);
  const sortedScores = Object.values(scores).sort((a, b) => b - a);
  const topScore = sortedScores[0];
  const secondScore = sortedScores[1] || 0;

  if (topScore === 0) return 'none';
  if (topScore >= 3 && topScore > secondScore * 2) return 'high';
  if (topScore >= 2 && topScore > secondScore) return 'medium';
  return 'low';
}
