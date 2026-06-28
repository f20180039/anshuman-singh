import { ReactElement, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBolt,
  FaChevronDown,
  FaMoon,
  FaPalette,
  FaSun,
  FaTimes,
  FaTerminal,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { Theme, THEMES, useThemeStore } from "../store/theme-store";

const THEME_ICONS: Record<Theme, ReactElement> = {
  dark: <FaMoon />,
  light: <FaSun />,
  matrix: <FaTerminal />,
  cyberpunk: <FaBolt />,
};

const THEME_SWATCHES: Record<Theme, string> = {
  dark: "linear-gradient(135deg, #050b16 0%, #10223a 52%, #5eead4 100%)",
  light: "linear-gradient(135deg, #f8fbff 0%, #dbeafe 48%, #fde68a 100%)",
  matrix: "linear-gradient(135deg, #031307 0%, #166534 48%, #a3e635 100%)",
  cyberpunk: "linear-gradient(135deg, #1b0635 0%, #7e22ce 48%, #f72585 100%)",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();
  const location = useLocation();
  const themeRef = useRef<HTMLDivElement>(null);
  const mobileThemeRef = useRef<HTMLDivElement>(null);
  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

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
    <>
      <header className="nav-glass ans-sticky ans-top-0 ans-z-[100] ans-w-full ans-border-b ans-border-th-accent/20 ans-px-5 ans-py-4 ans-shadow-md ans-backdrop-blur-md">
        <div className="ans-flex ans-items-center ans-justify-between ans-gap-4 ans-max-w-full">
          <h1 className="nav-title ans-whitespace-nowrap ans-text-[20px] ans-font-inter-3 retro-glow">
            Anshuman Singh
          </h1>

          <nav className="ans-hidden ans-items-center ans-gap-5 sm:ans-flex">
          <ul className="ans-flex ans-items-center ans-gap-2 ans-rounded-lg ans-border ans-border-White/10 ans-bg-White/[0.04] ans-p-1.5 ans-shadow-sm">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`ans-relative ans-block ans-rounded-md ans-px-4 ans-py-2.5 ans-text-[15px] ans-font-inter-2 ans-transition-all ans-duration-200 ${
                    location.pathname === path
                      ? "nav-link-active ans-bg-th-accent/15 ans-shadow-[0_0_18px_rgb(var(--th-accent)/0.22)]"
                      : "nav-link-muted hover:ans-bg-White/10"
                  }`}
                >
                  {name}
                  {location.pathname === path && (
                    <span className="ans-absolute ans-bottom-1 ans-left-3 ans-right-3 ans-h-[2px] ans-rounded-full ans-bg-th-accent ans-shadow-[0_0_12px_rgb(var(--th-accent)/0.8)]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div ref={themeRef} className="ans-relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="nav-control ans-flex ans-items-center ans-gap-2.5 ans-rounded-lg ans-border ans-border-White/15 ans-bg-White/10 ans-px-4 ans-py-2.5 ans-shadow-[0_0_20px_rgb(var(--th-accent)/0.14)] ans-transition-all ans-duration-200 hover:ans-border-th-accent/50 hover:ans-bg-White/15"
              aria-label="Open theme picker"
            >
              <span
                className="ans-grid ans-h-6 ans-w-6 ans-place-items-center ans-rounded-full ans-border ans-border-White/40 ans-shadow-[0_0_14px_rgb(var(--th-accent)/0.5)]"
                style={{ background: THEME_SWATCHES[theme] }}
              />
              <span className="ans-text-[14px] ans-font-inter-2">
                {activeTheme.label}
              </span>
              <FaChevronDown
                className={`ans-text-[12px] ans-transition-transform ${
                  themeOpen ? "ans-rotate-180" : ""
                }`}
              />
            </button>

            {themeOpen && (
              <ThemePanel
                selectedTheme={theme}
                onSelect={(nextTheme) => {
                  setTheme(nextTheme);
                  setThemeOpen(false);
                }}
                columns="ans-grid-cols-4"
                className="ans-right-0 ans-w-72"
              />
            )}
          </div>
        </nav>

        <div className="ans-flex ans-items-center ans-gap-3 sm:ans-hidden">
          <div ref={mobileThemeRef} className="ans-relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="nav-control ans-rounded-lg ans-border ans-border-White/15 ans-bg-White/10 ans-p-2.5"
              aria-label="Open theme picker"
            >
              <span
                className="ans-block ans-h-6 ans-w-6 ans-rounded-full ans-border ans-border-White/50"
                style={{ background: THEME_SWATCHES[theme] }}
              />
            </button>

            {themeOpen && (
              <ThemePanel
                selectedTheme={theme}
                onSelect={(nextTheme) => {
                  setTheme(nextTheme);
                  setThemeOpen(false);
                }}
                columns="ans-grid-cols-3"
                className="ans-right-0 ans-w-64"
              />
            )}
          </div>

          <button
            className="nav-control ans-grid ans-h-11 ans-w-11 ans-place-items-center ans-rounded-lg ans-border ans-border-White/15 ans-bg-White/10 ans-text-[18px] focus:ans-outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile menu overlay and nav - outside header to avoid clipping */}
    <div
      className={`ans-fixed ans-inset-0 ans-z-[998] ans-bg-Black/50 ans-backdrop-blur-sm ans-transition-opacity ans-duration-300 sm:ans-hidden ${
        menuOpen
          ? "ans-pointer-events-auto ans-opacity-100"
          : "ans-pointer-events-none ans-opacity-0"
      }`}
      onClick={() => setMenuOpen(false)}
    />

    <nav
      className={`ans-fixed ans-right-0 ans-top-0 ans-z-[999] ans-h-full ans-w-64 ans-transform ans-border-l ans-border-th-accent/30 ans-bg-th-surface ans-shadow-2xl ans-backdrop-blur-md ans-transition-transform ans-duration-300 sm:ans-hidden ${
        menuOpen ? "ans-translate-x-0" : "ans-translate-x-full"
      }`}
      style={{
        background: 'linear-gradient(135deg, rgb(var(--th-surface)), rgb(var(--th-surface-alt)))'
      }}
    >
      <ul className="ans-flex ans-flex-col ans-gap-1 ans-p-3 ans-pt-16">
        {NAV_LINKS.map(({ name, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`ans-flex ans-w-full ans-rounded-lg ans-px-4 ans-py-3 ans-text-[15px] ans-font-inter-2 ans-transition-colors ans-duration-150 ${
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
  </>
  );
}

interface ThemePanelProps {
  selectedTheme: Theme;
  onSelect: (theme: Theme) => void;
  columns: string;
  className: string;
}

function ThemePanel({
  selectedTheme,
  onSelect,
  columns,
  className,
}: ThemePanelProps) {
  return (
    <div
      className={`theme-panel ans-absolute ans-mt-3 ans-rounded-lg ans-border ans-border-th-accent/25 ans-bg-th-surface/95 ans-p-5 ans-shadow-2xl ans-backdrop-blur-md ans-animate-fade-in ${className}`}
    >
      <div className="ans-mb-4 ans-flex ans-items-center ans-gap-2 ans-text-[13px] ans-font-inter-3 ans-uppercase ans-text-th-muted-fg">
        <FaPalette className="ans-text-[18px] ans-text-th-accent" />
        Themes
      </div>
      <div className={`ans-grid ans-gap-3 ${columns}`}>
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => onSelect(themeOption.id)}
            className={`theme-tile ans-group ans-flex ans-flex-col ans-items-center ans-gap-2 ans-rounded-lg ans-p-1 ans-text-[12px] ans-font-inter-2 ans-transition-all ans-duration-200 ${
              selectedTheme === themeOption.id
                ? "ans-text-th-accent"
                : "ans-text-th-secondary-fg hover:ans-text-th-fg"
            }`}
            aria-label={`Switch to ${themeOption.label} theme`}
          >
            <span
              className={`ans-grid ans-h-14 ans-w-14 ans-place-items-center ans-rounded-lg ans-border ans-text-White ans-shadow-md ans-transition-all ans-duration-200 ${
                selectedTheme === themeOption.id
                  ? "ans-border-th-accent ans-shadow-[0_0_22px_rgb(var(--th-accent)/0.55)]"
                  : "ans-border-th-border group-hover:ans-border-th-accent/60"
              }`}
              style={{ background: THEME_SWATCHES[themeOption.id] }}
            >
              <span className="ans-text-[24px]">
                {THEME_ICONS[themeOption.id]}
              </span>
            </span>
            <span className="ans-relative">
              {themeOption.label}
              {selectedTheme === themeOption.id && (
                <span className="ans-absolute -ans-bottom-1 ans-left-1/2 ans-h-[2px] ans-w-6 -ans-translate-x-1/2 ans-rounded-full ans-bg-th-accent ans-shadow-[0_0_10px_rgb(var(--th-accent)/0.7)]" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
