import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  // ScrollToTop calls window.scrollTo on every navigation; jsdom has none.
  window.scrollTo = () => {};
  // jsdom has no matchMedia; report "reduced motion" so BackgroundManager
  // skips the lazy three.js constellation.
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

/**
 * Deep-link check through the real router: BrowserRouter with the GitHub
 * Pages basename, the lazy route table and Suspense, exactly as a hard
 * refresh on the deployed site reaches it after public/404.html's shim.
 */
describe("App deep links", () => {
  it("renders a case study at /anshuman-singh/projects/<slug>", async () => {
    window.history.pushState({}, "", "/anshuman-singh/projects/shaanti");
    render(<App />);

    expect(
      // Lazy route + Suspense under full-suite load can outlast the default
      // 1 s; the longer wait only matters when something is actually slow.
      await screen.findByRole(
        "heading",
        { level: 1, name: "Shaanti" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
    expect(document.title).toBe("Shaanti — Android focus app | Anshuman Singh");
    expect(
      document.head.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute(
      "href",
      "https://f20180039.github.io/anshuman-singh/projects/shaanti",
    );
    // The header's nav item, not the Footer's "Projects" link.
    const header = screen.getByRole("banner");
    expect(
      within(header).getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("renders the 404 page for an unknown case-study slug", async () => {
    window.history.pushState({}, "", "/anshuman-singh/projects/nope");
    render(<App />);

    expect(
      await screen.findByRole(
        "heading",
        { level: 1, name: "This page took a wrong turn" },
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
    expect(document.title).toBe("Page Not Found (404) | Anshuman Singh");
  });
});
