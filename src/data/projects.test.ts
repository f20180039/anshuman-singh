import { describe, expect, it } from "vitest";
import { PROJECTS, caseStudyPath, getProjectBySlug } from "./projects";

describe("projects data", () => {
  it("slugs are unique and kebab-case", () => {
    const slugs = PROJECTS.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("migrates the five existing projects unchanged", () => {
    const titles = PROJECTS.map((project) => project.title);
    expect(titles).toEqual(
      expect.arrayContaining([
        "Portfolio Website",
        "Exploding Production Game",
        "Multiplayer Game Hub",
        "Snapgram",
        "Guess Game",
      ]),
    );

    const snapgram = PROJECTS.find((project) => project.title === "Snapgram");
    expect(snapgram?.repo).toEqual({
      visibility: "public",
      url: "https://github.com/f20180039/snapgram",
    });
    expect(snapgram?.links.map((link) => link.href)).toContain(
      "https://stalkergram.netlify.app",
    );

    const guessGame = PROJECTS.find(
      (project) => project.title === "Guess Game",
    );
    expect(guessGame?.internalPath).toBe("/guess-game");

    // Older projects that never had a GitHub link: no badge, no repo link.
    for (const title of [
      "Exploding Production Game",
      "Multiplayer Game Hub",
      "Guess Game",
    ]) {
      const project = PROJECTS.find((candidate) => candidate.title === title);
      expect(project?.repo).toEqual({ visibility: "unlinked" });
    }
  });

  it("getProjectBySlug only resolves case studies", () => {
    expect(getProjectBySlug("snapgram")).toBeUndefined();
    expect(getProjectBySlug("nope")).toBeUndefined();
  });

  it("caseStudyPath", () => {
    expect(caseStudyPath("shaanti")).toBe("/projects/shaanti");
  });
});
