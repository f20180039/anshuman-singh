import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

const TypingIndicator = () => {
  return (
    <div className="ans-flex ans-gap-3">
      {/* Avatar */}
      <div className="ans-shrink-0 ans-w-8 ans-h-8 ans-rounded-full ans-bg-th-muted ans-text-th-fg ans-flex ans-items-center ans-justify-center ans-text-1">
        <FaRobot />
      </div>

      {/* Typing bubble */}
      <div className="ans-bg-th-surface ans-border ans-border-th-border ans-rounded-2xl ans-px-4 ans-py-3 ans-shadow-sm">
        <div className="ans-flex ans-gap-1 ans-items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="ans-w-2 ans-h-2 ans-rounded-full ans-bg-th-accent"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
