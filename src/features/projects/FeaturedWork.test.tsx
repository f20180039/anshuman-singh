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

    // Either a real screenshot or the labelled placeholder, both role="img":
    // the assertion holds before and after the screenshots land.
    for (const link of caseStudyLinks()) {
      expect(within(link).getAllByRole("img").length).toBeGreaterThan(0);
    }
    // No nested interactive elements inside the card link.
    for (const link of caseStudyLinks()) {
      expect(within(link).queryAllByRole("link")).toHaveLength(0);
    }
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
