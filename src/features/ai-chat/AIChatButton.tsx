import { motion } from "framer-motion";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

interface AIChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

const AIChatButton = ({ onClick, unreadCount = 0 }: AIChatButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="ans-fixed ans-bottom-6 ans-right-6 ans-z-50 ans-w-16 ans-h-16 ans-bg-th-accent ans-text-White ans-rounded-full ans-shadow-xl hover:ans-shadow-2xl ans-flex ans-items-center ans-justify-center ans-cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      aria-label="Open AI Chat"
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

      {/* Icon */}
      <HiChatBubbleLeftRight className="ans-text-5 ans-relative ans-z-10" />

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
