import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores the top of the page on navigation.
 *
 * The browser only manages scroll for real document loads; in a client-side
 * router, following a footer link from halfway down a long page otherwise lands
 * the visitor halfway down the next one. Respects reduced-motion preferences.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
}
