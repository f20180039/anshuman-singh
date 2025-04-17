import { useState } from "react";

interface Player {
  name: string;
  frozenScore: number;
  tempScore: number;
}

const PigGame = () => {
  const [numPlayers, _setNumPlayers] = useState(2);
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: numPlayers }, (_, i) => ({
      name: `Player ${i + 1}`,
      frozenScore: 0,
      tempScore: 0,
    }))
  );
  const [target, _setTarget] = useState(50);
  const [bannedNumber, setBannedNumber] = useState(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [diceRoll, setDiceRoll] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);

  const handleDiceRoll = () => {
    console.log("Unused variable", _setNumPlayers, _setTarget);
    if (winner) return;
    const dice = Math.ceil(Math.random() * 6);
    setDiceRoll(dice);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === activePlayerIndex
          ? {
              ...player,
              tempScore: dice === bannedNumber ? 0 : player.tempScore + dice,
            }
          : player
      )
    );
    if (dice === bannedNumber) switchPlayer();
  };

  const switchPlayer = () => {
    setActivePlayerIndex((prev) => (prev + 1) % numPlayers);
  };

  const bankPlayerScore = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) =>
        index === activePlayerIndex
          ? {
              ...player,
              frozenScore: player.frozenScore + player.tempScore,
              tempScore: 0,
            }
          : player
      )
    );

    // Check if the active player won
    const activePlayer = players[activePlayerIndex];
    if (
      (activePlayer?.frozenScore || 0) + (activePlayer?.tempScore || 0) >=
      target
    ) {
      setWinner(`${activePlayer?.name} Wins! 🎉`);
      return;
    }

    switchPlayer();
  };

  const resetBannedNumber = () => {
    setBannedNumber(Math.ceil(Math.random() * 6));
  };

  const resetGame = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        frozenScore: 0,
        tempScore: 0,
      }))
    );
    setActivePlayerIndex(0);
    setWinner(null);
  };

  return (
    <div className="ans-flex ans-flex-col ans-items-center ans-justify-center ans-gap-6 ans-py-12 ans-bg-Gray-100 dark:ans-bg-Gray-900">
      <h1 className="ans-text-4xl ans-font-bold ans-text-Blue-600 dark:ans-text-Blue-400">
        Pig Dice Game 🎲
      </h1>

      <div className="ans-flex ans-gap-6 ans-bg-White dark:ans-bg-Gray-800 ans-p-6 ans-rounded-lg ans-shadow-md">
        {players.map((player, index) => (
          <div
            key={index}
            className={`ans-text-center ans-p-4 ans-rounded-lg ${
              index === activePlayerIndex
                ? "ans-border-4 ans-border-Blue-500 ans-bg-Blue-100 dark:ans-bg-Blue-800"
                : "ans-bg-Gray-200 dark:ans-bg-Gray-700"
            }`}
          >
            <h2 className="ans-text-4 ans-font-semibold ans-mb-2">
              {player.name}
            </h2>
            <p className="ans-text-3 ans-font-bold">🏆 {player.frozenScore}</p>
            <p className="ans-text-sm ans-text-Gray-600 dark:ans-text-Gray-300">
              Current: {player.tempScore}
            </p>
          </div>
        ))}
      </div>

      {winner ? (
        <div className="ans-text-4 ans-font-bold ans-text-Green-500">
          🎉 {winner} 🎉
        </div>
      ) : (
        <>
          <div className="ans-text-3 ans-font-semibold ans-text-Blue-600 dark:ans-text-Blue-400">
            Dice Rolled:{" "}
            <span className="ans-text-4 ans-font-bold">{diceRoll}</span>
          </div>
          <div className="ans-text-3 ans-font-semibold ans-text-Red-500">
            Banned Number:{" "}
            <span className="ans-text-4 ans-font-bold">{bannedNumber}</span>
          </div>

          <div className="ans-flex ans-gap-4 ans-w-full ans-max-w-lg">
            <button
              onClick={handleDiceRoll}
              className="ans-flex-1 ans-text-center ans-bg-Blue-500 ans-text-White ans-py-3 ans-rounded-lg ans-font-inter-3 hover:ans-bg-Blue-600"
            >
              Roll Dice 🎲
            </button>
            <button
              onClick={bankPlayerScore}
              className="ans-flex-1 ans-text-center ans-bg-Success-500 ans-text-White ans-py-3 ans-rounded-lg ans-font-inter-3 hover:ans-bg-Success-600"
            >
              Bank Score 💰
            </button>
            <button
              onClick={resetBannedNumber}
              className="ans-flex-1 ans-text-center ans-bg-Error-500 ans-text-White ans-py-3 ans-rounded-lg ans-font-inter-3 hover:ans-bg-Error-600"
            >
              New Banned Number 🚫
            </button>
          </div>
        </>
      )}

      <button
        onClick={resetGame}
        className="ans-bg-Gray-600 ans-text-White ans-py-2 ans-px-6 ans-rounded-lg ans-font-bold hover:ans-bg-Gray-700"
      >
        Reset Game 🔄
      </button>
    </div>
  );
};

export default PigGame;
