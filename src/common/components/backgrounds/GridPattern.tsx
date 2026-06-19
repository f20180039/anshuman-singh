import { motion, useScroll, useTransform } from "framer-motion";
import { memo } from "react";

/**
 * Animated SVG grid background with parallax effect
 * Creates a blueprint-style technical aesthetic
 */
const GridPattern = memo(() => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="ans-absolute ans-inset-0 -ans-z-10 ans-pointer-events-none ans-overflow-hidden">
      {/* Main grid pattern */}
      <motion.svg
        className="ans-absolute ans-inset-0 ans-w-full ans-h-full"
        style={{ y }}
        aria-hidden="true"
      >
        <defs>
          {/* Small grid pattern */}
          <pattern
            id="small-grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="rgb(var(--th-border))"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          {/* Large grid pattern with accent */}
          <pattern
            id="large-grid"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 120 0 L 0 0 0 120"
              fill="none"
              stroke="rgb(var(--th-accent))"
              strokeWidth="1.5"
              opacity="0.15"
            />
          </pattern>
          {/* Dots pattern */}
          <pattern
            id="dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="1"
              fill="rgb(var(--th-accent))"
              opacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#small-grid)" />
        <rect width="100%" height="100%" fill="url(#large-grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </motion.svg>

      {/* Floating circles for depth */}
      <motion.div
        className="ans-absolute ans-top-10 ans-left-10 ans-w-96 ans-h-96 ans-rounded-full ans-bg-th-accent/10"
        style={{ filter: "blur(80px)" }}
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="ans-absolute ans-bottom-10 ans-right-10 ans-w-[500px] ans-h-[500px] ans-rounded-full ans-bg-th-accent/10"
        style={{ filter: "blur(80px)" }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="ans-absolute ans-top-1/2 ans-left-1/2 ans-w-64 ans-h-64 ans-rounded-full ans-bg-th-accent/5"
        style={{ filter: "blur(60px)", x: "-50%", y: "-50%" }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

GridPattern.displayName = "GridPattern";

export default GridPattern;
