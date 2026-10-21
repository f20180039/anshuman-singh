import { describe, expect, it } from "vitest";
import { PROJECTS, caseStudyPath } from "../../data/projects";
import { INDEXABLE_PAGES, getPageSeo } from "./meta";
import seoData from "./pages.json";

const caseStudies = PROJECTS.filter((project) => project.caseStudy);

describe("SEO page entries", () => {
  it("every case study has an indexable SEO entry", () => {
    expect(caseStudies.length).toBe(7);

    for (const project of caseStudies) {
      const path = caseStudyPath(project.slug);
      const entry = seoData.pages.find((page) => page.path === path);
      expect(entry, `pages.json entry for ${path}`).toBeDefined();
      expect(entry?.indexable).toBe(true);
      expect(entry?.priority).toBe(0.6);
      expect(entry?.changefreq).toBe("monthly");
      expect(entry?.title).toContain(project.title);
      expect(entry?.title.length, `${path} title length`).toBeLessThanOrEqual(
        60,
      );
      expect(
        entry?.description.length,
        `${path} description length`,
      ).toBeLessThanOrEqual(160);
      expect(entry?.description.length).toBeGreaterThan(0);

      // The runtime lookup resolves the same entry (no 404 fallback).
      expect(getPageSeo(path).path).toBe(path);
      expect(INDEXABLE_PAGES.map((page) => page.path)).toContain(path);
    }
  });

  it("/projects entry describes the recent work without overclaiming", () => {
    const entry = getPageSeo("/projects");
    expect(entry.path).toBe("/projects");
    expect(entry.title.length).toBeLessThanOrEqual(60);
    expect(entry.description.length).toBeLessThanOrEqual(160);
    // The pre-case-study copy led with the Instagram clone; the page now
    // leads with the recent work.
    expect(entry.description).not.toMatch(/Instagram clone/);
    expect(entry.description).toMatch(/Android/);
    expect(entry.description).toMatch(/manga/);
    expect(entry.description).toMatch(/hackathon/);
    expect(`${entry.title} ${entry.description}`).not.toMatch(
      /launched|on (the )?Play Store|live on|Prathamesh|alok2569|\bAlok\b|TradingAgents/i,
    );
  });

  it("unknown case-study slug falls back to the non-indexable 404 entry", () => {
    expect(getPageSeo("/projects/does-not-exist").indexable).toBe(false);
  });

  it("no case-study entry names a person or an excluded project", () => {
    for (const project of caseStudies) {
      const entry = getPageSeo(caseStudyPath(project.slug));
      const copy = `${entry.title} ${entry.description}`;
      expect(copy).not.toMatch(/Prathamesh|alok2569|\bAlok\b|TradingAgents/);
      expect(copy).not.toMatch(/cheat|bypass|beat (the |real )?quiz/i);
    }
  });
});
