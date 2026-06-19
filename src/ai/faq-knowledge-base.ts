/**
 * FAQ Knowledge Base for AI Chat
 *
 * This file contains pre-written answers to common recruiter questions.
 * Update this file to add new FAQs as patterns emerge from chat logs.
 */

export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[]; // For better matching
}

export const FAQ_DATABASE: FAQItem[] = [
  {
    question: "What is your experience with React?",
    answer: "I have 2.5+ years of professional experience with React, working at HealthPlix Technologies since July 2022. I've built complex healthcare applications using React 18, TypeScript, and modern patterns like hooks, context, and custom hooks. I specialize in performance optimization, achieving a 25% reduction in re-rendering overhead through memoization and code splitting.",
    keywords: ["react", "experience", "react.js", "reactjs", "frontend", "javascript"],
  },
  {
    question: "Have you worked with TypeScript?",
    answer: "Yes! TypeScript is my primary language for all React projects at HealthPlix. I've built type-safe applications with strict TypeScript configurations, custom types, generics, and utility types. My portfolio itself is built with TypeScript to demonstrate best practices.",
    keywords: ["typescript", "ts", "types", "type-safe"],
  },
  {
    question: "Do you have AI/ML experience?",
    answer: "Yes, I have hands-on experience with AI integration. At HealthPlix, I built ScribePad, an AI-powered medical documentation tool using OpenAI APIs. I integrated GPT models to streamline doctor workflows, handling API integration, prompt engineering, and error handling for production use. I also worked as a Data Science Intern at Aramex, where I developed ML models for address extraction with 99% accuracy.",
    keywords: ["ai", "ml", "artificial intelligence", "machine learning", "openai", "gpt", "llm"],
  },
  {
    question: "What are your salary expectations?",
    answer: "My salary expectations are competitive and flexible based on the role, responsibilities, location, and total compensation package. I'm open to discussing specific numbers once I learn more about the opportunity. My primary focus is finding the right fit where I can contribute meaningfully and grow professionally.",
    keywords: ["salary", "compensation", "pay", "ctc", "package", "expectations"],
  },
  {
    question: "Are you open to relocation?",
    answer: "Yes, I'm open to relocation within India for the right opportunity. I'm currently based in Bangalore and am comfortable with both office-based and hybrid work arrangements. I'm also open to remote roles that align with my career goals.",
    keywords: ["relocation", "relocate", "move", "location", "bangalore", "remote"],
  },
  {
    question: "What is your notice period?",
    answer: "My notice period is negotiable based on the urgency and requirements of the role. I'm committed to ensuring a smooth transition at my current position while being flexible to accommodate the right opportunity. We can discuss specific timelines during our conversation.",
    keywords: ["notice period", "notice", "joining", "availability", "when can you join"],
  },
  {
    question: "What are your career goals?",
    answer: "I'm focused on deepening my expertise in frontend engineering while expanding into full-stack development and AI/ML product development. I'm particularly interested in roles that combine modern frontend frameworks with AI integrations, working on products that have meaningful impact. Long-term, I aim to lead engineering teams and contribute to technical architecture decisions.",
    keywords: ["career goals", "future", "aspirations", "growth", "goals", "plans"],
  },
  {
    question: "What is your tech stack?",
    answer: "My primary tech stack includes React 18, TypeScript, Tailwind CSS, Zustand for state management, and Vite/Webpack for build tools. I'm proficient in REST APIs, have experience with OpenAI APIs for AI integration, and use modern development tools like Git, ESLint, and Prettier. I'm always learning new technologies and recently explored Framer Motion for animations.",
    keywords: ["tech stack", "technologies", "tools", "stack", "frameworks"],
  },
  {
    question: "Can you work with a team?",
    answer: "Absolutely! At HealthPlix, I work closely with product managers, designers, and backend engineers in an agile environment. I've developed reusable component libraries used across teams, participate in code reviews, and mentor junior developers. I believe in collaborative problem-solving and clear communication to build great products.",
    keywords: ["team", "collaboration", "teamwork", "agile", "communication"],
  },
  {
    question: "What projects have you built?",
    answer: "At HealthPlix, I built ScribePad (AI-powered medical documentation), integrated analytics pipelines, and developed a library of reusable UI components. I've also built personal projects like Snapgram (Instagram clone with social features), interactive games, and this portfolio showcasing modern React patterns. You can find detailed project information in the Projects section of my portfolio.",
    keywords: ["projects", "work", "portfolio", "built", "developed", "apps"],
  },
  {
    question: "What is your education background?",
    answer: "I graduated from Birla Institute of Technology and Science (BITS), Pilani in 2022 with a B.E. in Electronics and Instrumentation Engineering. During my studies, I developed a strong foundation in programming, algorithms, and problem-solving, which I've applied to my frontend engineering career.",
    keywords: ["education", "degree", "college", "university", "bits", "pilani", "graduation"],
  },
  {
    question: "What are your strengths?",
    answer: "My key strengths include: (1) Performance optimization - I've consistently improved app performance through code splitting and memoization, (2) AI integration expertise - Successfully integrated OpenAI APIs in production, (3) User-centric development - I focus on creating accessible, responsive interfaces, (4) Quick learner - I rapidly adapt to new technologies and frameworks, and (5) Problem-solving - I approach challenges systematically with data-driven solutions.",
    keywords: ["strengths", "skills", "good at", "expertise", "abilities"],
  },
];

/**
 * Resume context - factual information about experience, education, skills
 */
export const RESUME_CONTEXT = `
# Anshuman Singh - Frontend Engineer

## Professional Experience

**Frontend Engineer at HealthPlix Technologies** (July 2022 - Present)
- Integrated AI-powered medical documentation (ScribePad) using OpenAI APIs
- Optimized frontend performance: 25% reduction in re-rendering overhead through memoization and code splitting
- Developed reusable, accessible UI component library with React, TypeScript, and Tailwind CSS
- Integrated analytics pipelines for data-driven product decisions
- Tech Stack: React 18, TypeScript, Tailwind CSS, Zustand, OpenAI APIs, Vite

**Data Science Intern at Aramex India Pvt Ltd** (Aug 2021 - Jan 2022)
- Developed ML model improving address extraction accuracy from 90% to 99%
- Performed data analysis and feature engineering for scalable results
- Tech Stack: Python, Machine Learning, Data Analysis

## Education

**B.E, Electronics and Instrumentation Engineering**
Birla Institute of Technology and Science (BITS), Pilani - 2022

## Technical Skills

**Core:** JavaScript (ES6+), TypeScript, React.js, HTML5, CSS3
**Ecosystem:** Tailwind CSS, Zustand, REST APIs, Vite, Webpack
**Specialties:** AI Integrations, Performance Optimization, Responsive Design, Web Accessibility

## Projects

1. **Snapgram** - Instagram clone with social features (React, TypeScript, Tailwind)
2. **ScribePad** - AI-powered medical documentation (OpenAI integration)
3. **Portfolio** - Modern React portfolio with animations and AI chat
4. **Interactive Games** - Guess Game, Pig Game (JavaScript)

## Interests

Badminton, Sketching, Football, Reading
`;

/**
 * Additional context not in resume - career preferences, availability, etc.
 */
export const ADDITIONAL_CONTEXT = `
## Work Preferences

- **Location:** Currently in Bangalore, India. Open to relocation within India or remote roles.
- **Work Style:** Comfortable with office-based, hybrid, or remote work arrangements.
- **Role Type:** Seeking frontend engineering or full-stack roles with AI/ML focus.
- **Company Stage:** Open to both startups and established companies with strong engineering culture.
- **Team Size:** Comfortable in both small agile teams and larger organizations.

## Availability

- Notice period: Negotiable based on role requirements
- Open to discussing specific timelines
- Available for immediate conversations and interviews

## Career Interests

- AI/ML product development
- Modern frontend frameworks (React, Next.js)
- Performance optimization and scalability
- Developer experience and tooling
- Technical leadership opportunities

## Professional Goals

- Deepen expertise in frontend engineering
- Expand into full-stack development
- Work on impactful AI-powered products
- Eventually lead engineering teams
- Contribute to open-source projects

## Communication

- Preferred contact: Email (check Contact page)
- Response time: Usually within 24 hours
- Available for video calls and phone screens
- Happy to discuss projects and technical challenges
`;

/**
 * System instructions for the AI
 */
export const AI_SYSTEM_INSTRUCTIONS = `
You are Anshuman Singh's AI assistant, helping recruiters and potential employers learn about his professional background.

IMPORTANT GUIDELINES:
1. Be professional, concise, and helpful
2. Focus on career-related questions only
3. Use the FAQ database when available (exact, accurate answers)
4. Reference resume and additional context for other questions
5. Don't make up information - stick to provided context
6. If you don't know something, suggest checking the Contact page or resume
7. Keep responses under 150 words unless detail is specifically requested
8. Be enthusiastic about Anshuman's skills and experience, but factual
9. If asked about specific technologies not mentioned, say "not specified in profile, but happy to learn"
10. Always encourage direct contact for detailed discussions

TONE: Professional yet approachable, confident but humble, helpful and informative.
`;

/**
 * Suggested questions for the chat UI
 */
export const SUGGESTED_QUESTIONS = [
  "What is your experience with React?",
  "Have you worked with AI/ML?",
  "What are your career goals?",
  "Are you open to relocation?",
];
