import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SiReact } from "react-icons/si";
import { EAPP_ROUTES } from "../common/constants";
import { PROJECTS, type Project } from "../data/projects";
import CaseStudy, { CaseStudyArticle } from "./CaseStudy";

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

/** Mounts the real route table entry so `useParams` resolves the slug. */
function renderAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Routes>
        <Route path={EAPP_ROUTES.projects} element={<p>Projects index</p>} />
        <Route path={EAPP_ROUTES.caseStudy} element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>,
  );
}

function project(slug: string): Project {
  const found = PROJECTS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`missing project ${slug}`);
  return found;
}

describe("CaseStudy page", () => {
  it("renders sections for a slug", () => {
    renderAt("/projects/signal-desk");

    expect(
      screen.getByRole("heading", { level: 1, name: "Signal Desk" }),
    ).toBeInTheDocument();
    for (const name of [
      "The problem",
      "What I built",
      "How it's built",
      "By the numbers",
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("Built with a teammate")).toBeInTheDocument();

    const backLinks = screen.getAllByRole("link", { name: /All projects/ });
    expect(backLinks.length).toBeGreaterThan(0);
    for (const link of backLinks) {
      expect(link).toHaveAttribute("href", "/projects");
    }

    // Public repo: a GitHub link with a safe rel, and no "Private code" badge.
    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute(
      "href",
      "https://github.com/f20180039/moveinsync-hackathon-research",
    );
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByText("Private code")).toBeNull();
    expect(screen.getByText("Hackathon build")).toBeInTheDocument();
  });

  it("private project shows the badge and never a GitHub link", () => {
    renderAt("/projects/shaanti");

    expect(screen.getByText("Private code")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /GitHub/ })).toBeNull();
    expect(screen.getByText("Play Store release pending")).toBeInTheDocument();

    for (const [name, href] of [
      ["Website", "https://shaanti.pages.dev"],
      ["Demo video", "https://www.youtube.com/watch?v=b3z-wqRHSsA"],
    ]) {
      const link = screen.getByRole("link", { name: new RegExp(name) });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("has exactly one h1 with the section headings in order beneath it", () => {
    renderAt("/projects/toodler");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const headings = screen
      .getAllByRole("heading")
      .map((h) => Number(h.tagName.slice(1)));
    expect(headings[0]).toBe(1);
    for (let i = 1; i < headings.length; i += 1) {
      // Never skip a level going down (h1 → h3), per the a11y bar.
      expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it("unknown slug shows NotFound", () => {
    renderAt("/projects/does-not-exist");

    expect(
      screen.getByRole("heading", { name: "This page took a wrong turn" }),
    ).toBeInTheDocument();
    expect(screen.getByText("/projects/does-not-exist")).toBeInTheDocument();
  });

  it("artwork credit names the work, the licence and links the Commons source", () => {
    const credit = project("mangakahue").caseStudy?.artworkCredit;
    if (!credit) throw new Error("mangakahue must carry an artworkCredit");
    const url = /\((https:\/\/commons\.wikimedia\.org\/\S+)\)\s*$/.exec(
      credit,
    )?.[1];
    if (!url) throw new Error("artworkCredit must end in (<Commons URL>)");

    renderAt("/projects/mangakahue");

    // The wording is unchanged by the link markup.
    const line = screen.getByText(/^Artwork:/).closest("p");
    expect(line).toHaveTextContent(`Artwork: ${credit}`);

    // The source is a real external link that can wrap on a phone, not an
    // unbreakable run of text the body's overflow-x: hidden would clip.
    const link = within(line as HTMLElement).getByRole("link", { name: url });
    expect(link).toHaveAttribute("href", url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.className).toMatch(/ans-break-all/);
  });

  it("renders a fixture with artwork credit, no hero, empty gallery and no numbers", () => {
    const fixture: Project = {
      slug: "fixture",
      title: "Fixture Project",
      tagline: "A project with nothing optional filled in",
      description: "Exists only to exercise the empty-safe branches.",
      tech: [SiReact],
      repo: { visibility: "private" },
      links: [],
      caseStudy: {
        problem: "A problem statement.",
        built: ["One thing"],
        stack: ["React"],
        decisions: ["One decision"],
        numbers: [],
        artworkCredit: "Sample page from a public-domain manga (CC0)",
        gallery: [],
      },
    };
    const { container } = render(
      <MemoryRouter>
        <CaseStudyArticle project={fixture} />
      </MemoryRouter>,
    );

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("figure")).toBeNull();
    expect(
      screen.queryByRole("heading", { name: "By the numbers" }),
    ).toBeNull();
    expect(
      screen.getByText("Sample page from a public-domain manga (CC0)"),
    ).toBeInTheDocument();
    // No status on the fixture: only the private badge shows.
    expect(screen.getByText("Private code")).toBeInTheDocument();
  });

  it("renders the hero image with its alt and a gallery strip when present", () => {
    const fixture: Project = {
      ...project("shaanti"),
      image: {
        src: "/hero.webp",
        alt: "Shaanti home screen with a session timer",
        width: 640,
        height: 400,
      },
      caseStudy: {
        ...project("shaanti").caseStudy!,
        gallery: [
          {
            src: "/g1.webp",
            alt: "Quick Settings tile toggled on",
            width: 720,
            height: 1280,
          },
          {
            src: "/g2.webp",
            alt: "Scheduled Plans list",
            width: 1280,
            height: 800,
          },
        ],
      },
    };
    render(
      <MemoryRouter>
        <CaseStudyArticle project={fixture} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("img", {
        name: "Shaanti home screen with a session timer",
      }),
    ).toBeInTheDocument();
    const gallery = screen.getByRole("list", { name: "Screenshots" });
    const shots = within(gallery).getAllByRole("img");
    expect(shots).toHaveLength(2);
    // Intrinsic size on every <img>, so the strip is laid out before the
    // files load and a portrait shot keeps its own ratio.
    expect(shots[0]).toHaveAttribute("width", "720");
    expect(shots[0]).toHaveAttribute("height", "1280");
    expect(
      screen.getByRole("img", {
        name: "Shaanti home screen with a session timer",
      }),
    ).toHaveAttribute("width", "640");
  });
});
