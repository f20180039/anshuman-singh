import { Link } from "react-router-dom";
import { NAV_LINKS } from "../constants";

export default function Footer() {
  return (
    <footer className="ans-mt-auto ans-bg-Gray-900 dark:ans-bg-Gray-800 ans-text-White dark:ans-text-Gray-300 ans-py-6 ans-text-center">
      <nav>
        <ul className="ans-flex ans-justify-center ans-gap-6 ans-mb-4">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="ans-text-Gray-300 dark:ans-text-Gray-400 hover:ans-text-White dark:hover:ans-text-Gray-200"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="ans-text-Gray-400 dark:ans-text-Gray-500">
        Copyright &copy; 2024 Anshuman Singh. All Rights Reserved.
      </p>
    </footer>
  );
}
