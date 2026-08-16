import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OG_IMAGE_URL, SITE_NAME, absoluteUrl, getPageSeo } from "./meta";

type TagKey = { name: string } | { property: string };

/**
 * Upserts a meta tag rather than appending one. index.html ships static
 * defaults so that non-JS social scrapers see something sensible; matching on
 * the existing node keeps us from emitting a second, conflicting copy of the
 * same tag once React takes over.
 */
function setMeta(key: TagKey, content: string) {
  const selector =
    "name" in key
      ? `meta[name="${key.name}"]`
      : `meta[property="${key.property}"]`;

  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if ("name" in key) {
      tag.setAttribute("name", key.name);
    } else {
      tag.setAttribute("property", key.property);
    }
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

/**
 * Owns document metadata for the whole app. Rendered once inside the router so
 * every client-side navigation updates title, description, canonical and the
 * social cards — a single <Seo /> instead of nine per-page copies.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getPageSeo(pathname);
    const url = absoluteUrl(pathname);

    document.title = seo.title;

    setMeta({ name: "description" }, seo.description);
    setMeta(
      { name: "robots" },
      seo.indexable ? "index, follow" : "noindex, follow"
    );
    setLink("canonical", url);

    setMeta({ property: "og:site_name" }, SITE_NAME);
    setMeta({ property: "og:type" }, "website");
    setMeta({ property: "og:title" }, seo.title);
    setMeta({ property: "og:description" }, seo.description);
    setMeta({ property: "og:url" }, url);
    setMeta({ property: "og:image" }, OG_IMAGE_URL);
    setMeta({ property: "og:image:alt" }, `${SITE_NAME} — Frontend Engineer`);

    setMeta({ name: "twitter:card" }, "summary_large_image");
    setMeta({ name: "twitter:title" }, seo.title);
    setMeta({ name: "twitter:description" }, seo.description);
    setMeta({ name: "twitter:image" }, OG_IMAGE_URL);
  }, [pathname]);

  return null;
}
