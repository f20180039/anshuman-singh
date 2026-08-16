/**
 * Emits public/robots.txt and public/sitemap.xml from the route table in
 * src/common/seo/pages.json, so adding a route can never leave the sitemap
 * silently stale. Runs as part of `npm run build`.
 *
 * NOTE on robots.txt: crawlers only read robots.txt at the ORIGIN root
 * (https://f20180039.github.io/robots.txt), which belongs to the user-pages
 * repo, not this project repo. The copy written here is correct and ready for
 * the day this moves to a custom domain, but today the thing that actually
 * keeps /jobs and /thank-you out of the index is the per-page
 * <meta name="robots"> emitted by src/common/seo/Seo.tsx. See docs/SEO.md.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const SITE_ORIGIN = "https://f20180039.github.io";
const BASE_PATH = "/anshuman-singh";
const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

const { pages } = JSON.parse(
  fs.readFileSync(path.join(root, "src/common/seo/pages.json"), "utf8")
);

/**
 * Date of the commit being deployed. Works under actions/checkout's default
 * shallow clone because HEAD is always present; falls back to build time when
 * git is unavailable (e.g. a tarball build).
 */
function lastModified() {
  try {
    return execSync("git log -1 --format=%cI", { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim()
      .slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function absoluteUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

const lastmod = lastModified();
const indexable = pages.filter((page) => page.indexable);
const blocked = pages.filter((page) => !page.indexable);

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable
    .sort((a, b) => b.priority - a.priority || a.path.localeCompare(b.path))
    .map((page) =>
      [
        "  <url>",
        `    <loc>${absoluteUrl(page.path)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n")
    ),
  "</urlset>",
  "",
].join("\n");

const robotsTxt = [
  "# Portfolio of Anshuman Singh — https://f20180039.github.io/anshuman-singh/",
  "",
  "User-agent: *",
  "Allow: /",
  "",
  "# Personal tooling and post-submission pages: no search value.",
  ...blocked.map((page) => `Disallow: ${BASE_PATH}${page.path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);

console.log(
  `SEO files written: sitemap.xml (${indexable.length} URLs, lastmod ${lastmod}), robots.txt (${blocked.length} disallowed)`
);
