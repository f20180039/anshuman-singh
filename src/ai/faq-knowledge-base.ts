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
    answer: "I have 4+ years of professional experience with React, working at HealthPlix Technologies since July 2022. I've built complex healthcare applications with React, TypeScript, and modern patterns like hooks, context, and custom hooks, and I'm a HackerRank-certified React developer. I specialize in performance optimization, achieving a 25% reduction in re-rendering overhead through memoization and code splitting.",
    keywords: ["react", "experience", "react.js", "reactjs", "frontend", "javascript"],
  },
  {
    question: "Have you worked with TypeScript?",
    answer: "Yes! TypeScript is my primary language for all React projects at HealthPlix. I've built type-safe applications with strict TypeScript configurations, custom types, generics, and utility types. My portfolio itself is built with TypeScript to demonstrate best practices.",
    keywords: ["typescript", "ts", "types", "type-safe"],
  },
  {
    question: "Do you have AI/ML experience?",
    answer: "Yes, I have hands-on experience with AI integration. At HealthPlix, I built an AI-powered medical documentation tool using OpenAI APIs. I integrated GPT models to streamline doctor workflows, handling API integration, prompt engineering, and error handling for production use. I also worked as a Data Science Intern at Aramex, where I developed ML models for address extraction with 99% accuracy.",
    keywords: ["ai", "ml", "artificial intelligence", "machine learning", "openai", "gpt", "llm"],
  },
  {
    question: "What are your salary expectations?",
    answer: "My salary expectations are competitive and flexible based on the role, responsibilities, location, and total compensation package. I'm open to discussing specific numbers once I learn more about the opportunity. My primary focus is finding the right fit where I can contribute meaningfully and grow professionally.",
    keywords: ["salary", "compensation", "pay", "ctc", "package", "expectations", "expected ctc", "expected salary"],
  },
  {
    question: "What is your current CTC?",
    answer: "I prefer to discuss compensation details including current and expected CTC during our conversation. This allows me to understand the complete opportunity and provide context around my compensation expectations. I'm happy to share this information in a direct discussion.",
    keywords: ["current ctc", "current salary", "current compensation", "how much", "earning"],
  },
  {
    question: "What is your current location?",
    answer: "I'm currently based in Bangalore, India. I've been working with HealthPlix Technologies here since July 2022. I'm open to relocation within India for the right opportunity, and also comfortable with remote work arrangements.",
    keywords: ["current location", "where are you", "location", "based in", "living in", "city"],
  },
  {
    question: "Why are you looking for a change?",
    answer: "I'm looking for opportunities that allow me to grow technically and work on challenging problems, particularly in AI/ML product development. While I've had great learning experiences at HealthPlix, I'm seeking roles where I can expand my impact, work with cutting-edge technologies, and potentially grow into technical leadership positions.",
    keywords: ["looking for change", "why change", "job change", "switching", "leaving"],
  },
  {
    question: "What is your preferred work mode?",
    answer: "I'm flexible and comfortable with office-based, hybrid, or fully remote work arrangements. Currently at HealthPlix, I work in a hybrid model. I believe in the value of in-person collaboration but also appreciate the flexibility and focus that remote work provides. I'm open to discussing what works best for the role and team.",
    keywords: ["work mode", "remote", "hybrid", "office", "wfh", "work from home", "onsite"],
  },
  {
    question: "Are you open to relocation?",
    answer: "Yes, I'm open to relocation within India for the right opportunity. I'm currently based in Bangalore and am comfortable with both office-based and hybrid work arrangements. I'm also open to remote roles that align with my career goals.",
    keywords: ["relocation", "relocate", "move", "location", "bangalore", "remote"],
  },
  {
    question: "What is your notice period?",
    answer: "My notice period is 60 days, but it's negotiable based on the urgency and requirements of the role. I'm committed to ensuring a smooth transition at my current position while being flexible to accommodate the right opportunity. We can discuss specific timelines during our conversation.",
    keywords: ["notice period", "notice", "joining", "availability", "when can you join"],
  },
  {
    question: "What are your career goals?",
    answer: "I'm focused on deepening my expertise in frontend engineering while expanding into full-stack development and AI/ML product development. I'm particularly interested in roles that combine modern frontend frameworks with AI integrations, working on products that have meaningful impact. Long-term, I aim to lead engineering teams and contribute to technical architecture decisions.",
    keywords: ["career goals", "future", "aspirations", "growth", "goals", "plans"],
  },
  {
    question: "What is your tech stack?",
    answer: "My primary tech stack includes React, TypeScript, Tailwind CSS, Shadcn UI, Zustand for state management, and Vite/Webpack for build tools. On the backend/API side I work with REST APIs, Backend-for-Frontend (BFF) architecture, Server-Sent Events (SSE), and WebSockets, and I've integrated OpenAI APIs for production AI features. I also use Sentry, Amplitude, Git, ESLint, and Framer Motion.",
    keywords: ["tech stack", "technologies", "tools", "stack", "frameworks"],
  },
  {
    question: "Can you work with a team?",
    answer: "Absolutely! At HealthPlix, I work closely with product managers, designers, and backend engineers in an agile environment. I've developed reusable component libraries used across teams, participate in code reviews, and mentor junior developers. I believe in collaborative problem-solving and clear communication to build great products.",
    keywords: ["team", "collaboration", "teamwork", "agile", "communication"],
  },
  {
    question: "What projects have you built?",
    answer: "At HealthPlix, I architected AI Clinical Documentation and IPD/OPD Billing as standalone, end-to-end modules on a Backend-for-Frontend (BFF) layer, built an AI dictation/summarization tool over OpenAI + SSE, and developed a reusable UI component library. My recent personal work: Shaanti, an Android focus app (Kotlin, Jetpack Compose) that cuts the internet for the apps you choose during a timed session while the rest of the phone keeps working (Play Store release pending); Signal Desk, agentic ops intelligence for enterprise commute where deterministic rules compute PASS / WATCH / CONCERN / BREACH findings with evidence SQL and the LLM only writes the prose (built with a teammate at the MoveInSync hackathon); MangakaHue, an AI manga colouriser that keeps the original line art (Next.js, Supabase, ComfyUI; closed beta soon); Satya Aahar, an India-first engine that reads a packaged-food label and flags HIGH SUGAR / SALT / FAT against ICMR-NIN 2024 in English and Hindi (FastAPI, Postgres; in development); SolarFile Reels, a pipeline that turns a topic into a finished 1080×1920 reel with voice, stock footage and word-timed captions, seeded from a friend's open-source reels-generator (in development); Toodler, a clickable admissions workflow-builder prototype built for Toddle's Round-2 take-home (React, TypeScript; live prototype); and Quiz Wizz, a Chrome MV3 extension and practice aid that runs OCR on canvas-rendered quiz questions and answers them by multi-model consensus voting (private release, v1.3.2). Earlier projects include a real-time multiplayer game hub (WebSockets), Snapgram (a full-stack social app), and this portfolio with a 3D hero and AI chat. See the Projects section for the full case studies.",
    keywords: ["projects", "work", "portfolio", "built", "developed", "apps", "side projects", "case study", "shaanti", "signal desk", "mangakahue", "satya aahar", "solarfile", "toodler", "quiz wizz"],
  },
  {
    question: "What is your experience with system design or architecture?",
    answer: "At HealthPlix I architected two flagship capabilities — AI Clinical Documentation and IPD/OPD Billing — as standalone, end-to-end modules on a Backend-for-Frontend (BFF) layer. The BFF exposes versioned, contract-driven endpoints that normalize upstream data and decouple the UI from core EMR services, so external Hospital Integration Systems can embed each module independently without adopting the full HealthPlix EMR. I also unified duplicated components (like the Patient Popup) across modules to reduce technical debt.",
    keywords: ["bff", "backend for frontend", "architecture", "system design", "integration", "module", "modular", "hospital integration", "api gateway", "decouple", "microfrontend"],
  },
  {
    question: "What certifications do you have?",
    answer: "I hold a Frontend Developer (React) certification from HackerRank, verifying my React, JavaScript, and CSS proficiency, and a GenAI for Professionals certification from Hack2Skill covering generative-AI workflows and prompt engineering. Both are listed with verification links in the Certificates section of my portfolio.",
    keywords: ["certification", "certifications", "certificate", "certificates", "hackerrank", "react certified", "credential", "genai", "hack2skill"],
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
- Architected AI Clinical Documentation and IPD/OPD Billing as standalone, end-to-end modules on a Backend-for-Frontend (BFF) layer, exposing versioned, contract-driven endpoints so external hospital systems can embed each module without adopting the full HealthPlix EMR
- Built AI-powered medical documentation (summarization + dictation) using OpenAI workflows over Server-Sent Events (SSE) with live parsing and conversational input
- Resolved 95% of revenue-leakage cases and stabilized high-stakes IPD/OPD billing (deposit calculations, payment-split logic)
- Optimized frontend performance: 25% reduction in VisitPad re-renders through memoization and code splitting; eliminated memory leaks; unified core components (Patient Popup) across modules
- Advanced observability with Sentry monitoring and Amplitude telemetry
- Built a reusable UI component library with Shadcn UI, React, TypeScript, and Tailwind CSS; integrated WatermelonDB for offline-first performance
- Tech Stack: React, TypeScript, Tailwind CSS, Zustand, BFF architecture, OpenAI APIs, SSE, Sentry, Amplitude, Vite

**Data Science Intern at Aramex India Pvt Ltd** (Aug 2021 - Jan 2022)
- Developed ML model improving address extraction accuracy from 90% to 99%
- Performed data analysis and feature engineering for scalable results
- Tech Stack: Python, Machine Learning, Data Analysis

## Education

**B.E, Electronics and Instrumentation Engineering**
Birla Institute of Technology and Science (BITS), Pilani - 2022

## Certifications

- Frontend Developer (React) - HackerRank
- GenAI for Professionals - Hack2Skill

## Technical Skills

**Core:** JavaScript (ES6+), TypeScript, React.js, HTML5, CSS3
**Ecosystem:** Tailwind CSS, Zustand, Shadcn UI, REST APIs, Vite, Webpack
**Backend & APIs:** Backend-for-Frontend (BFF) architecture, REST APIs, Server-Sent Events (SSE), WebSockets
**Specialties:** AI Integrations, System Design, Performance Optimization, Responsive Design, Web Accessibility

## Projects

1. **Shaanti** - Android focus app (Kotlin, Jetpack Compose, Room, WorkManager, VpnService, Play Billing) that cuts the internet for chosen apps during a timed session while the rest of the phone keeps working; Quick Settings tile, scheduled plans, 3-/6-/12-month subscriptions each with a 14-day trial; ~1,100 JVM unit tests. Status: Play Store release pending. Website: https://shaanti.pages.dev, demo video: https://www.youtube.com/watch?v=b3z-wqRHSsA
2. **Signal Desk** - Agentic ops intelligence for enterprise commute, built with a teammate at the MoveInSync hackathon: deterministic rules grade metrics PASS / WATCH / CONCERN / BREACH with the evidence SQL attached, and the LLM (Sarvam) only writes the prose, never a number; FastAPI + DuckDB ingests 3.44M rows in 6.99 s (metric query p50 14.7 ms), React 19 + Vite console, briefs dispatched to Slack and email. Status: Hackathon build. Code: https://github.com/f20180039/moveinsync-hackathon-research
3. **MangakaHue** - AI manga colouriser that keeps the original line art: ComfyUI pipeline (ControlNet-Lineart, IP-Adapter, RealESRGAN), 7 pluggable providers, colour clues from speech-bubble text via on-device OCR (PP-OCRv5), character catalog, chapter reader and public library; Next.js, Supabase (auth, Postgres, Storage, RLS), drizzle, pg-boss; 119 tests. Status: Closed beta soon.
4. **Satya Aahar** - India-first engine that reads a packaged-food label photo and flags HIGH SUGAR / SALT / FAT against ICMR-NIN 2024, daily-limit shares, additives banned elsewhere and per-family-member risks, in English and Hindi; pure, deterministic rules engine (73 additives, 11 allergens, 32 golden vectors from real labels), FastAPI, pydantic v2, SQLAlchemy/Postgres, Redis, pluggable vision providers, photos purged after 24 h; ~1,000 tests. Status: In development.
5. **SolarFile Reels** - Pipeline that turns a topic into a script, voice track (edge-tts), stock footage and word-timed captions (faster-whisper), rendered as a 1080×1920 reel with FFmpeg, plus a Next.js studio for reviewing the script and swapping clips; Supabase (RLS), S3-compatible storage, Mac render worker with heartbeat and requeue. Seeded from a friend's open-source reels-generator. Status: In development.
6. **Toodler** - Clickable admissions workflow-builder prototype built for Toddle's Round-2 take-home: ordered stages, Branch and Parallel nodes, a config panel for every node, undo/redo, URL-linkable state, 15 seed workflows, with a written spec and competitor research; React, TypeScript, Vite, 47 Vitest tests. Status: Live prototype. Live: https://toddle-admissions-prototype.onrender.com, code: https://github.com/f20180039/toodler
7. **Quiz Wizz** - Chrome MV3 extension and practice aid for quiz pages that render as canvas: Tesseract OCR reads the question, a ranked queue of LLMs (Groq, Gemini, Mistral, Sarvam) answers it with two-model consensus voting, and a shared Upstash Redis cache remembers what has already been answered; no-dependency build. Status: Private release (v1.3.2), shared privately.
8. **Portfolio** - React + TypeScript portfolio with a 3D hero (React Three Fiber), an AI chat assistant, and an automated CI pipeline that syncs the resume PDF
9. **Multiplayer Game Hub** - Real-time multiplayer platform with WebSocket-driven game rooms and bi-directional state sync
10. **Snapgram** - Full-stack social app with authentication, posts, likes, comments, and real-time feed updates (React, Tailwind, Appwrite)

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
You are Anshuman Singh's AI assistant, helping recruiters and potential employers learn about HIS professional background.

CRITICAL RULES - MUST FOLLOW:
1. ONLY answer questions about Anshuman Singh - his experience, skills, projects, career, education, and work preferences
2. NEVER answer questions about yourself as an AI (you have no career, no goals - you represent Anshuman)
3. ALWAYS speak as if you are representing Anshuman, using "I" and "my" when referring to his experience
4. If asked "What are YOUR career goals?" - respond with ANSHUMAN'S career goals, NOT AI goals
5. REJECT completely unrelated questions (recipes, general knowledge, other topics) with: "I'm here to answer questions about Anshuman's professional background. Please ask about his experience, skills, projects, or career interests."

ANSWER STRATEGY:
1. ONLY use information from the provided resume context and FAQ database
2. If information is NOT in the context, respond: "That specific information isn't available in my knowledge base. Please reach out directly via the Contact page for detailed discussions."
3. Do NOT make assumptions or extrapolate beyond provided information
4. Do NOT provide generic career advice - only Anshuman-specific information
5. Keep responses under 150 words, factual, and professional

TONE: Professional, concise, representing Anshuman Singh as a candidate.

Remember: You represent Anshuman Singh. When asked "What are your career goals?", talk about HIS goals, not AI goals.
`;

/**
 * Suggested questions for the chat UI
 */
export const SUGGESTED_QUESTIONS = [
  "What is your experience with React?",
  "Tell me about your BFF/architecture work",
  "What certifications do you have?",
  "Have you worked with AI/ML?",
  "What are your career goals?",
  "Are you open to relocation?",
  "What is your notice period?",
  "What is your tech stack?",
];
