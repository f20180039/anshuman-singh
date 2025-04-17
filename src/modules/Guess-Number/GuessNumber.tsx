import { useCallback, useEffect, useRef, useState } from "react";

const GuessNumber = () => {
  const [max, setMax] = useState(50);
  const [target, setTarget] = useState<number | null>(null);
  const [guess, setGuess] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showTarget, setShowTarget] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate a new random target number
  const getTarget = useCallback(() => {
    const newTarget = Math.floor(Math.random() * max) + 1; // Ensures 1 to max
    setTarget(newTarget);
    setMessage("");
    setGuess(null);
    setShowTarget(false);
    setGameOver(false);
  }, [max]);

  const handleValidateGuess = () => {
    if (guess === null || target === null) return;
    if (guess === target) {
      setMessage("🎉 You Win!");
      setShowTarget(true);
      setGameOver(true);
    } else if (score <= 1) {
      setMessage(`❌ You Lose! The number was ${target}`);
      setShowTarget(true);
      setGameOver(true);
    } else {
      setScore((prev) => prev - 1);
      setMessage(guess > target ? "📈 Too High!" : "📉 Too Low!");
    }
  };

  const handleGuessKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidateGuess();
    }
  };

  useEffect(() => {
    setScore(max);
  }, [max]);
  return (
    <div className="ans-flex ans-flex-col ans-items-center ans-gap-6 ans-p-6 ans-font-mario ans-bg-White dark:ans-bg-Gray-900 ans-text-Gray-900 dark:ans-text-White">
      <div className="ans-flex ans-flex-col sm:ans-flex-row ans-justify-between ans-w-full ans-gap-4">
        <button
          onClick={getTarget}
          className="ans-bg-Blue-500 dark:ans-bg-Blue-400 hover:ans-bg-Blue-700 dark:hover:ans-bg-Blue-800 ans-text-White ans-px-6 ans-py-2 ans-rounded-lg ans-text-2"
        >
          🎯 Play!
        </button>
        <div className="ans-flex ans-items-center ans-justify-center ans-gap-3 ans-text-4">
          <span>between 1 and</span>
          <input
            type="number"
            value={max}
            min={1}
            onChange={(e) => {
              const newMax = Math.max(1, +e.target.value);
              setMax(newMax);
              setScore(newMax);
              getTarget();
            }}
            className="ans-min-w-[50px] ans-w-auto ans-max-w-[120px] ans-rounded-md ans-p-2 ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-outline-none ans-text-center ans-text-Gray-900 dark:ans-text-White"
          />
        </div>
      </div>
      <h2 className="ans-text-6 ans-font-inter-3 ans-text-Blue-600 dark:ans-text-Blue-300">
        🎯 Guess My Number!
      </h2>
      <div
        className="ans-w-fit ans-px-6 ans-py-4 ans-text-6 ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-center ans-font-inter-3 ans-rounded-xl ans-border-4 ans-border-Gray-700 dark:ans-border-Gray-600 ans-cursor-pointer"
        onClick={() => setShowTarget(true)}
      >
        {showTarget && target ? target : "?"}
      </div>

      {target !== null && (
        <div className="ans-flex ans-flex-col sm:ans-flex-row ans-gap-6 ans-items-center">
          <div className="ans-flex ans-flex-col ans-gap-4 ans-items-center">
            <input
              ref={inputRef}
              type="number"
              disabled={gameOver}
              value={guess ?? ""}
              onChange={(e) => setGuess(+e.target.value || null)}
              onKeyDown={handleGuessKey}
              placeholder="Enter your guess"
              className=" ans-rounded-md ans-text-center ans-p-2 ans-border-2 ans-border-Gray-700 dark:ans-border-Gray-500 ans-bg-Gray-200 dark:ans-bg-Gray-800 ans-text-Gray-900 dark:ans-text-White ans-outline-none"
            />
            <button
              disabled={gameOver}
              onClick={handleValidateGuess}
              className="ans-flex ans-w-full ans-text-center ans-justify-center ans-bg-Success-500 dark:ans-bg-Success-400 hover:ans-bg-Success-600 dark:hover:ans-bg-Success-300 ans-text-White ans-px-6 ans-py-2 ans-rounded-lg ans-text-3 disabled:ans-opacity-50"
            >
              Check
            </button>
          </div>

          <div className="ans-flex ans-flex-col ans-items-center ans-gap-2">
            <div
              className={`ans-text-3 ans-font-inter-1 ans-text-center ${
                message.includes("Win")
                  ? "ans-text-Success-600"
                  : message.includes("Lose")
                    ? "ans-text-Error-500"
                    : "ans-text-Warning-300"
              }`}
            >
              {message}
            </div>
            <div className="ans-text-5 ans-font-inter-3 ans-text-Gray-900 dark:ans-text-White">
              Score: {score}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessNumber;
