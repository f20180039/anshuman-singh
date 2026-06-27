---
name: lighthouse-optimizer
description: Analyze and optimize Lighthouse performance scores across all pages through dependency auditing, tree-shaking improvements, bundle analysis, and code-splitting recommendations. Use when you want to improve page load performance, reduce bundle sizes, identify unused dependencies, or optimize import patterns for better tree-shaking.
user-invocable: true
---

# lighthouse-optimizer — Performance Optimization Through Bundle Analysis

This skill systematically analyzes and optimizes web application performance by examining dependencies, imports, code-splitting configuration, and running Lighthouse audits to generate actionable recommendations.

## What This Skill Does

1. **Dependency Analysis**: Audits package.json for heavy, unused, or duplicate dependencies
2. **Import Pattern Analysis**: Identifies non-tree-shakeable imports, wildcard patterns, and optimization opportunities
3. **Code-Splitting Review**: Verifies lazy-loading configuration and identifies eager-loaded heavy modules
4. **Lighthouse Audits**: Runs performance audits on all pages and generates comparison reports
5. **Bundle Analysis**: Configures and runs bundle visualizers to identify optimization targets
6. **Actionable Recommendations**: Provides specific file/line changes with estimated performance impact
7. **Automated Fixes**: Optionally implements recommended optimizations with verification

## When to Use

- Lighthouse scores are below target (< 90 for performance)
- Initial page load is slow (FCP > 1.6s, LCP > 2.4s)
- Large vendor bundles without explicit chunking
- Heavy dependencies loaded on all pages
- Before deploying performance-critical changes
- Regular performance audits (weekly/sprint reviews)

## Workflow

### Phase 1: Discovery & Analysis

1. **Locate project root** and verify build configuration
   - Find package.json, vite.config/webpack.config
   - Identify all page routes (React Router, file-based routing, etc.)
   - List all dependencies with sizes (use `npm list --depth=0`)

2. **Analyze dependencies**
   ```bash
   # Check for unused dependencies
   npx depcheck
   
   # Get dependency sizes
   npx cost-of-modules
   ```
   
   Identify:
   - Dependencies > 100KB
   - DevDependencies in production bundle
   - Duplicate dependencies (different versions)
   - Unused dependencies (installed but never imported)

3. **Audit import patterns**
   
   Search for problematic patterns:
   ```bash
   # Wildcard imports (prevents tree-shaking)
   rg "import \* as" src/
   
   # Default imports from large libraries
   rg "import.*from ['\"]react-icons['\"]" src/
   
   # Barrel file imports
   rg "import.*from ['\"]\..*\/index['\"]" src/
   ```
   
   Check each import for:
   - Specific vs wildcard imports
   - Named imports from tree-shakeable libraries
   - Heavy dependencies imported in multiple places

4. **Review code-splitting configuration**
   
   Examine:
   - Route-based splitting (React.lazy, dynamic imports)
   - Vendor chunk configuration
   - Module preloading strategy
   - Critical CSS extraction
   
   For Vite projects, check `vite.config.ts`:
   ```typescript
   build: {
     rollupOptions: {
       output: {
         manualChunks: // should split large vendors
       }
     }
   }
   ```

5. **Identify eager-loaded heavy modules**
   
   Find modules loaded in App.tsx or layout components that could be:
   - Lazy-loaded when needed
   - Conditionally loaded based on route
   - Deferred until after initial paint
   
   Common culprits:
   - Animation libraries (framer-motion, gsap)
   - Chat widgets
   - Analytics (non-critical)
   - 3D libraries (three.js) on non-3D pages

### Phase 2: Lighthouse Audits

6. **Install Lighthouse CLI** if not present
   ```bash
   npm install -g lighthouse
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```
   Note the port (usually 3000, 5173, 5176, etc.)

8. **Run Lighthouse on all pages**
   
   For each route, run:
   ```bash
   lighthouse http://localhost:PORT/ROUTE \
     --output=json \
     --output=html \
     --output-path=./lighthouse-reports/ROUTE-report \
     --only-categories=performance \
     --chrome-flags="--headless"
   ```
   
   Pages to audit:
   - Home (/)
   - All main routes
   - Any dynamic routes with representative params

9. **Parse and aggregate results**
   
   Extract key metrics from JSON reports:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Speed Index
   - Total Blocking Time (TBT)
   - Cumulative Layout Shift (CLS)
   - Performance Score
   
   Identify patterns:
   - Which pages have worst scores?
   - Common bottlenecks across pages?
   - Specific resources blocking paint?

### Phase 3: Bundle Analysis

10. **Configure bundle analyzer** if not present
    
    For Vite projects, add to `vite.config.ts`:
    ```typescript
    import { visualizer } from 'rollup-plugin-visualizer';
    
    export default defineConfig({
      plugins: [
        // existing plugins...
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          filename: './dist/stats.html'
        })
      ]
    });
    ```
    
    For Webpack: use `webpack-bundle-analyzer`

11. **Build and analyze**
    ```bash
    npm run build
    ```
    
    Review the generated stats.html to identify:
    - Largest chunks
    - Duplicate dependencies
    - Vendor bundle composition
    - Which dependencies end up in which chunks

### Phase 4: Generate Recommendations

12. **Prioritize optimizations** by impact
    
    **HIGH PRIORITY** (saves > 100KB or > 1s load time):
    - Lazy-load heavy modules only used on specific pages
    - Split large vendor bundles
    - Remove unused dependencies
    - Fix non-tree-shakeable imports
    
    **MEDIUM PRIORITY** (saves 50-100KB or 0.5-1s):
    - Convert animations to CSS where possible
    - Defer non-critical third-party scripts
    - Optimize image loading strategies
    - Implement route-based code splitting
    
    **LOW PRIORITY** (saves < 50KB or < 0.5s):
    - Remove duplicate dependencies
    - Optimize small libraries
    - Tree-shake unused exports from own code

13. **Write analysis report** using template
    
    Create a report with:
    - Executive summary (current vs target scores)
    - Dependency breakdown (size, usage, recommendation)
    - Import pattern issues (file:line, problem, fix)
    - Code-splitting opportunities (module, estimated savings)
    - Before/after metrics table
    - Implementation checklist

### Phase 5: Implementation

14. **Apply optimizations** in priority order
    
    For each recommendation:
    - Show the specific change (file, line numbers, before/after code)
    - Explain the impact
    - Ask for approval if significant architectural change
    - Implement the change
    - Verify functionality still works

15. **Common optimization patterns**
    
    **Lazy-load modules:**
    ```typescript
    // Before
    import HeavyComponent from './HeavyComponent';
    
    // After
    const HeavyComponent = lazy(() => import('./HeavyComponent'));
    
    // Usage with Suspense
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
    ```
    
    **Fix imports for tree-shaking:**
    ```typescript
    // Before (brings entire library)
    import * as Icons from 'react-icons/fa';
    
    // After (tree-shakes unused icons)
    import { FaHome, FaUser } from 'react-icons/fa';
    ```
    
    **Configure vendor chunks:**
    ```typescript
    // vite.config.ts
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-animations': ['framer-motion'],
            'vendor-icons': ['react-icons']
          }
        }
      }
    }
    ```
    
    **Remove unused dependencies:**
    ```bash
    npm uninstall unused-package
    ```

16. **Rebuild and verify**
    ```bash
    npm run build
    ```
    
    Check:
    - Build succeeds without errors
    - Bundle sizes decreased
    - No missing imports or runtime errors
    - Chunk structure matches configuration

### Phase 6: Verification

17. **Re-run Lighthouse audits** on same pages
    ```bash
    # Run on each previously audited page
    lighthouse http://localhost:PORT/ROUTE --output=json ...
    ```

18. **Compare before/after metrics**
    
    Create comparison table:
    | Page | Metric | Before | After | Improvement |
    |------|--------|--------|-------|-------------|
    | Contact | FCP | 2.7s | 1.4s | -48% |
    | Contact | LCP | 5.0s | 2.1s | -58% |
    | Contact | Score | 61 | 92 | +51% |

19. **Test functionality**
    
    Verify critical user paths:
    - Navigation between pages
    - Interactive features (chat, forms, animations)
    - Dynamic imports load correctly
    - No console errors
    - Visual regression check

20. **Generate final report**
    
    Summary including:
    - Optimizations applied (list with file references)
    - Metrics improvements (table with all pages)
    - Bundle size reductions (before/after chart)
    - Remaining opportunities (if any)
    - Maintenance recommendations

## Analysis Report Template

Use `analysis-template.md` in this directory for structured reporting.

## Best Practices

- **Measure first**: Always run audits before making changes
- **One change at a time**: Test each optimization independently
- **Verify tree-shaking**: Check build output to confirm unused code removed
- **Consider mobile**: Run audits with mobile throttling
- **Don't over-optimize**: Balance bundle size vs HTTP requests
- **Document decisions**: Note why certain dependencies can't be removed
- **Set up CI**: Automate Lighthouse audits in CI/CD pipeline
- **Regular audits**: Run monthly or after major dependency updates

## Common Issues

**Issue: devDependencies in production bundle**
- Check build config excludes dev-only code
- Verify dynamic imports use correct conditions
- Use environment variables (import.meta.env, process.env)

**Issue: Tree-shaking not working**
- Ensure "sideEffects": false in package.json of libraries
- Check for CommonJS imports (require()) in ESM project
- Verify Rollup/Webpack config enables tree-shaking

**Issue: Large vendor bundle despite chunking**
- Check for duplicate dependencies (run `npm dedupe`)
- Review peer dependencies bringing in multiple versions
- Consider using smaller alternatives (date-fns vs moment)

**Issue: Lazy-loaded chunks too small**
- Don't split every component, only meaningful size improvements
- Group related components into single lazy chunk
- Aim for chunks > 20KB to justify HTTP overhead

## Files in This Skill

- `SKILL.md` — this file
- `analysis-template.md` — structured report template for findings
- `scripts/` — helper scripts for automation (optional)

## Integration with CI/CD

Add Lighthouse CI for automated performance monitoring:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:4173/
            http://localhost:4173/contact
          uploadArtifacts: true
```

## Output Format

When invoked, this skill produces:

1. **Console summary**: Quick overview of findings (< 200 words)
2. **Detailed report**: Markdown file with full analysis and recommendations
3. **Lighthouse reports**: HTML/JSON reports for each audited page
4. **Bundle visualization**: Interactive HTML chart of bundle composition
5. **Implementation checklist**: Prioritized TODO list with estimates

The user can choose to:
- Review recommendations only (no changes)
- Apply specific optimizations selectively
- Apply all high-priority fixes automatically
- Set up automated monitoring for future changes
