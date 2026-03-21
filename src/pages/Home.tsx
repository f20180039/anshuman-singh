import { FaLinkedin, FaGithub } from "react-icons/fa";
import Profile from "../assets/profile-pic-2.png";
import { Link } from "react-router-dom";
import {
  C_GITHUB_URL,
  C_HEALTHPLIX_URL,
  C_LINKEDIN_URL,
  EAPP_ROUTES,
} from "../common/constants";
import Resume from "../assets/AnshumanSingh-FE-Resume.pdf";
import { useInView, getYearsOfExperience } from "../common/utils";

const Home = () => {
  const { ref: leftRef, isInView: leftVisible } = useInView();
  const { ref: rightRef, isInView: rightVisible } = useInView();

  return (
    <section className="ans-flex ans-flex-col ans-w-full sm:ans-flex-row ans-items-center ans-justify-center ans-text-center sm:ans-text-left ans-bg-th-bg ans-text-th-fg ans-min-h-[80vh]">
      <div
        ref={leftRef}
        className={`ans-flex ans-flex-col ans-items-center ans-w-full sm:ans-w-1/2 ans-gap-4 ans-px-6 sm:ans-px-20 ans-py-xxlarge ans-opacity-0 ${
          leftVisible ? "ans-animate-fade-in-up" : ""
        }`}
      >
        <div className="ans-relative ans-group">
          <img
            src={Profile}
            alt="Anshuman Singh"
            className="ans-w-48 ans-h-48 ans-rounded-full ans-shadow-lg ans-object-cover ans-border-4 ans-border-th-accent/30 hover:ans-scale-105 ans-transition-transform ans-duration-300"
          />
          <div className="ans-absolute ans-inset-0 ans-rounded-full ans-border-4 ans-border-th-accent/20 ans-animate-pulse" />
        </div>
        <h1 className="ans-text-5 ans-font-inter-1 ans-text-th-accent retro-glow">
          Anshuman Singh
        </h1>
        <p className="ans-text-4 ans-text-th-muted-fg">
          Frontend Engineer at{" "}
          <a
            href={C_HEALTHPLIX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ans-text-4 ans-text-th-accent hover:ans-underline"
          >
            HealthPlix Technologies
          </a>
          <span className="ans-animate-pixel-blink ans-text-th-accent ans-ml-1">_</span>
        </p>

        {/* Social Links */}
        <div className="ans-flex ans-gap-6 ans-justify-center sm:ans-justify-start">
          <a
            href={C_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
            className="ans-text-th-accent ans-text-6 hover:ans-text-th-accent-hover hover:ans-scale-110 ans-transition-transform ans-duration-200 ans-inline-block"
          >
            <FaLinkedin />
          </a>
          <a
            href={C_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="ans-text-th-fg ans-text-6 hover:ans-text-th-accent hover:ans-scale-110 ans-transition-transform ans-duration-200 ans-inline-block"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Right: Bio & Actions */}
      <div
        ref={rightRef}
        className={`ans-flex ans-flex-col ans-w-full sm:ans-w-1/2 ans-max-w-2xl ans-px-6 sm:ans-px-20 ans-gap-6 ans-opacity-0 ${
          rightVisible ? "ans-animate-fade-in-up stagger-2" : ""
        }`}
      >
        <p className="ans-text-3 ans-text-th-secondary-fg ans-leading-relaxed">
          <strong className="ans-text-th-accent">
            {getYearsOfExperience()}+ years
          </strong>{" "}
          of frontend engineering experience building{" "}
          <strong className="ans-text-th-fg">
            scalable, high-performance applications
          </strong>{" "}
          with React, TypeScript, and modern web technologies. Specialized in
          AI-powered tools, performance optimization, and crafting seamless
          healthcare UX at{" "}
          <strong className="ans-text-th-fg">
            HealthPlix Technologies
          </strong>
          .
        </p>

        {/* Buttons */}
        <div className="ans-flex ans-flex-col ans-w-full sm:ans-flex-row ans-gap-6">
          <a
            href={Resume}
            download
            className="ans-flex-1 ans-min-w-[160px] ans-bg-th-accent ans-text-White ans-px-6 ans-py-3 ans-rounded-lg ans-shadow-md hover:ans-bg-th-accent-hover ans-text-3 ans-text-center hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
          >
            Download Resume
          </a>
          <Link
            to={EAPP_ROUTES.projects}
            className="ans-flex-1 ans-min-w-[160px] ans-bg-th-success ans-text-White ans-px-6 ans-py-3 ans-rounded-lg ans-shadow-md hover:ans-opacity-90 ans-text-3 ans-text-center hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
