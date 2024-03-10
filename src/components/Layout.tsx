import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { nhlFont } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { Toaster } from "./ui/toaster";
import { Button } from "./ui/button";
import { LuMenu } from "react-icons/lu";
import ScrollToTopButton from "./scrolltotop";

type LayoutProps = {
  pageTitle: string;
  showPageTitle?: boolean;
  // children is collection of JSX elements, not just React.ReactNode
  children?: React.ReactNode;
  loading?: boolean;
};

const Layout = ({
  pageTitle,
  showPageTitle = true,
  children,
  loading = false,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main
        className={cn(
          "-z-50 min-h-screen w-screen max-w-full scroll-smooth text-white",
        )}
      >
        <ScrollToTopButton />
        <div className="h-full pt-5">
          <div className="relative">
            <Image
              className="pointer-events-none fixed left-1/2 z-10 -translate-x-1/2 translate-y-20 opacity-[0.01]"
              alt="NHL_Logo"
              src={"/nhl.webp"}
              width={"710"}
              height={"710"}
            />
          </div>
          <div className="relative z-20 flex flex-col items-center">
            <div
              id="navbar"
              className="fixed z-50 flex w-11/12 flex-row items-center justify-between rounded-md bg-primary p-2 pl-4 pr-4 shadow-sm shadow-zinc-900"
            >
              <div
                className={`font-nhl ${nhlFont.variable} flex w-full items-center gap-x-8 *:transition-all *:duration-700 max-sm:justify-between`}
              >
                <Link href={"/"} className="flex items-center gap-x-2">
                  <Image
                    alt="NHL_Logo"
                    src={"/nhl.webp"}
                    width={"50"}
                    height={"50"}
                  />
                  <h1 className={`animate-underline text-5xl `}>NHL</h1>
                </Link>
                <Link
                  href={"/schedule"}
                  className="animate-underline text-3xl hover:tracking-wider max-sm:hidden"
                >
                  SCHEDULE
                </Link>
                <Link
                  href={"/standings"}
                  className="animate-underline text-3xl hover:tracking-wider max-sm:hidden"
                >
                  STANDINGS
                </Link>
                <Button className="border p-2 sm:hidden">
                  <LuMenu size={32} />
                </Button>
              </div>
            </div>
            {showPageTitle && (
              <h1
                className={`font-nhl ${nhlFont.variable} mb-10 mt-32 cursor-default text-center text-5xl transition-all hover:tracking-wider`}
              >
                {pageTitle.toUpperCase()}
              </h1>
            )}
            <div
              className={cn("flex w-full flex-col items-center", {
                "mt-32": !showPageTitle,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default Layout;
