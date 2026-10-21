import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

function renderAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Header />
    </MemoryRouter>,
  );
}

/** Desktop and mobile navs both render every item; check all copies. */
function navLinks(name: string) {
  return screen.getAllByRole("link", { name });
}

describe("Header active nav", () => {
  it("Projects is active on /projects", () => {
    renderAt("/projects");

    for (const link of navLinks("Projects")) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
    for (const link of navLinks("Home")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it("Projects is active on a case study", () => {
    renderAt("/projects/shaanti");

    for (const link of navLinks("Projects")) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
    for (const link of navLinks("Home")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it("Home stays exact-match", () => {
    renderAt("/");
    for (const link of navLinks("Home")) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
    for (const link of navLinks("Projects")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });

  it("a sibling prefix does not activate Projects", () => {
    renderAt("/projectsx");
    for (const link of navLinks("Projects")) {
      expect(link).not.toHaveAttribute("aria-current");
    }
  });
});
