/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { Convert as ScoresConvert } from "~/lib/scoresResult";
import GameView from "~/components/gameview";
import { useSearchParams } from "next/navigation";
import LoadingPage from "~/components/loading";

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
        <div className="flex w-full justify-center py-20">
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
