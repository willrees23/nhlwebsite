/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import Link from "next/link";
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
        <Link href={"#live"} className="text-blue-500 ">
          LIVE
        </Link>
        <span>|</span>
        <Link href={"#final"} className="text-blue-500 ">
          FINAL MINUTES
        </Link>
        <span>|</span>
        <Link href={"#soon"} className="text-blue-500 ">
          STARTING SOON
        </Link>
        <span>|</span>
        <Link href={"#sched"} className="text-blue-500 ">
          SCHEDULED
        </Link>
        <span>|</span>
        <Link href={"#concl"} className="text-blue-500 ">
          CONCLUDED
        </Link>
      </div>
      <h1 className="mb-3 mt-5 text-3xl" id="live">
        Live Games
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {liveGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16 text-3xl" id="final">
        Final Minutes
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {critGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16 text-3xl" id="soon">
        Starting Soon
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {preGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16  text-3xl" id="sched">
        Scheduled
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {futGames.map((gameStuff) => (
            <GameCell key={gameStuff.game.id} info={gameStuff} />
          ))}
        </div>
      </div>
      <h1 className="mb-3 mt-16  text-3xl" id="concl">
        Concluded
      </h1>
      <div className="flex w-full justify-center">
        <div className="grid w-10/12 justify-center gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
