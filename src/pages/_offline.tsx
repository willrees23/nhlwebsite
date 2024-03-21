import Layout from "~/components/Layout";

const OfflinePage = () => {
  return (
    <>
      <Layout pageTitle="Offline">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="font-nhl text-6xl">Offline</h1>
          <p className="text-2xl">You are currently offline.</p>
        </div>
      </Layout>
    </>
  );
};

export default OfflinePage;
