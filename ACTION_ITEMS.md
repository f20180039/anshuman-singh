# Action Items & Setup Checklist 📋

This file contains all the steps you need to complete **outside this codebase** to fully activate your portfolio.

---

## 🎯 Quick Overview

- **Phase 1 (Design)**: ✅ Ready (works immediately after push)
- **Phase 2 (Resume Sync)**: ⏳ Needs GitHub Actions permissions
- **Phase 3 (AI Chat)**: ⏳ Needs API key + deployment

**Estimated Time:** 30-45 minutes total

---

## Step 1: Commit & Push to GitHub (5 minutes)

### 1.1 Review Changes
```bash
cd /Users/anshumansingh/Desktop/my-portfolio
git status
git diff --stat
```

### 1.2 Commit Everything
```bash
git add .

git commit -m "feat: complete portfolio modernization (Phases 1-3)

- Phase 1: Modern design with animations, dark theme, optimized images
- Phase 2: Automated resume sync from latex-resume-builder
- Phase 3: AI chat with Google Gemini integration

All features implemented and documented."

git push origin master
```

**✅ After this step:**
- Phase 1 (Design) will be live on GitHub Pages
- Resume sync workflow will be available in Actions tab
- AI chat components ready (needs backend deployment)

---

## Step 2: Enable Resume Auto-Sync (10 minutes)

### 2.1 Enable GitHub Actions Permissions

**In my-portfolio repo:**
1. Go to: https://github.com/f20180039/my-portfolio/settings/actions
2. Under "Workflow permissions"
3. Select: ✅ **"Read and write permissions"**
4. Check: ✅ **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### 2.2 Test Manual Sync (First Time)

1. Go to: https://github.com/f20180039/my-portfolio/actions
2. Click: **"Sync Resume from LaTeX Builder"**
3. Click: **"Run workflow"** dropdown
4. Branch: `master`
5. Click green **"Run workflow"** button
6. Wait ~60 seconds
7. Refresh page - should see green ✅

**Troubleshooting:**
- ❌ Red X? Click it to see error logs
- Common issue: No PDF in latex-resume-builder
- Solution: Ensure latex repo has releases with PDF

### 2.3 (OPTIONAL) Setup Webhook for Auto-Sync

**Only do this if you want automatic sync when latex repo updates**

**Step A: Create Personal Access Token (PAT)**

1. Go to: https://github.com/settings/tokens/new
2. Note: `Portfolio Resume Sync`
3. Expiration: `No expiration` (or 1 year)
4. Scopes: ✅ Check **`repo`** (all sub-boxes)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
   - Example: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

**Step B: Add Token to latex-resume-builder**

1. Go to: https://github.com/f20180039/latex-resume-builder/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `PORTFOLIO_SYNC_TOKEN`
4. Secret: Paste the PAT you copied
5. Click **"Add secret"**

**Step C: Create Workflow in latex-resume-builder**

See [Step 3 in latex-resume-builder section](#step-3-optional-webhook-in-latex-resume-builder-repo) below.

---

## Step 3: (OPTIONAL) Webhook in latex-resume-builder Repo

**Skip this if you're happy with manual sync!**

### 3.1 Create Workflow File

In `latex-resume-builder` repo, create:

`.github/workflows/notify-portfolio.yml`

```yaml
name: Notify Portfolio on Resume Update

on:
  push:
    branches: [main]
    paths:
      - '**.pdf'
      - '**.tex'
      - '**.cls'

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger portfolio resume sync
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{ secrets.PORTFOLIO_SYNC_TOKEN }}" \
            https://api.github.com/repos/f20180039/my-portfolio/dispatches \
            -d '{"event_type":"resume_updated"}'
          
          echo "✅ Portfolio sync triggered successfully"
```

### 3.2 Test It

1. Make a small change to your resume in latex-resume-builder
2. Commit and push to main branch
3. Check this workflow runs (latex repo Actions tab)
4. Check portfolio sync workflow triggers (portfolio repo Actions tab)

**✅ After this step:**
- Resume auto-syncs whenever you update latex repo
- No manual intervention needed

---

## Step 4: Get Google Gemini API Key (5 minutes)

### 4.1 Create API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click **"Create API Key"**
4. Select: **"Create API key in new project"** (or use existing)
5. **COPY THE KEY** - looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### 4.2 Test API Key (Optional)

```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

Should return JSON response (not error).

### 4.3 Create .env File

**In portfolio repo root:**

```bash
cd /Users/anshumansingh/Desktop/my-portfolio

# Create .env file
cat > .env << 'EOF'
# Google Gemini API Key
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# API URL (local development)
VITE_API_URL=http://localhost:3001

# Node Environment
NODE_ENV=development
EOF

# Replace the X's with your actual key!
```

**⚠️ IMPORTANT:** Replace `AIzaSyXXX...` with your **actual API key**!

### 4.4 Verify .env File

```bash
cat .env
# Should show your key
```

**✅ After this step:**
- API key ready for local testing
- .env is in .gitignore (won't be committed)

---

## Step 5: Test AI Chat Locally (10 minutes)

### 5.1 Install Server Dependencies

```bash
cd /Users/anshumansingh/Desktop/my-portfolio/server
npm install
```

Should install:
- `express`
- `@google/generative-ai`
- `cors`
- `express-rate-limit`
- `dotenv`

### 5.2 Start Backend Server

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

**Troubleshooting:**
- ❌ "API key not configured" → Check .env file exists in root (not server/)
- ❌ Port 3001 in use → Kill process: `lsof -ti:3001 | xargs kill`

### 5.3 Start Frontend (New Terminal)

```bash
cd /Users/anshumansingh/Desktop/my-portfolio
npm run dev
```

### 5.4 Test Chat

1. Open: http://localhost:5173/anshuman-singh/
2. Look for **floating chat button** (bottom-right corner)
3. Click the button
4. Chat window should open with greeting
5. Click suggested question: **"What is your experience with React?"**
6. Should get instant response from FAQ

**Test More:**
- Try: "Tell me about your problem-solving approach" (should use AI)
- Try: "What's the weather?" (should reject - not career-related)
- Send 6 messages rapidly (6th should hit rate limit)

### 5.5 Check Logs

Backend terminal should show:
```
✅ FAQ match for: "What is your experience with React?"
🤖 AI response for: "Tell me about your problem..."
```

**✅ After this step:**
- AI chat fully functional locally
- Ready for production deployment

---

## Step 6: Deploy to Production (15 minutes)

### Option A: Backend on Render + Frontend on GitHub Pages

**Recommended: Keeps current GitHub Pages setup**

#### 6.1 Create Render Account

1. Go to: https://render.com/
2. Sign up with GitHub (easiest)

#### 6.2 Deploy Backend (Web Service)

1. Dashboard → **"New"** → **"Web Service"**
2. Connect GitHub account (if not connected)
3. Select repository: **`my-portfolio`**
4. Configure:
   - **Name:** `my-portfolio-backend` (or any name)
   - **Region:** Choose closest to you
   - **Branch:** `master`
   - **Root Directory:** Leave empty
   - **Runtime:** `Node`
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && node index.js`
   - **Instance Type:** `Free` (starts at $0, spins down after 15min)
5. **Environment Variables:** Click "Advanced"
   - Key: `GOOGLE_API_KEY`
   - Value: `AIzaSyXXXXXXXXXXXXXXXXXX` (your actual key)
   - Click **"Add"**
   - Key: `NODE_ENV`
   - Value: `production`
   - Click **"Add"**
6. Click **"Create Web Service"**
7. Wait 2-3 minutes for deployment
8. **COPY THE URL** - looks like: `https://my-portfolio-backend-xxxx.onrender.com`

#### 6.3 Test Backend

```bash
curl https://your-backend-url.onrender.com/health
```

Should return: `{"status":"ok",...}`

#### 6.4 Update Frontend Configuration

**In portfolio repo:**

```bash
cd /Users/anshumansingh/Desktop/my-portfolio

# Add to package.json scripts for production build
# Or create .env.production file
cat > .env.production << 'EOF'
VITE_API_URL=https://your-backend-url.onrender.com
EOF

# Replace with your actual Render URL!
```

#### 6.5 Rebuild and Deploy Frontend

```bash
# Build with production env
npm run build

# Deploy to GitHub Pages
npm run deploy
# OR if you have a different deploy command

# Or push and let GitHub Actions handle it
git add .env.production
git commit -m "chore: add production API URL"
git push origin master
```

#### 6.6 Test Production

1. Visit: https://f20180039.github.io/my-portfolio/ (or your domain)
2. Click chat button
3. Should work!

**Note:** First message might take 5-10 seconds if backend was sleeping (cold start).

---

### Option B: Full Render Deployment

**Alternative: Deploy both frontend and backend on Render**

#### Create Static Site (Frontend)

1. Render Dashboard → **"New"** → **"Static Site"**
2. Select: `my-portfolio` repo
3. Configure:
   - **Name:** `my-portfolio`
   - **Branch:** `master`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Environment Variables:**
     - `VITE_API_URL` = `https://your-backend-url.onrender.com`
4. Click **"Create Static Site"**

#### Create Web Service (Backend)

Same as Option A Step 6.2 above.

**✅ After this step:**
- AI chat live in production
- Accessible to recruiters 24/7

---

## Step 7: Update FAQ Database (Ongoing)

### 7.1 Add Your Personal Answers

Edit: `src/ai/faq-knowledge-base.ts`

Review the 12 FAQs and **update with your actual answers**:
- Salary expectations
- Notice period details
- Specific project details
- Personal preferences

### 7.2 Add More FAQs as Needed

Based on questions recruiters actually ask, add more:

```typescript
{
  question: "Your new question?",
  answer: "Your detailed answer here.",
  keywords: ["keyword1", "keyword2", "keyword3"],
},
```

### 7.3 Rebuild After FAQ Changes

```bash
npm run build
npm run deploy  # or git push
```

---

## Step 8: Configure Production URLs (5 minutes)

### 8.1 Update CORS in Backend

Edit: `server/index.js`

Replace:
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://yourdomain.com', 'https://www.yourdomain.com']
  : ['http://localhost:5173', 'http://localhost:3000'],
```

With your actual domain:
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://f20180039.github.io', 'https://yourdomain.com']  // Your actual URLs
  : ['http://localhost:5173', 'http://localhost:3000'],
```

### 8.2 Commit and Redeploy

```bash
git add server/index.js
git commit -m "chore: update CORS for production"
git push origin master
```

Render will auto-redeploy backend.

---

## Step 9: Monitor and Maintain (Weekly)

### 9.1 Weekly Checks

**Resume Sync:**
- https://github.com/f20180039/my-portfolio/actions
- Check recent "Sync Resume" runs
- All should be green ✅

**AI Chat Backend:**
- https://dashboard.render.com/
- Check logs for errors
- Monitor request count

**Google AI Usage:**
- https://makersuite.google.com/app/apikey
- Click your API key
- Check usage metrics
- Ensure under 1M requests/month (free tier)

### 9.2 Update FAQ Monthly

Based on questions asked, update:
- `src/ai/faq-knowledge-base.ts`

Track common questions in logs:
```bash
# In Render dashboard, search logs for:
"FAQ match for:"     # FAQ hits
"AI response for:"   # AI fallback hits
```

### 9.3 Update Resume Context

When your experience changes:
- Update `RESUME_CONTEXT` in `faq-knowledge-base.ts`
- Update `ADDITIONAL_CONTEXT` if preferences change

---

## ✅ Final Checklist

### This Repo (my-portfolio)

- [ ] Step 1: Committed and pushed all changes
- [ ] Step 2.1: Enabled GitHub Actions write permissions
- [ ] Step 2.2: Tested resume sync manually (got green ✅)
- [ ] Step 4.3: Created .env with Google API key
- [ ] Step 5: Tested AI chat locally (works!)
- [ ] Step 6: Deployed backend to Render
- [ ] Step 6.4: Updated frontend with production API URL
- [ ] Step 6.5: Deployed frontend
- [ ] Step 6.6: Tested AI chat in production (works!)
- [ ] Step 7: Updated FAQ with your personal answers
- [ ] Step 8: Configured CORS for production URLs

### latex-resume-builder Repo (Optional)

- [ ] Step 2.3A: Created Personal Access Token (PAT)
- [ ] Step 2.3B: Added `PORTFOLIO_SYNC_TOKEN` secret
- [ ] Step 3.1: Created `.github/workflows/notify-portfolio.yml`
- [ ] Step 3.2: Tested webhook (works!)

### External Services

- [ ] GitHub Actions: Write permissions enabled
- [ ] Google AI Studio: API key created and tested
- [ ] Render: Account created
- [ ] Render: Backend deployed and tested
- [ ] Render: Environment variables set

---

## 🎯 Success Criteria

You'll know everything works when:

✅ **Design:**
- Visit your portfolio → see dark theme, animations, modern backgrounds

✅ **Resume Sync:**
- GitHub Actions → "Sync Resume" workflow → green ✅
- Check `public/resumes/backups/` → see backup PDFs

✅ **AI Chat:**
- Click chat button → window opens
- Ask "What is your experience with React?" → instant FAQ answer
- Ask custom question → AI responds in ~2 seconds
- Send 6 messages → 6th hits rate limit

---

## 🆘 Need Help?

### Common Issues

**"API key not configured"**
→ Check `.env` file exists in **root** directory (not server/)
→ Verify key starts with `AIzaSy`

**"CORS error"**
→ Update `server/index.js` with your production domain
→ Redeploy backend

**"Resume sync failed"**
→ Check latex-resume-builder has releases with PDF
→ Or PDF file in main branch

**"Backend not responding"**
→ Render free tier spins down after 15min
→ First request takes ~5 seconds (cold start)
→ This is normal, not an error

### Documentation

- Setup Guide: `docs/PHASE3_SETUP.md`
- Complete Summary: `docs/COMPLETE_IMPLEMENTATION_SUMMARY.md`
- Resume Sync: `docs/RESUME_SYNC_SETUP.md`

---

## 🎉 You're Done When...

All checkboxes above are checked ✅

**Then you'll have:**
- Modern, animated portfolio (live on GitHub Pages)
- Automated resume sync (runs on schedule or webhook)
- 24/7 AI assistant for recruiters (deployed on Render)
- All for **$0/month**! 🎊

---

## 📝 Notes

- Keep your `.env` file **local only** (never commit it)
- API keys are in `.gitignore` (safe)
- Free tier limits are generous (1M requests/month)
- Backend cold starts are normal on free tier (~5 seconds)
- Monitor weekly, update FAQ monthly

**You've got this! 💪**
