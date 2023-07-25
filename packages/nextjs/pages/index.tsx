import type { NextPage } from "next";
import Head from "next/head";
import tierBanner from "../public/assets/banner.png"
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lines</title>
        <meta name="description" content="Lines Open Board" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="max-w-3xl text-center items-center my-10 mx-auto">
        <div className="max-w-2xl px-6 py-2 text-center">
          <Image src={tierBanner} alt="Tiers Banner" className="mx-auto mb-10 justify-start" />
          <p className="mt-8 text-3xl font-medium">Free, uncensored, and forever.</p>
          <p className="mt-4 text-xl font-regular">Record your thoughts, ideas, and feelings on the blockchain.</p>

          {/*           <img src="https://picsum.photos/1200/600" alt="Random image" className="mx-auto mt-10 rounded-lg shadow-xl" />
           */}{" "}
        </div>
      </div>
    </>
  );
};

export default Home;
