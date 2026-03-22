import { useCallback, useEffect, useRef, useState } from "react";

interface GuessEntry {
  value: number;
  result: "high" | "low" | "correct";
}

const GuessNumber = () => {
  const [max, setMax] = useState(50);
  const [target, setTarget] = useState<number | null>(null);
  const [guess, setGuess] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showTarget, setShowTarget] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [history, setHistory] = useState<GuessEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const getTarget = useCallback(() => {
    const newTarget = Math.floor(Math.random() * max) + 1;
    setTarget(newTarget);
    setMessage("");
    setGuess(null);
    setShowTarget(false);
    setGameOver(false);
    setHasWon(false);
    setScore(max);
    setHistory([]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [max]);

  const handleValidateGuess = () => {
    if (guess === null || target === null || gameOver) return;
    if (guess === target) {
      setMessage("You Win!");
      setShowTarget(true);
      setGameOver(true);
      setHasWon(true);
      setHistory((prev) => [...prev, { value: guess, result: "correct" }]);
    } else if (score <= 1) {
      setMessage(`You Lose! The number was ${target}`);
      setShowTarget(true);
      setGameOver(true);
      setHistory((prev) => [
        ...prev,
        { value: guess, result: guess > target ? "high" : "low" },
      ]);
    } else {
      const result = guess > target ? "high" : "low";
      setScore((prev) => prev - 1);
      setMessage(guess > target ? "Too High!" : "Too Low!");
      setHistory((prev) => [...prev, { value: guess, result }]);
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    }
    setGuess(null);
  };

  const handleGuessKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleValidateGuess();
    }
  };

  useEffect(() => {
    setScore(max);
  }, [max]);

  const healthPercent = target ? (score / max) * 100 : 100;
  const healthColor =
    healthPercent > 60
      ? "ans-bg-th-success"
      : healthPercent > 30
        ? "ans-bg-th-warning"
        : "ans-bg-th-error";

  return (
    <div className="ans-flex ans-flex-col ans-items-center ans-gap-6 ans-p-6 ans-font-mario ans-bg-th-bg ans-text-th-fg ans-min-h-screen ans-relative">
      {/* Top controls */}
      <div className="ans-flex ans-flex-col sm:ans-flex-row ans-justify-between ans-w-full ans-max-w-2xl ans-gap-4">
        <button
          onClick={getTarget}
          className="ans-bg-th-accent hover:ans-bg-th-accent-hover ans-text-White ans-px-6 ans-py-2 ans-rounded-lg ans-text-2 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
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
              setTarget(null);
              setGameOver(false);
              setHasWon(false);
              setMessage("");
              setHistory([]);
            }}
            className="ans-min-w-[50px] ans-w-auto ans-max-w-[120px] ans-rounded-lg ans-p-2 ans-bg-th-surface ans-outline-none ans-text-center ans-text-th-fg ans-border-2 ans-border-th-border focus:ans-ring-2 focus:ans-ring-th-accent"
          />
        </div>
      </div>

      <h2 className="ans-text-5 ans-font-inter-3 ans-text-th-accent retro-glow">
        Guess My Number!
      </h2>

      {/* Mystery number box */}
      <div
        className={`ans-w-fit ans-px-8 ans-py-5 ans-text-5 sm:ans-text-6 ans-bg-th-surface ans-text-center ans-font-inter-3 ans-rounded-xl ans-border-4 ans-cursor-pointer ans-transition-all ans-duration-300 ${
          hasWon
            ? "ans-border-th-success ans-text-th-success retro-glow ans-animate-scale-bounce"
            : gameOver
              ? "ans-border-th-error ans-text-th-error"
              : "ans-border-th-border ans-text-th-fg"
        }`}
        onClick={() => setShowTarget(true)}
      >
        {showTarget && target ? (
          target
        ) : (
          <span className={target ? "ans-animate-pixel-blink" : ""}>?</span>
        )}
      </div>

      {/* Health bar */}
      {target !== null && (
        <div className="ans-w-full ans-max-w-xs">
          <div className="ans-flex ans-justify-between ans-text-xs ans-text-th-muted-fg ans-mb-1">
            <span>Score</span>
            <span>{score}/{max}</span>
          </div>
          <div className="ans-w-full ans-h-3 ans-bg-th-muted ans-rounded-full ans-overflow-hidden">
            <div
              className={`ans-h-full ans-rounded-full ans-transition-all ans-duration-500 ${healthColor}`}
              style={{ width: `${healthPercent}%` }}
            />
          </div>
        </div>
      )}

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
              placeholder="Your guess"
              className={`ans-rounded-lg ans-text-center ans-p-2 ans-border-2 ans-bg-th-surface ans-text-th-fg ans-outline-none focus:ans-ring-2 focus:ans-ring-th-accent ans-transition-all ans-duration-200 ${
                shaking ? "ans-animate-dice-shake" : ""
              } ${
                hasWon
                  ? "ans-border-th-success"
                  : gameOver
                    ? "ans-border-th-error"
                    : "ans-border-th-border"
              }`}
            />
            <button
              disabled={gameOver}
              onClick={handleValidateGuess}
              className="ans-flex ans-w-full ans-text-center ans-justify-center ans-bg-th-success hover:ans-opacity-90 ans-text-White ans-px-6 ans-py-2 ans-rounded-lg ans-text-3 disabled:ans-opacity-50 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
            >
              Check
            </button>
          </div>

          <div className="ans-flex ans-flex-col ans-items-center ans-gap-2">
            <div
              className={`ans-text-3 ans-font-inter-1 ans-text-center ${
                hasWon
                  ? "ans-text-th-success retro-glow ans-animate-victory-pulse"
                  : message.includes("Lose")
                    ? "ans-text-th-error"
                    : "ans-text-th-warning"
              }`}
            >
              {message}
            </div>
          </div>
        </div>
      )}

      {/* Guess history */}
      {history.length > 0 && (
        <div className="ans-w-full ans-max-w-xs">
          <p className="ans-text-xs ans-text-th-muted-fg ans-mb-2 ans-uppercase">
            Guess History
          </p>
          <div className="ans-max-h-40 ans-overflow-y-auto ans-space-y-1 ans-pr-1">
            {history.map((entry, i) => (
              <div
                key={i}
                className={`ans-flex ans-justify-between ans-px-3 ans-py-1 ans-rounded ans-text-xs ${
                  entry.result === "correct"
                    ? "ans-bg-th-success/10 ans-text-th-success"
                    : entry.result === "high"
                      ? "ans-bg-th-error/10 ans-text-th-error"
                      : "ans-bg-th-accent/10 ans-text-th-accent"
                }`}
              >
                <span>#{i + 1}: {entry.value}</span>
                <span>
                  {entry.result === "correct"
                    ? "✓"
                    : entry.result === "high"
                      ? "↑ High"
                      : "↓ Low"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Over overlay */}
      {gameOver && !hasWon && (
        <div className="ans-fixed ans-inset-0 ans-bg-th-bg/90 ans-flex ans-flex-col ans-items-center ans-justify-center ans-z-50 ans-animate-fade-in">
          <h2 className="ans-text-5 sm:ans-text-6 ans-font-inter-3 ans-text-th-error ans-mb-4 retro-glow">
            GAME OVER
          </h2>
          <p className="ans-text-3 ans-text-th-muted-fg ans-mb-2">
            The number was <span className="ans-text-th-fg ans-font-inter-3">{target}</span>
          </p>
          <button
            onClick={getTarget}
            className="ans-mt-4 ans-bg-th-accent hover:ans-bg-th-accent-hover ans-text-White ans-px-8 ans-py-3 ans-rounded-lg ans-text-2 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GuessNumber;
