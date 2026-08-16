import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "./analytics";
import { getPageSeo } from "../seo/meta";

/**
 * Boots Consent Mode defaults once, then reports a virtual page view on each
 * client-side navigation. Both calls no-op unless analytics is configured and
 * the visitor has accepted, so this is safe to mount unconditionally.
 */
export default function AnalyticsTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${pathname}${search}`, getPageSeo(pathname).title);
  }, [pathname, search]);

  return null;
}
