import { FaLinkedin, FaGithub } from "react-icons/fa";
import Profile from "../assets/profile-pic-2-optimized.jpg";
import { Link } from "react-router-dom";
import {
  C_GITHUB_URL,
  C_HEALTHPLIX_URL,
  C_LINKEDIN_URL,
  EAPP_ROUTES,
} from "../common/constants";
import Resume from "../assets/AnshumanSingh-FE-Resume.pdf";
import { getYearsOfExperience } from "../common/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";

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
      <section className="ans-flex ans-flex-col ans-w-full sm:ans-flex-row ans-items-center ans-justify-center ans-text-center sm:ans-text-left ans-text-th-fg ans-min-h-[80vh] ans-relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="ans-flex ans-flex-col ans-items-center ans-w-full sm:ans-w-1/2 ans-gap-4 ans-px-6 sm:ans-px-20 ans-py-xxlarge"
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
            <motion.img
              src={Profile}
              alt="Anshuman Singh"
              className="ans-w-32 ans-h-32 sm:ans-w-48 sm:ans-h-48 ans-rounded-full ans-shadow-lg ans-object-cover ans-border-4 ans-border-th-accent/30"
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
          <motion.h1
            className="ans-text-5 ans-font-inter-1 ans-text-th-accent retro-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Anshuman Singh
          </motion.h1>
          <motion.p
            className="ans-text-4 ans-text-th-muted-fg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Frontend Engineer at{" "}
            <a
              href={C_HEALTHPLIX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ans-text-4 ans-text-th-accent hover:ans-underline"
            >
              HealthPlix Technologies
            </a>
            <span className="ans-animate-pixel-blink ans-text-th-accent ans-ml-1">
              _
            </span>
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="ans-flex ans-gap-6 ans-justify-center sm:ans-justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.a
              href={C_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="ans-text-th-accent ans-text-6 ans-inline-block"
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
              className="ans-text-th-fg ans-text-6 ans-inline-block"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Bio & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="ans-flex ans-flex-col ans-w-full sm:ans-w-1/2 ans-max-w-2xl ans-px-6 sm:ans-px-20 ans-gap-6"
        >
          <motion.p
            className="ans-text-3 ans-text-th-secondary-fg ans-leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
            <strong className="ans-text-th-fg">HealthPlix Technologies</strong>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="ans-flex ans-flex-col ans-w-full sm:ans-flex-row ans-gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="ans-flex ans-gap-4 ans-flex-1">
              <motion.div
                className="ans-flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to={EAPP_ROUTES.resumePreview}
                  className="ans-block ans-w-full ans-min-w-[120px] ans-bg-th-accent/80 hover:ans-bg-th-accent ans-text-White ans-px-4 ans-py-3 ans-rounded-lg ans-shadow-md ans-text-3 ans-text-center"
                >
                  Preview Resume
                </Link>
              </motion.div>
              <motion.a
                href={Resume}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="ans-flex-1 ans-min-w-[120px] ans-bg-th-accent hover:ans-bg-th-accent/90 ans-text-White ans-px-4 ans-py-3 ans-rounded-lg ans-shadow-md ans-text-3 ans-text-center"
              >
                Download Resume
              </motion.a>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to={EAPP_ROUTES.projects}
                className="ans-flex ans-items-center ans-justify-center ans-flex-1 ans-min-w-[160px] ans-bg-th-success ans-text-White ans-px-6 ans-py-3 ans-rounded-lg ans-shadow-md ans-text-3 ans-text-center ans-h-full"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>
    </BackgroundManager>
  );
};

export default Home;
