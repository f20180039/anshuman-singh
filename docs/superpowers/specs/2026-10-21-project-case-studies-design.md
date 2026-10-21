# Project case studies — design

Date: 2026-10-21 · Repo: `anshuman-singh` (portfolio, GitHub Pages) · Status: draft for owner review

## Intent

The portfolio stopped at 16 Aug 2026 and shows none of the work since. It has to serve three
audiences at once (owner's words): **recruiters / hiring managers** (prove senior engineering
depth), **clients / collaborators** (prove whole products get shipped end to end) and **users
of the owner's apps** (send them to Shaanti, MangakaHue, …). The update adds the recent
projects as **cards that open dedicated case-study pages**, plus a **Featured work** section
on Home.

## Goals

1. `/projects` becomes a card grid; each new project's card opens `/projects/<slug>`.
2. Seven new case studies: **Shaanti, Satya Aahar, MangakaHue, SolarFile Reels, Signal Desk,
   Toodler, Quiz Wizz** (content facts below).
3. Existing projects (Portfolio Website, Exploding Production, Multiplayer Game Hub, Snapgram,
   Guess Game) stay as cards with their current behaviour; no case studies for them.
4. Home gets a **Featured work** section linking to three flagship case studies:
   **Shaanti, Signal Desk, MangakaHue** (builder's/owner-confirmable pick).
5. The chatbot's project knowledge is updated so it can answer about the new projects.
6. Every image is real (captured or existing asset), approved by the owner before commit.

## Non-goals

- TradingAgents — excluded (owner: it's a clone of a public repo).
- Case studies for the older projects.
- The parked background redesign (branch `wip/galaxy-backgrounds`, local only) — not merged,
  not built on. Work starts from `master` as published.
- Resume / Experience / Skills changes.

## Anti-goals (would make this a failure even if it works)

- **Overclaiming status.** Nothing may say "launched", "on Play Store" or "live" unless true.
  Shaanti is _not_ on Play (rejected 27 Sep: VPN apps need an organisation account; D-U-N-S
  pending) — say "Play Store release pending". MangakaHue is not live — "closed beta soon".
- **Code links to private repos.** Shaanti, Satya Aahar, MangakaHue, SolarFile Reels and Quiz
  Wizz are PRIVATE: show a "Private code" badge, never a GitHub link.
- **Taking credit for others' work.** Signal Desk was built with a teammate (6 of 227 commits
  are theirs) — say so. SolarFile Reels is seeded from a friend's open reels-generator — credit it.
- **Quiz Wizz reading as a cheating tool.** Lead with the engine (OCR on canvas-rendered
  pages, multi-model consensus voting, shared answer cache); describe the use as a practice /
  study aid; no walkthrough of beating real quizzes.
- Secrets, internal URLs, or the owner's personal data in public pages or screenshots.

## Constraints

- Stack as-is: React 19 + TS + Vite 6, Tailwind with `ans-` prefix and `th-*` theme tokens,
  Framer Motion, react-router v6 under `basename` `/anshuman-singh/`.
- GitHub Pages SPA: deep links rely on `public/404.html` redirect — `/projects/<slug>` must
  load correctly on a hard refresh and when opened directly.
- `npm run build` = `lint && tsc && gen:seo && vite build` must pass. New routes go in
  `src/common/seo/pages.json` so `gen:seo` adds them to the sitemap, with per-page title/description.
- Images: WebP via `npm run gen:images` (`scripts/optimize-images.js` TARGETS, 640 px card
  width today). Case-study hero/gallery images likely need a larger variant (~1280 px) — builder decides sizes.
- Pushing `master` auto-deploys publicly. **No push without the owner's explicit OK** after
  they've reviewed the site running locally.
- Commits use `singh.anshuman.singh8@gmail.com` (repo-local config already set).
- Accessibility bar already in the codebase: descriptive `alt` (what the image shows, not the
  title), skip link, contrast, keyboard focus. Keep it.

## Decided (by the owner)

- Layout **C**: cards → case-study pages (chosen over grouped grid and spotlight rows).
- Featured on Home: yes, three flagships.
- Screenshots: Claude captures them by running apps locally; owner approves each.
- Quiz Wizz: framed as the engine (see anti-goals).
- Toodler: **name Toddle** (it was Toddle's Round-2 take-home).
- TradingAgents out; all seven others in.
- MangakaHue artwork: use a **public-domain or Creative Commons** manga page (clear licence),
  colourised locally; credit the source and licence on the case-study page. No copyrighted pages
  in any screenshot (reader/library captures show only that licensed material).
- Credits: **no names**. Signal Desk: "built with a teammate". SolarFile Reels: "seeded from a
  friend's open-source reels-generator". Same wording on cards, pages and both chatbot files.

## Calls made by Claude (after the builder check; owner can override)

- Toodler keeps **Toodler** as the title; Toddle is named as the company it was built for.
  Slug `toodler`.
- Signal Desk: **no live link** — the Render console loads but its API is dead, so it would show
  an empty dashboard. Link the public GitHub repo; hero = a fresh local console capture
  (`console/src/assets/hero.png` is 343×361, too small for a hero).
- Satya Aahar sample card uses an **anonymised product** (e.g. "Cream biscuits, 100 g") built
  from a synthetic label run through the real engine — no real brand named.
- Live links verified 2026-10-21: shaanti.pages.dev (200), toddle-admissions-prototype.onrender.com
  (200). Re-check before publishing.

## Case-study page shape

Each page: title + one-line pitch · status badge · hero image / screenshot strip · **The
problem** · **What I built** (3–6 bullets) · **How it's built** (stack + 1–3 engineering
decisions worth a recruiter's attention) · **By the numbers** (only figures sourced below) ·
links (live site / demo / store / GitHub when public) · back to Projects. Cards show image,
title, one-liner, status badge, "Private code" badge where applicable.

## Content facts (source of truth for copy; do not invent beyond these)

**Shaanti** — Android focus app: cut the internet for chosen apps for a timed session while the
rest of the phone works ("airplane mode for one app"); named after the owner's grandmother.
Kotlin, Jetpack Compose/Material3, Room, DataStore, WorkManager, VpnService, Play Billing,
AdMob + UMP consent. ~1,100 JVM unit tests; Quick Settings tile; scheduled Plans; game
auto-start (Pro); 3 themes; multi-plan paywall (3/6/12 months, 14-day trial); Hindi store
graphic. Status: v1 feature-complete, **Play Store release pending** (organisation account).
Links: https://shaanti.pages.dev, demo video YouTube `b3z-wqRHSsA`. Private code. Images:
`shaanti/shaanti-play-assets/01-home.png … 06-settings-calls.png`, `feature-graphic-1024x500.png`.

**Satya Aahar** — "Truth about food": photograph a packaged-food label, get HIGH SUGAR/SALT/FAT
warnings against ICMR-NIN 2024, daily-limit shares, additives banned elsewhere, per-family-member
flags; English + Hindi; India-first. Python 3.12, FastAPI, pydantic v2, SQLAlchemy/Postgres,
Redis rate limits, zxing-cpp barcodes, pluggable vision providers, pytest + hypothesis.
Pure rules engine + India rule pack (73 additives, 11 allergens, 32 golden vectors from real
labels); ~1,000 tests; 24 h photo purge; spend ceilings. Status: **in development** (engine + API
built; apps not yet). Private code. No UI → image = clean flow diagram + a sample warning card
rendered from real engine output (anonymised product — see Calls made by Claude).

**MangakaHue** — AI manga colouriser that keeps the original line art; for creators,
scanlation teams, hobbyists. Next.js, Supabase (auth/Postgres/Storage, RLS), drizzle, pg-boss
worker, ComfyUI pipeline (ControlNet-Lineart, IP-Adapter, RealESRGAN), 7 pluggable providers,
on-device OCR (PP-OCRv5). Character catalog + recognition, chapter reader + public library,
colour clues from speech-bubble text; 119 tests. Status: **closed beta soon**. Private code.
Images: capture locally (reader/library + a before/after colourised page), public-domain/CC artwork only.

**SolarFile Reels** — topic → script → voice → stock footage → word-timed captions → 1080×1920
reel; plus a Next.js studio (script and footage review, "Find another clip", drafts). Python
FastAPI engine, edge-tts, faster-whisper, FFmpeg; Next.js + Supabase (RLS) + S3-compatible
storage; Mac worker with heartbeat/requeue. Seeded from a friend's open-source reels-generator
(credit it). Credit: "seeded from a friend's open-source reels-generator". Status: **in development**. Private code. Images: capture the studio locally +
a frame from a generated reel. (Stick-figure / voice spikes are experiments — not featured.)

**Signal Desk** (MoveInSync hackathon, 5 Sep 2026, with a teammate) — agentic ops-intelligence
for enterprise commute: rules compute PASS/WATCH/CONCERN/BREACH findings with evidence SQL; the
LLM only writes prose and never computes numbers; dispatch to Slack/email. Python, FastAPI,
DuckDB, Sarvam LLM, React 19 + Vite console. 3.44M rows ingested in 6.99 s; metric query p50
14.7 ms; ~125 pytest + 217 Vitest tests; cost per brief ~₹0.13–0.77. Status: **hackathon build,
demoed**. Public: https://github.com/f20180039/moveinsync-hackathon-research. Image:
fresh local console capture (no live link — see Calls made by Claude).

**Toodler** (Toddle, Round-2 take-home) — clickable admissions workflow-builder prototype
(stages, Branch/Parallel nodes, config panel, undo/redo, URL-linkable state) + written spec and
competitor research. React + TS + Vite, Vitest; 15 seed workflows, 197 config panels, 47 tests
pinning tree invariants. Status: **deployed prototype** (Render static site
`toddle-admissions-prototype` — builder finds the URL; link only if it responds). Public:
https://github.com/f20180039/toodler. Images: capture locally.

**Quiz Wizz** — Chrome MV3 extension: reads canvas-rendered questions with Tesseract OCR,
answers via a ranked queue of LLMs (Groq, Gemini, Mistral, Sarvam) with two-model consensus
voting, shared answer cache on Upstash Redis; no-dependency build. v1.3.2, shared privately,
not on the Web Store. Private code. Image: `quiz-wizz/quiz-wizz-automator/store/promo-440x280.png`.
Framing per anti-goals.

## Chatbot

Project blurbs live in `src/ai/faq-knowledge-base.ts` (≈ lines 81–83, 146–150) and
`server/faq-data.json` (Render backend). Update both with the same facts; the backend change
only takes effect when Render redeploys (owner action) — note it, don't block on it.

## Left to the builder

- Data model (likely one typed `projects` data module shared by the grid, case-study route and
  Home section), component split, route name (`/projects/:slug`), slugs.
- Image sizes and gallery treatment; how status badges look within the existing theme.
- Exact copy within the content facts and anti-goals; the owner reviews wording on the local run.
- Screenshot capture method (local dev servers + headless browser); scrub any personal data.
- Ordering of cards (suggest: the three flagships first, then the other new projects, then older work).
