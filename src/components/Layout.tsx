import Head from "next/head";

type LayoutProps = {
  pageTitle: string;
  // children is collection of JSX elements, not just React.ReactNode
  children: React.ReactNode;
};

const Layout = ({ pageTitle, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className="-z-50 h-fit w-screen max-w-full text-white ">
        <div className="h-full pt-5">{children}</div>
      </main>
    </>
  );
};

export default Layout;
