import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { FEATURED_SLUGS, PROJECTS, type ProjectImage } from "./projects";

/**
 * Case studies whose screenshots land in Task 7 (MangakaHue artwork and the
 * anonymised Satya Aahar sample card); every other case study ships its images
 * in Task 6. Remove a slug here when its images arrive.
 */
const IMAGES_ARRIVE_LATER = new Set(["satya-aahar", "mangakahue"]);

/**
 * Vite rewrites an asset import to a URL path (`/src/assets/x.webp`) in tests,
 * so the referenced file can be checked on disk.
 */
function assetPath(src: string): string {
  const relative = src.replace(/^\//, "").split("?")[0];
  return path.join(process.cwd(), relative);
}

function assetExists(src: string): boolean {
  return fs.existsSync(assetPath(src));
}

function describeImage(slug: string, use: string, image: ProjectImage) {
  return `${slug} ${use} (${image.src})`;
}

function referencedImages() {
  const referenced: { slug: string; use: string; image: ProjectImage }[] = [];
  for (const project of PROJECTS) {
    if (project.image) {
      referenced.push({
        slug: project.slug,
        use: "card",
        image: project.image,
      });
    }
    project.caseStudy?.gallery.forEach((image, index) => {
      referenced.push({
        slug: project.slug,
        use: `gallery ${index + 1}`,
        image,
      });
    });
  }
  return referenced;
}

describe("project images", () => {
  it("every referenced image exists and has alt text", () => {
    const referenced = referencedImages();
    expect(referenced.length).toBeGreaterThan(0);

    for (const { slug, use, image } of referenced) {
      const label = describeImage(slug, use, image);
      const project = PROJECTS.find((p) => p.slug === slug);
      expect(image.src, `${label} has an empty src`).not.toBe("");
      expect(assetExists(image.src), `${label} is missing on disk`).toBe(true);
      // Alt text describes what the screenshot shows; a bare title tells a screen
      // reader nothing the adjacent heading did not.
      expect(
        image.alt.trim().length,
        `${label} alt is too short to describe the image`,
      ).toBeGreaterThanOrEqual(15);
      expect(
        image.alt.trim(),
        `${label} alt merely repeats the title`,
      ).not.toBe(project?.title);
    }
  });

  it("recorded width and height match the file on disk", async () => {
    // The numbers go straight to <img width height>; a stale pair would
    // reserve the wrong box and reintroduce the layout shift they prevent.
    for (const { slug, use, image } of referencedImages()) {
      const label = describeImage(slug, use, image);
      const meta = await sharp(assetPath(image.src)).metadata();
      expect(
        { width: image.width, height: image.height },
        `${label} dimensions differ from the encoded file`,
      ).toEqual({ width: meta.width, height: meta.height });
    }
  });

  it("featured projects and case studies carry a card image", () => {
    const needImage = new Set<string>([
      ...FEATURED_SLUGS,
      ...PROJECTS.filter((p) => p.caseStudy).map((p) => p.slug),
    ]);
    for (const slug of IMAGES_ARRIVE_LATER) needImage.delete(slug);

    const missing = [...needImage].filter(
      (slug) => PROJECTS.find((p) => p.slug === slug)?.image === undefined,
    );
    expect(
      missing,
      `projects without a card image: ${missing.join(", ")}`,
    ).toEqual([]);
  });
});
