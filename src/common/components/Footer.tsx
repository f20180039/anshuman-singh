import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS, C_GITHUB_URL, C_LINKEDIN_URL } from "../constants";

export default function Footer() {
  return (
    <footer className="ans-mt-auto ans-bg-th-header ans-text-White ans-py-8 ans-text-center ans-border-t ans-border-th-border/30">
      <nav>
        <ul className="ans-flex ans-flex-wrap ans-justify-center ans-gap-3 sm:ans-gap-6 ans-mb-6">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="ans-text-th-muted-fg hover:ans-text-th-accent ans-transition-colors ans-duration-200"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ans-flex ans-justify-center ans-gap-6 ans-mb-6">
        <a
          href={C_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="ans-text-th-muted-fg hover:ans-text-White ans-text-5 ans-transition-colors ans-duration-200 hover:ans-scale-110 ans-inline-block"
        >
          <FaGithub />
        </a>
        <a
          href={C_LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="ans-text-th-muted-fg hover:ans-text-th-accent ans-text-5 ans-transition-colors ans-duration-200 hover:ans-scale-110 ans-inline-block"
        >
          <FaLinkedin />
        </a>
      </div>
      <p className="ans-text-th-muted-fg">
        Copyright &copy; {new Date().getFullYear()} Anshuman Singh.
      </p>
    </footer>
  );
}
