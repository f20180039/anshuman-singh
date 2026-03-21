export interface Player {
  name: string;
  frozenScore: number;
  tempScore: number;
}

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
  target: number;
  isWinner: boolean;
}

const PlayerCard = ({ player, isActive, target, isWinner }: PlayerCardProps) => {
  const progress = Math.min((player.frozenScore / target) * 100, 100);

  return (
    <div
      className={`ans-relative ans-flex ans-flex-col ans-p-4 ans-bg-th-bg ans-rounded-lg ans-shadow-md ans-transition-all ans-duration-300
        ${isActive && !isWinner ? "ans-ring-2 ans-ring-th-accent ans-scale-105 ans-shadow-lg" : ""}
        ${isWinner ? "ans-ring-2 ans-ring-th-success ans-animate-victory-pulse" : ""}`}
    >
      {/* Player name badge */}
      <div
        className={`ans-absolute ans-top-0 ans-right-0 ans-py-1 ans-px-3 ans-rounded-bl-lg ans-text-sm ans-uppercase ans-text-White ${
          isWinner
            ? "ans-bg-th-success"
            : isActive
              ? "ans-bg-th-accent"
              : "ans-bg-th-muted-fg"
        }`}
      >
        {player.name}
      </div>

      <div className="ans-mt-8 ans-text-center ans-space-y-3">
        {/* Frozen score */}
        <div>
          <div className="ans-text-xs ans-text-th-muted-fg ans-uppercase">
            Total
          </div>
          <div className="ans-text-4 ans-font-inter-3 ans-text-th-fg">
            {player.frozenScore}
          </div>
        </div>

        {/* Temp score */}
        <div
          className={`ans-text-2 ans-font-inter-1 ans-transition-all ans-duration-200 ${
            player.tempScore > 0
              ? "ans-text-th-accent"
              : "ans-text-th-muted-fg"
          }`}
        >
          {player.tempScore > 0 ? `+${player.tempScore}` : "+0"}
        </div>

        {/* Progress bar */}
        <div className="ans-w-full ans-h-2 ans-bg-th-muted ans-rounded-full ans-overflow-hidden">
          <div
            className={`ans-h-full ans-rounded-full ans-transition-all ans-duration-500 ${
              isWinner ? "ans-bg-th-success" : "ans-bg-th-accent"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="ans-text-xs ans-text-th-muted-fg">
          {player.frozenScore}/{target}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
