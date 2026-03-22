import React, { useState } from "react";
import PlayerCard, { Player } from "./PlayerCard";

const DiceFace = ({ value, shaking }: { value: number; shaking: boolean }) => {
  const dotPositions: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [[0, 2], [2, 0]],
    3: [[0, 2], [1, 1], [2, 0]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
  };

  const dots = dotPositions[value] || [];

  return (
    <div
      className={`ans-w-20 ans-h-20 ans-bg-White ans-rounded-xl ans-shadow-md ans-p-2 ans-inline-grid ans-grid-cols-3 ans-grid-rows-3 ans-gap-1 ${
        shaking ? "ans-animate-dice-shake" : ""
      }`}
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const hasDot = dots.some(([r, c]) => r === row && c === col);
        return (
          <div key={i} className="ans-flex ans-items-center ans-justify-center">
            {hasDot && (
              <div className="ans-w-4 ans-h-4 ans-bg-Gray-900 ans-rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const PigGame: React.FC = () => {
  const [step, setStep] = useState<"setup" | "playing">("setup");
  const [numPlayers, setNumPlayers] = useState(2);
  const [names, setNames] = useState<string[]>(["", ""]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [bannedNumber, setBannedNumber] = useState(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [diceRoll, setDiceRoll] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [diceShaking, setDiceShaking] = useState(false);
  const [bannedShaking, setBannedShaking] = useState(false);
  const target = 50;

  const startGame = () => {
    const initialPlayers: Player[] = names.map((n, index) => ({
      name: n || "Player " + (index + 1),
      frozenScore: 0,
      tempScore: 0,
    }));
    setPlayers(initialPlayers);
    setStep("playing");
    setActivePlayerIndex(0);
    setWinner(null);
    setBannedNumber(1);
  };

  const switchPlayer = () => {
    setActivePlayerIndex((prev) => (prev + 1) % numPlayers);
  };

  const handleDiceRoll = () => {
    if (winner) return;
    const dice = Math.ceil(Math.random() * 6);
    setDiceRoll(dice);
    setDiceShaking(true);
    setTimeout(() => setDiceShaking(false), 400);

    setPlayers((prev) =>
      prev.map((player, idx) => {
        if (idx !== activePlayerIndex) return player;
        const temp = dice === bannedNumber ? 0 : player.tempScore + dice;
        return { ...player, tempScore: temp };
      })
    );

    if (dice === bannedNumber) {
      setTimeout(() => switchPlayer(), 400);
    }
  };

  const bankPlayerScore = () => {
    if (winner) return;
    const active = players[activePlayerIndex];
    const newFrozen = active.frozenScore + active.tempScore;

    setPlayers((prev) =>
      prev.map((player, idx) => {
        if (idx !== activePlayerIndex) return player;
        return { ...player, frozenScore: newFrozen, tempScore: 0 };
      })
    );

    if (newFrozen >= target) {
      setWinner(active.name);
      return;
    }
    switchPlayer();
  };

  const resetBannedNumber = () => {
    setBannedNumber(Math.ceil(Math.random() * 6));
    setBannedShaking(true);
    setTimeout(() => setBannedShaking(false), 400);
  };

  const resetGame = () => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, frozenScore: 0, tempScore: 0 }))
    );
    setActivePlayerIndex(0);
    setWinner(null);
    setDiceRoll(1);
    setBannedNumber(1);
  };

  if (step === "setup") {
    return (
      <div className="ans-flex ans-flex-col ans-items-center ans-justify-center ans-p-8 ans-bg-th-surface-alt ans-min-h-screen">
        <div className="ans-bg-th-bg ans-rounded-xl ans-shadow-lg ans-p-4 sm:ans-p-8 ans-max-w-md ans-w-full ans-space-y-6">
          <h1 className="ans-text-2 ans-font-inter-3 ans-text-th-accent ans-text-center retro-glow">
            Pig Dice Game
          </h1>
          <p className="ans-text-th-muted-fg ans-text-center ans-text-xs">
            Roll dice, avoid the banned number, reach {target} to win!
          </p>
          <label className="ans-flex ans-items-center ans-justify-center ans-space-x-3">
            <span className="ans-text-th-secondary-fg">Players:</span>
            <select
              value={numPlayers}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setNumPlayers(n);
                setNames(Array(n).fill(""));
              }}
              className="ans-border ans-border-th-border ans-rounded-lg ans-p-2 ans-bg-th-surface ans-text-th-fg focus:ans-ring-2 focus:ans-ring-th-accent ans-outline-none"
            >
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <div className="ans-grid ans-grid-cols-1 sm:ans-grid-cols-2 ans-gap-3">
            {names.map((name, idx) => (
              <input
                key={idx}
                value={name}
                onChange={(e) => {
                  const updated = [...names];
                  updated[idx] = e.target.value;
                  setNames(updated);
                }}
                placeholder={`Player ${idx + 1}`}
                className="ans-w-full ans-border ans-border-th-border ans-rounded-lg ans-p-2 ans-bg-th-surface ans-text-th-fg ans-outline-none focus:ans-ring-2 focus:ans-ring-th-accent"
              />
            ))}
          </div>
          <button
            onClick={startGame}
            className="ans-w-full ans-bg-th-accent ans-text-White ans-px-6 ans-py-3 ans-rounded-lg hover:ans-bg-th-accent-hover hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200 ans-font-inter-1"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ans-flex ans-flex-col ans-items-center ans-py-12 ans-px-4 ans-bg-th-surface-alt ans-min-h-screen">
      <h1 className="ans-text-4 ans-font-inter-3 ans-text-th-accent ans-mb-6 retro-glow">
        Pig Dice Game
      </h1>

      {winner && (
        <div className="ans-text-3 ans-font-inter-2 ans-text-th-success ans-mb-6 ans-bg-th-success/10 ans-px-8 ans-py-4 ans-rounded-xl ans-animate-scale-bounce retro-glow">
          {winner} Wins! 🎉
        </div>
      )}

      <div className="ans-flex ans-items-center ans-gap-4 sm:ans-gap-8 ans-mb-8">
        <div className="ans-flex ans-flex-col ans-items-center ans-gap-2">
          <span className="ans-text-xs ans-text-th-muted-fg ans-uppercase">Dice</span>
          <DiceFace value={diceRoll} shaking={diceShaking} />
        </div>
        <div className="ans-flex ans-flex-col ans-items-center ans-gap-2">
          <span className="ans-text-xs ans-text-th-error ans-uppercase ans-font-inter-1">Banned</span>
          <div
            className={`ans-w-14 ans-h-14 ans-bg-th-error/10 ans-rounded-xl ans-flex ans-items-center ans-justify-center ans-text-4 ans-font-inter-3 ans-text-th-error ans-border-2 ans-border-th-error/30 ${
              bannedShaking ? "ans-animate-dice-shake" : ""
            }`}
          >
            {bannedNumber}
          </div>
        </div>
      </div>

      <div className="ans-grid ans-grid-cols-1 sm:ans-grid-cols-2 md:ans-grid-cols-3 ans-gap-6 ans-mb-8 ans-w-full ans-max-w-4xl">
        {players.map((player, idx) => (
          <PlayerCard
            key={idx}
            player={player}
            isActive={idx === activePlayerIndex}
            target={target}
            isWinner={winner === player.name}
          />
        ))}
      </div>

      {!winner && (
        <div className="ans-flex ans-flex-col sm:ans-flex-row ans-gap-4 ans-mb-6 ans-w-full ans-max-w-lg">
          <button
            onClick={handleDiceRoll}
            className="ans-flex-1 ans-bg-th-accent ans-text-White ans-py-3 ans-rounded-lg hover:ans-bg-th-accent-hover hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200 ans-font-inter-0"
          >
            🎲 Roll Dice
          </button>
          <button
            onClick={bankPlayerScore}
            className="ans-flex-1 ans-bg-th-success ans-text-White ans-py-3 ans-rounded-lg hover:ans-opacity-90 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200 ans-font-inter-0"
          >
            💰 Bank Score
          </button>
          <button
            onClick={resetBannedNumber}
            className="ans-flex-1 ans-bg-th-error ans-text-White ans-py-3 ans-rounded-lg hover:ans-opacity-90 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200 ans-font-inter-0"
          >
            🚫 New Ban
          </button>
        </div>
      )}

      <button
        onClick={resetGame}
        className="ans-bg-th-muted-fg ans-text-White ans-py-2 ans-px-6 ans-rounded-lg hover:ans-opacity-90 hover:ans-scale-105 active:ans-scale-95 ans-transition-all ans-duration-200"
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

export default PigGame;
