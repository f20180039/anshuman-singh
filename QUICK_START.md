# Quick Start Guide 🚀

**For when you just want to get it running!**

## Prerequisites

- [ ] Google API key from https://makersuite.google.com/app/apikey
- [ ] GitHub Actions write permissions enabled

## 3-Step Setup

### 1️⃣ Push to GitHub (2 min)
```bash
git add .
git commit -m "feat: complete portfolio modernization"
git push origin master
```

### 2️⃣ Enable AI Chat (3 min)
```bash
# Create .env with your Google API key
echo "GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXX" > .env
echo "VITE_API_URL=http://localhost:3001" >> .env

# Start backend
cd server && npm install && npm start &

# Start frontend
cd .. && npm run dev
```

### 3️⃣ Test It (1 min)
- Visit: http://localhost:5173/anshuman-singh/
- Click chat button (bottom-right)
- Ask: "What is your experience with React?"
- Should get instant answer! ✅

## Deploy to Production

1. **Backend:** Deploy to Render → Get URL
2. **Frontend:** Update API URL → Rebuild → Deploy
3. **Done!** 🎉

**Full instructions:** See [ACTION_ITEMS.md](./ACTION_ITEMS.md)
