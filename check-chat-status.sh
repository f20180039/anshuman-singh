#!/bin/bash

echo "🔍 AI Chat Feature Status Check"
echo "================================"
echo ""

# Check .env file
echo "1. Configuration (.env file):"
if [ -f ".env" ]; then
  echo "   ✅ .env file exists"

  if grep -q "GOOGLE_API_KEY=" .env; then
    API_KEY=$(grep "GOOGLE_API_KEY=" .env | cut -d'=' -f2 | tr -d ' ')
    if [ "$API_KEY" = "YOUR_API_KEY_HERE" ] || [[ "$API_KEY" == AQ.* ]]; then
      echo "   ⚠️  Dummy API key detected (replace with real key)"
    elif [[ "$API_KEY" == AIzaSy* ]]; then
      echo "   ✅ Real Google API key configured"
    else
      echo "   ⚠️  API key format looks unusual"
    fi
  else
    echo "   ❌ GOOGLE_API_KEY not found in .env"
  fi

  if grep -q "VITE_API_URL=" .env; then
    echo "   ✅ VITE_API_URL configured"
  else
    echo "   ⚠️  VITE_API_URL not found"
  fi
else
  echo "   ❌ .env file not found"
fi

echo ""

# Check server dependencies
echo "2. Server Dependencies:"
if [ -d "server/node_modules" ]; then
  PKG_COUNT=$(ls -1 server/node_modules | wc -l | tr -d ' ')
  echo "   ✅ Installed ($PKG_COUNT packages)"
else
  echo "   ❌ Not installed (run: cd server && npm install)"
fi

echo ""

# Check if backend is running
echo "3. Backend Server:"
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
  echo "   ✅ Running on port 3001"
  HEALTH=$(curl -s http://localhost:3001/health | jq -r '.status' 2>/dev/null)
  if [ "$HEALTH" = "ok" ]; then
    echo "   ✅ Health check: OK"
  fi
else
  echo "   ❌ Not running (start with: cd server && npm start)"
fi

echo ""

# Check frontend files
echo "4. Frontend Components:"
if [ -f "src/features/ai-chat/AIChatWindow.tsx" ]; then
  echo "   ✅ Chat window component exists"
else
  echo "   ❌ Chat components missing"
fi

if [ -f "src/ai/faq-knowledge-base.ts" ]; then
  FAQ_COUNT=$(grep -c '"answer":' src/ai/faq-knowledge-base.ts)
  echo "   ✅ FAQ database exists ($FAQ_COUNT entries)"
else
  echo "   ❌ FAQ database missing"
fi

echo ""

# Check config
echo "5. Frontend Configuration:"
if [ -f "src/config.ts" ]; then
  echo "   ✅ Config file exists"
else
  echo "   ❌ Config file missing"
fi

echo ""
echo "================================"
echo ""

# Overall status
if [ -f ".env" ] && [ -d "server/node_modules" ]; then
  echo "✅ AI Chat is configured and ready!"
  echo ""
  echo "To test locally:"
  echo "  ./start-chat-test.sh"
  echo ""
  echo "Or manually:"
  echo "  Terminal 1: cd server && npm start"
  echo "  Terminal 2: npm run dev"
else
  echo "⚠️  Some setup steps are incomplete"
  echo ""
  echo "See: AI_CHAT_TESTING_GUIDE.md for details"
fi

echo ""
