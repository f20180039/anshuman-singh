# Project Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add seven recent projects to the portfolio as cards that open `/projects/:slug` case-study pages, a Featured work section on Home, real screenshots, and updated chatbot knowledge.

**Architecture:** One typed data module (`src/data/projects.ts`) is the single source for the Projects grid, the case-study route and the Home section; guard tests over that module enforce the spec's anti-goals (no private code links, no names, no overclaiming). A new lazy `CaseStudy` page renders a project by slug and falls through to `NotFound` for unknown slugs; each slug gets an SEO entry so meta and sitemap stay exact-path. Images are captured from locally running apps, approved by the owner, and converted to WebP by the existing `gen:images` script.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind (`ans-` prefix, `th-*` tokens), Framer Motion, react-router-dom 6; new dev deps for tests: `vitest@3.2.4`, `jsdom@26.1.0`, `@testing-library/react@16.3.0`, `@testing-library/jest-dom@6.6.3`.

**Spec:** `docs/superpowers/specs/2026-10-21-project-case-studies-design.md` (read it; its "Content facts" are the only allowed source for copy and numbers).

## Global Constraints

- Work on branch `feat/project-case-studies` off local `master` (commit `8e84336`). Never touch `wip/galaxy-backgrounds`.
- **No `git push` and no deploy in any task.** Pushing `master` publishes the site; Task 8 asks the owner first.
- Commits authored as `singh.anshuman.singh8@gmail.com` (repo-local config already set; verify with `git config user.email`).
- `npm run build` (lint + tsc + gen:seo + vite build) must pass at the end of every task that touches `src/`.
- Private repos — `shaanti`, `satya-aahar`, `mangakahue`, `solarfile-reels`, `quiz-wizz` — never get a GitHub link; they show a "Private code" badge.
- Public repo links exactly: Signal Desk `https://github.com/f20180039/moveinsync-hackathon-research`, Toodler `https://github.com/f20180039/toodler`.
- No person's name or handle in any copy: not "Prathamesh", not "alok2569", not "Alok". Credits read exactly "Built with a teammate" (Signal Desk) and "Seeded from a friend's open-source reels-generator" (SolarFile Reels).
- Status labels exactly (spec anti-goal: no overclaiming): Shaanti `Play Store release pending`; Satya Aahar `In development`; MangakaHue `Closed beta soon`; SolarFile Reels `In development`; Signal Desk `Hackathon build`; Toodler `Live prototype`; Quiz Wizz `Private release (v1.3.2)`.
- Quiz Wizz copy leads with the engine (OCR on canvas-rendered pages, multi-model consensus voting, shared answer cache), describes use as a practice / study aid; must not match `/cheat|bypass|beat (the |real )?quiz/i`.
- No live link for Signal Desk; Toodler live link `https://toddle-admissions-prototype.onrender.com`; Shaanti links `https://shaanti.pages.dev` and `https://www.youtube.com/watch?v=b3z-wqRHSsA`. Every external link opens with `target="_blank" rel="noopener noreferrer"`.
- TradingAgents does not appear anywhere.
- Featured on Home, in this order: `shaanti`, `signal-desk`, `mangakahue`.
- Card order on `/projects`: the three featured, then `satya-aahar`, `solarfile-reels`, `toodler`, `quiz-wizz`, then the existing older projects in their current order.
- MangakaHue artwork: public-domain or Creative Commons only, with source and licence credited on the page. Satya Aahar sample card: anonymised product (no brand).
- Keep the existing accessibility bar: `alt` describes what the image shows (not the title), visible keyboard focus, headings in order.

## Review Focus

1. **Hard refresh / direct open of `/anshuman-singh/projects/shaanti`** → page renders via the `public/404.html` shim (locally in Task 4 Step 5 via `vite preview`; on the live site in Task 8 Step 7).
2. **Unknown slug `/projects/does-not-exist`** → `NotFound` page with the 404 SEO entry (noindex), not a blank page or crash. Test in Task 4.
3. **Header on a case-study page** → "Projects" nav item shows as active. Test in Task 4.
4. **Narrow phone (390 px) with portrait Shaanti screenshots** → no horizontal scroll, images not stretched. Manual check in Task 8 local review.
5. **Project with no image yet** (images land in Task 6/7) → card and case study still render with the existing placeholder, no broken `<img>`. Test in Task 3.

---

### Task 1: Test harness and typed project data module

**Files:**

- Modify: `package.json` (devDependencies + `"test": "vitest run"` script)
- Create: `vitest.config.ts`, `src/test/setup.ts`
- Create: `src/data/projects.ts`
- Test: `src/data/projects.test.ts`

**Interfaces:**

- Produces (all exported from `src/data/projects.ts`):
  - `type StatusKind = "live" | "in-progress" | "build"`
  - `interface ProjectImage { src: string; alt: string }`
  - `interface ProjectLink { label: string; href: string }`
  - `type RepoInfo = { visibility: "public"; url: string } | { visibility: "private" }`
  - `interface CaseStudy { problem: string; built: string[]; stack: string[]; decisions: string[]; numbers: string[]; credit?: string; artworkCredit?: string; gallery: ProjectImage[] }`
  - `interface Project { slug: string; title: string; tagline: string; description: string; image?: ProjectImage; tech: IconType[]; repo: RepoInfo; links: ProjectLink[]; status?: { kind: StatusKind; label: string }; internalPath?: string; caseStudy?: CaseStudy }`
  - `const PROJECTS: Project[]`, `const FEATURED_SLUGS: readonly ["shaanti", "signal-desk", "mangakahue"]`
  - `function getProjectBySlug(slug: string): Project | undefined` (only returns projects that have `caseStudy`)
  - `function caseStudyPath(slug: string): string` → `` `/projects/${slug}` ``

- [ ] **Step 1: Install test deps** — `npm i -D vitest@3.2.4 jsdom@26.1.0 @testing-library/react@16.3.0 @testing-library/jest-dom@6.6.3`; add `"test": "vitest run"`; `vitest.config.ts` uses the React plugin, `environment: "jsdom"`, `setupFiles: ["src/test/setup.ts"]` (imports `@testing-library/jest-dom/vitest`). Exclude test files from the `tsc` app build only if `tsc` complains; keep them linted.
- [ ] **Step 2: Write failing tests** in `src/data/projects.test.ts`:
  - `"slugs are unique and kebab-case"` — `new Set(slugs).size === slugs.length`; each matches `/^[a-z0-9]+(-[a-z0-9]+)*$/`.
  - `"migrates the five existing projects unchanged"` — titles include `"Portfolio Website"`, `"Exploding Production Game"`, `"Multiplayer Game Hub"`, `"Snapgram"`, `"Guess Game"`; Snapgram `repo` is `{visibility:"public", url:"https://github.com/f20180039/snapgram"}` and its live link href `"https://stalkergram.netlify.app"`; Guess Game has `internalPath === "/guess-game"`.
  - `"getProjectBySlug only resolves case studies"` — `getProjectBySlug("snapgram")` is `undefined`; `getProjectBySlug("nope")` is `undefined`.
  - `"caseStudyPath"` — `caseStudyPath("shaanti") === "/projects/shaanti"`.
- [ ] **Step 3: Run** `npm test` → FAIL (module missing).
- [ ] **Step 4: Implement `src/data/projects.ts`** with the types above and the five existing entries moved verbatim from `src/pages/Projects.tsx:24-86` (same titles, descriptions, images/imports, alts, links, tech icons; the commented-out Pig Game stays out). Map `github` → `repo`, `liveDemo` → `links: [{label:"Live demo", href}]`, `isInternal` → `internalPath`. `FEATURED_SLUGS` exported now; its projects arrive in Task 2.
- [ ] **Step 5: Run** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 6: Commit** `chore(test): add vitest; feat(projects): typed project data module`.

### Task 2: Seven case-study entries with guard tests

**Files:**

- Modify: `src/data/projects.ts`
- Test: `src/data/projects.content.test.ts`

**Interfaces:**

- Consumes: Task 1 types and exports.
- Produces: seven `Project` entries with `caseStudy`, slugs exactly `shaanti`, `satya-aahar`, `mangakahue`, `solarfile-reels`, `signal-desk`, `toodler`, `quiz-wizz`; `PROJECTS` ordered per Global Constraints. `image` and `gallery` left empty/undefined until Tasks 6–7.

- [ ] **Step 1: Write failing tests** (`projects.content.test.ts`):
  - `"has exactly the seven case studies"` — `PROJECTS.filter(p => p.caseStudy).map(p => p.slug)` equals `["shaanti","signal-desk","mangakahue","satya-aahar","solarfile-reels","toodler","quiz-wizz"]`.
  - `"featured slugs resolve, in order"` — `FEATURED_SLUGS.map(getProjectBySlug)` all defined; equals `["shaanti","signal-desk","mangakahue"]`.
  - `"private repos never link to GitHub"` — for the five private slugs: `repo.visibility === "private"` and no `links[].href` contains `github.com`.
  - `"public repos link exactly"` — signal-desk and toodler `repo.url` equal the Global Constraints URLs.
  - `"status labels are exact"` — map slug → label equals the Global Constraints table.
  - `"no names or handles in any copy"` — `JSON.stringify(PROJECTS)` does not match `/Prathamesh|alok2569|\bAlok\b/i`.
  - `"credits are exact"` — signal-desk `caseStudy.credit === "Built with a teammate"`; solarfile-reels `=== "Seeded from a friend's open-source reels-generator"`.
  - `"no overclaiming"` — shaanti strings do not match `/available on (google )?play|on the play store|download (it )?on/i`; no case study besides toodler has `status.kind === "live"`.
  - `"quiz wizz framing"` — its JSON does not match `/cheat|bypass|beat (the |real )?quiz/i` and does match `/OCR/` and `/consensus|vot/i`.
  - `"signal desk has no live link"` and `"toodler live link"` — exact hrefs per Global Constraints; shaanti links equal the two Shaanti URLs.
  - `"case-study shape"` — every case study: `built.length` 3–6, `decisions.length` 1–3, `stack.length >= 3`, non-empty `problem`, every external `href` starts with `https://`.
  - `"no TradingAgents"` — JSON does not match `/TradingAgents/i`.
  - `"toodler naming"` — toodler `title === "Toodler"` and its `tagline` or `description` contains `Toddle`.
- [ ] **Step 2: Run** `npm test` → FAIL.
- [ ] **Step 3: Write the seven entries** from the spec's "Content facts" only (numbers verbatim: e.g. Shaanti `~1,100 tests`; Signal Desk `3.44M rows ingested in 6.99 s`, `metric query p50 14.7 ms`, `~125 pytest + 217 Vitest tests`, `₹0.13–0.77 per brief`; Satya Aahar `73 additives, 11 allergens, 32 golden vectors`, `~1,000 tests`; MangakaHue `119 tests`, `7 pluggable providers`; Toodler `15 seed workflows, 197 config panels, 47 tests`). Tagline ≤ 90 chars; description 1–2 sentences for the card. Tech icons from `react-icons/si` where one exists (e.g. `SiKotlin`, `SiAndroid`, `SiPython`, `SiFastapi`, `SiNextdotjs`, `SiSupabase`, `SiDuckdb`, `SiReact`, `SiTypescript`, `SiGooglechrome`); skip techs without an icon (they appear in `caseStudy.stack` text).
- [ ] **Step 4: Run** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 5: Commit** `feat(projects): seven case-study entries with content guard tests`.

### Task 3: Projects grid from the data module

**Files:**

- Modify: `src/pages/Projects.tsx` (replace the inline `projects` array and card logic)
- Create: `src/features/projects/ProjectCard.tsx`, `src/features/projects/StatusBadge.tsx`
- Test: `src/features/projects/ProjectCard.test.tsx`

**Interfaces:**

- Consumes: `PROJECTS`, `Project`, `caseStudyPath`.
- Produces: `ProjectCard({ project, index }: { project: Project; index: number })`, `StatusBadge({ status }: { status: NonNullable<Project["status"]> })` — reused by Tasks 4 and 5.

- [ ] **Step 1: Write failing tests** (render inside `MemoryRouter`):
  - `"case-study card links to its page"` — shaanti card has a link with accessible name containing `Shaanti` and `href` `/projects/shaanti`; no GitHub link; text `Private code` and `Play Store release pending` present.
  - `"public card shows GitHub link with safe rel"` — signal-desk card: link to its GitHub URL has `target="_blank"` and `rel="noopener noreferrer"`.
  - `"older project keeps its behaviour"` — snapgram card shows `Live demo` linking to `https://stalkergram.netlify.app` and GitHub; Guess Game navigates in-app to `/guess-game`.
  - `"card without image renders placeholder"` (Review Focus 5) — a project with `image` undefined renders no `<img>` and renders the placeholder icon's accessible label.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** — keep the current card visuals and motion (tilt, hover gradient, skeleton, placeholder from `Projects.tsx:142-181`); whole case-study card is one link (no nested interactive elements inside it — secondary links render below the card body outside the main link). `Projects.tsx` maps `PROJECTS`; section headings "Recent work" (projects with `caseStudy`) and "Earlier projects" (the rest).
- [ ] **Step 4: Run** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 5: Commit** `feat(projects): grid driven by project data with status and private-code badges`.

### Task 4: Case-study page, route, SEO entries, active nav

**Files:**

- Create: `src/pages/CaseStudy.tsx`
- Modify: `src/App.tsx` (lazy route `path="/projects/:slug"` before the catch-all), `src/common/constants/index.ts` (`EAPP_ROUTES.caseStudy = "/projects/:slug"`), `src/common/components/Header.tsx:69,75,178` (active when `pathname === path || pathname.startsWith(path + "/")`, but `/` stays exact), `src/common/seo/pages.json`
- Test: `src/pages/CaseStudy.test.tsx`, `src/common/seo/pages.test.ts`

**Interfaces:**

- Consumes: `getProjectBySlug`, `PROJECTS`, `StatusBadge`, `caseStudyPath`; `getPageSeo(pathname)` from `src/common/seo/meta.ts`.

- [ ] **Step 1: Write failing tests:**
  - `CaseStudy.test.tsx` `"renders sections for a slug"` — at `/projects/signal-desk`: heading level 1 `Signal Desk`; headings "The problem", "What I built", "How it's built", "By the numbers"; text `Built with a teammate`; link back to `/projects`.
  - `"unknown slug shows NotFound"` (Review Focus 2) — at `/projects/does-not-exist` the NotFound page's heading renders.
  - `"artwork credit shown when present"` — mangakahue renders its `artworkCredit` text (non-empty once Task 7 lands; until then assert the section is absent when undefined).
  - `Header` `"Projects is active on a case study"` (Review Focus 3) — render `Header` at `/projects/shaanti`; the Projects nav link has the same active marker/`aria-current="page"` it has on `/projects`; Home is not active.
  - `pages.test.ts` `"every case study has an indexable SEO entry"` — for each case-study slug, `pages.json` has `path` `/projects/<slug>`, `indexable: true`, `title.length <= 60`, `description.length <= 160`, title contains the project title; `getPageSeo("/projects/does-not-exist").indexable === false`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** `CaseStudy` per the spec's page shape (title + tagline · `StatusBadge` + "Private code" badge · hero/gallery (empty-safe) · sections · `numbers` as a list · links row · credit/artworkCredit lines · back link). Unknown slug returns `<NotFound />`. Add seven `pages.json` entries (`priority: 0.6`, `changefreq: "monthly"`). Add `aria-current="page"` to the active nav link if Header doesn't set it.
- [ ] **Step 4: Run** `npm test` → PASS; `npm run build` → PASS (gen:seo prints 7 more sitemap URLs).
- [ ] **Step 5: Local deep-link check** — `npm run build && npx vite preview`; open `http://localhost:4173/anshuman-singh/projects/shaanti` directly and refresh → page renders.
- [ ] **Step 6: Commit** `feat(projects): case-study pages with SEO entries and active nav`.

### Task 5: Featured work on Home

**Files:**

- Modify: `src/pages/Home.tsx` (new section after the existing highlights/CTA block; keep `HIGHLIGHTS` stat tiles as they are)
- Create: `src/features/projects/FeaturedWork.tsx`
- Test: `src/features/projects/FeaturedWork.test.tsx`

**Interfaces:**

- Consumes: `FEATURED_SLUGS`, `getProjectBySlug`, `caseStudyPath`, `StatusBadge`.

- [ ] **Step 1: Write failing test** `"lists the three flagships in order"` — three links with hrefs `/projects/shaanti`, `/projects/signal-desk`, `/projects/mangakahue` in that DOM order; section heading `Featured work`; a link `See all projects` → `/projects`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** compact cards (image or placeholder, title, tagline, status badge), responsive 1/2/3 columns; reuse theme tokens; fires existing `trackEvent` on click with event name `featured_project_click` and `{ slug }`.
- [ ] **Step 4: Run** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 5: Commit** `feat(home): featured work section`.

### Task 6: Screenshots from existing assets and local captures

**Files:**

- Create: PNG sources under `src/assets/projects/` (converted, then sources deleted per `scripts/optimize-images.js` header), WebP outputs alongside
- Modify: `scripts/optimize-images.js` (TARGETS: `projects/<slug>-card.png → .webp` width 640; `projects/<slug>-<n>.png → .webp` width 1280), `src/data/projects.ts` (`image`, `caseStudy.gallery`)
- Test: `src/data/projects.images.test.ts`

Covers: shaanti (`/Users/anshumansingh/Desktop/MY/shaanti/shaanti-play-assets/01-home.png…06-settings-calls.png`, `feature-graphic-1024x500.png`), quiz-wizz (`/Users/anshumansingh/Desktop/MY/quiz-wizz/quiz-wizz-automator/store/promo-440x280.png`), and local captures of toodler (`npm run dev` in its repo), signal-desk console (run per its README, no keys), solarfile-reels studio (`frontend` dev server, signed in as owner) + one frame from a generated reel.

- [ ] **Step 1: Write failing test** `"every referenced image exists and has alt text"` — for every `image` and `gallery` entry: `alt.trim().length >= 15` and alt does not equal the project title; the three featured projects and all case studies except satya-aahar and mangakahue have `image` defined (those two arrive in Task 7).
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Capture** with a headless Chromium (`"/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=<out>.png <url>`; fall back to `npx playwright@1.48.2 screenshot` if Brave is absent). Capture scripts live in the session scratchpad, not the repo. Before saving, check each image for personal data (emails, keys, owner account names, real user content) and crop/blur it.
- [ ] **Step 4: Owner approval (STOP)** — show the owner every new image (path list + open them); proceed only with approved ones; re-capture rejected ones.
- [ ] **Step 5: Convert** — add TARGETS, `npm run gen:images`, delete the PNG sources, wire imports into `projects.ts`.
- [ ] **Step 6: Run** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 7: Commit** `feat(projects): screenshots for case studies`.

### Task 7: MangakaHue licensed before/after and Satya Aahar card + diagram

**Files:**

- Create: `src/assets/projects/mangakahue-*.webp`, `src/assets/projects/satya-aahar-flow.svg`, `src/assets/projects/satya-aahar-card.webp`
- Modify: `src/data/projects.ts` (`image`, `gallery`, `mangakahue.caseStudy.artworkCredit`), `scripts/optimize-images.js`
- Test: extend `src/data/projects.images.test.ts`

- [ ] **Step 1: Extend failing test** — all seven case studies now have `image`; `mangakahue.caseStudy.artworkCredit` matches `/public domain|CC BY|CC0|Creative Commons/i` and contains `https://`.
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: MangakaHue** — pick a black-and-white manga page from Wikimedia Commons whose file page states Public Domain or a CC licence (record URL, author, licence). Colourise it with MangakaHue's local pipeline (`/Users/anshumansingh/Desktop/MY/MangakaHue`, per its docs). Build a side-by-side before/after; capture the reader/library showing only that page. `artworkCredit` = "Artwork: <title> by <author>, <licence>, via Wikimedia Commons (<url>)".
- [ ] **Step 4: Satya Aahar** — write a synthetic label for an anonymised product "Cream biscuits, 100 g" (plausible per-100 g values that trigger HIGH SUGAR) and run it through the real engine in `/Users/anshumansingh/Desktop/MY/satya-aahar/api` (its venv / pytest fixtures show the call); render the verdict as a clean card (HTML → headless screenshot). Hand-author `satya-aahar-flow.svg`: Label photo → barcode + vision extraction → rules engine (ICMR-NIN 2024 pack) → warnings (EN/हिंदी) → family flags. No brand names anywhere.
- [ ] **Step 5: Owner approval (STOP)** — show all images and the artwork's licence page; proceed only if approved.
- [ ] **Step 6: Convert, wire, run** `npm test` and `npm run build` → PASS.
- [ ] **Step 7: Commit** `feat(projects): MangakaHue licensed before/after and Satya Aahar visuals`.

### Task 8: Chatbot knowledge, final verification, publish gate

**Files:**

- Modify: `src/ai/faq-knowledge-base.ts` ("What projects have you built?" answer ≈ line 81–83 and `## Projects` list ≈ lines 146–150), `server/faq-data.json` (`FAQ_DATABASE` same question, `RESUME_CONTEXT` `## Projects`)
- Test: `src/ai/faq-knowledge-base.test.ts`

- [ ] **Step 1: Write failing tests** — FE knowledge-base string mentions each of the seven project titles; `server/faq-data.json` `RESUME_CONTEXT` and the matching FAQ answer mention the same seven; neither file matches `/Prathamesh|alok2569|\bAlok\b|TradingAgents/i`; neither contains `github.com/f20180039/(shaanti|satya-aahar|MangakaHue|solarfile-reels|quiz-wizz)`; neither claims Shaanti is on the Play Store (`/available on (google )?play|on the play store/i`).
- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Update both files** with one-line blurbs drawn from `projects.ts` copy (same statuses, same credits). Keep HealthPlix work first in the answer.
- [ ] **Step 4: Run** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 5: Commit** `feat(chat): project knowledge for the new case studies`.
- [ ] **Step 6: Final checks** — `curl -sI` returns 200 for `https://shaanti.pages.dev`, `https://toddle-admissions-prototype.onrender.com` (Render may cold-start: retry once after 60 s; if still down, remove the link and tell the owner). Run `npm run dev` and open the site for the owner: `/`, `/projects`, all seven `/projects/<slug>`, at desktop width and at 390 px (Review Focus 4: no horizontal scroll, portrait screenshots not stretched).
- [ ] **Step 7: Publish gate (STOP)** — ask the owner (AskUserQuestion) whether to merge `feat/project-case-studies` into `master` and push (which deploys to GitHub Pages). Only on an explicit yes: merge, push, wait for the `deploy.yml` run to finish, then verify Review Focus 1 on the live site (`https://f20180039.github.io/anshuman-singh/projects/shaanti`, direct open + refresh). Remind the owner the chatbot backend on Render picks up `server/faq-data.json` only on its next redeploy.
