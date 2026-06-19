import { motion } from "framer-motion";
import { Message } from "./useChatStream";
import { FaUser, FaRobot } from "react-icons/fa";

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`ans-flex ans-gap-3 ${isUser ? "ans-flex-row-reverse" : "ans-flex-row"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {/* Avatar */}
      <div
        className={`ans-shrink-0 ans-w-8 ans-h-8 ans-rounded-full ans-flex ans-items-center ans-justify-center ans-text-1 ${
          isUser
            ? "ans-bg-th-accent ans-text-White"
            : "ans-bg-th-muted ans-text-th-fg"
        }`}
      >
        {isUser ? <FaUser /> : <FaRobot />}
      </div>

      {/* Message bubble */}
      <motion.div
        className={`ans-max-w-[75%] ans-rounded-2xl ans-px-4 ans-py-3 ans-shadow-sm ${
          isUser
            ? "ans-bg-th-accent ans-text-White"
            : "ans-bg-th-surface ans-text-th-fg ans-border ans-border-th-border"
        }`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.05 + 0.1, duration: 0.2 }}
      >
        <p className="ans-text-2 ans-leading-relaxed ans-whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Timestamp */}
        <p
          className={`ans-text-xs ans-mt-1 ${
            isUser ? "ans-text-White/70" : "ans-text-th-muted-fg"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ChatMessage;
