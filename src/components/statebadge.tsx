import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

type StateBadgeProps = {
  state: string;
  className?: string;
};

const StateBadge = ({ className, state }: StateBadgeProps) => {
  const badgeClass = cn(className, {
    "animate-pulse bg-green-500": state === "LIVE", // Live
    "bg-zinc-700": state === "FUT", // Scheduled
    "bg-[#202020]": state === "OFF", // Concluded
    "bg-orange-500": state === "PRE", // Starting Soon
    "animate-pulse bg-red-500": state === "CRIT", // Final Minutes
  });
  return (
    <Badge className={badgeClass}>
      {state === "LIVE"
        ? "LIVE"
        : state === "FUT"
          ? "Scheduled"
          : state === "OFF"
            ? "Concluded"
            : state === "PRE"
              ? "Starting Soon"
              : state === "CRIT"
                ? "Final Minutes"
                : "Just Finished"}
    </Badge>
  );
};

export default StateBadge;
