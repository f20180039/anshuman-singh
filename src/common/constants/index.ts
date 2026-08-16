import resumeMeta from "../resume-meta.json";

export const EAPP_ROUTES = {
  home: "/",
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  certificates: "/certificates",
  contact: "/contact",
  resumePreview: "/resume",
  test3d: "/test-3d",
  jobs: "/jobs",
  thankYou: "/thank-you",
  privacy: "/privacy",
  terms: "/terms",
};
export const PROJECT_ROUTES = {
  guessGame: "/guess-game",
  pigGame: "/pig-game",
};
export const NAV_LINKS = [
  { name: "Home", path: EAPP_ROUTES.home },
  { name: "About", path: EAPP_ROUTES.about },
  { name: "Experience", path: EAPP_ROUTES.experience },
  { name: "Projects", path: EAPP_ROUTES.projects },
  { name: "Certificates", path: EAPP_ROUTES.certificates },
  { name: "Contact", path: EAPP_ROUTES.contact },
];

export const LEGAL_LINKS = [
  { name: "Privacy Policy", path: EAPP_ROUTES.privacy },
  { name: "Terms", path: EAPP_ROUTES.terms },
];

// Public data files served from the Vite base path, produced by the daily
// jobs-feed workflow and the committed public job profile.
export const C_JOB_PROFILE_URL = `${import.meta.env.BASE_URL}data/job-profile.json`;
export const C_JOBS_FEED_URL = `${import.meta.env.BASE_URL}data/jobs-feed.json`;

// Resume PDFs are built by the latex-resume-builder repo and synced into
// public/resume/ by .github/workflows/sync-resume.yml. Served from the Vite
// base path.
//
// The filenames are self-describing rather than resume-multicol.pdf, so that
// the name is still meaningful when the browser's built-in PDF viewer handles
// the download and ignores the anchor's `download` attribute.
export const C_RESUME_MULTI_COL_URL = `${import.meta.env.BASE_URL}resume/Anshuman-Singh-Frontend-Engineer-Resume.pdf`;
export const C_RESUME_SINGLE_COL_URL = `${import.meta.env.BASE_URL}resume/Anshuman-Singh-Frontend-Engineer-Resume-Single-Column.pdf`;

/**
 * Filename a recruiter ends up with in their Downloads folder.
 *
 * Leads with the name and the role so it is identifiable among hundreds of
 * other resumes, and carries the month the resume was last rebuilt so an old
 * copy is obviously an old copy. Only the alternate layout is labelled — the
 * default download should not carry jargon that means nothing to the reader.
 */
export function resumeDownloadName(layout: "single" | "multi" = "multi"): string {
  const month = resumeMeta.updatedAt.slice(0, 7); // YYYY-MM
  const variant = layout === "single" ? "-Single-Column" : "";
  return `Anshuman-Singh-Frontend-Engineer-Resume${variant}-${month}.pdf`;
}

/** Date of the last resume sync, maintained by the sync workflow. */
export const C_RESUME_UPDATED_AT = resumeMeta.updatedAt;

export const C_LINKEDIN_URL = "https://linkedin.com/in/anshuman-singh-bits";
export const C_GITHUB_URL = "https://github.com/f20180039";
export const C_HEALTHPLIX_URL = "https://www.healthplix.com";
export const C_MY_MAIL = "f20180039@gmail.com";
export const C_MY_PHONE_NUMBER = "+91 6388480701";

// Origin the site is actually served from. Used to build absolute canonical
// and Open Graph URLs, which must not be relative.
export const C_SITE_ORIGIN = "https://f20180039.github.io";
export const C_SITE_URL = `${C_SITE_ORIGIN}/anshuman-singh`;

// City-level location. Deliberately not a street address: it is enough for
// recruiters filtering by location and for the schema.org PostalAddress,
// without publishing a home address.
export const C_LOCATION = {
  locality: "Bengaluru",
  region: "Karnataka",
  country: "India",
  countryCode: "IN",
  timezone: "Asia/Kolkata (IST, UTC+5:30)",
};
export const C_LOCATION_LINE = `${C_LOCATION.locality}, ${C_LOCATION.region}, ${C_LOCATION.country}`;
