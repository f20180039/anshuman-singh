import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

beforeAll(() => {
  // jsdom has no matchMedia. Report "reduced motion" so BackgroundManager
  // skips the lazy three.js constellation, as it does for such users.
  window.matchMedia = (query: string) =>
    ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
});

describe("Home page", () => {
  it("keeps the hero and adds Featured work beneath it with headings in order", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const headings = screen.getAllByRole("heading");
    const levels = headings.map((h) => Number(h.tagName.slice(1)));

    // Exactly one h1, first in the document, and no heading skips a level.
    expect(levels[0]).toBe(1);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }

    expect(headings[0]).toHaveTextContent("Anshuman Singh");
    expect(
      screen.getByRole("heading", { level: 2, name: "Featured work" }),
    ).toBeInTheDocument();

    // The section sits after the hero's stat tiles, which stay unchanged.
    const tiles = screen.getByText("Primary stack", { selector: "dt" });
    const featured = screen.getByRole("heading", { name: "Featured work" });
    expect(
      tiles.compareDocumentPosition(featured) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    expect(
      screen.getByRole("link", { name: "See all projects" }),
    ).toHaveAttribute("href", "/projects");
  });
});
