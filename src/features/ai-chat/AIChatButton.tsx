import { motion } from "framer-motion";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { useState, useEffect } from "react";

interface AIChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
  isOpen?: boolean;
}

const AIChatButton = ({ onClick, unreadCount = 0, isOpen = false }: AIChatButtonProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  // Update constraints on mount and resize
  useEffect(() => {
    const updateConstraints = () => {
      const buttonSize = 56; // 14 * 4 (tailwind w-14 h-14)
      const padding = 16; // minimum padding from edges

      setConstraints({
        top: -(window.innerHeight - buttonSize - padding),
        left: -(window.innerWidth - buttonSize - padding),
        right: padding,
        bottom: padding,
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  // Hide button when chat is open
  if (isOpen) return null;

  return (
    <motion.button
      onClick={() => {
        // Only trigger onClick if not dragging
        if (!isDragging) {
          onClick();
        }
      }}
      drag
      dragConstraints={constraints}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        // Delay to prevent click from firing after drag
        setTimeout(() => setIsDragging(false), 100);
      }}
      className="ans-fixed ans-bottom-6 ans-right-4 sm:ans-right-6 ans-z-[45] ans-w-14 ans-h-14 ans-bg-th-accent ans-text-White ans-rounded-full ans-shadow-xl hover:ans-shadow-2xl ans-flex ans-items-center ans-justify-center ans-cursor-grab active:ans-cursor-grabbing ans-touch-none"
      whileHover={{ scale: isDragging ? 1 : 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      aria-label="Open AI Chat (Draggable)"
    >
      {/* Pulse animation */}
      <motion.div
        className="ans-absolute ans-inset-0 ans-rounded-full ans-bg-th-accent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon - increased from text-5 to text-6 for better visibility */}
      <HiChatBubbleLeftRight className="ans-text-6 ans-relative ans-z-10" />

      {/* Unread badge */}
      {unreadCount > 0 && (
        <motion.div
          className="ans-absolute -ans-top-1 -ans-right-1 ans-w-6 ans-h-6 ans-bg-th-error ans-text-White ans-rounded-full ans-flex ans-items-center ans-justify-center ans-text-xs ans-font-inter-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {unreadCount}
        </motion.div>
      )}
    </motion.button>
  );
};

export default AIChatButton;
