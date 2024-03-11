import { LuExternalLink } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { nhlFont } from "~/lib/fonts";
import {
  Convert,
  type Game,
  type Goal,
  type ScoresResult,
} from "~/lib/scoresResult";
import {
  cn,
  getUntil,
  goalStrengthFormatted,
  nhlClass,
  nthalize,
} from "~/lib/utils";
import StateBadge from "./statebadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { api } from "~/utils/api";
import { PlayerConverter } from "~/lib/playerinfo";

type GameViewProps = {
  // tRPC useQuery
  scoresNow: ScoresResult;
  gameId: number;
};

const GameView = ({ scoresNow, gameId }: GameViewProps) => {
  const scoresJsonString = JSON.stringify(scoresNow, null, 2);
  const scoresResult = Convert.toScoresResult(scoresJsonString);

  let game: Game | undefined;
  for (const gameItem of scoresResult.games) {
    if (gameItem.id == gameId) {
      game = gameItem;
      break;
    }
  }

  if (game === undefined) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className={`font-nhl ${nhlFont.variable} text-3xl`}>
          GAME NOT FOUND.
        </h1>
        <h1 className={`font-nhl ${nhlFont.variable} text-3xl`}>
          GAME MAY NOT HAVE STARTED YET.
        </h1>
      </div>
    );
  }

  type GoalViewProps = {
    goal: Goal;
    side?: "away" | "home";
  };

  const PlayerAssistNumber = ({ playerId }: { playerId: number }) => {
    const playerInfo = api.post.playerInfo.useQuery(playerId.toString());
    if (playerInfo.error ?? playerInfo.data === undefined) {
      return <span></span>;
    }
    const playerJsonString = JSON.stringify(playerInfo.data, null, 2);
    const player = PlayerConverter.toPlayerInfo(playerJsonString);
    return player.sweaterNumber;
  };

  const GoalViewInfo = ({ goal, side }: GoalViewProps) => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row space-x-2">
          <h1 className="overflow-ellipsis text-nowrap">
            <span>{goal.name.default}</span>
          </h1>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className=" font-bold ">
                    ({goal.strength.toUpperCase()})
                  </span>
                </TooltipTrigger>
                <TooltipContent className="border-0 bg-zinc-800 text-white">
                  <div className="rounded-lg">
                    <h1>{goalStrengthFormatted(goal.strength)}</h1>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <h1
          className={cn(
            "overflow-ellipsis text-nowrap text-sm",
            side ? (side == "away" ? "text-start" : "text-end") : "text-center",
          )}
        >
          {goal.assists.length > 0 ? (
            goal.assists.map((assist, index) => (
              <span key={index}>
                #{PlayerAssistNumber({ playerId: assist.playerId })}{" "}
                {index + 1 < goal.assists.length && " & "}
              </span>
            ))
          ) : (
            <span>Unassisted</span>
          )}
        </h1>
        <h1
          className={cn(
            "text-sm",
            side ? (side == "away" ? "text-start" : "text-end") : "text-center",
          )}
        >
          {nthalize(goal.period)} - {goal.timeInPeriod}
        </h1>
      </div>
    );
  };

  const GoalView = ({ side, goal }: GoalViewProps) => {
    return (
      <>
        {side === "away"
          ? goal.teamAbbrev == game?.awayTeam.abbrev && (
              <div className="flex gap-x-2">
                <div className="overflow-clip rounded-2xl bg-neutral-800 p-[1px]">
                  <Image
                    width={60}
                    height={60}
                    className="min-h-[60px] min-w-[60px]"
                    src={goal.mugshot}
                    priority
                    alt="PlayerMugshot"
                  />
                </div>
                <GoalViewInfo side={side} goal={goal} />
              </div>
            )
          : goal.teamAbbrev == game?.homeTeam.abbrev && (
              <div className="flex gap-x-2">
                <GoalViewInfo goal={goal} side={side} />
                <div className="overflow-clip rounded-2xl bg-neutral-800 p-[1px]">
                  <Image
                    width={60}
                    height={60}
                    className="min-h-[60px] min-w-[60px]"
                    src={goal.mugshot}
                    priority
                    alt="PlayerMugshot"
                  />
                </div>
              </div>
            )}
      </>
    );
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center rounded-lg border border-zinc-700 p-5",
      )}
    >
      <StateBadge
        className="text-md flex items-center justify-center"
        state={game.gameState.toString()}
      />
      {game.gameState === "PRE" || game.gameState === "FUT" ? (
        <h1 className="mt-5 text-2xl font-bold">
          Starting {getUntil(game.startTimeUTC)}
        </h1>
      ) : (
        <span></span>
      )}
      {game.clock &&
        (game.clock.inIntermission ? (
          <h1 className={`mt-2 text-2xl font-semibold`}>
            INTERMISSION{" "}
            <span className="text-xl">({game.periodDescriptor.number}/2)</span>
          </h1>
        ) : (
          <h1 className={`mt-2 font-mono font-extralight`}>
            {game.clock.timeRemaining} |{" "}
            {nthalize(game.periodDescriptor.number)} Period (
            {game.periodDescriptor.periodType === "REG"
              ? "Regulation"
              : game.periodDescriptor.periodType === "OT"
                ? "Overtime"
                : "Shootout"}
            )
          </h1>
        ))}
      {game.situation && (
        <h1 className="mt-1">
          {game.situation.awayTeam.strength} on{" "}
          {game.situation.homeTeam.strength} | {game.situation.timeRemaining}{" "}
          remaining
        </h1>
      )}
      <div className="flex flex-col items-center justify-center gap-x-10 gap-y-5 *:text-center max-lg:mt-5 lg:grid lg:grid-cols-3">
        <div className="flex flex-col items-center">
          <Image
            width={150}
            height={150}
            src={game.awayTeam.logo}
            alt="AwayTeamLogo"
          />
          <h1
            className={`mt-2 text-center font-nhl text-3xl ${nhlFont.variable}`}
          >
            {game.awayTeam.name.default.toUpperCase()}

            <h1 className="text-base">
              {game.situation?.awayTeam.situationDescriptions &&
              game.situation?.awayTeam.situationDescriptions[0] === "PP" ? (
                <span className="text-red-500">POWER PLAY</span>
              ) : game.situation?.homeTeam.situationDescriptions &&
                game.situation?.homeTeam.situationDescriptions[0] === "PP" ? (
                <span className="text-blue-500">SHORT HANDED</span>
              ) : (
                <span></span>
              )}
            </h1>
            {game.awayTeam.sog && (
              <pre className="text-base">SOG: {game.awayTeam.sog}</pre>
            )}
          </h1>
        </div>
        <div className="">
          <h1 className="text-5xl font-bold">
            {game.awayTeam.score} - {game.homeTeam.score}
          </h1>
        </div>
        <div className="flex flex-col items-center ">
          <Image
            width={150}
            height={150}
            src={game.homeTeam.logo}
            alt="AwayTeamLogo"
          />
          <h1
            className={`mt-2 text-center font-nhl text-3xl ${nhlFont.variable}`}
          >
            {game.homeTeam.name.default.toUpperCase()}

            <h1 className="text-base">
              {game.situation?.homeTeam.situationDescriptions &&
              game.situation?.homeTeam.situationDescriptions[0] === "PP" ? (
                <span className="text-red-500">POWER PLAY</span>
              ) : game.situation?.awayTeam.situationDescriptions &&
                game.situation?.awayTeam.situationDescriptions[0] === "PP" ? (
                <span className="text-blue-500">SHORT HANDED</span>
              ) : (
                <span></span>
              )}
            </h1>
            {game.homeTeam.sog && (
              <pre className="text-base">SOG: {game.homeTeam.sog}</pre>
            )}
          </h1>
        </div>
      </div>
      <Link
        className="mt-10 flex items-center space-x-2 border-b-2 border-transparent transition-all duration-500 hover:border-zinc-500 hover:border-opacity-100 hover:tracking-widest "
        href={`https://nhl.com${game.gameCenterLink}`}
        target="_blank"
      >
        <LuExternalLink size={16} />
        <h1 className="text-lg">GAME OVERVIEW</h1>
      </Link>
      {game.threeMinRecap ? (
        <Link
          className=" flex items-center space-x-2 border-b-2 border-transparent transition-all duration-500 hover:border-zinc-500 hover:border-opacity-100 hover:tracking-widest "
          href={`https://nhl.com${game.threeMinRecap}`}
          target="_blank"
        >
          <LuExternalLink size={16} />
          <h1 className="text-lg">GAME RECAP</h1>
        </Link>
      ) : (
        <h1 className="mt-2 text-center text-lg">RECAP NOT AVAILABLE</h1>
      )}

      <div className="mt-10 w-2/5 ">
        {game.goals && (
          <>
            <h1 className={"text-center text-3xl tracking-wide " + nhlClass()}>
              GOALS
            </h1>
            <div className="mt-5 flex w-full flex-col gap-x-14 rounded-md max-lg:items-center lg:grid lg:grid-cols-11 lg:justify-center">
              <div className="flex w-52 flex-col items-start gap-y-[5px] lg:col-span-5">
                <h1 className="font-bold">Scorers</h1>
                {game.goals.map((goal, index) => (
                  <GoalView side="away" key={index} goal={goal} />
                ))}
              </div>
              <h1 className="col-span-1 mt-10 font-bold"></h1>
              <div className="flex w-52 flex-col items-end gap-y-[5px] lg:col-span-5">
                <h1 className="font-bold">Scorers</h1>
                {game.goals.map((goal, index) => (
                  <GoalView side="home" key={index} goal={goal} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameView;
