# Production Deployment Guide 🚀

**Last Updated:** June 20, 2026

This guide will help you deploy your portfolio to production with all features working.

---

## 📊 Current Status

| Feature | Development | Production |
|---------|-------------|------------|
| **Resume Preview** | ✅ Complete | ⏳ Needs deployment |
| **Resume Auto-Sync** | ✅ Complete | ⏳ Needs GitHub Actions setup |
| **AI Chat (Frontend)** | ✅ Complete | ⏳ Needs deployment |
| **AI Chat (Backend)** | ✅ Complete | ⏳ Needs Render deployment |
| **Local Testing Scripts** | ✅ Complete | N/A |

---

## 🎯 Quick Start Checklist

**Time Required:** ~30-45 minutes

- [ ] **Step 1:** Test locally (10 min)
- [ ] **Step 2:** Get Google API key (5 min)
- [ ] **Step 3:** Commit & push to GitHub (5 min)
- [ ] **Step 4:** Enable GitHub Actions (2 min)
- [ ] **Step 5:** Deploy backend to Render (15 min)
- [ ] **Step 6:** Update production URLs (5 min)
- [ ] **Step 7:** Test production (5 min)
- [ ] **Step 8:** (Optional) Auto-sync webhook (10 min)

---

## 📝 Prerequisites

Before starting:
- ✅ Server dependencies installed (`cd server && npm install` - DONE)
- ✅ Local `.env` file configured
- ✅ Git repository pushed to GitHub
- ⚠️ Google API key (dummy key currently - needs replacement)

---

## Step 1: Test Everything Locally (10 minutes)

### 1.1 Get Real Google API Key

**Current:** Dummy key for security (`AQ.Ab8RN6IVsOEEVw2U-If0wpphDZ...`)

**Action Required:**
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIzaSy...`)
5. Update `.env` file:
   ```bash
   # Replace this line
   GOOGLE_API_KEY=AQ.Ab8RN6IVsOEEVw2U-If0wpphDZ-yP18EhcxvLpMIzxOXqspvVQ1
   
   # With your real key
   GOOGLE_API_KEY=AIzaSy_YOUR_ACTUAL_KEY_HERE
   ```

### 1.2 Test Locally

**Quick Test (Recommended):**
```bash
./start-chat-test.sh
```

**Manual Test:**
```bash
# Terminal 1
cd server && npm start

# Terminal 2  
npm run dev
```

### 1.3 Verify Everything Works

Open: http://localhost:5173/anshuman-singh/

**Test Checklist:**
- [ ] Chat button visible (bottom-right)
- [ ] Chat opens when clicked
- [ ] "What is your experience with React?" → Instant FAQ response
- [ ] "Tell me about your problem-solving" → AI response (2-3 sec)
- [ ] "What's the weather?" → Rejected (not career-related)
- [ ] Resume preview page works

**Backend should show:**
```
✅ Server running on port 3001
🌍 Environment: development
🤖 AI Chat: Configured  ← Must say "Configured"
```

**If all tests pass, proceed to deployment!**

---

## Step 2: Commit & Deploy to GitHub (5 minutes)

### 2.1 Check Git Status

```bash
git status
```

**⚠️ IMPORTANT:** Verify `.env` is NOT listed (it's in `.gitignore`)

### 2.2 Commit Changes

```bash
git add .

git commit -m "feat: add resume preview and AI chat, fix sync workflow

- Add resume preview page with PDF viewer
- Fix sync workflow to download correct PDF (Anshuman_Singh_4FE.pdf)
- Remove [skip ci] to enable auto-deployment after sync
- Setup AI chat with Google Gemini integration
- Add local testing scripts

Ready for production deployment."

git push origin master
```

### 2.3 Wait for Deployment

1. Go to: https://github.com/f20180039/my-portfolio/actions
2. Wait for "Deploy to GitHub Pages" to complete (~2-3 min)
3. Check for green ✅

**✅ Frontend is now live!** (but AI chat backend needs deployment)

---

## Step 3: Enable GitHub Actions Permissions (2 minutes)

**Why:** Allows resume sync workflow to commit/push updated PDFs

1. Go to: https://github.com/f20180039/my-portfolio/settings/actions
2. Scroll to "Workflow permissions"
3. Select: ✅ **"Read and write permissions"**
4. Check: ✅ **"Allow GitHub Actions to create and approve pull requests"**
5. Click **"Save"**

---

## Step 4: Test Resume Sync Workflow (5 minutes)

### 4.1 Manually Trigger Sync

1. Go to: https://github.com/f20180039/my-portfolio/actions
2. Click **"Sync Resume from LaTeX Builder"**
3. Click **"Run workflow"** → Select `master` → **"Run workflow"**
4. Wait ~60 seconds
5. Refresh → Should see green ✅

### 4.2 Verify Auto-Deployment

After sync completes, check "Actions" tab again:
- "Deploy to GitHub Pages" should auto-trigger
- Wait for green ✅
- Visit your portfolio → new resume should be there!

**✅ Resume sync is working!**

---

## Step 5: Deploy Backend to Render (15 minutes)

### 5.1 Create Render Account

1. Go to: https://render.com/
2. Click **"Get Started for Free"**
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Render to access your repos

### 5.2 Create Web Service

1. From Dashboard → Click **"New +"** (top right)
2. Select **"Web Service"**
3. Connect repository:
   - Search: `my-portfolio`
   - Click **"Connect"**

### 5.3 Configure Service

**Basic Settings:**

| Field | Value |
|-------|-------|
| Name | `my-portfolio-backend` |
| Region | Choose closest to you (e.g., Oregon USA) |
| Branch | `master` |
| Root Directory | *(leave empty)* |
| Runtime | `Node` |
| Build Command | `cd server && npm install` |
| Start Command | `cd server && node index.js` |

**Instance Type:**
- Select **"Free"** ($0/month)
- Note: Spins down after 15min inactivity (cold start ~5 sec)
- Or **"Starter"** ($7/month) for 24/7 uptime

### 5.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** for each:

| Key | Value | Notes |
|-----|-------|-------|
| `GOOGLE_API_KEY` | `AIzaSy_YOUR_KEY_HERE` | ⚠️ Use REAL key, not dummy! |
| `NODE_ENV` | `production` | Required |
| `PORT` | `3001` | Optional (Render auto-sets) |
| `CORS_ORIGINS` | `https://f20180039.github.io` | Optional |

**⚠️ CRITICAL:** Use your actual Google API key here!

### 5.5 Deploy

1. Click **"Create Web Service"**
2. Watch logs (2-3 minutes)
3. Wait for: **"Your service is live 🎉"**
4. Look for: `✅ Server running on port 10000` in logs

### 5.6 Copy Backend URL

At the top of the page, you'll see:
```
https://my-portfolio-backend-xxxx.onrender.com
```

**COPY THIS URL** - you'll need it next!

### 5.7 Test Backend

```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{"status":"ok","timestamp":"...","uptime":...}
```

**✅ Backend is live!**

---

## Step 6: Connect Frontend to Production Backend (5 minutes)

### 6.1 Create Production Environment File

In project root, create `.env.production`:

```bash
cat > .env.production << 'EOF'
# Render Backend URL
VITE_API_URL=https://your-backend-url.onrender.com

# GitHub Pages Base URL
VITE_BASE_URL=/my-portfolio/
EOF
```

**⚠️ Replace `your-backend-url.onrender.com` with your actual Render URL!**

Example:
```
VITE_API_URL=https://my-portfolio-backend-a1b2.onrender.com
```

### 6.2 Update CORS in Backend

Edit `server/index.js` (around line 13):

**Find:**
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://yourdomain.com', 'https://www.yourdomain.com']
  : ['http://localhost:5173', 'http://localhost:3000'],
```

**Replace with:**
```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://f20180039.github.io']  // Add custom domain if you have one
  : ['http://localhost:5173', 'http://localhost:3000'],
```

### 6.3 Commit & Deploy

```bash
git add .env.production server/index.js

git commit -m "chore: configure production API URL and CORS"

git push origin master
```

**This triggers:**
1. ✅ Render redeploys backend (updated CORS)
2. ✅ GitHub Actions rebuilds frontend (production API URL)

Wait 3-5 minutes for both to complete.

---

## Step 7: Test Production Deployment (5 minutes)

### 7.1 Visit Live Portfolio

**Your URL:** https://f20180039.github.io/my-portfolio/

(Replace with your actual GitHub Pages URL)

### 7.2 Test AI Chat

1. Find chat button (bottom-right corner)
2. Click to open
3. **First message may take 5-10 seconds** ⏳
   - This is normal! Render free tier "cold starts"
   - Subsequent messages will be faster
4. Test these:
   - ✅ "What is your experience with React?"
   - ✅ "Tell me about your projects"
   - ✅ "What's your salary expectation?" (if you added to FAQ)

**Check browser console (F12):**
- No CORS errors
- API calls to your Render URL succeeding

### 7.3 Test Resume Features

1. **Preview:** Click "Preview Resume" button → PDF viewer loads
2. **Download:** Click "Download Resume" → PDF downloads
3. **Sync:** Run resume sync workflow manually → new PDF appears

---

## Step 8: (OPTIONAL) Auto-Sync Resume Webhook (10 minutes)

**Current:** Manual sync via GitHub Actions
**Goal:** Auto-sync when latex-resume-builder updates

### 8.1 Create Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Settings:
   - Note: `Portfolio Resume Auto-Sync`
   - Expiration: `1 year` (or no expiration)
   - Scopes: ✅ **`repo`** (all sub-checkboxes)
3. Click **"Generate token"**
4. **COPY TOKEN:** `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 8.2 Add Secret to latex-resume-builder

1. Go to: https://github.com/f20180039/latex-resume-builder/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `PORTFOLIO_SYNC_TOKEN`
4. Value: Paste the token
5. Click **"Add secret"**

### 8.3 Create Webhook Workflow

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

jobs:
  trigger-sync:
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

### 8.4 Test Webhook

1. Make a small change to resume in latex-resume-builder
2. Commit & push to main branch
3. Check:
   - latex-resume-builder Actions → webhook workflow runs
   - my-portfolio Actions → sync workflow triggered
   - Both show green ✅

**✅ Auto-sync is working!**

---

## ✅ Final Checklist

### Prerequisites
- [x] Server dependencies installed
- [x] Helper scripts created
- [x] Local `.env` configured
- [ ] Real Google API key obtained

### Development
- [ ] Tested AI chat locally (all tests pass)
- [ ] Tested resume preview locally
- [ ] Backend shows "AI Chat: Configured"

### GitHub
- [ ] All changes committed & pushed
- [ ] GitHub Actions permissions enabled
- [ ] Resume sync workflow tested (green ✅)

### Production Backend (Render)
- [ ] Render account created
- [ ] Backend deployed as Web Service
- [ ] Environment variables set (GOOGLE_API_KEY, NODE_ENV)
- [ ] Backend URL copied
- [ ] Health check returns `{"status":"ok"}`

### Production Frontend
- [ ] `.env.production` created with Render URL
- [ ] CORS updated in `server/index.js`
- [ ] Changes committed & deployed
- [ ] GitHub Pages deployment succeeded

### Production Testing
- [ ] Portfolio loads without errors
- [ ] AI chat button visible
- [ ] Chat works (may have cold start delay)
- [ ] No CORS errors in browser console
- [ ] Resume preview works
- [ ] Resume download works

### Optional
- [ ] Personal Access Token created
- [ ] Token added to latex-resume-builder secrets
- [ ] Webhook workflow created
- [ ] Auto-sync tested & working

---

## 🐛 Troubleshooting

### "AI service not configured" (Backend Logs)

**Cause:** API key not loaded

**Fix:**
1. Check Render dashboard → Environment Variables
2. Verify `GOOGLE_API_KEY` starts with `AIzaSy`
3. If missing/wrong, update and **Manual Deploy** to restart

---

### "Failed to fetch" / CORS Error (Browser Console)

**Cause:** Backend URL wrong or CORS not configured

**Fix:**
1. Verify `.env.production` has correct Render URL
2. Check `server/index.js` CORS allows GitHub Pages URL
3. Rebuild: `git commit --allow-empty -m "rebuild" && git push`
4. Wait for both deployments to complete

---

### Backend Takes 10+ Seconds (First Request)

**Cause:** Cold start (normal on free tier)

**Status:** This is EXPECTED behavior, not an error!

**Why:** Render free tier spins down after 15min inactivity. First request wakes it up (~5-10 sec).

**Options:**
- Accept it (free tier trade-off)
- Upgrade to Starter ($7/month) for 24/7 uptime

---

### Resume Sync Failed

**Cause:** PDF not found or wrong filename

**Fix:**
1. Check latex-resume-builder has `Anshuman_Singh_4FE.pdf` in main branch
2. Or create GitHub release with the PDF
3. Re-run sync workflow manually

---

### Chat Works Locally but Not in Production

**Checklist:**
1. ✅ Backend is "Live" in Render dashboard
2. ✅ `curl https://your-backend-url.onrender.com/health` returns OK
3. ✅ `.env.production` has correct backend URL
4. ✅ Frontend rebuilt after adding `.env.production`
5. ✅ No CORS errors in browser console (F12)
6. ✅ Wait 5-10 sec for first message (cold start)

---

## 📊 Cost Breakdown

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| **GitHub Pages** | Free | $0/mo | Hosting frontend |
| **GitHub Actions** | Free | $0/mo | 2000 min/month included |
| **Render (Free)** | Free | $0/mo | Sleeps after 15min, 750 hrs/mo |
| **Google Gemini** | Free | $0/mo | 1M requests/month |
| **Total** | - | **$0/mo** | 🎉 |

**Optional Upgrades:**
- Render Starter: $7/mo (24/7 uptime, no cold starts)
- Custom domain: $10-15/year

---

## 📚 Additional Resources

**Documentation:**
- [AI_CHAT_TESTING_GUIDE.md](AI_CHAT_TESTING_GUIDE.md) - Local testing guide
- [scripts/README.md](scripts/README.md) - Resume sync script docs

**Helper Scripts:**
- `./start-chat-test.sh` - Start backend + frontend for testing
- `./check-chat-status.sh` - Check if everything is configured
- `./scripts/sync-resume-local.sh` - Test resume sync locally

**External Links:**
- [Google AI Studio](https://makersuite.google.com/app/apikey) - Get API key
- [Render Dashboard](https://dashboard.render.com/) - Monitor backend
- [GitHub Actions](https://github.com/f20180039/my-portfolio/actions) - Check workflows

---

## 🎉 Success!

When all checkboxes are complete, you'll have:

✅ **Modern Portfolio** - Live on GitHub Pages with dark theme & animations  
✅ **Resume Preview** - In-browser PDF viewer  
✅ **Auto-Sync Resume** - Updates automatically from latex-resume-builder  
✅ **24/7 AI Assistant** - Answers recruiter questions instantly  
✅ **$0/month** - All on free tiers!

**Your portfolio is now production-ready! 🚀**

---

## 🆘 Still Need Help?

If something's not working:

1. **Check status scripts:**
   ```bash
   ./check-chat-status.sh
   ```

2. **Review logs:**
   - Backend: Render Dashboard → Logs
   - Frontend: Browser console (F12)
   - Workflows: GitHub Actions tab

3. **Test individually:**
   - Backend health: `curl https://your-backend-url.onrender.com/health`
   - Frontend build: Check GitHub Actions
   - Resume sync: Run workflow manually

4. **Common fixes:**
   - Wrong API key → Update in Render env vars
   - CORS error → Update `server/index.js` and redeploy
   - 404 errors → Check `VITE_BASE_URL` in `.env.production`

**Good luck! 💪**
