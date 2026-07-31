#!/usr/bin/env node
/**
 * fetch-jobs.mjs — daily job listing aggregator for the /jobs dashboard.
 *
 * Pulls fresh listings from legitimate aggregator APIs (built for this), filters
 * them to Anshuman's profile, scores + tags them, dedupes, and writes the top N
 * to public/data/jobs-feed.json.
 *
 * Sources:
 *   - Remotive      (keyless)  https://remotive.com/api/remote-jobs
 *   - RemoteOK       (keyless)  https://remoteok.com/api
 *   - Arbeitnow      (keyless)  https://www.arbeitnow.com/api/job-board-api
 *   - Adzuna         (key opt.) https://api.adzuna.com/v1/api/jobs/{cc}/search
 *                    enabled only if ADZUNA_APP_ID + ADZUNA_APP_KEY are set.
 *
 * Design rules:
 *   - Each source is wrapped independently: one failing never aborts the run.
 *   - If every source fails, keep the previous feed rather than blanking it.
 *   - No scraping of sites whose terms forbid it (no LinkedIn/Naukri).
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PROFILE_PATH = resolve(ROOT, "public/data/job-profile.json");
const FEED_PATH = resolve(ROOT, "public/data/jobs-feed.json");

const TOP_N = 60;
const MAX_AGE_DAYS = 30;

const nowIso = new Date().toISOString();

// ---- Utilities --------------------------------------------------------------
const norm = (s) => (s || "").toString().toLowerCase();
const clip = (s, n) => (s || "").toString().replace(/\s+/g, " ").trim().slice(0, n);

async function safeFetchJson(url, opts = {}, label = url) {
  try {
    const res = await fetch(url, {
      ...opts,
      headers: { "User-Agent": "job-feed-bot/1.0 (portfolio)", Accept: "application/json", ...(opts.headers || {}) },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[warn] source failed: ${label} — ${err.message}`);
    return null;
  }
}

// Common normalized shape: {id, title, company, location, remote, url, tags, source, posted}
function makeJob(o) {
  return {
    id: o.id,
    title: clip(o.title, 160),
    company: clip(o.company, 120),
    location: clip(o.location, 120) || "Not specified",
    remote: !!o.remote,
    url: o.url,
    description: clip(o.description, 1200),
    tags: (o.tags || []).map((t) => clip(t, 40)).filter(Boolean).slice(0, 12),
    source: o.source,
    posted: o.posted || null,
  };
}

// ---- Sources ----------------------------------------------------------------
async function fromRemotive() {
  const data = await safeFetchJson(
    "https://remotive.com/api/remote-jobs?search=frontend%20react", {}, "Remotive"
  );
  const jobs = data?.jobs || [];
  return jobs.map((j) =>
    makeJob({
      id: "remotive-" + j.id,
      title: j.title,
      company: j.company_name,
      location: j.candidate_required_location,
      remote: true,
      url: j.url,
      description: j.description?.replace(/<[^>]+>/g, " "),
      tags: j.tags,
      source: "Remotive",
      posted: j.publication_date,
    })
  );
}

async function fromRemoteOK() {
  const data = await safeFetchJson("https://remoteok.com/api", {}, "RemoteOK");
  const jobs = Array.isArray(data) ? data.filter((d) => d.id && d.position) : [];
  return jobs.map((j) =>
    makeJob({
      id: "remoteok-" + j.id,
      title: j.position,
      company: j.company,
      location: j.location || "Remote",
      remote: true,
      url: j.url || `https://remoteok.com/l/${j.id}`,
      description: j.description?.replace(/<[^>]+>/g, " "),
      tags: j.tags,
      source: "RemoteOK",
      posted: j.date,
    })
  );
}

async function fromArbeitnow() {
  const data = await safeFetchJson(
    "https://www.arbeitnow.com/api/job-board-api", {}, "Arbeitnow"
  );
  const jobs = data?.data || [];
  return jobs.map((j) =>
    makeJob({
      id: "arbeitnow-" + j.slug,
      title: j.title,
      company: j.company_name,
      location: j.location,
      remote: !!j.remote,
      url: j.url,
      description: j.description?.replace(/<[^>]+>/g, " "),
      tags: j.tags,
      source: "Arbeitnow",
      posted: j.created_at ? new Date(j.created_at * 1000).toISOString() : null,
    })
  );
}

async function fromAdzuna() {
  const id = process.env.ADZUNA_APP_ID;
  const key = process.env.ADZUNA_APP_KEY;
  if (!id || !key) {
    console.log("[info] Adzuna skipped (no ADZUNA_APP_ID / ADZUNA_APP_KEY secret).");
    return [];
  }
  // Country endpoints matching the target geos.
  const countries = ["in", "gb", "au", "sg", "ae"];
  const all = [];
  for (const cc of countries) {
    const url =
      `https://api.adzuna.com/v1/api/jobs/${cc}/search/1?app_id=${id}&app_key=${key}` +
      `&results_per_page=25&what=frontend%20react%20developer&content-type=application/json`;
    const data = await safeFetchJson(url, {}, `Adzuna:${cc}`);
    (data?.results || []).forEach((j) =>
      all.push(
        makeJob({
          id: "adzuna-" + j.id,
          title: j.title,
          company: j.company?.display_name,
          location: j.location?.display_name,
          remote: /remote/i.test(j.title + " " + (j.description || "")),
          url: j.redirect_url,
          description: j.description,
          tags: j.category?.label ? [j.category.label] : [],
          source: "Adzuna",
          posted: j.created,
        })
      )
    );
  }
  return all;
}

// ---- Filter + score ---------------------------------------------------------
function tooOld(posted) {
  if (!posted) return false;
  const t = Date.parse(posted);
  if (Number.isNaN(t)) return false;
  return (Date.now() - t) / 86400000 > MAX_AGE_DAYS;
}

function detectRegions(job, regionTerms) {
  const hay = norm(`${job.location} ${job.title} ${job.description}`);
  const hits = [];
  for (const [region, terms] of Object.entries(regionTerms)) {
    if (terms.some((t) => hay.includes(t))) hits.push(region);
  }
  return hits;
}

function scoreJob(job, profile) {
  const mk = profile.matchKeywords;
  const title = norm(job.title);
  const hay = norm(`${job.title} ${job.description} ${job.tags.join(" ")}`);
  let score = 0;
  const reasons = [];

  // Role relevance (required — 0 role score => filtered out later)
  const roleHit = mk.roleTerms.some((t) => title.includes(t));
  const roleHaystackHit = mk.roleTerms.some((t) => hay.includes(t));
  if (roleHit) { score += 40; reasons.push("role in title"); }
  else if (roleHaystackHit) { score += 20; reasons.push("role in description"); }

  // Seniority match (~4 yrs)
  if (mk.seniorityTerms.some((t) => hay.includes(t))) { score += 15; reasons.push("seniority fit"); }
  // Penalize clearly-wrong seniority
  if (/(intern|graduate|principal|staff|head of|director|vp )/.test(title)) { score -= 15; reasons.push("seniority mismatch"); }

  // Region match
  const regions = detectRegions(job, mk.regionTerms);
  if (regions.length) { score += 15; reasons.push("region: " + regions.join("/")); }

  // Remote bonus
  if (job.remote || regions.includes("Remote")) { score += 15; reasons.push("remote"); }

  // Sponsorship-friendly tag
  const sponsor = mk.sponsorshipTerms.some((t) => hay.includes(t));
  if (sponsor) { score += 10; reasons.push("sponsorship/relocation mentioned"); }

  return {
    ...job,
    score: Math.max(0, score),
    regions,
    sponsorshipFriendly: sponsor,
    roleRelevant: roleHit || roleHaystackHit,
    reasons,
  };
}

function dedupe(jobs) {
  const seen = new Set();
  const out = [];
  for (const j of jobs) {
    const key = `${norm(j.title)}|${norm(j.company)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(j);
  }
  return out;
}

// ---- Main -------------------------------------------------------------------
async function main() {
  const profile = JSON.parse(await readFile(PROFILE_PATH, "utf8"));

  const settled = await Promise.allSettled([
    fromRemotive(),
    fromRemoteOK(),
    fromArbeitnow(),
    fromAdzuna(),
  ]);

  let raw = [];
  let liveSources = 0;
  for (const r of settled) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      if (r.value.length) liveSources++;
      raw.push(...r.value);
    }
  }

  console.log(`[info] pulled ${raw.length} raw listings from ${liveSources} live source(s).`);

  // If everything came back empty, keep the previous feed intact (don't blank it).
  if (raw.length === 0) {
    console.warn("[warn] all sources empty/failed — keeping the previous feed.");
    try {
      await readFile(FEED_PATH, "utf8"); // exists → leave it untouched
      console.log("[info] previous feed retained; exiting without changes.");
      return;
    } catch {
      console.warn("[warn] no previous feed to keep; writing an empty feed.");
    }
  }

  const scored = dedupe(raw.map((j) => j))
    .filter((j) => j.url && j.title && !tooOld(j.posted))
    .map((j) => scoreJob(j, profile))
    .filter((j) => j.roleRelevant && j.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_N);

  const feed = {
    generatedAt: nowIso,
    count: scored.length,
    sourcesLive: liveSources,
    jobs: scored,
  };

  await writeFile(FEED_PATH, JSON.stringify(feed, null, 2) + "\n", "utf8");
  console.log(`[done] wrote ${scored.length} matched jobs to ${FEED_PATH}`);
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
