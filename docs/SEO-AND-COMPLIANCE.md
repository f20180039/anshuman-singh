# SEO, analytics and compliance

How the discoverability and trust layer of this site is wired, and the three
things you have to do by hand to switch it fully on.

---

## What you need to do

### 1. Analytics (optional, but the cookie banner depends on it)

1. Create a GA4 property at <https://analytics.google.com> and copy the
   measurement ID (`G-XXXXXXXXXX`).
2. Put it in `.env.production`:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   The ID is public by design — it identifies the property, it does not grant
   access to it — so committing it is fine.

While this is blank: no analytics script is requested, no cookies are set, and
**the cookie banner does not render**. That is intentional. A banner asking
permission for tracking that does not exist is theatre, and the "Cookie
preferences" link in the footer hides itself for the same reason.

### 2. Contact form delivery

1. Get a free access key at <https://web3forms.com> (enter the inbox you want
   messages delivered to; no account needed).
2. Put it in `.env.production`:
   ```
   VITE_WEB3FORMS_KEY=your-access-key
   ```

While this is blank the form still works end to end, but instead of POSTing it
opens a prefilled `mailto:` draft and says so. It never claims a message was
delivered when it wasn't.

### 3. Submit the sitemap

Add the property in [Google Search Console](https://search.google.com/search-console)
and submit `https://f20180039.github.io/anshuman-singh/sitemap.xml`.

This matters more here than on a normal site — see the robots.txt caveat below.

---

## The robots.txt caveat (read this)

Crawlers only read `robots.txt` from the **origin root**:

```
https://f20180039.github.io/robots.txt      ← the only path crawlers check
https://f20180039.github.io/anshuman-singh/robots.txt   ← ignored
```

That root path belongs to the `f20180039.github.io` user-pages repository, not
to this project repository, so this repo cannot serve it.

**What actually keeps pages out of the index today** is the per-page
`<meta name="robots" content="noindex, follow">` emitted by
`src/common/seo/Seo.tsx` for every route marked `"indexable": false` in
`src/common/seo/pages.json`. That is honoured by Google and Bing and needs no
origin-level access. The generated `public/robots.txt` is still correct and is
still published with every deploy, so it starts working the moment this site
moves to a custom domain or to the user-pages repo.

If you want origin-level control now, add this to the root of your
`f20180039.github.io` repository as `robots.txt`:

```
User-agent: *
Allow: /

Disallow: /anshuman-singh/jobs
Disallow: /anshuman-singh/thank-you
Disallow: /anshuman-singh/test-3d
Disallow: /anshuman-singh/guess-game
Disallow: /anshuman-singh/pig-game

Sitemap: https://f20180039.github.io/anshuman-singh/sitemap.xml
```

---

## How it fits together

### Route metadata

`src/common/seo/pages.json` is the single source of truth. Each entry carries
the title, description, whether the page is indexable, and its sitemap
priority and change frequency. It is read by two consumers:

- `src/common/seo/meta.ts` at runtime, which fills the `{years}` token with the
  live years-of-experience figure so copy never goes stale;
- `scripts/generate-seo-files.mjs` at build time, which writes
  `public/sitemap.xml` and `public/robots.txt`.

**Adding a route means adding an entry here.** Miss it and the page inherits the
404 metadata — deliberately loud, rather than silently shipping a duplicate
title.

`src/common/seo/Seo.tsx` renders once inside the router and updates the head on
every navigation. It *upserts* tags by selector rather than appending, so the
static defaults in `index.html` (which is all a non-JS social scraper ever sees)
are replaced in place and never duplicated.

### Generated assets

| Command | Writes | When to run |
| --- | --- | --- |
| `npm run gen:seo` | `public/sitemap.xml`, `public/robots.txt` | Automatic — part of `npm run build` |

`gen:seo`'s two outputs are gitignored. They are rebuilt from `pages.json` on
every build, including in CI before deploy, so the published copies are always
current — tracking them only meant the working tree went dirty after every
local build. To inspect them, run `npm run gen:seo` and look in `public/`.
| `npm run gen:brand` | favicons, `og-image.png`, `site.webmanifest` | Manually, when the brand changes |
| `npm run gen:images` | `.webp` versions of `src/assets` rasters | Manually, when an image is added or replaced |

`gen:brand` is deliberately **not** in the build. It rasterises SVG text, and
the fonts on a GitHub Actions runner differ from the ones on a laptop, so
building it in CI would silently change the OG card. Run it locally, eyeball the
output, commit it.

`gen:images` is manual for the same reason of determinism. The PNG/JPEG sources
stay in `src/assets` as the editable originals but are no longer imported by any
component, so they never reach the bundle — the `.webp` outputs are what ship.

### Consent and analytics

```
consent.ts        stores the decision (localStorage, versioned), notifies subscribers
analytics.ts      GA4 wrapper; loads gtag.js only after "granted"
AnalyticsTracker  boots consent defaults, sends a page_view per route change
CookieBanner      the prompt; renders only when a measurement ID is configured
```

Consent defaults to denied and gtag.js is not requested until the visitor
accepts, so declining means no Google script was ever on the page. Ad signals
(`ad_storage`, `ad_user_data`, `ad_personalization`) are hardcoded denied.
Declining after having accepted also deletes the `_ga*` cookies rather than
merely stopping new hits.

`CONSENT_VERSION` in `consent.ts` should be bumped whenever the set of things
being consented to changes — stored decisions from an older version are treated
as unanswered, so the banner asks again instead of assuming the old answer still
covers the new vendor.

### Legal pages

`/privacy` and `/terms` describe what this site actually does — GA4 behind
consent, Web3Forms, the Gemini-backed chat assistant, Google Fonts, GitHub Pages
logs. If you add or remove a third-party service, update the "Who else processes
your data" list and the `LEGAL_LAST_UPDATED` constant in
`src/common/components/LegalPage.tsx`. That date is hand-maintained on purpose:
an effective date that moves on every deploy tells the reader nothing.

---

## Gotcha worth knowing

`tailwind.config.js` overrides `spacing.20` to `1.25rem` and `spacing.40` to
`2.5rem`. So `h-20` is **20px, not 5rem**, and the same goes for `w-20`, `p-20`,
`gap-20`, `mt-40` and friends. Where those sizes are genuinely wanted, use an
arbitrary value (`ans-h-[5rem]`). Two components already do this and say so in a
comment.
