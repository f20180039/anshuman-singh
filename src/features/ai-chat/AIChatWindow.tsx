import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useChatStream } from "./useChatStream";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatWindow = ({ isOpen, onClose }: AIChatWindowProps) => {
  const { messages, isLoading, sendMessage } = useChatStream();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleQuestionSelect = (question: string) => {
    sendMessage(question);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Chat Window - Floating panel without blocking backdrop */}
          <motion.div
            className="ans-fixed ans-bottom-4 ans-right-4 ans-w-[400px] ans-h-[600px] ans-bg-th-bg ans-rounded-2xl ans-shadow-2xl ans-z-50 ans-flex ans-flex-col ans-overflow-hidden ans-border-2 ans-border-th-accent/30 sm:ans-bottom-6 sm:ans-right-6"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="ans-bg-th-accent ans-text-White ans-p-4 ans-flex ans-items-center ans-justify-between ans-shrink-0">
              <div>
                <h3 className="ans-font-inter-1 ans-text-3">Ask About Anshuman</h3>
                <p className="ans-text-xs ans-opacity-90">
                  AI-powered assistant
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="ans-w-8 ans-h-8 ans-rounded-full ans-bg-White/20 hover:ans-bg-White/30 ans-flex ans-items-center ans-justify-center ans-transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close chat"
              >
                <IoClose className="ans-text-4" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="ans-flex-1 ans-overflow-y-auto ans-p-4 ans-space-y-4 ans-bg-th-muted/30">
              {messages.length === 0 ? (
                <div className="ans-flex ans-flex-col ans-items-center ans-justify-center ans-h-full ans-text-center ans-px-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="ans-w-16 ans-h-16 ans-bg-th-accent/10 ans-rounded-full ans-flex ans-items-center ans-justify-center ans-mb-4">
                      <span className="ans-text-7">👋</span>
                    </div>
                  </motion.div>
                  <motion.h4
                    className="ans-text-3 ans-font-inter-1 ans-text-th-fg ans-mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Hi! I'm Anshuman's AI Assistant
                  </motion.h4>
                  <motion.p
                    className="ans-text-2 ans-text-th-muted-fg ans-mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Ask me anything about his experience, skills, projects, or career!
                  </motion.p>
                  <SuggestedQuestions
                    onSelect={handleQuestionSelect}
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} index={index} />
                  ))}
                  {isLoading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </motion.div>

          {/* Mobile version (fullscreen on small screens).
              Uses 100dvh so the panel tracks the dynamic viewport as mobile
              browser chrome (URL bar / bottom nav) shows and hides, and pads the
              header + input with the safe-area insets so the close button and
              input never sit under the browser UI. */}
          <style>{`
            @media (max-width: 640px) {
              .ans-fixed.ans-w-\\[400px\\] {
                width: 100vw !important;
                width: 100dvw !important;
                height: 100vh !important;
                height: 100dvh !important;
                top: 0 !important;
                bottom: 0 !important;
                right: 0 !important;
                left: 0 !important;
                border-radius: 0 !important;
                border: none !important;
                padding-top: env(safe-area-inset-top, 0px) !important;
                padding-bottom: env(safe-area-inset-bottom, 0px) !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIChatWindow;
