# Phase 3: AI Agent Flow - Setup Guide

## Overview

An AI-powered chat assistant integrated into your portfolio, allowing recruiters to ask questions about your background, skills, and experience.

## Features

✅ **FAQ-First Strategy** - Pre-written answers for common questions (70%+ hit rate)  
✅ **Google Gemini Integration** - Free tier, $0/month cost  
✅ **Strict Guardrails** - Topic filtering, rate limiting, session limits  
✅ **Beautiful UI** - Floating chat button, animated window, mobile-responsive  
✅ **Smart Matching** - Fuzzy keyword matching for FAQ lookup  
✅ **Rate Limiting** - 5 messages/hour per IP, 10 messages/session  

## Setup Instructions

### Step 1: Install Server Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Web server
- `@google/generative-ai` - Google Gemini SDK
- `cors` - Cross-origin requests
- `express-rate-limit` - Rate limiting (backup)
- `dotenv` - Environment variables

### Step 2: Get Google Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key

**Free Tier Limits:**
- 15 requests per minute
- 1,500 requests per day
- 1 million requests per month
- **Cost: $0** for typical portfolio usage

### Step 3: Configure Environment Variables

Create `.env` file in the **root** directory:

```bash
# In /Users/anshumansingh/Desktop/my-portfolio/.env
GOOGLE_API_KEY=your_actual_api_key_here
VITE_API_URL=http://localhost:3001
```

**For Production** (Render):
- Set `GOOGLE_API_KEY` in Render dashboard
- Set `VITE_API_URL` to your Render web service URL

### Step 4: Test Locally

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

You should see:
```
✅ Server running on port 3001
🌍 Environment: development
🤖 AI Chat: Configured
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

Visit: http://localhost:5173/anshuman-singh/

You should see:
- Floating chat button (bottom-right)
- Click to open chat window
- Try asking: "What is your experience with React?"

### Step 5: Update FAQ Database

Edit `src/ai/faq-knowledge-base.ts` to add your FAQs:

```typescript
export const FAQ_DATABASE: FAQItem[] = [
  {
    question: "Your question here?",
    answer: "Your detailed answer here.",
    keywords: ["keyword1", "keyword2", "keyword3"],
  },
  // Add more...
];
```

**Best Practices:**
- Add 10-15 FAQs covering common recruiter questions
- Use 3-5 keywords per FAQ
- Keep answers under 150 words
- Update based on actual questions asked

## Deployment to Render

### Option 1: Single Web Service (Simpler)

1. **Create Render Account:** https://render.com/
2. **New Web Service:** Connect GitHub repo
3. **Settings:**
   - **Build Command:** `npm install && cd server && npm install`
   - **Start Command:** `cd server && node index.js`
   - **Environment:** Add `GOOGLE_API_KEY`
4. **Deploy!**

Frontend needs to be deployed separately (Render Static Site or keep GitHub Pages).

### Option 2: Two Services (Recommended)

**Service 1: Static Site (Frontend)**
- Build Command: `npm run build`
- Publish Directory: `dist`
- Free tier, always-on

**Service 2: Web Service (Backend)**
- Build Command: `cd server && npm install`
- Start Command: `cd server && node index.js`
- Environment: `GOOGLE_API_KEY`, `NODE_ENV=production`
- Free tier, spins down after 15min inactivity (cold start ~500ms)

**Update Frontend Config:**
In production build, set:
```bash
VITE_API_URL=https://your-backend.onrender.com
```

## Security Checklist

✅ **API Key Protected** - Never in frontend code  
✅ **Rate Limiting** - 5 msg/hr per IP, 10 msg/session  
✅ **Topic Filtering** - Only career-related questions  
✅ **Input Sanitization** - Remove HTML, limit length  
✅ **CORS Configured** - Whitelist your domain  
✅ **Content Safety** - Google's safety filters enabled  
✅ **Session Limits** - 10 messages then refresh  
✅ **Cooldown** - 1 minute between messages  

## Testing

### Test FAQ Matching

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is your experience with React?",
    "sessionId": "test-session"
  }'
```

Should return FAQ answer instantly (source: "faq").

### Test AI Fallback

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about your problem-solving approach",
    "sessionId": "test-session"
  }'
```

Should use AI (source: "ai").

### Test Rate Limiting

Send 6 messages rapidly:
```bash
for i in {1..6}; do
  curl -X POST http://localhost:3001/api/chat \
    -H "Content-Type: application/json" \
    -d "{\"message\": \"Test $i\", \"sessionId\": \"test\"}"
  echo ""
done
```

6th should return 429 error.

### Test Topic Filter

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the weather today?",
    "sessionId": "test-session"
  }'
```

Should reject with filter message.

## Monitoring

### Check Logs

**Development:**
```bash
cd server
npm start
# Watch console for requests
```

**Production (Render):**
- Go to Render dashboard
- Select your web service
- Click "Logs" tab
- See real-time requests and responses

### Track Usage

**Google AI Studio:**
1. https://makersuite.google.com/app/apikey
2. Click your API key
3. View usage metrics
4. Set up quotas/alerts

### Monitor Costs

FAQ hit rate (from logs):
```bash
grep "FAQ match" server.log | wc -l
grep "AI response" server.log | wc -l
```

**Target:** 70%+ FAQ hits, 30% AI calls

## Troubleshooting

### Issue: "AI service not configured"

**Solution:**
```bash
# Check .env file exists
ls -la .env

# Check key is loaded
cd server
node -e "require('dotenv').config(); console.log(process.env.GOOGLE_API_KEY ? 'Key loaded' : 'Key missing')"
```

### Issue: CORS error in browser

**Solution:** Update `server/index.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://yourdomain.com'],
  credentials: true,
}));
```

### Issue: "Rate limit exceeded"

**Solution:** Wait 1 hour or refresh page (new session).

### Issue: Cold start delay (Render)

**Solution:** 
- Render free tier spins down after 15min
- First request takes ~500ms to wake up
- Subsequent requests are fast
- Upgrade to paid tier ($7/month) for always-on

### Issue: FAQ not matching

**Solution:**
- Add more keywords to FAQ
- Check question phrasing in FAQ database
- Test with `findMatchingFAQ()` function
- Lower similarity threshold if needed

## Customization

### Change AI Model

In `server/api/chat.js`:
```javascript
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro', // More capable, slower, higher cost
  // or: 'gemini-1.5-flash' // Faster, cheaper (default)
});
```

### Adjust Rate Limits

In `server/api/chat.js`:
```javascript
const IP_LIMIT = 10; // messages per hour (was 5)
const SESSION_LIMIT = 20; // messages per session (was 10)
const COOLDOWN_MS = 30 * 1000; // 30 seconds (was 60)
```

### Change Chat UI

In `src/features/ai-chat/AIChatWindow.tsx`:
- Modify colors, sizes, animations
- Change greeting message
- Add/remove suggested questions
- Customize mobile layout

### Update FAQ

Edit `src/ai/faq-knowledge-base.ts`:
- Add new FAQs based on actual questions
- Update answers as your experience changes
- Rebuild frontend to apply changes

## Cost Estimates

**Scenario 1: Light Usage (10 visitors/day)**
- 10 visitors × 3 questions = 30 questions/day
- FAQ hit rate: 70% = 21 FAQ (free)
- AI calls: 30% = 9 AI calls/day
- Monthly: 270 AI calls (well within 1M free tier)
- **Cost: $0/month**

**Scenario 2: Medium Usage (50 visitors/day)**
- 50 visitors × 3 questions = 150 questions/day
- FAQ: 105, AI: 45
- Monthly: 1,350 AI calls
- **Cost: $0/month**

**Scenario 3: Heavy Usage (200 visitors/day)**
- 200 visitors × 3 questions = 600 questions/day
- FAQ: 420, AI: 180
- Monthly: 5,400 AI calls
- **Cost: $0/month** (still under 1M)

**Exceeding Free Tier:**
- If >33,000 AI calls/month (1M ÷ 30)
- Cost: $0.075/1M input + $0.30/1M output
- ~500 input + 300 output tokens per call
- Cost per 10K calls: ~$0.15
- **Very unlikely for a portfolio**

## Maintenance

### Weekly

- Check Render logs for errors
- Monitor FAQ hit rate
- Review Google AI usage

### Monthly

- Update FAQ based on common questions
- Check rate limiting effectiveness
- Review and optimize responses
- Update resume context if career changes

### Quarterly

- Review AI model performance
- Consider upgrading to Pro if needed
- Analyze conversation patterns
- Optimize FAQ keywords

## Summary

✨ **Zero-maintenance AI chat**  
🆓 **$0/month with free tier**  
🔒 **Secure with multiple guardrails**  
📱 **Mobile-responsive UI**  
⚡ **Fast FAQ responses**  
🎯 **70%+ questions handled by FAQ**  

Your portfolio now has an intelligent assistant! 🤖
