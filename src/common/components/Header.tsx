import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore, THEMES } from "../store/theme-store";
import { NAV_LINKS } from "../constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const location = useLocation();
  const themeRef = useRef<HTMLDivElement>(null);
  const mobileThemeRef = useRef<HTMLDivElement>(null);

  // Close theme picker on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = themeRef.current?.contains(target);
      const insideMobile = mobileThemeRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="ans-bg-th-header/90 ans-backdrop-blur-sm ans-text-White ans-p-4 ans-sticky ans-top-0 ans-w-full ans-shadow-md ans-z-50">
      <div className="ans-flex ans-justify-between ans-items-center">
        <h1 className="ans-text-2 ans-font-inter-3 retro-glow">My Portfolio</h1>

        {/* Desktop Navigation */}
        <nav className="ans-hidden sm:ans-flex ans-items-center ans-gap-6">
          <ul className="ans-flex ans-gap-6">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`ans-pb-1 ans-transition-all ans-duration-200 ${
                    location.pathname === path
                      ? "ans-text-th-accent ans-border-b-2 ans-border-th-accent"
                      : "ans-text-White hover:ans-text-th-accent"
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Picker */}
          <div ref={themeRef} className="ans-relative ans-ml-4">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="ans-flex ans-items-center ans-gap-2 ans-bg-White/10 ans-px-3 ans-py-1.5 ans-rounded-lg hover:ans-bg-White/20 ans-transition-colors ans-duration-200"
            >
              <span
                className="ans-w-4 ans-h-4 ans-rounded-full ans-border-2 ans-border-White/50"
                style={{
                  backgroundColor: THEMES.find((t) => t.id === theme)?.color,
                }}
              />
              <span className="ans-text-xs">
                {THEMES.find((t) => t.id === theme)?.label}
              </span>
            </button>

            {themeOpen && (
              <div className="ans-absolute ans-right-0 ans-mt-2 ans-bg-th-surface ans-rounded-lg ans-shadow-lg ans-border ans-border-th-border ans-py-2 ans-min-w-[140px] ans-z-50 ans-animate-fade-in">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeOpen(false);
                    }}
                    className={`ans-flex ans-items-center ans-gap-3 ans-w-full ans-px-4 ans-py-2 ans-text-xs ans-transition-colors ans-duration-150 ${
                      theme === t.id
                        ? "ans-bg-th-accent/20 ans-text-th-accent"
                        : "ans-text-th-fg hover:ans-bg-th-muted"
                    }`}
                  >
                    <span
                      className="ans-w-4 ans-h-4 ans-rounded-full ans-border-2 ans-border-th-border ans-shrink-0"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="sm:ans-hidden ans-flex ans-items-center ans-gap-3">
          {/* Mobile theme picker */}
          <div ref={mobileThemeRef} className="ans-relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="ans-p-2 ans-rounded-lg ans-bg-White/10"
            >
              <span
                className="ans-block ans-w-4 ans-h-4 ans-rounded-full ans-border-2 ans-border-White/50"
                style={{
                  backgroundColor: THEMES.find((t) => t.id === theme)?.color,
                }}
              />
            </button>
            {themeOpen && (
              <div className="ans-absolute ans-right-0 ans-mt-2 ans-bg-th-surface ans-rounded-lg ans-shadow-lg ans-border ans-border-th-border ans-py-2 ans-min-w-[140px] ans-z-50 ans-animate-fade-in">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeOpen(false);
                    }}
                    className={`ans-flex ans-items-center ans-gap-3 ans-w-full ans-px-4 ans-py-2 ans-text-xs ans-transition-colors ${
                      theme === t.id
                        ? "ans-bg-th-accent/20 ans-text-th-accent"
                        : "ans-text-th-fg hover:ans-bg-th-muted"
                    }`}
                  >
                    <span
                      className="ans-w-4 ans-h-4 ans-rounded-full ans-border-2 ans-border-th-border ans-shrink-0"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="ans-flex ans-flex-col ans-justify-center ans-items-center ans-w-8 ans-h-8 ans-space-y-1.5 focus:ans-outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`ans-block ans-w-6 ans-h-0.5 ans-bg-White ans-transition-all ans-duration-300 ${
                menuOpen ? "ans-rotate-45 ans-translate-y-2" : ""
              }`}
            />
            <span
              className={`ans-block ans-w-6 ans-h-0.5 ans-bg-White ans-transition-all ans-duration-300 ${
                menuOpen ? "ans-opacity-0" : ""
              }`}
            />
            <span
              className={`ans-block ans-w-6 ans-h-0.5 ans-bg-White ans-transition-all ans-duration-300 ${
                menuOpen ? "-ans-rotate-45 -ans-translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`sm:ans-hidden ans-fixed ans-inset-0 ans-z-[55] ans-bg-Black/50 ans-backdrop-blur-sm ans-transition-opacity ans-duration-300 ${
          menuOpen
            ? "ans-opacity-100 ans-pointer-events-auto"
            : "ans-opacity-0 ans-pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <nav
        className={`sm:ans-hidden ans-fixed ans-top-0 ans-right-0 ans-h-full ans-w-64 ans-z-[60] ans-bg-th-surface ans-shadow-lg ans-border-l ans-border-th-border ans-transform ans-transition-transform ans-duration-300 ${
          menuOpen ? "ans-translate-x-0" : "ans-translate-x-full"
        }`}
      >
        <ul className="ans-flex ans-flex-col ans-py-2 ans-bg-th-bg">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`ans-flex ans-w-full ans-px-4 ans-py-2 ans-transition-colors ans-duration-150 ${
                  location.pathname === path
                    ? "ans-bg-th-accent/20 ans-text-th-accent"
                    : "ans-text-th-fg hover:ans-bg-th-muted"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
