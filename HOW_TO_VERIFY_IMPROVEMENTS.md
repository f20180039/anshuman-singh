# How to Verify Lighthouse Improvements

## Quick Verification (Browser DevTools)

The easiest way to verify improvements is using Chrome DevTools:

### 1. Open Chrome DevTools Lighthouse
```bash
# Make sure dev server is running
npm run dev
# Opens on http://localhost:5179/anshuman-singh/
```

1. Open Chrome/Edge browser
2. Navigate to: `http://localhost:5179/anshuman-singh/contact`
3. Press `F12` to open DevTools
4. Click **Lighthouse** tab
5. Select:
   - ✅ Performance
   - Device: Desktop (or Mobile for mobile metrics)
   - ✅ Clear storage
6. Click **Analyze page load**

### Expected Results:
- **Performance Score:** 90+ (was 61)
- **FCP:** < 1.6s (was 2.7s)
- **LCP:** < 2.4s (was 5.0s)
- **Speed Index:** < 2.3s (was 3.0s)

---

## Verify Bundle Optimizations

### Check Network Tab

1. Open DevTools → **Network** tab
2. Reload page (`Cmd+R` or `Ctrl+R`)
3. Look for these files:

**Should load IMMEDIATELY (critical path):**
- ✅ `index.html` (3KB)
- ✅ `index-[hash].js` (47KB) - Main app bundle
- ✅ `vendor-react-[hash].js` (313KB) - React core
- ✅ `vendor-router-[hash].js` (30KB) - Router
- ✅ `index-[hash].css` (37KB) - Styles
- ✅ `Contact-[hash].js` (4KB) - Contact page

**Should load LATER (lazy-loaded):**
- ⏱️ `AIChatButton-[hash].js` (~2-3KB) - Loads after initial render
- ⏱️ `AIChatWindow-[hash].js` (~15KB) - Loads after initial render
- ⏱️ `BackgroundManager-[hash].js` (14KB) - Background animations
- ⏱️ `vendor-animations-[hash].js` (152KB) - Framer Motion

**Should NOT load on Contact page:**
- ❌ `vendor-3d-[hash].js` (1.09MB) - Three.js (only on Test3D page)

### Verify AI Chat Lazy Loading

**Test:**
1. Open DevTools → Network tab
2. Reload Contact page
3. Filter by "AIChatButton" and "AIChatWindow"
4. **Expected:** These files should load a few milliseconds AFTER the initial HTML/CSS/JS

**Visual indicator:**
- The chat button should appear after the page content is visible
- This is the lazy-loading in action!

---

## Performance Testing (Manual)

### Test All Pages

Run through each page and verify performance:

```bash
# Start production preview (more accurate than dev)
npm run build
npm run preview
# Opens on http://localhost:4173/anshuman-singh/
```

**Pages to test:**
- / (Home)
- /contact ← **Priority - this was the target page**
- /about
- /experience
- /projects
- /certificates
- /resume
- /test-3d

**For each page, verify:**
1. Page loads quickly
2. Content appears fast (< 2s)
3. Interactive features work (hover, click, animations)
4. AI chat button appears and works
5. No console errors

---

## Automated Lighthouse Testing (Requires Node 22+)

If you upgrade Node or have access to Node 22+:

```bash
# Install Lighthouse globally
npm install -g lighthouse

# Create reports directory
mkdir -p lighthouse-reports

# Run audit on Contact page
lighthouse http://localhost:5179/anshuman-singh/contact \
  --output=html \
  --output=json \
  --output-path=./lighthouse-reports/contact-after \
  --only-categories=performance

# Compare with your original report
# Original: Performance 61, FCP 2.7s, LCP 5.0s
# Expected: Performance 90+, FCP ~1.4s, LCP ~2.1s
```

---

## What to Look For

### ✅ Good Signs (Optimization Working)

1. **Smaller Initial Bundle:**
   - Main JS ~47KB (not 547KB)
   - Multiple vendor chunks loaded in parallel

2. **Fast FCP (First Contentful Paint):**
   - Content appears in < 1.6s
   - Contact form visible quickly

3. **AI Chat Loads After Initial Render:**
   - Chat button appears slightly after page content
   - Network tab shows it loads later

4. **Better Caching:**
   - On second visit, vendor-react should load from cache (0ms)
   - Only app code re-downloads

### ⚠️ Warning Signs (Need Investigation)

1. **Slow FCP (> 2s):**
   - Check Network tab for blocking resources
   - Verify vendor chunks are loading in parallel

2. **AI Chat Blocks Render:**
   - Should NOT see AIChatButton/Window in critical path
   - Check if Suspense boundary is working

3. **Large Initial Bundle:**
   - If you see vendor-animations (152KB) loading immediately on Contact
   - Should only load when BackgroundManager renders

4. **Console Errors:**
   - "Cannot read property of undefined" might indicate lazy loading issue
   - Check Suspense fallback is working

---

## Mobile Performance Testing

Mobile networks are slower, so optimizations matter more:

### Using Chrome DevTools:

1. Open DevTools → **Network** tab
2. Set throttling: "Fast 3G" or "Slow 3G"
3. Check "Disable cache"
4. Reload page
5. Measure load time

**Expected:**
- On Fast 3G: < 3s for interactive
- On Slow 3G: < 5s for interactive

### Real Device Testing:

1. Find your local IP:
   ```bash
   # macOS
   ifconfig | grep "inet "
   
   # Your dev server is accessible at:
   # http://YOUR_IP:5179/anshuman-singh/contact
   ```

2. Open on mobile device (same WiFi network)
3. Test loading speed and interactivity

---

## Comparing Before & After

### Bundle Size Comparison

**BEFORE:**
```
dist/assets/
  index-[old].js: 547 KB (monolithic vendor bundle)
  Contact-[old].js: ~4 KB
  [Other pages]: ~4-13 KB each
  
Total critical path for Contact: ~555 KB JS
```

**AFTER:**
```
dist/assets/
  index-[new].js: 47 KB (main app)
  vendor-react-[new].js: 313 KB (cached across pages)
  vendor-router-[new].js: 30 KB (cached)
  Contact-[new].js: 4 KB
  AIChatButton-[new].js: 2.7 KB (lazy)
  AIChatWindow-[new].js: 15 KB (lazy)
  vendor-animations-[new].js: 152 KB (lazy on Contact)
  
Total critical path for Contact: ~394 KB JS (29% reduction)
Total after lazy-loading: ~412 KB (but spread over time)
```

**Key Improvement:** 
- Smaller critical path (394KB vs 555KB)
- Better caching (React/Router chunks reused)
- Lazy-loaded features (18KB deferred)

### Performance Metrics Comparison

| Metric | Before | After (Expected) | Improvement |
|--------|--------|------------------|-------------|
| Performance Score | 61 | 90+ | +48% |
| FCP | 2.7s | ~1.4s | -48% |
| LCP | 5.0s | ~2.1s | -58% |
| Speed Index | 3.0s | ~1.8s | -40% |
| TBT | 0ms | 0ms | No change |
| CLS | 0.005 | 0.005 | No change |
| Bundle Size (critical) | 555 KB | 394 KB | -29% |

---

## CI/CD Integration (Future)

Once verified, set up automated testing:

### GitHub Actions Lighthouse CI

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - name: Wait for server
        run: sleep 5
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:4173/anshuman-singh/
            http://localhost:4173/anshuman-singh/contact
            http://localhost:4173/anshuman-singh/about
          uploadArtifacts: true
          temporaryPublicStorage: true
```

This will:
- Run Lighthouse on every PR
- Compare against main branch
- Fail if performance drops below thresholds

---

## Troubleshooting

### Issue: "Lighthouse needs Node 22+"
**Solution:** Use Chrome DevTools Lighthouse instead (built into browser)

### Issue: "AI Chat not appearing"
**Solution:** 
- Check console for errors
- Verify Suspense boundary in App.tsx
- Check if lazy imports are working: `React.lazy(() => import(...))`

### Issue: "Performance not improved"
**Solution:**
- Make sure you're testing production build (`npm run build && npm run preview`)
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Verify vendor chunks are generated in `dist/assets/`

### Issue: "vendor-animations loads immediately"
**Solution:**
- This is expected if BackgroundManager is on the page
- To optimize further, implement CSS-only BackgroundManager variant
- See next steps in LIGHTHOUSE_OPTIMIZATION_REPORT.md

---

## Success Criteria

Your optimization is successful if:

✅ **Performance Score:** 90+ (was 61)  
✅ **FCP:** < 1.6s (was 2.7s)  
✅ **LCP:** < 2.4s (was 5.0s)  
✅ **AI Chat loads after initial render** (check Network tab)  
✅ **Vendor chunks cached** (reload shows 0ms for vendor-react)  
✅ **All functionality works** (navigation, forms, chat, animations)  

---

## Next Steps After Verification

If performance is good:
1. ✅ Commit changes
2. ✅ Deploy to production
3. ✅ Set up Lighthouse CI
4. ✅ Monitor real user metrics

If performance needs more improvement:
1. Implement CSS-only BackgroundManager (save 152KB on some pages)
2. Optimize images (WebP format, lazy loading)
3. Add resource hints (preload, prefetch)
4. Consider service worker for caching

---

## Files to Check

Modified files from optimization:
- `src/App.tsx` - AI Chat lazy loading
- `vite.config.ts` - Vendor chunk splitting
- `package.json` - Dependency cleanup
- `dist/assets/*` - Check generated chunks

Documentation:
- `LIGHTHOUSE_OPTIMIZATION_REPORT.md` - Full analysis
- `.claude/skills/lighthouse-optimizer/SKILL.md` - Reusable skill
- This file - Verification guide

---

## Questions?

If you need help interpreting results or implementing further optimizations, use the lighthouse-optimizer skill:

```
Run lighthouse-optimizer skill to analyze all pages
```

Or refer to:
- LIGHTHOUSE_OPTIMIZATION_REPORT.md - Next steps section
- .claude/skills/lighthouse-optimizer/analysis-template.md - Reporting format
