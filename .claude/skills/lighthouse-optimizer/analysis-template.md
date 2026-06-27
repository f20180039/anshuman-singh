# Lighthouse Performance Analysis Report

**Project:** [Project Name]  
**Analyzed:** [Date & Time]  
**Analyst:** Claude (lighthouse-optimizer skill)  
**Repository:** [Path or URL]

---

## Executive Summary

**Current State:**
- Average Performance Score: [XX]/100
- Worst performing page: [Page] ([Score]/100)
- Total bundle size: [Size] KB
- Critical path dependencies: [Count]

**Target State:**
- Target Performance Score: 90+/100
- Expected improvements: [Percentage]%
- Estimated bundle reduction: [Size] KB
- Implementation effort: [Hours/Days]

**Key Findings:**
1. [Most impactful issue - e.g., "Framer-motion loaded globally adds 117KB to every page"]
2. [Second issue - e.g., "AI chat features block initial paint"]
3. [Third issue - e.g., "No vendor bundle splitting configured"]

---

## Lighthouse Audit Results

### Performance Metrics (Before Optimization)

| Page | Score | FCP | LCP | Speed Index | TBT | CLS |
|------|-------|-----|-----|-------------|-----|-----|
| Home | XX | X.Xs | X.Xs | X.Xs | XXms | 0.XXX |
| Contact | XX | X.Xs | X.Xs | X.Xs | XXms | 0.XXX |
| About | XX | X.Xs | X.Xs | X.Xs | XXms | 0.XXX |
| [Other] | XX | X.Xs | X.Xs | X.Xs | XXms | 0.XXX |

**Legend:**
- FCP (First Contentful Paint): Target < 1.6s
- LCP (Largest Contentful Paint): Target < 2.4s
- Speed Index: Target < 2.3s
- TBT (Total Blocking Time): Target < 150ms
- CLS (Cumulative Layout Shift): Target < 0.1

**Common Issues Across Pages:**
- [Issue 1 affecting multiple pages]
- [Issue 2 affecting multiple pages]
- [Issue 3 affecting multiple pages]

---

## Dependency Analysis

### Large Dependencies (> 100KB)

| Package | Version | Size (KB) | Usage | Status | Recommendation |
|---------|---------|-----------|-------|--------|----------------|
| framer-motion | X.X.X | 117 | 14 files | ⚠️ Overused | Lazy-load or replace with CSS |
| @react-three/fiber | X.X.X | XXX | 1 file | ✅ OK | Already lazy-loaded |
| three | X.X.X | XXX | 1 file | ✅ OK | Keep for Test3D page |
| [Package] | X.X.X | XXX | X files | Status | Recommendation |

### Unused Dependencies

| Package | Type | Size (KB) | Reason |
|---------|------|-----------|--------|
| sharp | devDependency | ~10,000 | Not imported anywhere |
| [Package] | [Type] | [Size] | [Reason] |

**Action:** Remove unused dependencies with `npm uninstall [packages]`

### Duplicate Dependencies

| Package | Versions | Total Size | Caused By |
|---------|----------|------------|-----------|
| [Package] | X.X.X, Y.Y.Y | [Size] KB | [Parent packages] |

**Action:** Run `npm dedupe` or update parent packages to use same version

---

## Import Pattern Analysis

### Non-Tree-Shakeable Patterns

#### Wildcard Imports
```typescript
// File: src/example.ts:10
// ❌ Problem: Imports entire library
import * as Icons from 'react-icons/fa';

// ✅ Fix: Import specific icons
import { FaHome, FaUser } from 'react-icons/fa';
// Estimated savings: ~50KB
```

#### Barrel File Imports
```typescript
// File: src/example.ts:15
// ⚠️ Warning: May prevent tree-shaking
import { Component } from './components/index';

// ✅ Better: Import directly
import { Component } from './components/Component';
```

### Heavy Imports in Critical Path

| File | Line | Import | Size (KB) | Impact |
|------|------|--------|-----------|--------|
| src/App.tsx | XX | AIChatWindow | ~100 | Blocks initial render |
| src/common/components/backgrounds/BackgroundManager.tsx | XX | framer-motion | 117 | Loaded on all pages |
| [File] | [Line] | [Import] | [Size] | [Impact] |

---

## Code-Splitting Analysis

### Current Configuration

**Build Tool:** [Vite/Webpack/Other] v[X.X.X]

**Route-Based Splitting:**
- ✅ Enabled: [List of lazy-loaded routes]
- ❌ Missing: [Routes that should be lazy-loaded]

**Vendor Chunking:**
```typescript
// Current config (vite.config.ts)
[Show current config or "Not configured"]
```

### Current Bundle Structure

```
dist/
├── index-[hash].js (547 KB) ⚠️ Too large
│   ├── react + react-dom
│   ├── react-router-dom
│   ├── framer-motion ⚠️ Should be separate
│   └── Other vendors
├── BackgroundManager-[hash].js (23 KB)
├── [Other chunks]
└── index-[hash].css (35 KB)
```

### Optimization Opportunities

#### 1. Lazy-Load Non-Critical Features

**AI Chat Module** (Priority: HIGH)
- Files affected: `src/App.tsx`, `src/features/ai-chat/*`
- Current: Eager-loaded in App.tsx
- Recommendation: Wrap with React.lazy()
- Estimated savings: ~100KB on initial load
- Impact: Improves FCP by ~0.5s

**Implementation:**
```typescript
// src/App.tsx
// Before:
import { AIChatButton } from './features/ai-chat/AIChatButton';
import { AIChatWindow } from './features/ai-chat/AIChatWindow';

// After:
const AIChatButton = lazy(() => import('./features/ai-chat/AIChatButton'));
const AIChatWindow = lazy(() => import('./features/ai-chat/AIChatWindow'));
```

#### 2. Create CSS-Only Animation Variant

**BackgroundManager** (Priority: HIGH)
- Files affected: `src/common/components/backgrounds/BackgroundManager.tsx`
- Current: Uses framer-motion for all animations
- Recommendation: Add `animationMode` prop, create CSS fallback
- Estimated savings: ~117KB on pages using CSS mode
- Impact: Improves FCP by ~0.8s on simple pages (Contact, About)

**Implementation:**
```typescript
// BackgroundManager.tsx
interface Props {
  animationMode?: 'framer' | 'css'; // Add this prop
}

export const BackgroundManager: React.FC<Props> = ({ 
  animationMode = 'framer' 
}) => {
  if (animationMode === 'css') {
    return <CSSBackgroundManager />; // CSS-only version
  }
  return <FramerBackgroundManager />; // Current implementation
};
```

Then update pages:
```typescript
// src/pages/Contact.tsx
<BackgroundManager animationMode="css" />

// src/pages/Home.tsx (keep framer for interactive features)
<BackgroundManager animationMode="framer" />
```

#### 3. Configure Vendor Bundle Splitting

**Vite Config** (Priority: HIGH)
- File: `vite.config.ts`
- Current: No manual chunking
- Recommendation: Split major vendors into separate chunks

**Implementation:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/anshuman-singh/',
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: './dist/stats.html'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-animations': ['framer-motion'],
          'vendor-icons': ['react-icons'],
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
});
```

---

## Implementation Checklist

### High Priority (> 100KB savings or > 1s improvement)

- [ ] **Lazy-load AI Chat features** (Estimated: ~100KB, ~0.5s FCP improvement)
  - [ ] Update src/App.tsx to use React.lazy() for AIChatButton
  - [ ] Update src/App.tsx to use React.lazy() for AIChatWindow
  - [ ] Add Suspense boundaries with loading fallback
  - [ ] Test chat functionality after lazy loading
  
- [ ] **Create CSS-only BackgroundManager** (Estimated: ~117KB, ~0.8s FCP improvement)
  - [ ] Create CSSBackgroundManager component in src/common/components/backgrounds/
  - [ ] Add animationMode prop to BackgroundManager
  - [ ] Update Contact page to use CSS mode
  - [ ] Update About page to use CSS mode
  - [ ] Update Experience page to use CSS mode
  - [ ] Verify animations still look good
  
- [ ] **Configure vendor bundle splitting** (Estimated: Better caching, ~0.3s improvement)
  - [ ] Add rollup-plugin-visualizer to vite.config.ts
  - [ ] Configure manualChunks in vite.config.ts
  - [ ] Run build and verify chunk structure
  - [ ] Test that all pages load correctly

### Medium Priority (50-100KB savings or 0.5-1s improvement)

- [ ] **Remove unused dependencies**
  - [ ] Uninstall sharp: `npm uninstall sharp`
  - [ ] Run `npm dedupe` to resolve duplicate versions
  - [ ] Update package-lock.json
  
- [ ] **Optimize Three.js usage** (Already lazy-loaded, verify it stays that way)
  - [ ] Confirm Test3D page is lazy-loaded
  - [ ] Verify three.js not in main bundle

### Low Priority (< 50KB savings or < 0.5s improvement)

- [ ] **Set up Lighthouse CI** (Prevents performance regressions)
  - [ ] Create .github/workflows/lighthouse.yml
  - [ ] Configure automated audits on PR
  - [ ] Set performance budgets

---

## Expected Results

### Bundle Size Improvements

| Bundle | Before (KB) | After (KB) | Reduction |
|--------|-------------|------------|-----------|
| Main vendor | 547 | ~350 | -36% (-197 KB) |
| vendor-react | - | ~150 | New chunk |
| vendor-animations | - | ~120 | New chunk |
| vendor-router | - | ~50 | New chunk |
| vendor-icons | - | ~30 | New chunk |

### Performance Score Improvements

| Page | Current Score | Target Score | Expected FCP | Expected LCP |
|------|---------------|--------------|--------------|--------------|
| Contact | 61 | 90+ | 1.4s (-48%) | 2.1s (-58%) |
| About | [XX] | 90+ | <1.6s | <2.4s |
| Home | [XX] | 85+ | <1.8s | <2.6s |
| [Other] | [XX] | 90+ | <1.6s | <2.4s |

**Note:** Home page may score slightly lower due to interactive features requiring framer-motion.

### Page-Specific Improvements

**Contact Page** (Current: 61/100):
- Remove framer-motion from critical path: -117KB, ~0.8s FCP improvement
- Lazy-load AI chat: -100KB, ~0.5s FCP improvement
- Vendor splitting: Better caching, ~0.3s improvement
- **Expected final score: 92/100**

---

## Maintenance Recommendations

1. **Set performance budgets** in Lighthouse CI:
   - FCP < 1.6s
   - LCP < 2.4s
   - Bundle size < 500KB

2. **Regular audits**:
   - Run lighthouse-optimizer monthly
   - Check bundle analyzer after dependency updates
   - Monitor Core Web Vitals in production

3. **Dependency hygiene**:
   - Audit new dependencies before installing (`npm cost-of-modules`)
   - Prefer smaller alternatives when possible
   - Keep dependencies up-to-date for performance fixes

4. **Code review checklist**:
   - [ ] New heavy dependencies justified?
   - [ ] Imports specific, not wildcard?
   - [ ] Heavy components lazy-loaded if not critical?
   - [ ] Images optimized and lazy-loaded?

---

## Notes

[Any additional observations, constraints, or context-specific recommendations]

---

## Appendix

### Commands Used

```bash
# Dependency analysis
npx depcheck
npx cost-of-modules

# Import pattern search
rg "import \* as" src/
rg "import.*from ['\"]react-icons['\"]" src/

# Lighthouse audits
lighthouse http://localhost:5176/contact --output=json --output=html --output-path=./reports/contact

# Build analysis
npm run build
```

### References

- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [React Code-Splitting](https://react.dev/reference/react/lazy)
- [Web.dev Performance](https://web.dev/performance/)
