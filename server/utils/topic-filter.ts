/**
 * Topic Filter Utility
 * Ensures questions are career/professional related
 */

const CAREER_KEYWORDS = [
  // Experience & Work
  "experience", "work", "job", "role", "position", "career", "professional",
  "project", "projects", "built", "developed", "working", "worked",

  // Skills & Technologies
  "skills", "skill", "tech", "technology", "stack", "framework", "language",
  "react", "javascript", "typescript", "frontend", "backend", "ai", "ml",
  "css", "html", "api", "tools", "proficient", "know",

  // Education
  "education", "degree", "college", "university", "graduated", "graduation",
  "studied", "learning", "course",

  // Career Details
  "salary", "compensation", "notice", "period", "joining", "relocation",
  "remote", "office", "location", "availability", "hire", "hiring",

  // Professional Qualities
  "strengths", "weakness", "achievement", "accomplishment", "team", "leadership",
  "collaboration", "problem", "solving", "challenge",

  // Interview/Application
  "interview", "resume", "cv", "portfolio", "application", "apply",
  "position", "vacancy", "opportunity", "opening",

  // General Professional
  "about", "who", "what", "why", "how", "when", "where",
  "tell", "describe", "explain", "discuss",

  // Company/Role specific
  "company", "startup", "organization", "employer", "recruiter",
  "fit", "culture", "values", "mission",
];

/**
 * Check if question is career-related
 * Returns true if question contains at least one career keyword
 */
export function isCareerRelated(question: string): boolean {
  const questionLower = question.toLowerCase().trim();

  // Empty or too short
  if (questionLower.length < 3) {
    return false;
  }

  // Check for career keywords
  const hasCareerKeyword = CAREER_KEYWORDS.some(keyword =>
    questionLower.includes(keyword)
  );

  if (hasCareerKeyword) {
    return true;
  }

  // Common career question patterns (even without keywords)
  const careerPatterns = [
    /\b(you|your|anshuman)\b.*\b(do|does|can|are|is|have|has)\b/i,
    /\b(what|where|when|how|why)\b.*\b(you|your|anshuman)\b/i,
    /\b(tell|describe|explain)\b.*\b(me|us|about)\b/i,
  ];

  const matchesPattern = careerPatterns.some(pattern => pattern.test(questionLower));

  return matchesPattern;
}

/**
 * Get rejection message for off-topic questions
 */
export function getOffTopicMessage(): string {
  return "I'm here to help with questions about Anshuman's professional background, skills, and career. Please ask about his work experience, projects, education, or career interests. For other inquiries, you can reach out directly via the Contact page.";
}

/**
 * Sanitize user input
 * Removes potential harmful content
 */
export function sanitizeInput(input: string): string {
  // Remove excessive whitespace
  let sanitized = input.trim().replace(/\s+/g, " ");

  // Limit length
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500);
  }

  // Remove potential HTML/script tags
  sanitized = sanitized.replace(/<[^>]*>/g, "");

  return sanitized;
}
