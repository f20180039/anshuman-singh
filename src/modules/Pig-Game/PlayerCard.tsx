export interface Player {
  name: string;
  frozenScore: number;
  tempScore: number;
}

interface PlayerCardProps {
  player: Player;
  isActive: boolean;
}

const PlayerCard = ({ player, isActive }: PlayerCardProps) => {
  return (
    <div
      className={`ans-relative ans-flex ans-flex-col ans-p-4 ans-bg-White dark:ans-bg-Gray-800 ans-rounded-lg ans-shadow-md ans-transition-transform
        ${isActive ? "ans-ring-4 ans-ring-Blue-500 ans-animate-pulse ans-scale-105" : ""}`}
    >
      <div className="ans-absolute ans-top-0 ans-right-0 ans-bg-Blue-500 ans-text-White ans-py-1 ans-px-3 ans-rounded-bl-lg ans-text-sm ans-uppercase">
        {player.name}
      </div>
      <div className="ans-mt-6 ans-text-center ans-space-y-2">
        <div className="ans-text-2 ans-font-inter-1 ans-text-Gray-700 dark:ans-text-Gray-300">
          Total
        </div>
        <div className="ans-text-3 ans-font-inter-3 ans-text-Gray-900 dark:ans-text-White">
          {player.frozenScore}
        </div>
        <div className="ans-text-sm ans-text-Gray-500 dark:ans-text-Gray-400">
          Current {player.tempScore}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
