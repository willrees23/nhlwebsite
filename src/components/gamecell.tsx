import Link from "next/link";
import { toast } from "./ui/use-toast";
import {
  getDateInAmericanFormat,
  cn,
  dateIsToday,
  dateIsYesterday,
  getUntil,
  dayOfWeekNumOfMonth,
} from "~/lib/utils";
import StateBadge from "./statebadge";
import { ToastAction } from "./ui/toast";
import { type Game, type GameWeek } from "~/lib/nhlresult";
import Image from "next/image";
import { type GameCellInfo } from "~/pages/schedule";

type GameCellProps = {
  info: GameCellInfo;
};

const GameCell = ({ info }: GameCellProps) => {
  const { game, day } = info;
  return (
    <>
      <Link
        key={game.id}
        scroll={false}
        href={
          game.gameState === "FUT" || game.gameState === "PRE"
            ? "/game/" + game.id + "?date=" + getDateInAmericanFormat(day.date)
            : "/game/" + game.id + "?date=" + getDateInAmericanFormat(day.date)
        }
      >
        <div
          className={cn(
            "rounded-lg border bg-[#181818] bg-opacity-20 p-2 py-3 transition-all hover:scale-[1.025] hover:bg-opacity-100",
            game.gameState === "LIVE" ? "border-green-500" : "border-zinc-700",
          )}
          //   onClick={() => {
          //     if (game.gameState === "FUT" || game.gameState === "PRE") {
          //       toast({
          //         title: "Game scheduled!",
          //         description:
          //           "You can view the game when it starts. Keep your eyes peeled! 🏒",
          //         className:
          //           "text-white bg-zinc-800 pointer-events-auto border-zinc-700 p-3 px-4",
          //         action: (
          //           <ToastAction
          //             altText="Dismiss "
          //             className="rounded-xl bg-zinc-700 p-2 py-1 text-white"
          //           >
          //             Dismiss
          //           </ToastAction>
          //         ),
          //       });
          //     }
          //   }}
        >
          <div className="grid grid-cols-1 items-center justify-between gap-y-2 *:flex *:items-center *:justify-evenly">
            <div className="mb-2">
              <StateBadge state={game.gameState.toString()} />
            </div>
            <div className="flex gap-x-2">
              <Image
                alt="AwayTeamLogo"
                className="size-20"
                width={50}
                height={50}
                src={game.awayTeam.logo}
              />
              <h1>@</h1>
              <Image
                alt="HomeTeamLogo"
                className="size-20"
                width={50}
                height={50}
                src={game.homeTeam.logo}
              />
            </div>
            <div>
              <h1>{game.awayTeam.placeName.default}</h1>
              <h1> </h1>
              <h1>{game.homeTeam.placeName.default}</h1>
            </div>
            <div>
              {game.gameState === "LIVE" || game.gameState === "CRIT" ? (
                <h1>
                  <span className="font-bold">Live score:</span>{" "}
                  {game.awayTeam.score} - {game.homeTeam.score}
                </h1>
              ) : game.gameState === "FUT" ? (
                dateIsToday(day.date) || dateIsYesterday(day.date) ? (
                  <h1>
                    <span className="font-bold">Scheduled:</span>{" "}
                    {getUntil(game.startTimeUTC)}
                  </h1>
                ) : (
                  <h1>
                    <span className="font-bold">Scheduled:</span>{" "}
                    {game.startTimeUTC.toLocaleTimeString()}
                  </h1>
                )
              ) : game.gameState === "PRE" ? (
                <h1>
                  <span className="font-bold">Starting Soon:</span>{" "}
                  {getUntil(game.startTimeUTC, true)}
                </h1>
              ) : (
                <h1>
                  <span className="font-bold">Concluded:</span>{" "}
                  {game.awayTeam.score} - {game.homeTeam.score}
                </h1>
              )}
            </div>
            <div>
              <h1>
                {dayOfWeekNumOfMonth(day.date)}
                {" | "}
                {day.date.toLocaleDateString()}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default GameCell;
