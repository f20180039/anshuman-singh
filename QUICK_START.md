# Quick Start Guide ⚡

**Get your portfolio production-ready in 30 minutes!**

---

## ✅ What's Ready

- Resume preview page
- Resume auto-sync workflow
- AI chat (frontend + backend)
- Local testing scripts

## ⏳ What's Needed

1. Real Google API key (5 min)
2. Render backend deployment (15 min)
3. GitHub Actions setup (2 min)

---

## 🚀 Steps (30 min total)

### 1️⃣ Get API Key (5 min)

1. Go to: https://makersuite.google.com/app/apikey
2. Create new API key
3. Update `.env`:
   ```
   GOOGLE_API_KEY=AIzaSy_YOUR_REAL_KEY
   ```

### 2️⃣ Test Locally (5 min)

```bash
./start-chat-test.sh
```

Open: http://localhost:5173/anshuman-singh/

Test chat works!

### 3️⃣ Deploy to GitHub (5 min)

```bash
git add .
git commit -m "feat: add resume preview and AI chat"
git push origin master
```

### 4️⃣ Enable GitHub Actions (2 min)

https://github.com/f20180039/my-portfolio/settings/actions

✅ Read and write permissions
✅ Allow PR creation

### 5️⃣ Deploy Backend to Render (15 min)

1. Go to: https://render.com/
2. Sign up with GitHub
3. New → Web Service
4. Connect `my-portfolio` repo
5. Configure:
   - Build: `cd server && npm install`
   - Start: `cd server && node index.js`
   - Instance: **Free**
6. Environment Variables:
   - `GOOGLE_API_KEY` = your real key
   - `NODE_ENV` = production
7. Create → Wait 3 min → Copy URL

### 6️⃣ Connect Frontend (5 min)

Create `.env.production`:
```bash
VITE_API_URL=https://your-backend-url.onrender.com
VITE_BASE_URL=/my-portfolio/
```

Update `server/index.js` CORS:
```javascript
origin: ['https://f20180039.github.io']
```

Commit & push:
```bash
git add .env.production server/index.js
git commit -m "chore: production config"
git push
```

### 7️⃣ Test Production (3 min)

Visit: https://f20180039.github.io/my-portfolio/

✅ Chat button works (first msg may take 5-10 sec)
✅ Resume preview works
✅ No errors in console

---

## ✅ Done!

**You now have:**
- ✨ Live portfolio with AI chat
- 📄 Resume auto-sync
- 💬 24/7 recruiter assistant
- 💰 $0/month cost

---

## 📚 Need More Details?

See: [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md)

## 🐛 Something Broken?

```bash
./check-chat-status.sh
```

## 📝 Local Testing

```bash
./start-chat-test.sh
```
