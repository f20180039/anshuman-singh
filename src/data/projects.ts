import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
} from "react-icons/si";
// WebP outputs from `npm run gen:images`; the PNG sources stay in the repo but
// are deliberately not imported, so they never reach the bundle.
import SnapgramImage from "../assets/snapgram.webp";
import ExplodingProductionImage from "../assets/exploding-production.webp";
import GuessGame from "../assets/GuessGame.webp";
import { EAPP_ROUTES, PROJECT_ROUTES } from "../common/constants";

export type StatusKind = "live" | "in-progress" | "build";

export interface ProjectImage {
  src: string;
  /**
   * Describes what the screenshot actually shows rather than repeating the
   * title, which is already the adjacent heading — a screen reader hearing
   * the name twice learns nothing the second time.
   */
  alt: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** Private repos never get a URL: the UI shows a "Private code" badge instead. */
export type RepoInfo =
  { visibility: "public"; url: string } | { visibility: "private" };

export interface CaseStudy {
  problem: string;
  built: string[];
  stack: string[];
  decisions: string[];
  numbers: string[];
  credit?: string;
  artworkCredit?: string;
  gallery: ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image?: ProjectImage;
  tech: IconType[];
  repo: RepoInfo;
  /** External links; every one opens in a new tab. */
  links: ProjectLink[];
  status?: { kind: StatusKind; label: string };
  /** In-app route for projects that live inside this site (client-side navigation). */
  internalPath?: string;
  /** Present only for projects that have a case-study page at `caseStudyPath(slug)`. */
  caseStudy?: CaseStudy;
}

/** Projects shown on the Home page, in this order. */
export const FEATURED_SLUGS = ["shaanti", "signal-desk", "mangakahue"] as const;

export const PROJECTS: Project[] = [
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    tagline: "Personal site with an AI chat assistant",
    description:
      "Personal frontend portfolio with AI chat assistant, automated resume sync, and modern animations.",
    tech: [SiReact, SiTypescript, SiTailwindcss],
    repo: {
      visibility: "public",
      url: "https://github.com/f20180039/anshuman-singh",
    },
    links: [
      {
        label: "Live demo",
        href: "https://f20180039.github.io/anshuman-singh/",
      },
    ],
  },
  {
    slug: "exploding-production-game",
    title: "Exploding Production Game",
    tagline: "Codex-assisted browser game",
    description:
      "Codex-assisted browser game with polished gameplay flow, production routing, and frontend-first interaction design.",
    image: {
      src: ExplodingProductionImage,
      alt: "Screenshot of the Exploding Production browser game showing its gameplay board and score panel",
    },
    tech: [SiReact, SiJavascript],
    repo: { visibility: "private" },
    links: [
      { label: "Live demo", href: "https://exploding-production.onrender.com" },
    ],
  },
  {
    slug: "multiplayer-game-hub",
    title: "Multiplayer Game Hub",
    tagline: "Real-time multiplayer browser games",
    description:
      "Multiplayer browser game platform using real-time game-room flows and WebSocket-style state synchronization.",
    tech: [SiReact, SiJavascript],
    repo: { visibility: "private" },
    links: [
      {
        label: "Live demo",
        href: "https://multiplayer-frontend-x0cb.onrender.com",
      },
    ],
  },
  {
    slug: "snapgram",
    title: "Snapgram",
    tagline: "Full-stack Instagram clone",
    description:
      "Full-stack Instagram clone with authentication, posts, likes, comments, and real-time updates.",
    image: {
      src: SnapgramImage,
      alt: "Snapgram login screen beside a collage of user posts from the feed",
    },
    tech: [SiReact, SiTypescript, SiTailwindcss],
    repo: {
      visibility: "public",
      url: "https://github.com/f20180039/snapgram",
    },
    links: [{ label: "Live demo", href: "https://stalkergram.netlify.app" }],
  },
  {
    slug: "guess-game",
    title: "Guess Game",
    tagline: "Number guessing game with adaptive difficulty",
    description:
      "An interactive number guessing game with score tracking and adaptive difficulty.",
    image: {
      src: GuessGame,
      alt: "Guess Game interface with a number input, score counter and remaining attempts",
    },
    tech: [SiJavascript],
    repo: { visibility: "private" },
    links: [],
    internalPath: PROJECT_ROUTES.guessGame,
  },
];

/** Resolves a slug to its project only when that project has a case study. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(
    (project) => project.slug === slug && project.caseStudy !== undefined,
  );
}

export function caseStudyPath(slug: string): string {
  return `${EAPP_ROUTES.projects}/${slug}`;
}
