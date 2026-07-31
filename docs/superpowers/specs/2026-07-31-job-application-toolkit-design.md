# Job Application Toolkit — Design Spec

**Date:** 2026-07-31
**Author:** Anshuman Singh (with Claude Code)
**Status:** Approved for planning

## Purpose

Reduce repetitive effort in an active job search by giving one canonical
answer store that feeds: (1) a recruiter-facing "open to work" page plus a
private matched-jobs dashboard on the portfolio, (2) a daily job that refreshes
matched listings, and (3) a browser plugin that fills application forms and
drafts tailored cover letters — always human-reviewed, never auto-submitted.

## Non-negotiable boundaries

- **Human-in-the-loop only.** The plugin fills fields and drafts cover letters;
  the user reviews and clicks submit. No blind auto-apply, no auto-submit.
- **No fabrication.** Missing profile facts are left as clearly-marked blanks
  for the user to fill, never invented. The cover-letter prompt carries a
  `neverClaim` guardrail (no exact current CTC, no skills not in the profile).
- **Respect site terms.** The daily job uses legitimate aggregator APIs/RSS
  (Remotive, RemoteOK, Arbeitnow, Adzuna). No scraping of LinkedIn/Naukri or
  any site whose terms forbid it.
- **Public-site honesty.** The portfolio is a public static GitHub Pages site.
  The dashboard "soft gate" hides content from casual visitors only; the data
  still ships in the public bundle. UI copy must not over-promise privacy.
  Exact current CTC is never published; 25 LPA is published as a stated
  expectation. Listings in the feed are already-public job posts.

## Architecture

```
public/data/job-profile.json   ← SINGLE SOURCE OF TRUTH (user edits this)
        │ read by
        ├──────────────► /jobs page (portfolio React, lazy route)
        │                    • Zone 1: open-to-work summary (always visible)
        │                    • Zone 2: matched-jobs dashboard (soft gate)
        │
        └──────────────► Autofill plugin (MV3, local to user's machine)
                             • review-then-fill forms
                             • Gemini cover-letter drafts
                             • answer bank + API key in chrome.storage.local

public/data/jobs-feed.json     ← written ONLY by the daily job
        ▲
        │ writes + commits (triggers existing deploy.yml)
Daily 9AM IST GitHub Action (jobs-feed.yml)
   scripts/fetch-jobs.mjs: fetch APIs → normalize → filter → score → dedupe → top N
```

One answers file means the page and the plugin never drift. The daily job only
writes the listings file, never the answers.

## Component 1 — Answer bank (`public/data/job-profile.json`)

Two zones in one file.

**A. Structured facts** (mapped into form fields by the plugin):

```jsonc
{
  "identity": {
    "fullName": "", "email": "", "phone": "",
    "location": "Bangalore, India",
    "linkedin": "https://linkedin.com/in/anshuman-singh-4546b5275",
    "github": "https://github.com/f20180039",
    "portfolio": "https://f20180039.github.io/anshuman-singh/",
    "willingToRelocate": true
  },
  "experience": {
    "years": 4,
    "currentTitle": "", "currentCompany": "HealthPlix Technologies",
    "noticePeriod": "1 month (negotiable, currently serving 2)",
    "noticePeriodDays": 30,        // plugin fills the negotiable minimum
    "noticePeriodMaxDays": 60      // true figure, kept for reference
  },
  "compensation": {
    "expectedMinLPA": 25, "currency": "INR",
    "expectedNote": "25 LPA minimum base, negotiable by role/geo",
    "currentCTC": null             // null = never published or filled
  },
  "locationPreferences": {
    "priorityCountries": ["UAE", "Singapore"],
    "openRegions": ["Europe", "Australia", "India"],
    "remoteWorldwide": true,
    "needsSponsorship": true
  },
  "roles": ["Frontend Engineer", "Software Engineer", "Full-stack (FE-leaning)"],
  "workAuth": { "current": "India", "sponsorshipRequiredOutsideIndia": true }
}
```

**B. Reusable free-text answers** — keyed, with match keywords:

```jsonc
"answers": [
  { "key": "why_change", "label": "Why are you looking for a change?",
    "keywords": ["why","change","leaving","motivation"], "text": "" },
  { "key": "notice_period", "keywords": ["notice","joining","availability"],
    "text": "1 month (negotiable)" },
  { "key": "cover_short", "label": "Short intro / cover note", "text": "" }
  // …seeded from src/ai/faq-knowledge-base.ts
]
```

**C. Cover-letter steering:**

```jsonc
"coverLetter": {
  "tone": "warm, direct, no fluff",
  "signature": "Anshuman Singh",
  "mustInclude": ["4 yrs React/TS at HealthPlix",
                  "AI clinical documentation + BFF modules"],
  "neverClaim": ["exact current CTC", "skills not in profile"],
  "voiceSamples": []   // optional: 2-3 short paragraphs in the user's own words
}
```

**Seeding:** free-text answers seeded from `src/ai/faq-knowledge-base.ts`
(CTC, location, relocation, why-change, work-mode already exist). Missing facts
left as `""` and reported to the user to fill.

## Component 2 — `/jobs` page

New lazy route `/jobs` added to `EAPP_ROUTES` + `App.tsx` (matches existing
lazy-load pattern). Fetches `job-profile.json` and `jobs-feed.json`.

- **Zone 1 — Open-to-work summary (always visible):** recruiter-facing card
  from the structured facts — role targets, 4 yrs, notice "1 month
  (negotiable)", 25 LPA min, location story (India relocate-anywhere · remote
  worldwide · targeting UAE/Singapore · open to Europe/Australia). Shareable in
  a LinkedIn "open to work" post.
- **Zone 2 — Matched-jobs dashboard (soft gate):** passphrase field reveals a
  ranked table of daily listings: title, company, location, remote/onsite,
  match score, sponsorship/relocation tag, Apply link. Sortable/filterable by
  region, remote-only, sponsorship-friendly. Last-updated timestamp.
- **Soft-gate honesty:** UI does not claim the data is private; listings are
  public posts. Gate keeps the page tidy for casual visitors.
- **Match score:** transparent additive rules — role keyword hit + region
  match + remote + ~4yr seniority + sponsorship tag. Shown so ranking is
  explainable, not a black box.

## Component 3 — Daily 9 AM job (`.github/workflows/jobs-feed.yml`)

- **Trigger:** `schedule` cron `30 3 * * *` (= 9:00 AM IST) + `workflow_dispatch`.
  (GitHub cron may lag 5–15 min; acceptable for a daily digest.)
- **Script `scripts/fetch-jobs.mjs`:** fetch Remotive + RemoteOK + Arbeitnow
  (keyless) and Adzuna (free app id/key via GitHub secret; GB/AU/SG/AE
  endpoints). Normalize to common shape → filter to profile (React/FE keywords,
  ~4yr, remote-worldwide + India + UAE/Singapore/Europe/Australia) → tag
  sponsorship-friendly (keyword match: sponsorship/relocation/visa) → score →
  dedupe → keep top N → write `public/data/jobs-feed.json` with timestamp.
- **Resilience:** each API wrapped independently (one failure ≠ run failure).
  If all fail, keep the previous feed rather than blanking. Adzuna gated behind
  "if secret present" so the workflow runs with just the three keyless sources.
- **Commit + redeploy:** commit the JSON to `master` only if it changed (no
  empty commits); the existing `deploy.yml` handles the rebuild.

## Component 4 — Autofill plugin (MV3)

Same MV3 shape as the existing `study-helper-extension`.

- `manifest.json` — `storage`, `activeTab`, `scripting`, `sidePanel`,
  `contextMenus`; narrow `host_permissions`.
- `background.js` — service worker: opens side panel; makes the Gemini call for
  cover letters (key from `chrome.storage.local`).
- `content/detect.js` — scans page form fields, classifies each (name / email /
  phone / notice / CTC / why-change / cover-letter …) via label+name+type
  heuristics. Read-only until the user acts.
- `content/fill.js` — writes values only on user click; highlights filled fields.
- `sidepanel/` — review UI: detected field → mapped answer, "Fill all" +
  per-field fill, answer-bank editor synced to `chrome.storage.local`, and the
  cover-letter generator (JD in → draft → edit → fill/copy).
- **Answer source:** import `job-profile.json` (paste or fetch public URL) into
  `chrome.storage.local`; edit locally. API key entered once, stored locally.

**Cover-letter generation:** Gemini (reuses the existing wired provider). Prompt
grounded by the answer bank; `neverClaim` enforced; `voiceSamples` used as
few-shot to imitate the user's cadence. Anti-cliché rules (no "thrilled/
passionate/leverage", vary sentence length, concrete over adjective). Goal is a
letter that reads like the user and is genuinely tailored — NOT a guaranteed
AI-detector bypass (unreliable, not promised). User edits every draft.

**Guardrails:** never clicks submit; never fills without a click; fills the
negotiable-minimum notice (1 month) by default.

## Build order (each independently testable)

1. `job-profile.json` schema + seed from FAQ knowledge base (marked blanks).
2. `/jobs` page — Zone 1, then Zone 2 reading a committed sample feed.
3. `scripts/fetch-jobs.mjs` + `jobs-feed.yml` daily action.
4. Plugin — detection + review-fill first, cover-letter generator last.

## Out of scope

- Auto-submitting applications; scraping LinkedIn/Naukri.
- True privacy for the dashboard (impossible on a public static site).
- Guaranteed AI-detector evasion for cover letters.
- Publishing exact current CTC.
```
