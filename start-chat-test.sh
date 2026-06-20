#!/bin/bash

# Quick start script for testing AI chat locally

echo "🤖 Starting AI Chat Test Environment"
echo "===================================="
echo ""

# Check if API key is configured
if grep -q "YOUR_API_KEY_HERE\|AQ.Ab8RN6IVsOEEVw2U" .env 2>/dev/null; then
  echo "⚠️  WARNING: Dummy API key detected in .env file"
  echo ""
  echo "To test the AI chat, you need a real Google API key:"
  echo "1. Visit: https://makersuite.google.com/app/apikey"
  echo "2. Create a new API key"
  echo "3. Replace GOOGLE_API_KEY in .env with your real key"
  echo ""
  echo "Press any key to continue anyway (FAQ will work, AI won't)..."
  read -n 1 -s
  echo ""
fi

# Check if dependencies are installed
if [ ! -d "server/node_modules" ]; then
  echo "📦 Installing server dependencies..."
  cd server && npm install && cd ..
  echo ""
fi

# Start backend in background
echo "🚀 Starting backend server..."
cd server
node index.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 2

# Check if backend is running
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
  echo "✅ Backend server started successfully"
else
  echo "❌ Backend failed to start"
  kill $BACKEND_PID 2>/dev/null
  exit 1
fi

echo ""
echo "🌐 Starting frontend..."
echo ""
echo "===================================="
echo "📋 Testing Instructions:"
echo "===================================="
echo ""
echo "1. Open browser at: http://localhost:5173/anshuman-singh/"
echo "2. Look for chat button (bottom-right corner)"
echo "3. Click and test these:"
echo "   • 'What is your experience with React?' (FAQ test)"
echo "   • 'Tell me about your problem-solving' (AI test)"
echo "   • Send 6 messages quickly (rate limit test)"
echo ""
echo "4. Watch this terminal for backend logs"
echo ""
echo "To stop: Press Ctrl+C"
echo "===================================="
echo ""

# Trap Ctrl+C to clean up
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM

# Start frontend
npm run dev

# Clean up on exit
kill $BACKEND_PID 2>/dev/null
