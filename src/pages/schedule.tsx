/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import Link from "next/link";
import { useRef } from "react";
import Layout from "~/components/Layout";
import { DatePickerWithRange } from "~/components/datepicker";
import GameCell from "~/components/gamecell";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "~/components/ui/use-toast";
import {
  Convert as ResultConvert,
  type Game,
  type GameWeek,
} from "~/lib/nhlresult";
import { getLastSundayDate } from "~/lib/utils";
import { api } from "~/utils/api";

type GameCellInfo = {
  game: Game;
  day: GameWeek;
};

const SchedulePage = () => {
  const scheduleNow = api.post.scheduleNow.useQuery();

  const { toast } = useToast();

  const liveRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);
  const soonRef = useRef<HTMLDivElement | null>(null);
  const schedRef = useRef<HTMLDivElement | null>(null);
  const conclRef = useRef<HTMLDivElement | null>(null);

  if (scheduleNow.error || scheduleNow.data === undefined) {
    return (
      <>
        <Layout loading={true} pageTitle="Loading..." />
      </>
    );
  }

  // scheduleNow is JSON, so change it to string
  const jsonString = JSON.stringify(scheduleNow.data, null, 2);
  const nhlResults = ResultConvert.toNhlResult(jsonString);

  const critGames: GameCellInfo[] = [];
  const liveGames: GameCellInfo[] = [];
  const preGames: GameCellInfo[] = [];
  const futGames: GameCellInfo[] = [];
  const offGames: GameCellInfo[] = [];

  nhlResults.gameWeek.forEach((day) => {
    day.games.forEach((game) => {
      if (game.gameState === "CRIT") {
        critGames.push({ game: game, day: day });
      } else if (game.gameState === "LIVE") {
        liveGames.push({ game: game, day: day });
      } else if (game.gameState === "PRE") {
        preGames.push({ game: game, day: day });
      } else if (game.gameState === "FUT") {
        futGames.push({ game: game, day: day });
      } else if (game.gameState === "OFF") {
        offGames.push({ game: game, day: day });
      }
    });
  });

  return (
    <Layout pageTitle="NHL Game Schedule">
      <h1 className="mb-5 text-xl">Show games between</h1>
      <DatePickerWithRange />
      <div className="*:animate-underline mb-10 mt-6 flex flex-col items-center justify-center space-x-3 rounded-md border p-6 text-xl *:text-center md:flex-row">
        <button
          className="text-blue-500"
          onClick={() => {
            liveRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          LIVE
        </button>
        <span>|</span>
        <button
          className="text-blue-500"
          onClick={() => {
            finalRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          FINAL MINUTES
        </button>
        <span>|</span>
        <button
          className="text-blue-500 "
          onClick={() => {
            soonRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          STARTING SOON
        </button>
        <span>|</span>
        <button
          className="text-blue-500 "
          onClick={() => {
            schedRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          SCHEDULED
        </button>
        <span>|</span>
        <button
          className="text-blue-500 "
          onClick={() => {
            conclRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          CONCLUDED
        </button>
      </div>
      <h1 className="mb-3 mt-5 text-3xl" ref={liveRef}>
        Live Games
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {liveGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16 text-3xl" ref={finalRef}>
        Final Minutes
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {critGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16 text-3xl" ref={soonRef}>
        Starting Soon
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {preGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16  text-3xl" ref={schedRef}>
        Scheduled
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {futGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16  text-3xl" ref={conclRef}>
        Concluded
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {offGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SchedulePage;
export type { GameCellInfo };
