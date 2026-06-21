# AI API Options for Chat Feature

## Current: Google Gemini ✅ RECOMMENDED (FREE)

**Status:** Already implemented in your code

### Free Tier Details:
- **Cost:** FREE
- **Limits:** 60 requests per minute, 1500 requests per day
- **Models:** 
  - `gemini-1.5-flash` (fastest, recommended for chat)
  - `gemini-pro` (current in your code)
  - `gemini-1.5-pro` (most capable)
- **Token Limits:** 
  - Input: 32k tokens
  - Output: 8k tokens
- **Perfect for:** Portfolio chat with 5-10 messages per hour limit

### Get API Key (100% Free):
1. Visit: https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy key (starts with AIzaSy...)
4. Add to .env file

---

## Alternative 1: OpenAI (ChatGPT) ❌ NOT FREE

- **Cost:** $0.002 per 1K tokens (pay-as-you-go)
- **Minimum:** $5 credit purchase
- **Not suitable:** Portfolio budget
- **Models:** GPT-4o, GPT-4o-mini, GPT-3.5-turbo

---

## Alternative 2: Anthropic Claude ❌ NOT FREE

- **Cost:** $0.25-$3 per 1M tokens
- **Free Trial:** $5 credit (temporary)
- **Not suitable:** Limited free tier

---

## Alternative 3: Groq (Free but Limited) ⚠️

- **Cost:** FREE
- **Limits:** Very limited (6k requests/day across all users)
- **Models:** Llama 3, Mixtral
- **Issue:** Shared quota, unreliable

---

## Alternative 4: Hugging Face Inference API ⚠️

- **Cost:** FREE
- **Quality:** Lower than Gemini
- **Rate Limits:** Strict
- **Issue:** Inconsistent responses

---

## ✅ RECOMMENDATION: Stick with Gemini

### Why Gemini is Best for Your Use Case:

1. **Truly Free:** No credit card required
2. **Generous Limits:** 1500 requests/day (more than enough)
3. **High Quality:** Comparable to GPT-4
4. **Fast:** gemini-1.5-flash is optimized for chat
5. **Already Integrated:** Working in your code

### Your Current Rate Limits (Even Stricter):
- 5 messages per hour per IP
- 10 messages per session
- 1 minute cooldown between messages

**With these limits, you'll use ~100-200 requests/day max**
**Gemini's 1500/day limit is MORE than enough!**

---

## Optimization: Switch to gemini-1.5-flash

Your code currently uses `gemini-pro`. Switch to `gemini-1.5-flash` for:
- Faster responses (2x speed)
- Better for conversational chat
- Same free tier limits
- Lower latency

### Change:
```javascript
// In server/api/chat.js line 182
model: 'gemini-1.5-flash',  // Instead of 'gemini-pro'
```

---

## Cost Comparison (If 1000 chat messages/month):

| Provider | Cost/Month |
|----------|-----------|
| **Gemini** | **$0.00** ✅ |
| OpenAI GPT-4o-mini | ~$0.50 |
| OpenAI GPT-4o | ~$5.00 |
| Claude Sonnet | ~$3.00 |

---

## Conclusion

**Keep Gemini!** It's free, fast, and perfect for your portfolio.

Just get the API key from https://aistudio.google.com/apikey
