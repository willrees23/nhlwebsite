import { RefreshCwIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/components/Layout";
import { nhlFont } from "~/lib/fonts";

import { api } from "~/utils/api";

export default function Home() {
  const scheduleData = api.post.testFetch.useQuery();

  return (
    <>
      <Layout pageTitle="Unofficial NHL">
        <div className="relative">
          <Image
            className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 translate-y-20 opacity-5"
            alt="NHL_Logo"
            src={"/nhl.webp"}
            width={"710"}
            height={"710"}
          />
        </div>
        <div className="relative z-20 flex flex-col items-center">
          <div
            id="navbar"
            className="flex w-11/12 flex-row items-center justify-between rounded-md bg-primary p-2 pl-4 pr-4 shadow-sm shadow-zinc-900"
          >
            <div
              className={`font-nhl ${nhlFont.variable} flex items-center gap-x-8`}
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
          <div className="mt-16"></div>
        </div>
      </Layout>
    </>
  );
}
