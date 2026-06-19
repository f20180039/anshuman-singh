import { motion } from "framer-motion";
import { SUGGESTED_QUESTIONS } from "../../ai/faq-knowledge-base";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const SuggestedQuestions = ({ onSelect, disabled = false }: SuggestedQuestionsProps) => {
  return (
    <div className="ans-space-y-2">
      <p className="ans-text-xs ans-text-th-muted-fg ans-text-center">
        Suggested questions:
      </p>
      <div className="ans-flex ans-flex-wrap ans-gap-2 ans-justify-center">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <motion.button
            key={index}
            onClick={() => !disabled && onSelect(question)}
            disabled={disabled}
            className="ans-text-xs ans-bg-th-surface-alt ans-text-th-fg ans-px-3 ans-py-2 ans-rounded-full ans-border ans-border-th-border hover:ans-bg-th-accent hover:ans-text-White ans-transition-colors disabled:ans-opacity-50 disabled:ans-cursor-not-allowed"
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
