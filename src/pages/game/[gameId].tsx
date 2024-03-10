/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import GameView from "~/components/gameview";
import LoadingPage from "~/components/loading";
import { Button } from "~/components/ui/button";
import { Convert as ScoresConvert } from "~/lib/scoresResult";
import { api } from "~/utils/api";

const GamePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { gameId } = router.query;
  const date = searchParams.get("date");

  const scoresNow = api.post.scoresNow.useQuery(
    date as string | void | undefined,
  );

  if (scoresNow.error || scoresNow.data === undefined) {
    return <LoadingPage />;
  }

  console.log(scoresNow.data);

  const scoresJsonString = JSON.stringify(scoresNow.data, null, 2);
  const nhlScores = ScoresConvert.toScoresResult(scoresJsonString);

  return (
    <>
      <Layout pageTitle="Game View">
        <Button
          className="mb-2 bg-transparent"
          onClick={() => {
            void scoresNow.refetch();
          }}
          variant={"outline"}
        >
          {scoresNow.isFetching ? "Refreshing..." : "Refresh"}
        </Button>
        <div className="flex w-full justify-center p-3">
          <div className="flex min-h-fit w-10/12 flex-col items-center rounded-lg bg-opacity-20">
            <GameView
              gameId={gameId as unknown as number}
              scoresNow={nhlScores}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default GamePage;
