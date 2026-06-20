import { motion } from "framer-motion";
import { memo } from "react";

/**
 * Decorative curves and dots for visual interest
 */
const DecorativeElements = memo(() => {
  return (
    <div className="ans-absolute ans-inset-0 ans-z-0 ans-pointer-events-none ans-overflow-hidden">
      {/* Curved lines */}
      <svg
        className="ans-absolute ans-inset-0 ans-w-full ans-h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="ans-text-th-accent" stopOpacity="0.1" />
            <stop offset="100%" className="ans-text-th-accent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top right curve */}
        <motion.path
          d="M 100 -50 Q 50 25, 100 100"
          stroke="url(#curve-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Bottom left curve */}
        <motion.path
          d="M -50 100 Q 25 50, 100 100"
          stroke="url(#curve-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating dots */}
      <motion.div
        className="ans-absolute ans-top-20 ans-left-1/4 ans-w-2 ans-h-2 ans-rounded-full ans-bg-th-accent/20"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="ans-absolute ans-top-40 ans-right-1/3 ans-w-3 ans-h-3 ans-rounded-full ans-bg-th-accent/15"
        animate={{
          y: [0, 30, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="ans-absolute ans-bottom-32 ans-left-1/3 ans-w-2 ans-h-2 ans-rounded-full ans-bg-th-accent/20"
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Diagonal lines */}
      <div className="ans-absolute ans-top-0 ans-left-0 ans-w-full ans-h-full">
        <motion.div
          className="ans-absolute ans-top-1/4 ans-left-0 ans-w-32 ans-h-[1px] ans-bg-gradient-to-r ans-from-transparent ans-via-th-accent/20 ans-to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="ans-absolute ans-bottom-1/3 ans-right-0 ans-w-24 ans-h-[1px] ans-bg-gradient-to-r ans-from-transparent ans-via-th-accent/15 ans-to-transparent"
          animate={{
            x: ['100%', '-200%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>
    </div>
  );
});

DecorativeElements.displayName = "DecorativeElements";

export default DecorativeElements;
