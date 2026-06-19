import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput = ({
  onSend,
  disabled = false,
  placeholder = "Ask about Anshuman's experience...",
}: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ans-border-t ans-border-th-border ans-p-4 ans-bg-th-surface">
      <div className="ans-flex ans-gap-2 ans-items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="ans-flex-1 ans-resize-none ans-rounded-lg ans-border ans-border-th-border ans-bg-th-bg ans-text-th-fg ans-px-4 ans-py-2 ans-text-2 focus:ans-outline-none focus:ans-ring-2 focus:ans-ring-th-accent disabled:ans-opacity-50 disabled:ans-cursor-not-allowed"
          style={{ maxHeight: "120px" }}
        />

        <motion.button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="ans-shrink-0 ans-w-10 ans-h-10 ans-bg-th-accent ans-text-White ans-rounded-lg ans-flex ans-items-center ans-justify-center disabled:ans-opacity-50 disabled:ans-cursor-not-allowed"
          whileHover={!disabled && input.trim() ? { scale: 1.05 } : {}}
          whileTap={!disabled && input.trim() ? { scale: 0.95 } : {}}
        >
          <IoSend className="ans-text-3" />
        </motion.button>
      </div>

      <p className="ans-text-xs ans-text-th-muted-fg ans-mt-2">
        AI responses may not be 100% accurate. Press Enter to send, Shift+Enter for new line.
      </p>
    </div>
  );
};

export default ChatInput;
