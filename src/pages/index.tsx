/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Link from "next/link";
import Layout from "~/components/Layout";

export default function Home() {
  return (
    <>
      <Layout pageTitle="NHL Unofficial" showPageTitle={false}>
        <div className="flex flex-col items-center justify-center py-2 text-center">
          <h1 className="text-5xl font-bold">Welcome to NHL Unofficial!</h1>
          <p className="mt-3 text-xl">
            This is a website that uses the{" "}
            <Link
              href={"https://api-web.nhle.com/v1/"}
              target="_blank"
              className="animate-underline text-blue-500 transition-all duration-700"
            >
              NHL API
            </Link>{" "}
            to display game schedules, results and league standings.
          </p>
          <p className="mt-3 text-xl">
            This website is a work in progress and is not affiliated with the
            National Hockey League.
          </p>
          <div className="*:animate-underline mt-10 flex flex-col items-center justify-center space-x-3 rounded-md border p-6 text-3xl *:text-center md:flex-row">
            <Link href={"/"} className="text-blue-500 ">
              HOME
            </Link>
            <span>|</span>
            <Link href={"/schedule"} className="text-blue-500 ">
              SCHEDULE
            </Link>
            <span>|</span>
            <Link href={"/standings"} className="text-blue-500 ">
              STANDINGS
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
