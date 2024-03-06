import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

type StateBadgeProps = {
  state: string;
  className?: string;
};

const StateBadge = ({ className, state }: StateBadgeProps) => {
  const badgeClass = cn(className, {
    "animate-pulse bg-green-500": state === "LIVE",
    "bg-zinc-700": state === "FUT",
    "bg-[#202020]": state === "OFF",
    "bg-orange-500": state === "PRE",
    "animate-pulse bg-red-500": state === "CRIT",
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
