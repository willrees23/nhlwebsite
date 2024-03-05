import { GameState } from "~/lib/nhlresult";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

type StateBadgeProps = {
  state: GameState;
  className?: string;
};

const StateBadge = ({ className, state }: StateBadgeProps) => {
  const badgeClass = cn(className, {
    "animate-pulse bg-green-500": state === GameState.Live,
    "bg-zinc-700": state === GameState.Fut,
    "bg-[#202020]": state === GameState.Off,
    "bg-orange-500": state === GameState.Pre,
    "animate-pulse bg-red-500": state === GameState.Crit,
  });
  return (
    <Badge className={badgeClass}>
      {state === GameState.Live
        ? "LIVE"
        : state === GameState.Fut
          ? "Scheduled"
          : state === GameState.Off
            ? "Concluded"
            : state === GameState.Pre
              ? "Starting Soon"
              : state === GameState.Crit
                ? "Final Minutes"
                : "Just Finished"}
    </Badge>
  );
};

export default StateBadge;
