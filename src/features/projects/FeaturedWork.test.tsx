import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { trackEvent } from "../../common/analytics/analytics";
import FeaturedWork from "./FeaturedWork";

vi.mock("../../common/analytics/analytics", () => ({
  trackEvent: vi.fn(),
}));

function renderFeatured() {
  return render(
    <MemoryRouter>
      <FeaturedWork />
    </MemoryRouter>,
  );
}

function caseStudyLinks() {
  return screen
    .getAllByRole("link")
    .filter((link) =>
      /^\/projects\/[^/]+$/.test(link.getAttribute("href") ?? ""),
    );
}

describe("FeaturedWork", () => {
  it("lists the three flagships in order", () => {
    renderFeatured();

    expect(
      screen.getByRole("heading", { level: 2, name: "Featured work" }),
    ).toBeInTheDocument();

    expect(caseStudyLinks().map((link) => link.getAttribute("href"))).toEqual([
      "/projects/shaanti",
      "/projects/signal-desk",
      "/projects/mangakahue",
    ]);

    expect(
      screen.getByRole("link", { name: "See all projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("each card shows title, tagline, status and an image slot", () => {
    renderFeatured();

    const [shaanti] = caseStudyLinks();
    expect(
      within(shaanti).getByRole("heading", { level: 3 }),
    ).toHaveTextContent("Shaanti");
    expect(
      within(shaanti).getByText(
        "Airplane mode for one app: a timed internet cut-off for chosen Android apps",
      ),
    ).toBeInTheDocument();
    expect(
      within(shaanti).getByText("Play Store release pending"),
    ).toBeInTheDocument();

    // Either a real screenshot (decorative inside the link, so the link's
    // name leads with the title) or the labelled placeholder: the assertion
    // holds before and after the screenshots land.
    for (const link of caseStudyLinks()) {
      const img = link.querySelector("img");
      if (img) {
        expect(img).toHaveAttribute("alt", "");
        expect(img).toHaveAttribute("width");
        expect(img).toHaveAttribute("height");
        // Whole graphic visible, never cropped to the slot.
        expect(img.className).toMatch(/ans-object-contain/);
        expect(img.className).not.toMatch(/ans-object-cover/);
      } else {
        expect(
          within(link).getByRole("img", { name: "No screenshot available" }),
        ).toBeInTheDocument();
      }
    }
    // No nested interactive elements inside the card link.
    for (const link of caseStudyLinks()) {
      expect(within(link).queryAllByRole("link")).toHaveLength(0);
    }
  });

  it("link names start with the project title", () => {
    renderFeatured();

    const [shaanti, signalDesk, mangakahue] = caseStudyLinks();
    expect(shaanti).toHaveAccessibleName(/^Shaanti/);
    expect(signalDesk).toHaveAccessibleName(/^Signal Desk/);
    expect(mangakahue).toHaveAccessibleName(/^MangakaHue/);
  });

  it("fires featured_project_click with the slug on click", () => {
    renderFeatured();

    const [, signalDesk] = caseStudyLinks();
    fireEvent.click(signalDesk);

    expect(trackEvent).toHaveBeenCalledWith("featured_project_click", {
      slug: "signal-desk",
    });
  });
});
