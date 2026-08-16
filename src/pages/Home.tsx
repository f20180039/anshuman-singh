import { FaLinkedin, FaGithub, FaArrowRight, FaDownload } from "react-icons/fa";
import Profile from "../assets/profile-pic-2-optimized.webp";
import { Link } from "react-router-dom";
import {
  C_GITHUB_URL,
  C_HEALTHPLIX_URL,
  C_LINKEDIN_URL,
  C_LOCATION_LINE,
  C_RESUME_MULTI_COL_URL,
  EAPP_ROUTES,
  resumeDownloadName,
} from "../common/constants";
import { getYearsOfExperience } from "../common/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";
import { trackEvent } from "../common/analytics/analytics";

const HIGHLIGHTS = [
  { value: `${getYearsOfExperience()}+`, label: "Years shipping frontend" },
  { value: "React", label: "Primary stack" },
  { value: "Healthtech", label: "Domain" },
];

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      {/*
        Mobile-first single column, splitting into two only at lg. The previous
        sm:flex-row split at 640px, which squeezed both columns on tablets, and
        pushed the call to action below the fold on a phone. Everything down to
        the buttons now fits in a 640px-tall viewport.
      */}
      <section className="ans-mx-auto ans-flex ans-w-full ans-max-w-6xl ans-flex-col ans-items-center ans-gap-5 ans-px-4 ans-py-4 ans-text-center ans-text-th-fg sm:ans-gap-8 sm:ans-px-6 sm:ans-py-10 lg:ans-flex-row lg:ans-items-center lg:ans-gap-14 lg:ans-py-16 lg:ans-text-left">
        {/* Identity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="ans-flex ans-w-full ans-flex-col ans-items-center ans-gap-2 sm:ans-gap-3 lg:ans-w-2/5 lg:ans-shrink-0"
        >
          <motion.div
            className="ans-relative ans-group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              mouseX.set(0);
              mouseY.set(0);
            }}
            style={{
              rotateX: isHovered ? rotateX : 0,
              rotateY: isHovered ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Sized with arbitrary values, not h-20/w-20: tailwind.config.js
                overrides spacing.20 to 1.25rem, so the numeric scale lies. */}
            <motion.img
              src={Profile}
              alt="Portrait of Anshuman Singh, frontend engineer"
              width={192}
              height={192}
              // The largest element above the fold: load it eagerly and give it
              // fetch priority so it is not queued behind the JS bundle.
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="ans-h-[5rem] ans-w-[5rem] ans-rounded-full ans-border-4 ans-border-th-accent/30 ans-object-cover ans-shadow-lg sm:ans-h-32 sm:ans-w-32 lg:ans-h-44 lg:ans-w-44"
              style={{ willChange: "transform" }}
            />
            <motion.div
              className="ans-absolute ans-inset-0 ans-rounded-full ans-border-4 ans-border-th-accent/40"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <h1 className="ans-text-5 ans-font-inter-3 ans-text-th-accent retro-glow sm:ans-text-6 lg:ans-text-7">
            Anshuman Singh
          </h1>

          <p className="ans-text-2 ans-text-th-muted-fg sm:ans-text-3 lg:ans-text-4">
            Frontend Engineer at{" "}
            <a
              href={C_HEALTHPLIX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ans-text-th-accent hover:ans-underline"
            >
              HealthPlix
            </a>
          </p>

          <p className="ans-text-0 ans-text-th-muted-fg sm:ans-text-1">
            {C_LOCATION_LINE}
          </p>

          <div className="ans-flex ans-gap-6">
            <motion.a
              href={C_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="ans-inline-block ans-text-5 ans-text-th-accent"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href={C_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="ans-inline-block ans-text-5 ans-text-th-fg"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
          </div>
        </motion.div>

        {/* Pitch and actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          className="ans-flex ans-w-full ans-flex-col ans-items-center ans-gap-4 sm:ans-gap-5 lg:ans-items-start"
        >
          <span className="ans-inline-flex ans-items-center ans-gap-2 ans-rounded-full ans-border ans-border-th-success/40 ans-bg-th-success/10 ans-px-3 ans-py-1 ans-text-0 ans-text-th-success sm:ans-py-1.5 sm:ans-text-1">
            <span className="ans-h-2 ans-w-2 ans-animate-pulse ans-rounded-full ans-bg-th-success" />
            Open to software engineering roles
          </span>

          {/*
            Kept short on purpose. Every extra line here pushes the call to
            action towards the fold on a phone, and the full story is one tap
            away on /about.
          */}
          <p className="ans-max-w-xl ans-text-2 ans-leading-relaxed ans-text-th-secondary-fg sm:ans-text-3 lg:ans-text-4">
            <strong className="ans-text-th-accent">
              {getYearsOfExperience()}+ years
            </strong>{" "}
            building{" "}
            <strong className="ans-text-th-fg">
              scalable, high-performance applications
            </strong>{" "}
            with React and TypeScript — AI clinical documentation, billing, and
            the performance work that keeps them fast.
          </p>

          {/*
            Primary action pair. Kept directly under the pitch, before any
            secondary detail, so it is reachable without scrolling on a phone.
          */}
          <div className="ans-flex ans-w-full ans-flex-col ans-gap-3 sm:ans-w-auto sm:ans-flex-row">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to={EAPP_ROUTES.projects}
                onClick={() => trackEvent("hero_cta_click", { action: "projects" })}
                className="ans-flex ans-min-h-[48px] ans-w-full ans-items-center ans-justify-center ans-gap-2 ans-rounded-lg ans-bg-th-accent ans-px-6 ans-py-3 ans-text-3 ans-font-inter-2 ans-text-White ans-shadow-md hover:ans-bg-th-accent-hover sm:ans-w-auto"
              >
                View my work
                <FaArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to={EAPP_ROUTES.contact}
                onClick={() => trackEvent("hero_cta_click", { action: "contact" })}
                className="ans-flex ans-min-h-[48px] ans-w-full ans-items-center ans-justify-center ans-rounded-lg ans-border ans-border-th-accent/45 ans-px-6 ans-py-3 ans-text-3 ans-font-inter-1 ans-text-th-accent hover:ans-bg-th-accent/10 sm:ans-w-auto"
              >
                Get in touch
              </Link>
            </motion.div>
          </div>

          {/* Resume actions: still one tap away, but not competing for the eye. */}
          <div className="ans-flex ans-flex-wrap ans-items-center ans-justify-center ans-gap-x-5 ans-gap-y-2 lg:ans-justify-start">
            <Link
              to={EAPP_ROUTES.resumePreview}
              onClick={() => trackEvent("hero_cta_click", { action: "resume_preview" })}
              className="ans-text-2 ans-text-th-secondary-fg ans-underline-offset-4 hover:ans-text-th-accent hover:ans-underline"
            >
              Preview resume
            </Link>
            <a
              href={C_RESUME_MULTI_COL_URL}
              download={resumeDownloadName("multi")}
              onClick={() => trackEvent("hero_cta_click", { action: "resume_download" })}
              className="ans-flex ans-items-center ans-gap-2 ans-text-2 ans-text-th-secondary-fg ans-underline-offset-4 hover:ans-text-th-accent hover:ans-underline"
            >
              <FaDownload aria-hidden="true" />
              Download PDF
            </a>
          </div>

          <dl className="ans-mt-2 ans-grid ans-w-full ans-grid-cols-3 ans-gap-2 sm:ans-gap-4">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="ans-rounded-lg ans-bg-th-surface-alt ans-px-2 ans-py-3 ans-text-center sm:ans-px-4"
              >
                <dt className="ans-sr-only">{item.label}</dt>
                <dd>
                  <span className="ans-block ans-text-3 ans-font-inter-3 ans-text-th-accent sm:ans-text-4">
                    {item.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ans-mt-0.5 ans-block ans-text-0 ans-text-th-muted-fg"
                  >
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </section>
    </BackgroundManager>
  );
};

export default Home;
