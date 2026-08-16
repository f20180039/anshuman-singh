import { C_SITE_URL } from "../constants";
import { getYearsOfExperience } from "../utils";
import seoData from "./pages.json";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  indexable: boolean;
  priority?: number;
  changefreq?: string;
}

export const OG_IMAGE_URL = `${C_SITE_URL}/og-image.png`;
export const SITE_NAME = "Anshuman Singh";

const PAGES: PageSeo[] = seoData.pages;
const NOT_FOUND: PageSeo = seoData.notFound;

/** Replaces copy tokens so meta text tracks live values instead of going stale. */
function fillTokens(text: string): string {
  return text.replace(/\{years\}/g, getYearsOfExperience());
}

/** Trailing slashes are equivalent to the router, so normalise before lookup. */
function normalisePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

/**
 * Resolves the SEO entry for a route. Unknown paths fall back to the 404 entry,
 * which matches the router's catch-all so the two can never disagree.
 */
export function getPageSeo(pathname: string): PageSeo {
  const path = normalisePath(pathname);
  const match = PAGES.find((page) => page.path === path) ?? NOT_FOUND;
  return {
    ...match,
    title: fillTokens(match.title),
    description: fillTokens(match.description),
  };
}

/** Absolute URL for a route, required for canonical and og:url. */
export function absoluteUrl(path: string): string {
  const normalised = normalisePath(path);
  return normalised === "/" ? `${C_SITE_URL}/` : `${C_SITE_URL}${normalised}`;
}

export const INDEXABLE_PAGES = PAGES.filter((page) => page.indexable);
