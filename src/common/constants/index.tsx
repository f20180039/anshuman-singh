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

// Public data files served from the Vite base path, produced by the daily
// jobs-feed workflow and the committed public job profile.
export const C_JOB_PROFILE_URL = `${import.meta.env.BASE_URL}data/job-profile.json`;
export const C_JOBS_FEED_URL = `${import.meta.env.BASE_URL}data/jobs-feed.json`;

// Resume PDFs are built by the latex-resume-builder repo and synced into
// public/resume/ by CI. Served from the Vite base path.
export const C_RESUME_SINGLE_COL_URL = `${import.meta.env.BASE_URL}resume/resume-single-col.pdf`;
export const C_RESUME_MULTI_COL_URL = `${import.meta.env.BASE_URL}resume/resume-multicol.pdf`;

export const C_LINKEDIN_URL =
  "https://linkedin.com/in/anshuman-singh-4546b5275";
export const C_GITHUB_URL = "https://github.com/f20180039";
export const C_HEALTHPLIX_URL = "https://www.healthplix.com";
export const C_MY_MAIL = "singh.anshuman.singh8@gmail.com";
export const C_MY_PHONE_NUMBER = "+91 63884 80701";
