# Action Items & Setup Checklist 📋

This file contains all the steps you need to complete to make your portfolio **production-ready**.

---

## 🎯 Current Status

- **Phase 1 (Design & Resume Preview)**: ✅ Complete
- **Phase 2 (Resume Sync)**: ✅ Complete (workflow fixed, local testing script ready)
- **Phase 3 (AI Chat)**: ✅ Complete (needs API key & deployment)

**What's Done:**
- ✅ Resume sync workflow fixed (downloads correct PDF)
- ✅ Local testing script created (`scripts/sync-resume-local.sh`)
- ✅ Resume preview page added
- ✅ AI chat feature fully implemented
- ✅ Server dependencies installed
- ✅ Helper scripts created for testing

**What's Needed:**
- 🔑 Replace dummy Google API key with real one
- 🚀 Deploy backend to Render (free)
- 🌐 Update production URLs
- ✅ Enable GitHub Actions permissions

**Estimated Time:** 30-45 minutes total

---

## Step 1: Local Testing First (10 minutes)

Before deploying to production, test everything locally to ensure it works.

### 1.1 Get Real Google API Key

**Current Status:** Dummy key in `.env` for security

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Select: **"Create API key in new project"** (or use existing)
5. **COPY THE KEY** - looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
6. Open `.env` file in project root
7. Replace the `GOOGLE_API_KEY` value with your real key:
   ```
   GOOGLE_API_KEY=AIzaSy_YOUR_ACTUAL_KEY_HERE
   ```
8. Save the file

### 1.2 Test AI Chat Locally

**Option A: Quick Start (One Command)**
```bash
./start-chat-test.sh
```

**Option B: Manual (Two Terminals)**

Terminal 1 - Start Backend:
```bash
cd server
npm start
```

Expected output:
```
✅ Server running on port 3001
🌍 Environment: development
🤖 AI Chat: Configured  ← Should say "Configured" not "NOT configured"
```

Terminal 2 - Start Frontend:
```bash
npm run dev
```

### 1.3 Test in Browser

1. Open: http://localhost:5173/anshuman-singh/
2. Click the chat button (bottom-right corner)
3. Test these scenarios:
   - ✅ "What is your experience with React?" → Should get instant FAQ response
   - ✅ "Tell me about your problem-solving approach" → Should get AI response (2-3 sec)
   - ✅ "What's the weather?" → Should reject (not career-related)
   - ✅ Send 6 messages quickly → 6th should hit rate limit

**If everything works, proceed to deployment!**

---

## Step 2: Commit & Push to GitHub (5 minutes)

### 1.1 Review Changes
```bash
cd /Users/anshumansingh/Desktop/my-portfolio
git status
git diff --stat
```

### 2.1 Review Changes
```bash
git status
git diff --stat
```

### 2.2 Commit Everything

**⚠️ IMPORTANT:** Make sure `.env` is NOT staged (it's in `.gitignore`)

```bash
git add .

git commit -m "feat: add resume preview, fix sync workflow, setup AI chat

- Add resume preview page with PDF viewer
- Fix sync workflow to download correct PDF (Anshuman_Singh_4FE.pdf)
- Remove [skip ci] to allow automatic deployment after resume sync
- Add local testing script for resume sync
- Setup AI chat feature with Google Gemini
- Add helper scripts for chat testing

All features ready for production deployment."

git push origin master
```

**✅ After this step:**
- Updated portfolio will be live on GitHub Pages
- Resume sync workflow will be available in Actions tab
- AI chat components deployed (needs backend deployment next)

---

## Step 3: Enable GitHub Actions Permissions (2 minutes)

**In my-portfolio repo:**
1. Go to: https://github.com/f20180039/my-portfolio/settings/actions
2. Under "Workflow permissions"
3. Select: ✅ **"Read and write permissions"**
4. Check: ✅ **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

**Why:** This allows the resume sync workflow to commit and push updated PDFs.

---

## Step 4: Test Resume Sync Workflow (5 minutes)

### 4.1 Manual Sync Test

1. Go to: https://github.com/f20180039/my-portfolio/actions
2. Click: **"Sync Resume from LaTeX Builder"**
3. Click: **"Run workflow"** dropdown
4. Branch: `master`
5. Click green **"Run workflow"** button
6. Wait ~60 seconds
7. Refresh page - should see green ✅

**Troubleshooting:**
- ❌ Red X? Click it to see error logs
- Check that latex-resume-builder has `Anshuman_Singh_4FE.pdf` in main branch
- Verify GitHub Actions permissions are enabled

### 4.2 Verify Auto-Deployment

After sync completes:
1. Check the "Actions" tab again
2. You should see the "Deploy to GitHub Pages" workflow automatically triggered
3. Wait for it to complete (green ✅)
4. Visit your portfolio to see the updated resume

**✅ Success:** Resume sync now works and auto-deploys!

---

## Step 5: Deploy AI Chat Backend to Render (15 minutes)

### 5.1 Create Render Account

1. Go to: https://render.com/
2. Click **"Get Started"**
3. Sign up with GitHub (recommended - easier deployment)
4. Authorize Render to access your GitHub repos

### 5.2 Deploy Backend as Web Service

1. From Render Dashboard, click **"New +"** button (top right)
2. Select: **"Web Service"**
3. Connect your GitHub repository:
   - If first time: Click **"Connect GitHub"** and authorize
   - Search for: **`my-portfolio`**
   - Click **"Connect"** next to it

4. **Configure the Service:**

   | Setting | Value |
   |---------|-------|
   | **Name** | `my-portfolio-backend` (or any name you prefer) |
   | **Region** | Select closest to your location (e.g., Oregon, Singapore) |
   | **Branch** | `master` |
   | **Root Directory** | Leave empty (defaults to root) |
   | **Runtime** | `Node` |
   | **Build Command** | `cd server && npm install` |
   | **Start Command** | `cd server && node index.js` |
   | **Instance Type** | **Free** (or Starter if you want 24/7 uptime) |

5. **Add Environment Variables:**

   Click **"Advanced"** section, then **"Add Environment Variable"** for each:

   | Key | Value |
   |-----|-------|
   | `GOOGLE_API_KEY` | Your actual Google API key (AIzaSy...) |
   | `NODE_ENV` | `production` |
   | `PORT` | `3001` (optional, Render sets this automatically) |

   **⚠️ IMPORTANT:** Use your REAL Google API key here, not the dummy one!

6. Click **"Create Web Service"**

7. Wait 2-3 minutes for deployment
   - Watch the logs scroll in real-time
   - Should end with: `✅ Server running on port 10000` (Render uses internal port)
   - Status should show: **"Live"** with a green dot

8. **COPY YOUR BACKEND URL**
   - At the top of the page, you'll see: `https://my-portfolio-backend-xxxx.onrender.com`
   - **Copy this entire URL** - you'll need it in the next step

### 5.3 Test Backend Deployment

```bash
# Replace with your actual Render URL
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-06-20T...","uptime":...}
```

**If this works, your backend is live! 🎉**

---

## Step 6: Update Frontend with Production API URL (5 minutes)

### 6.1 Create Production Environment File

In your local project root, create `.env.production`:

```bash
cat > .env.production << 'EOF'
# Production API URL (from Render)
VITE_API_URL=https://your-backend-url.onrender.com

# Base URL for GitHub Pages
VITE_BASE_URL=/my-portfolio/
EOF
```

**⚠️ Replace `your-backend-url.onrender.com` with your actual Render URL!**

### 6.2 Update CORS in Backend

Edit `server/index.js` line 13-14:

**Before:**
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://yourdomain.com', 'https://www.yourdomain.com']
  : ['http://localhost:5173', 'http://localhost:3000'],
```

**After:**
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://f20180039.github.io', 'https://yourdomain.com']
  : ['http://localhost:5173', 'http://localhost:3000'],
```

**Note:** Add your custom domain if you have one, otherwise just GitHub Pages URL is fine.

### 6.3 Commit and Deploy

```bash
# Add production env file and updated backend
git add .env.production server/index.js

git commit -m "chore: configure production API URL and CORS"

git push origin master
```

**This will:**
1. Trigger Render to redeploy backend (with updated CORS)
2. Trigger GitHub Actions to rebuild frontend (with production API URL)

Wait 2-3 minutes for both to complete.

---

## Step 7: Test Production Deployment (5 minutes)

### 7.1 Visit Your Live Portfolio

https://f20180039.github.io/my-portfolio/

(Replace with your actual GitHub Pages URL)

### 7.2 Test AI Chat Feature

1. Look for chat button (bottom-right corner)
2. Click to open chat window
3. **First message may take 5-10 seconds** (Render free tier cold start - this is normal!)
4. Test:
   - "What is your experience with React?" → Should work
   - "Tell me about your projects" → Should work
   - Check browser console (F12) for errors

### 7.3 Test Resume Preview

1. Click **"Preview Resume"** button on home page
2. Should show PDF viewer with your resume
3. Click **"Download PDF"** to download

### 7.4 Verify Resume Sync

1. Make a small change to your resume in latex-resume-builder
2. Wait for workflow to complete
3. Check if updated resume appears on your portfolio

---

## Step 8: (OPTIONAL) Setup Automatic Resume Sync (10 minutes)

Currently, resume sync needs to be triggered manually. To make it automatic when you update latex-resume-builder:

### 8.1 Create Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens/new
2. Note: `Portfolio Resume Sync`
3. Expiration: `1 year` (or No expiration)
4. Scopes: ✅ Check **`repo`** (all sub-boxes)
5. Click **"Generate token"**
6. **COPY THE TOKEN** - Example: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 8.2 Add Token to latex-resume-builder

1. Go to: https://github.com/f20180039/latex-resume-builder/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `PORTFOLIO_SYNC_TOKEN`
4. Secret: Paste the PAT you copied
5. Click **"Add secret"**

### 8.3 Create Webhook Workflow

In `latex-resume-builder` repo, create `.github/workflows/notify-portfolio.yml`:

```yaml
name: Notify Portfolio on Resume Update

on:
  push:
    branches: [main]
    paths:
      - '**.pdf'
      - '**.tex'

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

          echo "✅ Portfolio sync triggered"
```

**✅ Now:** Every time you push to latex-resume-builder, your portfolio auto-syncs the resume!

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
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=google_api_key" \
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
