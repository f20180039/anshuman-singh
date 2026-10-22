import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import Projects from "./Projects";

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

describe("Projects page", () => {
  it("splits the data module into Recent work and Earlier projects", () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>,
    );

    const [recent, earlier] = screen.getAllByRole("heading", { level: 2 });
    expect(recent).toHaveTextContent("Recent work");
    expect(earlier).toHaveTextContent("Earlier projects");

    const recentTitles = within(recent.parentElement as HTMLElement)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    const earlierTitles = within(earlier.parentElement as HTMLElement)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(recentTitles).toEqual(
      PROJECTS.filter((p) => p.caseStudy).map((p) => p.title),
    );
    expect(earlierTitles).toEqual(
      PROJECTS.filter((p) => !p.caseStudy).map((p) => p.title),
    );
    expect(recentTitles.length + earlierTitles.length).toBe(PROJECTS.length);
  });
});
