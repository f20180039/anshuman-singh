# AI Chat Testing Guide 🤖

## ✅ Setup Complete!

Your AI chat feature is fully configured and ready to test. Here's what's been set up:

### What's Configured:
- ✅ `.env` file with Google API key and configuration
- ✅ Server dependencies installed (73 packages)
- ✅ Backend server fixed to load `.env` from parent directory
- ✅ Frontend connected to backend API
- ✅ FAQ knowledge base with 12+ pre-written answers
- ✅ Rate limiting (5 messages/hour per IP, 10 per session)
- ✅ Career-topic filtering

---

## 🚀 How to Test Locally

### Step 1: Get a Real Google API Key

**Important:** The current API key in `.env` is a dummy placeholder. You need to replace it with a real one:

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIzaSy...`)
5. Replace the `GOOGLE_API_KEY` value in `.env` file

### Step 2: Start the Backend Server

Open a new terminal and run:

```bash
cd /Users/anshumansingh/Desktop/my-portfolio/server
npm start
```

**Expected output:**
```
✅ Server running on port 3001
🌍 Environment: development
🤖 AI Chat: Configured
```

**If you see "NOT configured":** Your API key is not loaded correctly.

### Step 3: Start the Frontend

Open a **NEW terminal** (keep the backend running) and run:

```bash
cd /Users/anshumansingh/Desktop/my-portfolio
npm run dev
```

### Step 4: Test in Browser

1. Open: http://localhost:5173/anshuman-singh/
2. Look for the **floating chat button** in the bottom-right corner
3. Click it to open the chat window

---

## 🧪 Test Cases

### Test 1: FAQ Response (Instant)
**Try:** "What is your experience with React?"

**Expected:**
- ✅ Instant response (no delay)
- ✅ Pre-written answer from FAQ database
- ✅ Message shows "(This is a pre-written answer...)"

### Test 2: AI Response (2-3 seconds)
**Try:** "Tell me about your problem-solving approach"

**Expected:**
- ✅ 2-3 second delay (AI processing)
- ✅ Personalized response based on resume context
- ✅ No FAQ disclaimer

### Test 3: Topic Filter
**Try:** "What's the weather like today?"

**Expected:**
- ✅ Instant response
- ✅ Message: "I'm here to help with questions about Anshuman's professional background..."

### Test 4: Rate Limiting
**Try:** Send 6 messages quickly

**Expected:**
- ✅ First 5 messages work
- ✅ 6th message: Rate limit error (wait 60 seconds)

### Test 5: Suggested Questions
**Try:** Click any of the suggested question chips

**Expected:**
- ✅ Question auto-fills and sends
- ✅ Gets appropriate response

---

## 🔍 How to Monitor

### Backend Logs
Watch the terminal where you ran `npm start`. You should see:

```
✅ FAQ match for: "What is your experience..."
🤖 AI response for: "Tell me about your..."
```

### Browser Console
Open DevTools (F12) and check Console for:
- API calls to `http://localhost:3001/api/chat`
- Remaining quota logs: `Remaining: IP 4/5, Session 9/10`

---

## 🐛 Troubleshooting

### "AI service not configured"
**Cause:** API key not loaded or invalid

**Fix:**
1. Check `.env` file has correct `GOOGLE_API_KEY`
2. Restart backend server
3. Verify key starts with `AIzaSy`

### "Failed to fetch"
**Cause:** Backend not running or CORS issue

**Fix:**
1. Check backend terminal - is it running?
2. Check backend shows: `✅ Server running on port 3001`
3. Try: `curl http://localhost:3001/health`

### Chat button not visible
**Cause:** Frontend not loading components

**Fix:**
1. Check browser console for errors
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "Rate limit exceeded"
**Cause:** Sent too many messages

**Fix:**
- Wait 60 seconds
- Or restart backend (clears in-memory rate limits)

---

## 📊 Features Explained

### 1. FAQ System
- 12+ pre-written answers for common questions
- Instant responses (no API calls)
- Keyword matching for flexibility
- Located: `src/ai/faq-knowledge-base.ts`

### 2. AI Fallback
- Uses Google Gemini 1.5 Flash model
- Responses based on resume context
- Keeps last 3 conversation pairs for context
- Safety filters enabled

### 3. Rate Limiting
- **IP-based:** 5 messages per hour
- **Session-based:** 10 messages per session
- **Cooldown:** 60 seconds between messages
- Prevents abuse and API quota exhaustion

### 4. Topic Filtering
- Only answers career-related questions
- Rejects weather, sports, politics, etc.
- Keeps conversations professional

---

## 📝 Customization

### Update FAQ Answers
Edit: `src/ai/faq-knowledge-base.ts`

```typescript
{
  question: "What is your expected salary?",
  answer: "30 LPA",
  keywords: ["salary", "compensation", "ctc"],
}
```

### Update Resume Context
Same file, update `RESUME_CONTEXT` with your actual background.

### Change Rate Limits
Edit: `server/api/chat.js`

```javascript
const IP_LIMIT = 5;        // Change to 10, 20, etc.
const SESSION_LIMIT = 10;  // Change as needed
const COOLDOWN_MS = 60 * 1000;  // 60 seconds
```

---

## 🚀 Deployment (Production)

Once local testing works, follow these steps to deploy:

### Option 1: Render (Recommended, Free Tier)

**Backend:**
1. Sign up at: https://render.com
2. Create "Web Service"
3. Connect GitHub repo
4. Set:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node index.js`
   - Environment Variables:
     - `GOOGLE_API_KEY=your_real_key`
     - `NODE_ENV=production`
5. Copy the deployed URL (e.g., `https://your-app.onrender.com`)

**Frontend:**
1. Create `.env.production`:
   ```
   VITE_API_URL=https://your-app.onrender.com
   ```
2. Build and deploy:
   ```bash
   npm run build
   git add .env.production
   git commit -m "chore: add production API URL"
   git push
   ```

**Update CORS:**
Edit `server/index.js`:
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://f20180039.github.io', 'https://yourdomain.com']
  : ['http://localhost:5173'],
```

---

## ✅ Success Checklist

Before considering it "done":

- [ ] Real Google API key configured (not dummy)
- [ ] Backend starts without errors
- [ ] Frontend shows chat button
- [ ] FAQ questions work (instant response)
- [ ] AI questions work (2-3 second delay)
- [ ] Topic filter rejects non-career questions
- [ ] Rate limiting kicks in after 5 messages
- [ ] Updated FAQ with your personal answers
- [ ] Tested suggested questions
- [ ] No errors in browser console
- [ ] No errors in backend terminal

---

## 💡 Pro Tips

1. **Test with real questions:** Ask yourself what recruiters would actually ask
2. **Update FAQs regularly:** Based on questions you actually get
3. **Monitor API usage:** Check Google AI Studio dashboard weekly
4. **Backend cold starts:** Render free tier sleeps after 15min inactivity (first request takes ~5s)
5. **Keep context updated:** Update resume context when your experience changes

---

## 🎯 What Recruiters Will See

When a recruiter visits your portfolio:

1. **Sees floating chat button** (bottom-right)
2. **Clicks it** → Chat window opens with greeting
3. **Asks about React experience** → Instant, detailed FAQ answer
4. **Asks follow-up** → AI generates personalized response
5. **Impressed** by 24/7 AI assistant on your portfolio! 🎉

---

## 📞 Need Help?

- **Google API Issues:** https://ai.google.dev/docs
- **Render Deployment:** https://render.com/docs
- **GitHub Actions:** Check the Actions tab for deployment logs

---

**You're all set! 🚀 Just replace the API key and start testing!**
