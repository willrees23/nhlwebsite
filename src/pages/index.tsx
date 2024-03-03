import { RefreshCwIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/components/Layout";
import { nhlFont } from "~/lib/fonts";
import { Convert, PeriodType } from "~/lib/nhlresult";
import { dayOfWeek, dayOfWeekNumOfMonth, timeOfDay } from "~/lib/utils";

import { api } from "~/utils/api";

export default function Home() {
  const data = api.post.testFetch.useQuery();

  if (data.error ?? data.data === undefined) {
    return (
      <>
        <Layout pageTitle="Unofficial NHL | Loading...">
          <div className="flex h-full items-center justify-center gap-x-3">
            <h1 className="text-5xl">Loading data...</h1>
          </div>
        </Layout>
      </>
    );
  }

  // data is JSON, so change it to string
  const jsonString = JSON.stringify(data.data, null, 2);
  const nhlResults = Convert.toNhlResult(jsonString);

  return (
    <>
      <Layout pageTitle="Unofficial NHL">
        <div className="relative">
          <Image
            className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 translate-y-20 opacity-[0.0075]"
            alt="NHL_Logo"
            src={"/nhl.webp"}
            width={"710"}
            height={"710"}
          />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          <div
            id="navbar"
            className="mb-10 flex w-11/12 flex-row items-center justify-between rounded-md bg-primary p-2 pl-4 pr-4 shadow-sm shadow-zinc-900"
          >
            <div
              className={`font-nhl ${nhlFont.variable} flex items-center gap-x-8 *:transition-all hover:*:tracking-wider`}
            >
              <Link href={"/"} className="flex items-center gap-x-2">
                <Image
                  className=""
                  alt="NHL_Logo"
                  src={"/nhl.webp"}
                  width={"50"}
                  height={"50"}
                />
                <h1 className={`text-5xl`}>NHL</h1>
              </Link>
              <Link href={"/schedule"} className="text-3xl">
                SCHEDULE
              </Link>
              <Link href={"/standings"} className="text-3xl">
                STANDINGS
              </Link>
            </div>
          </div>
          <h1
            className={`font-nhl ${nhlFont.variable} cursor-default text-5xl transition-all hover:tracking-wider`}
          >
            GAME SCHEDULE
          </h1>

          <div className="mt-10 grid w-10/12 grid-cols-5 gap-y-3">
            {nhlResults.gameWeek.map((day, index) =>
              day.games.map((game, index) => (
                <>
                  <Link key={index} href={"/game/" + game.id}>
                    <div className="max-w-72 rounded-lg border bg-[#181818] bg-opacity-20 p-2 py-3 transition-all hover:scale-105 hover:bg-opacity-100">
                      <div className="grid grid-cols-1 items-center justify-between gap-y-2 *:flex *:items-center *:justify-evenly">
                        <div>
                          <Image
                            alt="AwayTeamLogo"
                            width={50}
                            height={50}
                            src={game.awayTeam.logo}
                          />
                          <h1>@</h1>
                          <Image
                            alt="HomeTeamLogo"
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
                          {game.homeTeam.score ? (
                            <h1>
                              <span className="font-bold">Final score:</span>{" "}
                              {game.awayTeam.score} - {game.homeTeam.score}
                            </h1>
                          ) : (
                            // game is not started yet
                            <h1 className="font-bold">
                              Game starts at{" "}
                              {game.startTimeUTC.toLocaleTimeString()}
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
