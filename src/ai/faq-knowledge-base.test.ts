import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PROJECTS } from "../data/projects";
import { FAQ_DATABASE, RESUME_CONTEXT } from "./faq-knowledge-base";

/**
 * The chat assistant's knowledge lives twice: this module feeds the frontend,
 * and `server/faq-data.json` feeds the Render backend (read with `fs` there,
 * so it is read the same way here and a JSON syntax error fails loudly).
 * Both copies must describe the same seven case studies, under the same
 * rules as the Projects pages (no names or handles, no private repo links,
 * no overclaiming of Shaanti's release).
 */
const PROJECTS_QUESTION = "What projects have you built?";

const CASE_STUDY_TITLES = PROJECTS.filter((p) => p.caseStudy).map(
  (p) => p.title,
);

const FE_SOURCE = fs.readFileSync(
  path.join(process.cwd(), "src/ai/faq-knowledge-base.ts"),
  "utf-8",
);
const SERVER_SOURCE = fs.readFileSync(
  path.join(process.cwd(), "server/faq-data.json"),
  "utf-8",
);

interface ServerFaqData {
  FAQ_DATABASE: { question: string; answer: string; keywords: string[] }[];
  RESUME_CONTEXT: string;
  ADDITIONAL_CONTEXT: string;
  AI_SYSTEM_INSTRUCTIONS: string;
}

const SERVER: ServerFaqData = JSON.parse(SERVER_SOURCE);

function faqAnswer(
  database: { question: string; answer: string }[],
  label: string,
): string {
  const faq = database.find((item) => item.question === PROJECTS_QUESTION);
  if (!faq) throw new Error(`${label} has no "${PROJECTS_QUESTION}" FAQ`);
  return faq.answer;
}

function projectsSection(resume: string, label: string): string {
  const match = /## Projects\n([\s\S]*?)(?:\n## |$)/.exec(resume);
  if (!match) throw new Error(`${label} RESUME_CONTEXT has no "## Projects"`);
  return match[1];
}

const FE_ANSWER = faqAnswer(FAQ_DATABASE, "frontend FAQ_DATABASE");
const SERVER_ANSWER = faqAnswer(SERVER.FAQ_DATABASE, "server FAQ_DATABASE");
const FE_PROJECTS = projectsSection(RESUME_CONTEXT, "frontend");
const SERVER_PROJECTS = projectsSection(SERVER.RESUME_CONTEXT, "server");

const COPIES: [string, string][] = [
  ["frontend FAQ answer", FE_ANSWER],
  ["frontend RESUME_CONTEXT projects", FE_PROJECTS],
  ["server FAQ answer", SERVER_ANSWER],
  ["server RESUME_CONTEXT projects", SERVER_PROJECTS],
];

const FILES: [string, string][] = [
  ["src/ai/faq-knowledge-base.ts", FE_SOURCE],
  ["server/faq-data.json", SERVER_SOURCE],
];

describe("chat knowledge of the case studies", () => {
  it("covers exactly the seven case studies from projects.ts", () => {
    expect(CASE_STUDY_TITLES).toHaveLength(7);
  });

  it.each(COPIES)("%s mentions all seven case studies", (_label, copy) => {
    const missing = CASE_STUDY_TITLES.filter((title) => !copy.includes(title));
    expect(missing).toEqual([]);
  });

  it.each([
    ["frontend FAQ answer", FE_ANSWER],
    ["server FAQ answer", SERVER_ANSWER],
  ])("%s keeps HealthPlix work first", (_label, answer) => {
    const healthplix = answer.indexOf("HealthPlix");
    expect(healthplix).toBeGreaterThanOrEqual(0);
    for (const title of CASE_STUDY_TITLES) {
      expect(answer.indexOf(title)).toBeGreaterThan(healthplix);
    }
  });

  it.each([
    ["frontend FAQ answer", FE_ANSWER],
    ["server FAQ answer", SERVER_ANSWER],
  ])("%s still mentions the older projects briefly", (_label, answer) => {
    expect(answer).toMatch(/Snapgram/);
    expect(answer).toMatch(/multiplayer game hub/i);
  });

  it.each(COPIES)(
    "%s uses the case studies' status labels and credits",
    (_label, copy) => {
      expect(copy).toMatch(/Play Store release pending/);
      expect(copy).toMatch(/Built with a teammate/i);
      expect(copy).toMatch(
        /Seeded from a friend's open-source reels-generator/i,
      );
      expect(copy).toMatch(/Round-2 take-home/);
    },
  );

  it("mirrors the same projects knowledge in both copies", () => {
    expect(SERVER_ANSWER).toBe(FE_ANSWER);
    expect(SERVER_PROJECTS).toBe(FE_PROJECTS);
    expect(
      SERVER.FAQ_DATABASE.find((f) => f.question === PROJECTS_QUESTION)
        ?.keywords,
    ).toEqual(
      FAQ_DATABASE.find((f) => f.question === PROJECTS_QUESTION)?.keywords,
    );
  });

  it.each(FILES)("%s names no person, handle or TradingAgents", (_f, src) => {
    expect(src).not.toMatch(/Prathamesh|alok2569|\bAlok\b|TradingAgents/i);
  });

  it.each(FILES)("%s links no private repo", (_f, src) => {
    expect(src).not.toMatch(
      /github\.com\/f20180039\/(shaanti|satya-aahar|MangakaHue|solarfile-reels|quiz-wizz)/i,
    );
  });

  it.each(FILES)("%s never claims Shaanti is on the Play Store", (_f, src) => {
    expect(src).not.toMatch(/available on (google )?play|on the play store/i);
  });

  it.each(FILES)("%s frames Quiz Wizz as a practice aid", (_f, src) => {
    expect(src).toMatch(/practice aid/i);
    expect(src).not.toMatch(/cheat|bypass|beat (the |real )?quiz/i);
  });
});
