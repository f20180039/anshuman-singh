import { useLocation } from "react-router-dom";

/**
 * Keyboard "skip to content" affordance.
 *
 * The href is built from the current path on purpose: index.html sets
 * <base href="/anshuman-singh/">, and a bare "#main-content" would resolve
 * against that base and navigate to the homepage instead of jumping down the
 * page you are on.
 */
export default function SkipLink() {
  const { pathname, search } = useLocation();

  return (
    <a
      href={`${pathname}${search}#main-content`}
      onClick={(event) => {
        const target = document.getElementById("main-content");
        if (!target) return;
        event.preventDefault();
        target.focus();
        target.scrollIntoView({ block: "start" });
      }}
      className="ans-sr-only focus:ans-not-sr-only focus:ans-fixed focus:ans-left-4 focus:ans-top-4 focus:ans-z-[70] focus:ans-rounded-lg focus:ans-bg-th-accent focus:ans-px-4 focus:ans-py-3 focus:ans-text-White focus:ans-shadow-lg"
    >
      Skip to main content
    </a>
  );
}
