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
] as const;

const PRIVATE_SLUGS = [
  "shaanti",
  "satya-aahar",
  "mangakahue",
  "solarfile-reels",
  "quiz-wizz",
] as const;

const STATUS_LABELS: Record<(typeof CASE_STUDY_SLUGS)[number], string> = {
  shaanti: "Play Store release pending",
  "satya-aahar": "In development",
  mangakahue: "Closed beta soon",
  "solarfile-reels": "In development",
  "signal-desk": "Hackathon build",
  toodler: "Live prototype",
  "quiz-wizz": "Private release (v1.3.2)",
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
  it("has exactly the seven case studies", () => {
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
  });

  it("no overclaiming", () => {
    expect(json("shaanti")).not.toMatch(
      /available on (google )?play|on the play store|download (it )?on/i,
    );
    for (const slug of CASE_STUDY_SLUGS) {
      if (slug === "toodler") continue;
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

  it("no TradingAgents", () => {
    expect(JSON.stringify(PROJECTS)).not.toMatch(/TradingAgents/i);
  });

  it("toodler naming", () => {
    const toodler = project("toodler");
    expect(toodler.title).toBe("Toodler");
    expect(`${toodler.tagline} ${toodler.description}`).toContain("Toddle");
  });
});
