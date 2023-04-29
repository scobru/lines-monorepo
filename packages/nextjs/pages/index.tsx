import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>▤ L I N E S</title>
        <meta name="description" content="Lines Open Board" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen  bg-[url('../assets/background.jpg')] bg-cover bg-opacity-80">
        <div className="max-w-2xl px-6 py-20 text-center text-white">
          <h1 className="mb-10 text-8xl font-bold uppercase">▤ L I N E S</h1>
          <p className="mt-4 text-5xl font-medium">Record your thoughts, ideas, and feelings on the blockchain.</p>
          <p className="mt-8 text-3xl font-medium">Free, uncensored, and forever.</p>
          {/*           <img src="https://picsum.photos/1200/600" alt="Random image" className="mx-auto mt-10 rounded-lg shadow-xl" />
           */}{" "}
        </div>
      </div>
    </>
  );
};

export default Home;
