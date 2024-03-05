/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { ToastAction } from "@radix-ui/react-toast";
import { RefreshCwIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Layout from "~/components/Layout";
import StateBadge from "~/components/statebadge";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "~/components/ui/use-toast";
import { nhlFont } from "~/lib/fonts";
import {
  Convert as ResultConvert,
  GameState,
  PeriodType,
} from "~/lib/nhlresult";
import { Convert as ScoresConvert } from "~/lib/scoresResult";
import {
  cn,
  dayOfWeekNumOfMonth,
  getDateInAmericanFormat,
  getLastSunday,
  getLastSundayDate,
} from "~/lib/utils";

import { api } from "~/utils/api";

export default function Home() {
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

  return (
    <>
      <Layout pageTitle="NHL Game Schedule">
        <h1 className="mb-5 text-xl">
          Schedule from{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className=" rounded-lg bg-zinc-800 px-[6px] py-[2px] font-bold">
                  {getLastSundayDate().toDateString()}
                </span>
              </TooltipTrigger>
              <TooltipContent className="border-0 bg-zinc-700 text-white">
                <div className="rounded-lg">
                  <h1>
                    The schedule is from the last Sunday to the next Saturday.
                  </h1>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
        <div className="flex w-full justify-center">
          <div className="grid w-10/12 justify-center gap-y-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {nhlResults.gameWeek.map((day, index) =>
              day.games.map((game, index) => (
                <>
                  <Link
                    key={game.id}
                    scroll={false}
                    href={
                      game.gameState === GameState.Fut ||
                      game.gameState === GameState.Pre
                        ? ""
                        : "/game/" +
                          game.id +
                          "?date=" +
                          getDateInAmericanFormat(day.date)
                    }
                  >
                    <div
                      className={cn(
                        "max-w-72 rounded-lg border bg-[#181818] bg-opacity-20 p-2 py-3 transition-all hover:scale-[1.025] hover:bg-opacity-100",
                        game.gameState === GameState.Live
                          ? "border-green-500"
                          : "border-zinc-700",
                      )}
                      onClick={() => {
                        if (
                          game.gameState === GameState.Fut ||
                          game.gameState === GameState.Pre
                        ) {
                          toast({
                            title: "Game scheduled!",
                            description:
                              "You can view the game when it starts. Keep your eyes peeled! 🏒",
                            className:
                              "text-white bg-zinc-800 pointer-events-auto border-zinc-700 p-3 px-4",
                            action: (
                              <ToastAction
                                altText="Dismiss "
                                className="rounded-xl bg-zinc-700 p-2 py-1 text-white"
                              >
                                Dismiss
                              </ToastAction>
                            ),
                          });
                        }
                      }}
                    >
                      <div className="grid grid-cols-1 items-center justify-between gap-y-2 *:flex *:items-center *:justify-evenly">
                        <div className="mb-2">
                          <StateBadge state={game.gameState} />
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
                          {game.gameState === GameState.Live ||
                          game.gameState === GameState.Crit ? (
                            <h1>
                              <span className="font-bold">Live score:</span>{" "}
                              {game.awayTeam.score} - {game.homeTeam.score}
                            </h1>
                          ) : game.gameState === GameState.Fut ? (
                            <h1>
                              <span className="font-bold">Scheduled:</span>{" "}
                              {game.startTimeUTC.toLocaleTimeString()}
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
              )),
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
