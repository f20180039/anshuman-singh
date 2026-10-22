import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiDuckdb,
  SiFastapi,
  SiFfmpeg,
  SiGooglechrome,
  SiGooglegemini,
  SiJavascript,
  SiJetpackcompose,
  SiKotlin,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiUpstash,
  SiVite,
} from "react-icons/si";
// WebP outputs from `npm run gen:images`; the PNG/JPEG sources are deleted once
// converted (see scripts/optimize-images.js), so only the .webp is committed.
import SnapgramImage from "../assets/snapgram.webp";
import ExplodingProductionImage from "../assets/exploding-production.webp";
import GuessGame from "../assets/GuessGame.webp";
import ShaantiCard from "../assets/projects/shaanti-card.webp";
import Shaanti1 from "../assets/projects/shaanti-1.webp";
import Shaanti2 from "../assets/projects/shaanti-2.webp";
import Shaanti3 from "../assets/projects/shaanti-3.webp";
import Shaanti4 from "../assets/projects/shaanti-4.webp";
import Shaanti5 from "../assets/projects/shaanti-5.webp";
import Shaanti6 from "../assets/projects/shaanti-6.webp";
import SignalDeskCard from "../assets/projects/signal-desk-card.webp";
import SignalDesk1 from "../assets/projects/signal-desk-1.webp";
import SignalDesk2 from "../assets/projects/signal-desk-2.webp";
import SignalDesk3 from "../assets/projects/signal-desk-3.webp";
import SolarfileReelsCard from "../assets/projects/solarfile-reels-card.webp";
import SolarfileReels1 from "../assets/projects/solarfile-reels-1.webp";
import SolarfileReels2 from "../assets/projects/solarfile-reels-2.webp";
import SolarfileReels3 from "../assets/projects/solarfile-reels-3.webp";
import ToodlerCard from "../assets/projects/toodler-card.webp";
import Toodler1 from "../assets/projects/toodler-1.webp";
import Toodler2 from "../assets/projects/toodler-2.webp";
import Toodler3 from "../assets/projects/toodler-3.webp";
import QuizWizzCard from "../assets/projects/quiz-wizz-card.webp";
import MangakahueCard from "../assets/projects/mangakahue-card.webp";
import Mangakahue1 from "../assets/projects/mangakahue-1.webp";
import SatyaAaharCard from "../assets/projects/satya-aahar-card.webp";
import SatyaAahar1 from "../assets/projects/satya-aahar-1.webp";
import SatyaAaharFlow from "../assets/projects/satya-aahar-flow.svg";
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
  /**
   * Intrinsic pixel size of `src` (the WebP as encoded), passed straight to
   * `<img width height>` so the browser reserves the box before the file
   * arrives and nothing below it moves. Guarded against the file on disk by
   * projects.images.test.ts.
   */
  width: number;
  height: number;
}

export interface ProjectLink {
  label: string;
  href: string;
}

/**
 * - `public`: links to the repo.
 * - `private`: closed source; the UI shows a "Private code" badge, never a URL.
 * - `unlinked`: older projects that simply have no GitHub link today — no
 *   badge, no link.
 */
export type RepoInfo =
  | { visibility: "public"; url: string }
  | { visibility: "private" }
  | { visibility: "unlinked" };

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

// Case-study copy and every figure below come from the "Content facts" section of
// docs/superpowers/specs/2026-10-21-project-case-studies-design.md. Status
// labels, credits and link rules are guarded by projects.content.test.ts.
export const PROJECTS: Project[] = [
  {
    slug: "shaanti",
    title: "Shaanti",
    tagline:
      "Airplane mode for one app: a timed internet cut-off for chosen Android apps",
    description:
      "Android focus app that cuts the internet for the apps you choose during a timed session while the rest of the phone keeps working. Named after my grandmother.",
    image: {
      src: ShaantiCard,
      alt: 'Shaanti feature graphic: a hushing face wearing headphones beside the line "Take any app offline. Everything else keeps working."',
      width: 640,
      height: 313,
    },
    tech: [SiKotlin, SiJetpackcompose, SiAndroid],
    repo: { visibility: "private" },
    links: [
      { label: "Website", href: "https://shaanti.pages.dev" },
      {
        label: "Demo video",
        href: "https://www.youtube.com/watch?v=b3z-wqRHSsA",
      },
    ],
    status: { kind: "in-progress", label: "Play Store release pending" },
    caseStudy: {
      problem:
        "Airplane mode takes the whole phone offline when what you usually want is to lose one or two apps for a while. Shaanti cuts the internet for only the apps you pick, for a timed session, and leaves everything else working.",
      built: [
        "Timed focus sessions that cut the internet for chosen apps through Android's VpnService while the rest of the phone stays online",
        "Quick Settings tile to start a session without opening the app",
        "Scheduled Plans that start sessions on their own",
        "Game auto-start (Pro)",
        "Multi-plan paywall on Play Billing: 3-, 6- and 12-month plans, each with a 14-day trial",
        "Three themes, AdMob with UMP consent, and a Hindi store graphic",
      ],
      stack: [
        "Kotlin",
        "Jetpack Compose / Material 3",
        "Room",
        "DataStore",
        "WorkManager",
        "VpnService",
        "Play Billing",
        "AdMob + UMP consent",
      ],
      decisions: [
        "Per-app blocking is built on Android's VpnService, so a session touches only the chosen apps and the rest of the device is untouched.",
        "The app logic is covered by ~1,100 JVM unit tests, which run without a device or emulator.",
      ],
      numbers: [
        "~1,100 JVM unit tests",
        "3 subscription plans (3 / 6 / 12 months), each with a 14-day trial",
        "3 themes",
      ],
      gallery: [
        {
          src: Shaanti1,
          alt: "Shaanti home screen with Chrome, Gmail and YouTube picked to go quiet, a duration chooser set to 1 hour, and a Start button",
          width: 720,
          height: 1280,
        },
        {
          src: Shaanti2,
          alt: 'A running Shaanti session with a 59:26 countdown, the three blocked apps listed and "Phone calls ring as usual"',
          width: 720,
          height: 1280,
        },
        {
          src: Shaanti3,
          alt: "Shaanti Plans screen with two scheduled plans, Focus on weekdays and Sleep every night, each with an on/off switch",
          width: 720,
          height: 1280,
        },
        {
          src: Shaanti4,
          alt: "Shaanti New plan editor with a 10:00 am start, 2 h length and weekday repeat chips",
          width: 720,
          height: 1280,
        },
        {
          src: Shaanti5,
          alt: 'Shaanti session summary card reading "You were offline for 8 min. Nothing tried to reach you." above the ready-to-start card',
          width: 720,
          height: 1280,
        },
        {
          src: Shaanti6,
          alt: 'Shaanti settings screen with the "Block phone calls during sessions" switch on and plan-overlap options below',
          width: 720,
          height: 1280,
        },
      ],
    },
  },
  {
    slug: "signal-desk",
    title: "Signal Desk",
    tagline:
      "Agentic ops intelligence for enterprise commute, built at the MoveInSync hackathon",
    description:
      "Rules compute PASS / WATCH / CONCERN / BREACH findings with evidence SQL; the LLM only writes the prose and never computes a number. Built with a teammate at the MoveInSync hackathon (5 Sep 2026).",
    image: {
      src: SignalDeskCard,
      alt: "Signal Desk overview for a transport manager: four metric cards (on-time arrival, on-time departure, no-show rate, cost per km) graded Pass or Concern, above a Breach priority action for marshal compliance",
      width: 640,
      height: 400,
    },
    tech: [SiPython, SiFastapi, SiDuckdb, SiReact],
    repo: {
      visibility: "public",
      url: "https://github.com/f20180039/moveinsync-hackathon-research",
    },
    links: [],
    status: { kind: "build", label: "Hackathon build" },
    caseStudy: {
      problem:
        "Ops teams running enterprise commute need to know what changed, how serious it is and what the evidence is, and an LLM reasoning over raw data is the wrong tool for the numbers. Signal Desk splits the job: deterministic rules decide, the model narrates.",
      built: [
        "Rules engine that grades metrics as PASS / WATCH / CONCERN / BREACH, with every finding carrying the evidence SQL that produced it",
        "LLM layer (Sarvam) that only writes the prose brief and never computes a number",
        "Dispatch of briefs to Slack and email",
        "FastAPI + DuckDB backend that ingests 3.44M rows in 6.99 s",
        "React 19 + Vite ops console",
      ],
      stack: ["Python", "FastAPI", "DuckDB", "Sarvam LLM", "React 19", "Vite"],
      decisions: [
        "Numbers come from rules and SQL, never from the model: each finding ships with the SQL behind it, so the LLM cannot hallucinate a metric and a reviewer can rerun the evidence.",
        "DuckDB for the analytics: 3.44M rows ingested in 6.99 s and a metric query p50 of 14.7 ms.",
      ],
      numbers: [
        "3.44M rows ingested in 6.99 s",
        "Metric query p50 14.7 ms",
        "~125 pytest + 217 Vitest tests",
        "~₹0.13–0.77 per brief",
      ],
      credit: "Built with a teammate",
      gallery: [
        {
          src: SignalDesk1,
          alt: "Signal Desk overview for a transport manager: four metric cards graded Pass or Concern above a Breach priority action for marshal compliance",
          width: 1280,
          height: 800,
        },
        {
          src: SignalDesk2,
          alt: "Signal Desk alerts list: marshal-compliance Breach cards with the reason, impact and SLA comparison, each offering Investigate, Escalate and Dismiss",
          width: 1280,
          height: 800,
        },
        {
          src: SignalDesk3,
          alt: "Signal Desk data-health table showing rows loaded, quarantined, unmatched and a confidence percentage for each of the five feeds",
          width: 1280,
          height: 800,
        },
      ],
    },
  },
  {
    slug: "mangakahue",
    title: "MangakaHue",
    tagline: "AI manga colouriser that keeps the original line art",
    description:
      "Colourises manga pages while preserving the line work, for creators, scanlation teams and hobbyists, with a chapter reader and public library around it.",
    image: {
      src: MangakahueCard,
      alt: "Before and after: a six-panel black-and-white 1902 comic strip beside the same page colourised by MangakaHue, with the original ink lines kept",
      width: 640,
      height: 482,
    },
    tech: [SiNextdotjs, SiSupabase, SiPostgresql],
    repo: { visibility: "private" },
    links: [],
    status: { kind: "in-progress", label: "Closed beta soon" },
    caseStudy: {
      problem:
        "Colourising manga with a generic image model tends to repaint the page and lose the line work that makes it the artist's. MangakaHue colourises while keeping the original line art, and takes colour clues from the speech-bubble text instead of guessing.",
      built: [
        "ComfyUI pipeline (ControlNet-Lineart, IP-Adapter, RealESRGAN) that colourises without losing the line art",
        "7 pluggable providers behind one interface",
        "Character catalog and recognition",
        "Colour clues pulled from speech-bubble text with on-device OCR (PP-OCRv5)",
        "Chapter reader and public library",
        "Background jobs on a pg-boss worker over Supabase Postgres",
      ],
      stack: [
        "Next.js",
        "Supabase (auth, Postgres, Storage, RLS)",
        "drizzle",
        "pg-boss",
        "ComfyUI",
        "PP-OCRv5",
      ],
      decisions: [
        "Line art is a hard constraint, not a hope: ControlNet-Lineart conditions the generation on the original lines so the output keeps them instead of approximating them.",
        "Providers are pluggable (7 so far), so a model or host can be swapped behind one interface.",
        "OCR runs on-device (PP-OCRv5) rather than through a hosted OCR API.",
      ],
      numbers: ["119 tests", "7 pluggable providers"],
      // Public-domain page (author died 1955); the Commons file page states
      // {{PD-Japan}}. The page is 600×853 and is shown at that native size.
      // CaseStudy.tsx prefixes "Artwork: " when it renders this.
      artworkCredit:
        "Tagosaku to Mokube no Tokyo Kenbutsu by Rakuten Kitazawa, Public domain (PD-Japan), via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Tagosaku_to_Mokube_no_Tokyo_Kenbutsu.jpg)",
      gallery: [
        {
          src: Mangakahue1,
          alt: "The colourised 1902 strip on its own: six panels of two men at a cast-iron water pump, coloured in warm earth tones with the line art untouched",
          width: 600,
          height: 853,
        },
      ],
    },
  },
  {
    slug: "satya-aahar",
    title: "Satya Aahar",
    tagline:
      "Snap a packaged-food label, get HIGH SUGAR / SALT / FAT warnings against ICMR-NIN 2024",
    description:
      "“Truth about food”: an India-first engine that reads a packaged-food label and flags HIGH SUGAR / SALT / FAT against ICMR-NIN 2024, daily-limit shares, additives banned elsewhere and per-family-member risks, in English and Hindi.",
    // Rendered from the real engine's output for a synthetic, unbranded label.
    image: {
      src: SatyaAaharCard,
      alt: "Verdict card for an anonymised 100 g pack of cream biscuits: HIGH SUGAR, HIGH SALT and HIGH FAT badges in English and Hindi, with each nutrient's share of the daily limit",
      width: 640,
      height: 616,
    },
    tech: [SiPython, SiFastapi, SiPostgresql, SiRedis],
    repo: { visibility: "private" },
    links: [],
    status: { kind: "in-progress", label: "In development" },
    caseStudy: {
      problem:
        "A packaged-food label lists numbers without saying what they mean for you. Satya Aahar turns a photo of the label into plain warnings: how much of a daily limit one serving uses, which additives are banned elsewhere, and what matters for each member of the family.",
      built: [
        "Pure rules engine with an India rule pack: HIGH SUGAR / SALT / FAT against ICMR-NIN 2024, daily-limit shares, additives banned elsewhere",
        "Per-family-member flags, in English and Hindi",
        "FastAPI service with pydantic v2 models, SQLAlchemy on Postgres and Redis rate limits",
        "Barcodes via zxing-cpp and pluggable vision providers for reading the label photo",
        "Guards: photos purged after 24 h, spend ceilings",
      ],
      stack: [
        "Python 3.12",
        "FastAPI",
        "pydantic v2",
        "SQLAlchemy / Postgres",
        "Redis",
        "zxing-cpp",
        "pytest + hypothesis",
      ],
      decisions: [
        "The rules engine is pure, with no I/O and no model calls, so every verdict is deterministic and testable; 32 golden vectors from real labels pin its output.",
        "Vision providers are pluggable, so the model that reads the label can change without touching the rules.",
        "Photos are purged after 24 h and spend has ceilings, so a stray upload cannot linger and a bad day cannot run up a bill.",
      ],
      numbers: [
        "73 additives and 11 allergens in the India rule pack",
        "32 golden vectors from real labels",
        "~1,000 tests",
        "Photos purged after 24 h",
      ],
      gallery: [
        {
          src: SatyaAahar1,
          alt: "Full Satya Aahar verdict for the anonymised cream biscuits: three HIGH warnings, daily-limit shares, per-family-member flags for a child and an adult with diabetes, and an additive note, each line in English and Hindi",
          width: 720,
          height: 1150,
        },
        {
          src: SatyaAaharFlow,
          alt: "Pipeline diagram: label photo, barcode and vision extraction, rules engine with the ICMR-NIN 2024 India pack, HIGH SUGAR / SALT / FAT warnings in English and Hindi, then per-family-member flags",
          width: 640,
          height: 230,
        },
      ],
    },
  },
  {
    slug: "solarfile-reels",
    title: "SolarFile Reels",
    tagline:
      "Topic to finished 1080×1920 reel: script, voice, stock footage, word-timed captions",
    description:
      "Pipeline that turns a topic into a script, a voice track, stock footage and word-timed captions, rendered as a 1080×1920 reel, with a Next.js studio for reviewing the script and swapping clips.",
    image: {
      src: SolarfileReelsCard,
      alt: 'SolarFile public gallery: the site intro "Automated space-weather shorts" above one published reel card, a captioned octopus clip titled "Octopuses Have Three Hearts"',
      width: 640,
      height: 400,
    },
    tech: [SiPython, SiFastapi, SiFfmpeg, SiNextdotjs, SiSupabase],
    repo: { visibility: "private" },
    links: [],
    status: { kind: "in-progress", label: "In development" },
    caseStudy: {
      problem:
        "Making a short vertical video by hand means writing, recording, hunting for footage and timing captions for every clip. SolarFile Reels runs that as one pipeline from a topic, and keeps a person in the loop through a studio where the script and each clip can be reviewed or swapped.",
      built: [
        "Pipeline: topic → script → voice (edge-tts) → stock footage → word-timed captions (faster-whisper) → 1080×1920 reel rendered with FFmpeg",
        "Next.js studio for script and footage review, with “Find another clip” and drafts",
        "Supabase (RLS) plus S3-compatible storage for media",
        "Mac worker with heartbeat and requeue, so a job on a worker that dies is picked up again",
      ],
      stack: [
        "Python",
        "FastAPI",
        "edge-tts",
        "faster-whisper",
        "FFmpeg",
        "Next.js",
        "Supabase (RLS)",
        "S3-compatible storage",
      ],
      decisions: [
        "Rendering runs on a separate Mac worker with a heartbeat and requeue, so a worker that dies mid-job does not strand the job.",
        "Captions are word-timed with faster-whisper over the generated voice track, so they follow the audio rather than the script.",
      ],
      numbers: ["1080×1920 output"],
      credit: "Seeded from a friend's open-source reels-generator",
      gallery: [
        {
          src: SolarfileReels1,
          alt: 'SolarFile public gallery: the site intro above one published reel card, a captioned octopus clip titled "Octopuses Have Three Hearts"',
          width: 1280,
          height: 800,
        },
        {
          src: SolarfileReels2,
          alt: 'SolarFile "How it works" page with an architecture diagram linking Browser, Vercel/Next.js, Supabase, Backblaze B2 and the Mac worker, followed by the five-step pipeline',
          width: 1280,
          height: 800,
        },
        {
          src: SolarfileReels3,
          alt: 'A frame from a generated 1080×1920 reel: green aurora over a rocky shoreline with the word-timed caption "disabled the Apollo 16", the current word highlighted in yellow',
          width: 720,
          height: 1280,
        },
      ],
    },
  },
  {
    slug: "toodler",
    title: "Toodler",
    tagline:
      "Clickable admissions workflow-builder prototype, a Round-2 take-home for Toddle",
    description:
      "Built for Toddle's Round-2 take-home: an admissions workflow builder with stages, Branch and Parallel nodes, a config panel, undo/redo and URL-linkable state, alongside a written spec and competitor research.",
    image: {
      src: ToodlerCard,
      alt: "Toodler workflow builder showing the Application acknowledgement flow: a Trigger node feeding a Parallel node that fans out into two Send email steps, with the node palette on the left and the trigger's config panel on the right",
      width: 640,
      height: 400,
    },
    tech: [SiReact, SiTypescript, SiVite],
    repo: { visibility: "public", url: "https://github.com/f20180039/toodler" },
    links: [
      {
        label: "Live prototype",
        href: "https://toddle-admissions-prototype.onrender.com",
      },
    ],
    status: { kind: "live", label: "Live prototype" },
    caseStudy: {
      problem:
        "The take-home brief was an admissions workflow builder. The prototype answers it with something clickable: stages in sequence, Branch and Parallel nodes where the process forks, and a config panel for every node, backed by a written spec and competitor research.",
      built: [
        "Workflow canvas with ordered stages and Branch / Parallel nodes",
        "Config panel for every node",
        "Undo / redo",
        "URL-linkable state, so a workflow can be shared as a link",
        "15 seed workflows to explore",
        "Written spec and competitor research alongside the code",
      ],
      stack: ["React", "TypeScript", "Vite", "Vitest"],
      decisions: [
        "Workflow state lives in the URL, so any configuration is a link: shareable, and it survives a refresh.",
        "47 tests pin the workflow tree's invariants, so a change to the editor cannot silently produce a malformed workflow.",
      ],
      numbers: [
        "15 seed workflows",
        "197 config panels",
        "47 tests pinning tree invariants",
      ],
      gallery: [
        {
          src: Toodler1,
          alt: "Toodler workflow builder showing the Application acknowledgement flow: a Trigger node feeding a Parallel node that fans out into two Send email steps, with the node palette and config panel either side",
          width: 1280,
          height: 800,
        },
        {
          src: Toodler2,
          alt: 'The same Application flow with a Branch node selected: the right-hand panel lists its two paths, "Yes" when status is not Under review and "No" as the fallback',
          width: 1280,
          height: 800,
        },
        {
          src: Toodler3,
          alt: "Concession application flow with a four-path Branch on fee concession, each path leading to its own Create task, Adjust fee or Update status step",
          width: 1280,
          height: 800,
        },
      ],
    },
  },
  {
    slug: "quiz-wizz",
    title: "Quiz Wizz",
    tagline:
      "Chrome MV3 extension: OCR on canvas-rendered questions, multi-model consensus answers",
    description:
      "A practice aid for quiz pages that render as canvas: Tesseract OCR reads the question, a ranked queue of LLMs answers it with two-model consensus voting, and a shared Upstash Redis cache remembers what has already been answered. v1.3.2, shared privately.",
    // Store promo tile; the extension has no capturable UI of its own, so
    // there is no gallery.
    image: {
      src: QuizWizzCard,
      alt: 'Quiz Wizz store promo tile: a blue light-bulb app icon beside the name and the word "Automator" on a dark background',
      width: 440,
      height: 280,
    },
    tech: [SiGooglechrome, SiGooglegemini, SiUpstash],
    repo: { visibility: "private" },
    links: [],
    status: { kind: "build", label: "Private release (v1.3.2)" },
    caseStudy: {
      problem:
        "Quiz pages drawn on a canvas expose no selectable text, so ordinary study tools cannot read them. Quiz Wizz works from the pixels: Tesseract OCR extracts the question, a ranked queue of models answers it, and two-model consensus voting decides what to show.",
      built: [
        "Tesseract OCR over canvas-rendered questions, so the extension works where there is no DOM text",
        "Ranked LLM queue (Groq, Gemini, Mistral, Sarvam)",
        "Two-model consensus voting before an answer is shown",
        "Shared answer cache on Upstash Redis, so a question answered once is not asked again",
        "Chrome MV3 extension with a no-dependency build",
      ],
      stack: [
        "Chrome MV3",
        "Tesseract OCR",
        "Groq / Gemini / Mistral / Sarvam",
        "Upstash Redis",
      ],
      decisions: [
        "Consensus over confidence: two models have to agree before an answer surfaces, so a single model's confident miss does not become the answer.",
        "No-dependency build: the extension ships as plain files with no bundler or framework, which keeps it small and auditable.",
      ],
      numbers: [
        "v1.3.2, shared privately",
        "4 LLM providers in the ranked queue",
        "2-model consensus",
      ],
      gallery: [],
    },
  },
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
      width: 640,
      height: 571,
    },
    tech: [SiReact, SiJavascript],
    repo: { visibility: "unlinked" },
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
    repo: { visibility: "unlinked" },
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
      width: 640,
      height: 310,
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
      width: 640,
      height: 136,
    },
    tech: [SiJavascript],
    repo: { visibility: "unlinked" },
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
