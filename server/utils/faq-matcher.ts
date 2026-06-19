/**
 * FAQ Matching Utility
 * Uses fuzzy string matching to find FAQ answers
 */

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

/**
 * Calculate similarity between two strings (simple approach)
 * Returns a score between 0 and 1
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 1.0;

  // Contains check
  if (s1.includes(s2) || s2.includes(s1)) return 0.9;

  // Word overlap
  const words1 = new Set(s1.split(/\s+/));
  const words2 = new Set(s2.split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  const jaccardScore = intersection.size / union.size;
  return jaccardScore;
}

/**
 * Check if question matches keywords
 */
function matchesKeywords(question: string, keywords: string[]): number {
  const questionLower = question.toLowerCase();
  let matchCount = 0;

  for (const keyword of keywords) {
    if (questionLower.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  }

  return matchCount > 0 ? matchCount / keywords.length : 0;
}

/**
 * Find best matching FAQ
 * Returns null if no good match found (threshold < 0.6)
 */
export function findMatchingFAQ(
  userQuestion: string,
  faqDatabase: FAQItem[]
): { faq: FAQItem; score: number } | null {
  let bestMatch: { faq: FAQItem; score: number } | null = null;

  for (const faq of faqDatabase) {
    // Calculate similarity with FAQ question
    const questionSimilarity = calculateSimilarity(userQuestion, faq.question);

    // Calculate keyword match score
    const keywordScore = matchesKeywords(userQuestion, faq.keywords);

    // Combined score (weighted average)
    const score = questionSimilarity * 0.6 + keywordScore * 0.4;

    if (score > (bestMatch?.score || 0)) {
      bestMatch = { faq, score };
    }
  }

  // Only return if score is above threshold
  if (bestMatch && bestMatch.score >= 0.4) {
    return bestMatch;
  }

  return null;
}

/**
 * Format FAQ answer for response
 */
export function formatFAQAnswer(faq: FAQItem): string {
  return `${faq.answer}

*This is a pre-written answer from my FAQ database. Feel free to ask follow-up questions!*`;
}
