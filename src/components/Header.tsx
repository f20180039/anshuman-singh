import { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import { FaMoon, FaSun } from "react-icons/fa";
import { useThemeStore } from "../theme-store";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="ans-bg-Gray-800 dark:ans-bg-Gray-900 ans-text-White ans-p-4 ans-sticky ans-top-0 ans-w-full ans-shadow-md ans-z-50">
      <div className="ans-flex ans-justify-between ans-items-center">
        {/* Logo / Title */}
        <h1 className="ans-text-2xl ans-font-bold">My Portfolio</h1>

        {/* Desktop Navigation */}
        <nav className="ans-hidden sm:ans-flex ans-items-center ans-gap-6">
          <ul className="ans-flex ans-gap-6">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="ans-text-White dark:ans-text-Gray-300 hover:ans-text-Gray-300 dark:hover:ans-text-Gray-400"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="ans-text-2xl ans-ml-4 ans-bg-Gray-700 dark:ans-bg-Gray-800 ans-p-2 ans-rounded-full ans-shadow-md"
          >
            {isDarkMode ? (
              <FaSun className="ans-text-Yellow-400" />
            ) : (
              <FaMoon className="ans-text-Gray-300" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="sm:ans-hidden ans-flex ans-flex-col ans-space-y-1 focus:ans-outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="ans-w-6 ans-h-1 ans-bg-White dark:ans-bg-Gray-300 ans-transition-transform"></span>
          <span className="ans-w-6 ans-h-1 ans-bg-White dark:ans-bg-Gray-300 ans-transition-transform"></span>
          <span className="ans-w-6 ans-h-1 ans-bg-White dark:ans-bg-Gray-300 ans-transition-transform"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`sm:ans-hidden ans-fixed ans-inset-0 ans-bg-Gray-300 ans-bg-opacity-50 ans-transition-opacity ${
          menuOpen
            ? "ans-opacity-100 ans-pointer-events-auto"
            : "ans-opacity-0 ans-pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Navigation Menu */}
      <nav
        className={`sm:ans-hidden ans-fixed ans-top-0 ans-right-0 ans-h-full ans-w-64 ans-bg-Gray-900 dark:ans-bg-Gray-800 ans-shadow-lg ans-transform ans-transition-transform ${
          menuOpen ? "ans-translate-x-0" : "ans-translate-x-full"
        }`}
      >
        <ul className="ans-flex ans-flex-col ans-items-start ans-py-6 ans-pl-6 ans-space-y-4">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="ans-text-White dark:ans-text-Gray-300 hover:ans-text-Gray-300 dark:hover:ans-text-Gray-400"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle for Mobile */}
        <button
          onClick={toggleTheme}
          className="ans-mt-6 ans-ml-6 ans-text-2xl ans-bg-Gray-700 dark:ans-bg-Gray-800 ans-p-2 ans-rounded-full ans-shadow-md"
        >
          {isDarkMode ? (
            <FaSun className="ans-text-Yellow-400" />
          ) : (
            <FaMoon className="ans-text-Gray-300" />
          )}
        </button>
      </nav>
    </header>
  );
}
