import { describe, expect, it } from "vitest";
import {
  FEATURED_SLUGS,
  PROJECTS,
  getProjectBySlug,
  type Project,
} from "./projects";

const CASE_STUDY_SLUGS = [
  "shaanti",
  "signal-desk",
  "mangakahue",
  "satya-aahar",
  "solarfile-reels",
  "toodler",
  "quiz-wizz",
  "honestattempt",
  "taxmitra",
  "azentio-portal",
  "azentio-csm-voice",
] as const;

const PRIVATE_SLUGS = [
  "shaanti",
  "satya-aahar",
  "mangakahue",
  "solarfile-reels",
  "quiz-wizz",
  "honestattempt",
  "taxmitra",
] as const;

/** Case studies whose product is genuinely live; every other one must not say so. */
const LIVE_SLUGS = new Set<string>([
  "toodler",
  "honestattempt",
  "azentio-portal",
]);

const STATUS_LABELS: Record<(typeof CASE_STUDY_SLUGS)[number], string> = {
  shaanti: "Play Store release pending",
  "satya-aahar": "In development",
  mangakahue: "Closed beta soon",
  "solarfile-reels": "In development",
  "signal-desk": "Hackathon build",
  toodler: "Live prototype",
  "quiz-wizz": "Private release (v1.3.2)",
  honestattempt: "Live, in active development",
  taxmitra: "In development",
  "azentio-portal": "Hackathon build, live",
  "azentio-csm-voice": "Hackathon build",
};

function project(slug: string): Project {
  const found = PROJECTS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`missing project ${slug}`);
  return found;
}

function json(slug: string): string {
  return JSON.stringify(project(slug));
}

describe("case-study content", () => {
  it("has exactly the eleven case studies", () => {
    expect(PROJECTS.filter((p) => p.caseStudy).map((p) => p.slug)).toEqual([
      ...CASE_STUDY_SLUGS,
    ]);
  });

  it("keeps the older projects last, in their existing order", () => {
    expect(PROJECTS.slice(-5).map((p) => p.title)).toEqual([
      "Portfolio Website",
      "Exploding Production Game",
      "Multiplayer Game Hub",
      "Snapgram",
      "Guess Game",
    ]);
  });

  it("featured slugs resolve, in order", () => {
    const featured = FEATURED_SLUGS.map((slug) => getProjectBySlug(slug));
    for (const entry of featured) expect(entry).toBeDefined();
    expect(featured.map((entry) => entry?.slug)).toEqual([
      "shaanti",
      "signal-desk",
      "mangakahue",
    ]);
  });

  it("getProjectBySlug resolves a case study", () => {
    const shaanti = getProjectBySlug("shaanti");
    expect(shaanti?.title).toBe("Shaanti");
    expect(shaanti?.caseStudy).toBeDefined();
  });

  it("private repos never link to GitHub", () => {
    for (const slug of PRIVATE_SLUGS) {
      const entry = project(slug);
      expect(entry.repo.visibility).toBe("private");
      for (const link of entry.links) {
        expect(link.href).not.toContain("github.com");
      }
    }
  });

  it("public repos link exactly", () => {
    expect(project("signal-desk").repo).toEqual({
      visibility: "public",
      url: "https://github.com/f20180039/moveinsync-hackathon-research",
    });
    expect(project("toodler").repo).toEqual({
      visibility: "public",
      url: "https://github.com/f20180039/toodler",
    });
    expect(project("azentio-portal").repo).toEqual({
      visibility: "public",
      url: "https://github.com/f20180039/azentio-portal",
    });
    expect(project("azentio-csm-voice").repo).toEqual({
      visibility: "public",
      url: "https://github.com/f20180039/azentio-csm",
    });
  });

  it("status labels are exact", () => {
    const labels = Object.fromEntries(
      CASE_STUDY_SLUGS.map((slug) => [slug, project(slug).status?.label]),
    );
    expect(labels).toEqual(STATUS_LABELS);
  });

  it("no names or handles in any copy", () => {
    expect(JSON.stringify(PROJECTS)).not.toMatch(
      /Prathamesh|alok2569|\bAlok\b/i,
    );
  });

  it("credits are exact", () => {
    expect(project("signal-desk").caseStudy?.credit).toBe(
      "Built with a teammate",
    );
    expect(project("solarfile-reels").caseStudy?.credit).toBe(
      "Seeded from a friend's open-source reels-generator",
    );
    expect(project("azentio-portal").caseStudy?.credit).toBe(
      "Built solo, with AI-assisted development (disclosed)",
    );
    expect(project("azentio-csm-voice").caseStudy?.credit).toBe(
      "Team build; I owned the voice pipeline and hardened the system-of-record API",
    );
  });

  it("exploding production says it was co-developed, naming no one", () => {
    const game = project("exploding-production-game");
    expect(game.tagline).toBe("Browser game co-developed with a friend");
    expect(game.description).toContain("co-developed with a friend");
  });

  it("no overclaiming", () => {
    expect(json("shaanti")).not.toMatch(
      /available on (google )?play|on the play store|download (it )?on/i,
    );
    for (const slug of CASE_STUDY_SLUGS) {
      if (LIVE_SLUGS.has(slug)) continue;
      expect(project(slug).status?.kind).not.toBe("live");
    }
  });

  it("quiz wizz framing", () => {
    const quizWizz = json("quiz-wizz");
    expect(quizWizz).not.toMatch(/cheat|bypass|beat (the |real )?quiz/i);
    expect(quizWizz).toMatch(/OCR/);
    expect(quizWizz).toMatch(/consensus|vot/i);
  });

  it("signal desk has no live link", () => {
    expect(project("signal-desk").links).toEqual([]);
  });

  it("toodler live link", () => {
    expect(project("toodler").links).toEqual([
      {
        label: "Live prototype",
        href: "https://toddle-admissions-prototype.onrender.com",
      },
    ]);
  });

  it("shaanti links", () => {
    expect(project("shaanti").links).toEqual([
      { label: "Website", href: "https://shaanti.pages.dev" },
      {
        label: "Demo video",
        href: "https://www.youtube.com/watch?v=b3z-wqRHSsA",
      },
    ]);
  });

  it("case-study shape", () => {
    for (const slug of CASE_STUDY_SLUGS) {
      const entry = project(slug);
      const study = entry.caseStudy;
      expect(study).toBeDefined();
      if (!study) continue;
      expect(study.problem.trim().length).toBeGreaterThan(0);
      expect(study.built.length).toBeGreaterThanOrEqual(3);
      expect(study.built.length).toBeLessThanOrEqual(6);
      expect(study.decisions.length).toBeGreaterThanOrEqual(1);
      expect(study.decisions.length).toBeLessThanOrEqual(3);
      expect(study.stack.length).toBeGreaterThanOrEqual(3);
      expect(entry.tagline.length).toBeLessThanOrEqual(90);
      for (const link of entry.links) {
        expect(link.href).toMatch(/^https:\/\//);
      }
      if (entry.repo.visibility === "public") {
        expect(entry.repo.url).toMatch(/^https:\/\//);
      }
    }
  });

  it("honestattempt live link and planned work", () => {
    const entry = project("honestattempt");
    expect(entry.links).toEqual([
      { label: "Live app", href: "https://honestattempt.vercel.app" },
    ]);
    expect(entry.status?.kind).toBe("live");
    // Facts only: the test count is stated as a floor, never an exact figure.
    expect(entry.caseStudy?.numbers).toEqual([
      "Over 1,700 automated unit tests plus Playwright end-to-end tests across desktop and phone browsers",
    ]);
    expect(entry.caseStudy?.next).toEqual([
      "Text-first questions with OCR",
      "Accounts and shareable test links",
      "Exam presets for JEE, NEET, CAT, banking, SSC, UPSC, GATE, CUET and CLAT",
    ]);
    // Shipped work is no longer listed as planned, and nothing about pricing.
    expect(JSON.stringify(entry)).not.toMatch(
      /pric|subscri|\bPro\b|monetis|monetiz|₹|\$\d/i,
    );
    // The paper is described generically; no third-party publisher is named.
    expect(entry.caseStudy?.problem).toContain("a previous-year paper PDF");
  });

  it("taxmitra: private, unlinked, no screenshots, figures from the engine", () => {
    const entry = project("taxmitra");
    expect(entry.repo).toEqual({ visibility: "private" });
    expect(entry.links).toEqual([]);
    expect(entry.status).toEqual({ kind: "in-progress", label: "In development" });
    // The card is a drawn architecture diagram, never a screenshot of user data.
    expect(entry.image?.src).toBeTruthy();
    expect(entry.caseStudy?.gallery).toEqual([]);
    expect(entry.caseStudy?.next).toBeUndefined();
    expect(FEATURED_SLUGS).not.toContain("taxmitra" as never);
    expect(entry.caseStudy?.problem).toMatch(/deterministic tax engine/);
    expect(entry.caseStudy?.numbers).toEqual(["Over 200 automated test files"]);
  });

  it("azentio portal: public repo, live demo link, three demo clips, not featured", () => {
    const entry = project("azentio-portal");
    expect(entry.links).toEqual([
      { label: "Live demo", href: "https://azentio-portal.onrender.com/demo" },
    ]);
    expect(entry.status).toEqual({
      kind: "live",
      label: "Hackathon build, live",
    });
    expect(entry.caseStudy?.linkNote).toMatch(/\/demo/);
    expect(entry.caseStudy?.linkNote).toMatch(/moment to wake/);
    expect(entry.caseStudy?.videos).toHaveLength(3);
    for (const video of entry.caseStudy?.videos ?? []) {
      expect(video.caption.trim().length).toBeGreaterThanOrEqual(15);
      expect(video.poster).toBeTruthy();
    }
    expect(FEATURED_SLUGS).not.toContain("azentio-portal" as never);
    // Facts from the repo README only.
    expect(entry.caseStudy?.numbers).toEqual([
      "232 automated tests",
      "2 independent security reviews, every finding fixed",
      "Synthetic data only",
    ]);
    expect(JSON.stringify(entry)).toMatch(/AI-assisted development \(disclosed\)/);
  });

  it("csm voice agent: public repo, no live link, credits no teammate by name", () => {
    const entry = project("azentio-csm-voice");
    // The hosted voice service is down, so there is no live link.
    expect(entry.links).toEqual([]);
    expect(entry.status).toEqual({ kind: "build", label: "Hackathon build" });
    expect(FEATURED_SLUGS).not.toContain("azentio-csm-voice" as never);
    expect(entry.caseStudy?.videos).toBeUndefined();
    const copy = JSON.stringify(entry);
    expect(copy).toMatch(/Kannada/);
    expect(copy).toMatch(/Hindi/);
    expect(copy).not.toMatch(/Chirag|Pavan|chiraghs|pavanmandavilli/i);
    // No phone numbers or emails from the demo script.
    expect(copy).not.toMatch(/\d{5} \d{5}|@[a-z]+\./i);
  });

  it("no TradingAgents", () => {
    expect(JSON.stringify(PROJECTS)).not.toMatch(/TradingAgents/i);
  });

  it("toodler naming", () => {
    const toodler = project("toodler");
    expect(toodler.title).toBe("Toodler");
    expect(`${toodler.tagline} ${toodler.description}`).toContain("Toddle");
  });
});
