import { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ans-bg-grad_Gray800_90 ans-text-White ans-p-4 ans-sticky ans-top-0 ans-w-full ans-shadow-md ans-z-50">
      <div className="ans-flex ans-justify-between ans-items-center">
        {/* Logo / Title */}
        <h1 className="ans-text-2xl ans-font-bold">My Portfolio</h1>

        {/* Desktop Navigation */}
        <nav className="ans-hidden sm:ans-flex">
          <ul className="ans-flex ans-gap-6">
            {NAV_LINKS.map(({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="ans-text-White hover:ans-text-Gray-300"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="sm:ans-hidden ans-flex ans-flex-col ans-space-y-1 focus:ans-outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="ans-w-6 ans-h-1 ans-bg-White ans-transition-transform"></span>
          <span className="ans-w-6 ans-h-1 ans-bg-White ans-transition-transform"></span>
          <span className="ans-w-6 ans-h-1 ans-bg-White ans-transition-transform"></span>
        </button>
      </div>

      {/* Mobile Menu with Overlay */}
      <div
        className={`sm:ans-hidden ans-fixed ans-inset-0 ans-bg-Gray-300 ans-bg-opacity-50 ans-transition-opacity ${
          menuOpen
            ? "ans-opacity-100 ans-pointer-events-auto"
            : "ans-opacity-0 ans-pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav
        className={`sm:ans-hidden ans-fixed ans-top-0 ans-right-0 ans-h-full ans-w-64 ans-bg-Gray-900 ans-shadow-lg ans-transform ans-transition-transform ${
          menuOpen ? "ans-translate-x-0" : "ans-translate-x-full"
        }`}
      >
        <ul className="ans-flex ans-flex-col ans-items-start ans-py-6 ans-pl-6 ans-space-y-4">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="ans-text-White hover:ans-text-Gray-300"
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
