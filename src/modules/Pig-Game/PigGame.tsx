/* src/modules/PigGame.tsx */
import React, { useState } from "react";
import PlayerCard, { Player } from "./PlayerCard";

const PigGame: React.FC = () => {
  const [step, setStep] = useState<"setup" | "playing">("setup");
  const [numPlayers, setNumPlayers] = useState(2);
  const [names, setNames] = useState<string[]>(["", ""]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [bannedNumber, setBannedNumber] = useState(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [diceRoll, setDiceRoll] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const target = 50;

  const startGame = () => {
    const initialPlayers: Player[] = names.map((n, index) => ({
      name: n || "Player " + index,
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

    setPlayers((prev) =>
      prev.map((player, idx) => {
        if (idx !== activePlayerIndex) return player;
        const temp = dice === bannedNumber ? 0 : player.tempScore + dice;
        return { ...player, tempScore: temp };
      })
    );

    if (dice === bannedNumber) {
      switchPlayer();
    }
  };

  const bankPlayerScore = () => {
    setPlayers((prev) =>
      prev.map((player, idx) => {
        if (idx !== activePlayerIndex) return player;
        return {
          ...player,
          frozenScore: player.frozenScore + player.tempScore,
          tempScore: 0,
        };
      })
    );

    const active = players[activePlayerIndex];
    if (active.frozenScore + active.tempScore >= target) {
      setWinner(`${active.name} Wins! 🎉`);
      return;
    }
    switchPlayer();
  };

  const resetBannedNumber = () => {
    setBannedNumber(Math.ceil(Math.random() * 6));
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
      <div className="ans-flex ans-flex-col ans-items-center ans-p-8 ans-space-y-6 ans-bg-Gray-100 dark:ans-bg-Gray-900 ans-min-h-screen">
        <h1 className="ans-text-2 ans-font-inter-3 ans-text-Gray-800 dark:ans-text-White">
          Setup Pig Dice Game
        </h1>
        <label className="ans-flex ans-items-center ans-space-x-2">
          <span className="ans-text-Gray-700 dark:ans-text-Gray-300">
            # Players:
          </span>
          <select
            value={numPlayers}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              setNumPlayers(n);
              setNames(Array(n).fill(""));
            }}
            className="ans-border ans-rounded ans-p-1 ans-bg-White dark:ans-bg-Gray-700 ans-text-Gray-900 dark:ans-text-White"
          >
            {[2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <div className="ans-grid ans-grid-cols-1 sm:ans-grid-cols-2 ans-gap-4 ans-w-full ans-max-w-md">
          {names.map((name, idx) => (
            <input
              key={idx}
              value={name}
              onChange={(e) => {
                const updated = [...names];
                updated[idx] = e.target.value;
                setNames(updated);
              }}
              placeholder={`Player ${idx + 1} name`}
              className="ans-w-full ans-border ans-rounded ans-p-2 ans-bg-White dark:ans-bg-Gray-700 ans-text-Gray-900 dark:ans-text-White"
            />
          ))}
        </div>
        <button
          onClick={startGame}
          className="ans-mt-4 ans-bg-Blue-600 ans-text-White ans-px-6 ans-py-2 ans-rounded hover:ans-bg-Blue-700"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="ans-flex ans-flex-col ans-items-center ans-py-12 ans-bg-Gray-100 dark:ans-bg-Gray-900 ans-min-h-screen">
      <h1 className="ans-text-4xl ans-font-inter-3 ans-text-Blue-600 dark:ans-text-Blue-400 ans-mb-6">
        Pig Dice Game 🎲
      </h1>
      {winner && (
        <div className="ans-text-2 ans-font-inter-2 ans-text-Success-500 ans-mb-4">
          {winner}
        </div>
      )}
      <div className="ans-flex ans-space-x-8 ans-mb-6">
        <div className="ans-text-2 ans-font-inter-1 ans-text-Gray-700 dark:ans-text-Gray-300">
          Dice Rolled:{" "}
          <span className="ans-font-inter-3 ans-text-3">{diceRoll}</span>
        </div>
        <div className="ans-text-2 ans-font-inter-1 ans-text-Error-500 dark:ans-text-Error-400">
          Banned Number:{" "}
          <span className="ans-font-inter-3 ans-text-3">{bannedNumber}</span>
        </div>
      </div>
      <div className="ans-grid ans-grid-cols-1 sm:ans-grid-cols-2 md:ans-grid-cols-3 ans-gap-6 ans-mb-8 ans-w-full ans-px-4">
        {players.map((player, idx) => (
          <PlayerCard
            key={idx}
            player={player}
            isActive={idx === activePlayerIndex}
          />
        ))}
      </div>
      {!winner && (
        <div className="ans-flex ans-flex-col sm:ans-flex-row ans-gap-4 ans-mb-6 ans-w-full ans-max-w-lg ans-px-4">
          <button
            onClick={handleDiceRoll}
            className="ans-flex-1 ans-bg-Blue-500 ans-text-White ans-py-3 ans-rounded-lg hover:ans-bg-Blue-600"
          >
            Roll Dice 🎲
          </button>
          <button
            onClick={bankPlayerScore}
            className="ans-flex-1 ans-bg-Success-500 ans-text-White ans-py-3 ans-rounded-lg hover:ans-bg-Success-600"
          >
            Bank Score 💰
          </button>
          <button
            onClick={resetBannedNumber}
            className="ans-flex-1 ans-bg-Error-500 ans-text-White ans-py-3 ans-rounded-lg hover:ans-bg-Error-600"
          >
            New Banned Number 🚫
          </button>
        </div>
      )}
      <button
        onClick={resetGame}
        className="ans-bg-Gray-600 ans-text-White ans-py-2 ans-px-6 ans-rounded-lg hover:ans-bg-Gray-700"
      >
        Reset Game 🔄
      </button>
    </div>
  );
};

export default PigGame;
