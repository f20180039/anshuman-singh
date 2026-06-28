import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Import FAQ database from JSON file
const faqDataPath = join(__dirname, '../faq-data.json');
let FAQ_DATABASE, RESUME_CONTEXT, ADDITIONAL_CONTEXT, AI_SYSTEM_INSTRUCTIONS;

try {
  const faqContent = readFileSync(faqDataPath, 'utf-8');
  const faqData = JSON.parse(faqContent);
  FAQ_DATABASE = faqData.FAQ_DATABASE;
  RESUME_CONTEXT = faqData.RESUME_CONTEXT;
  ADDITIONAL_CONTEXT = faqData.ADDITIONAL_CONTEXT;
  AI_SYSTEM_INSTRUCTIONS = faqData.AI_SYSTEM_INSTRUCTIONS;
  console.log(`✅ Loaded ${FAQ_DATABASE.length} FAQ entries`);
} catch (error) {
  console.warn('⚠️  Could not load FAQ database, using fallback');
  FAQ_DATABASE = [];
  RESUME_CONTEXT = '';
  ADDITIONAL_CONTEXT = '';
  AI_SYSTEM_INSTRUCTIONS = 'You are a helpful assistant.';
}

// Initialize Google Gemini
const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

// In-memory rate limiting
const ipLimits = new Map();
const sessionLimits = new Map();

// Utility: Check rate limits
function checkRateLimit(ip, sessionId) {
  const now = Date.now();
  const HOUR_MS = 60 * 60 * 1000;
  const IP_LIMIT = 10; // Increased from 5 to 10
  const SESSION_LIMIT = 15; // Increased from 10 to 15
  const COOLDOWN_MS = 3 * 1000; // Reduced from 60s to 10s

  // IP rate limit
  const ipEntry = ipLimits.get(ip) || { count: 0, firstRequest: now, lastRequest: 0 };

  if (now - ipEntry.firstRequest >= HOUR_MS) {
    ipEntry.count = 0;
    ipEntry.firstRequest = now;
  }

  if (now - ipEntry.lastRequest < COOLDOWN_MS) {
    return {
      allowed: false,
      message: `Please wait ${Math.ceil((COOLDOWN_MS - (now - ipEntry.lastRequest)) / 1000)} seconds before sending another message.`,
    };
  }

  if (ipEntry.count >= IP_LIMIT) {
    return {
      allowed: false,
      message: `Rate limit exceeded. You can send ${IP_LIMIT} messages per hour. Please try again later.`,
    };
  }

  // Session rate limit
  const sessionEntry = sessionLimits.get(sessionId) || { count: 0 };

  if (sessionEntry.count >= SESSION_LIMIT) {
    return {
      allowed: false,
      message: `Session limit reached (${SESSION_LIMIT} messages). Please refresh the page to start a new session.`,
    };
  }

  // Update limits
  ipEntry.count++;
  ipEntry.lastRequest = now;
  ipLimits.set(ip, ipEntry);

  sessionEntry.count++;
  sessionLimits.set(sessionId, sessionEntry);

  return { allowed: true, remaining: { ip: IP_LIMIT - ipEntry.count, session: SESSION_LIMIT - sessionEntry.count } };
}

// Utility: Check if career-related
function isCareerRelated(question) {
  const careerKeywords = [
    'experience', 'work', 'job', 'skills', 'skill', 'project', 'tech', 'stack',
    'react', 'typescript', 'javascript', 'frontend', 'backend', 'developer',
    'salary', 'ctc', 'compensation', 'package', 'notice', 'relocation', 'location',
    'education', 'degree', 'college', 'university', 'career', 'hiring', 'resume',
    'portfolio', 'anshuman', 'about', 'tell me', 'who', 'what', 'where', 'when',
    'why', 'how', 'can you', 'do you', 'have you', 'are you', 'your', 'you',
    'strength', 'weakness', 'team', 'goals', 'aspiration', 'interest', 'hobby',
    'achievement', 'challenge', 'learning', 'remote', 'hybrid', 'office',
  ];

  // Block obvious irrelevant topics
  const irrelevantKeywords = [
    'recipe', 'cook', 'food', 'movie', 'song', 'weather', 'news', 'sport',
    'game', 'travel', 'hotel', 'restaurant', 'shopping', 'price', 'buy',
    'health', 'medical', 'doctor', 'medicine', 'politics', 'religion',
  ];

  const questionLower = question.toLowerCase();

  // Reject if contains irrelevant keywords
  if (irrelevantKeywords.some(keyword => questionLower.includes(keyword))) {
    return false;
  }

  // Accept if contains career keywords OR is a reasonable question length
  return careerKeywords.some(keyword => questionLower.includes(keyword)) ||
         (questionLower.length >= 10 && questionLower.length <= 200);
}

// Utility: Find FAQ match
function findMatchingFAQ(question) {
  const questionLower = question.toLowerCase();

  for (const faq of FAQ_DATABASE) {
    // Check question similarity
    if (faq.question.toLowerCase().includes(questionLower) ||
        questionLower.includes(faq.question.toLowerCase().substring(0, 20))) {
      return faq;
    }

    // Check keywords
    const matchedKeywords = faq.keywords.filter(kw =>
      questionLower.includes(kw.toLowerCase())
    );

    if (matchedKeywords.length >= 2 || (matchedKeywords.length === 1 && faq.keywords.length === 1)) {
      return faq;
    }
  }

  return null;
}

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, conversationHistory = [] } = req.body;

    // Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Sanitize input
    const sanitizedMessage = message.trim().replace(/<[^>]*>/g, '').substring(0, 500);

    if (sanitizedMessage.length < 2) {
      return res.status(400).json({ error: 'Message too short' });
    }

    // Get IP
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';

    // Rate limiting
    const rateLimitCheck = checkRateLimit(ip, sessionId);
    if (!rateLimitCheck.allowed) {
      return res.status(429).json({ error: rateLimitCheck.message });
    }

    // Topic filter
    if (!isCareerRelated(sanitizedMessage)) {
      return res.json({
        response: "I'm here to answer questions about Anshuman Singh's professional background, skills, and career. Please ask about his:\n\n• Work experience and projects\n• Technical skills and expertise\n• Education and certifications\n• Career goals and interests\n• Availability and work preferences\n• Salary expectations and relocation\n\nFeel free to ask any career-related questions!",
        source: 'filter',
      });
    }

    // Check FAQ first
    const faqMatch = findMatchingFAQ(sanitizedMessage);
    if (faqMatch) {
      console.log(`✅ FAQ match for: "${sanitizedMessage.substring(0, 50)}..."`);
      return res.json({
        response: `${faqMatch.answer}\n\n*This is a pre-written answer. Feel free to ask follow-up questions!*`,
        source: 'faq',
        remaining: rateLimitCheck.remaining,
      });
    }

    // Use AI if no FAQ match
    if (!genAI) {
      return res.status(503).json({
        error: 'AI service not configured. Please set GOOGLE_API_KEY environment variable.',
      });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    });

    // Build context
    const fullContext = `${AI_SYSTEM_INSTRUCTIONS}\n\n${RESUME_CONTEXT}\n\n${ADDITIONAL_CONTEXT}`;

    // Keep only last 3 conversation pairs
    const recentHistory = conversationHistory.slice(-6);
    const historyText = recentHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = `${fullContext}\n\n${historyText ? `Previous conversation:\n${historyText}\n\n` : ''}User question: ${sanitizedMessage}\n\nIMPORTANT:
- Answer ONLY about Anshuman Singh using the context provided above
- Speak in first person (I/my) as if you ARE Anshuman
- If the answer is NOT in the context, say: "That information isn't in my profile. Please contact me directly for more details."
- NEVER give generic AI answers or talk about yourself as AI
- Be concise (under 150 words)

Your response:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    console.log(`🤖 AI response for: "${sanitizedMessage.substring(0, 50)}..."`);

    res.json({
      response,
      source: 'ai',
      remaining: rateLimitCheck.remaining,
    });

  } catch (error) {
    console.error('Chat error:', error);

    if (error.message?.includes('API key')) {
      return res.status(503).json({ error: 'AI service configuration error' });
    }

    res.status(500).json({
      error: 'Failed to generate response. Please try again.',
    });
  }
});

export default router;
