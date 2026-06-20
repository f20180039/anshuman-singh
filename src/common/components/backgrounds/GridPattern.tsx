import { motion, useScroll, useTransform } from "framer-motion";
import { memo } from "react";

const GridPattern = memo(() => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 90]);

  return (
    <div className="ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none ans-overflow-hidden">
      <div className="cyber-grid ans-absolute ans-inset-0" aria-hidden="true" />
      <div className="scanline-field ans-absolute ans-inset-0" aria-hidden="true" />

      <motion.svg
        className="ans-absolute ans-inset-0 ans-h-full ans-w-full ans-opacity-100"
        style={{ y }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="small-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgb(var(--th-accent))"
              strokeWidth="0.5"
              opacity="0.18"
            />
          </pattern>
          <pattern
            id="large-grid"
            width="128"
            height="128"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 128 0 L 0 0 0 128"
              fill="none"
              stroke="rgb(var(--th-accent))"
              strokeWidth="1"
              opacity="0.22"
            />
          </pattern>
          <pattern
            id="dots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="12"
              cy="12"
              r="1.1"
              fill="rgb(var(--th-accent))"
              opacity="0.18"
            />
          </pattern>
          <linearGradient id="circuit-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--th-accent))" stopOpacity="0" />
            <stop offset="28%" stopColor="rgb(var(--th-accent))" stopOpacity="0.32" />
            <stop offset="64%" stopColor="rgb(var(--th-fg))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgb(var(--th-accent))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#small-grid)" />
        <rect width="100%" height="100%" fill="url(#large-grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
        <g fill="none" stroke="url(#circuit-fade)" strokeWidth="1.25" opacity="0.48">
          <path d="M 24 180 H 148 L 196 228 H 342" />
          <path d="M 0 520 H 84 L 132 568 V 700" />
          <path d="M 58 318 H 250 L 286 282 H 420" />
          <path d="M 72 768 H 230 L 282 716 H 470" />
          <path d="M 820 156 H 940 L 976 192 H 1120" />
          <path d="M 760 618 H 940 L 990 668 H 1240" />
        </g>
      </motion.svg>

      <motion.div
        className="energy-ribbon ans-absolute ans-left-[-12%] ans-top-[8%] ans-h-[52rem] ans-w-[52rem]"
        animate={{
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="energy-ribbon energy-ribbon-secondary ans-absolute ans-bottom-[-20%] ans-right-[-10%] ans-h-[44rem] ans-w-[44rem]"
        animate={{
          rotate: [0, -12, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

GridPattern.displayName = "GridPattern";

export default GridPattern;
