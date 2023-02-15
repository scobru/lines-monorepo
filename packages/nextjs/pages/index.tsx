import type { NextPage, } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>L I N E S</title>
        <meta name="description" content="Lines Open Board" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">▤ L I N E S</span>
            <span className="block text-2xl font-base">Open Board</span>
            <Image width={200} height={200} src="/android-chrome-384x384.png" alt="Lines Logo" className="w-1/4 mx-auto my-5" />
          </h1>
          <div className="prose">
            <h1 className="text-center mb-8 text-4xl font-bold">What is this?</h1>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-base">
              <strong>Lines</strong> is a plain-text file stored on the Polygon blockchain. There are 2^256-1 lines on
              this wall. Each line is <strong>100 characters</strong> long.
            </p>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-20 text-xl font-base">
              <strong>LineTweet</strong> is a minimal Twitter-like social network. You can follow other users, create,
              repost, and like posts.
            </p>
            <h1 className="text-center mb-8 text-4xl font-bold">Is it free? </h1>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-base">
              <h1 className="text-center text-2xl font-semibold">LINES</h1>
              <br />
              Creation of new lines is free. Each modification of a line increases the cost for editing by
              <strong> 0.01 MATIC</strong>. If someone replaces your text you will receive 90% of what one has paid.
            </p>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-20 text-xl font-base">
              <h1 className="text-center text-2xl font-semibold">LINETWEETS</h1>
              <br />
              Any time you like , create, repost, or follow an user,
              a small amount of MATIC is transferred to the users
              wallet.
            </p>
            <h1 className="text-center mb-8 text-4xl font-bold">Any Rules?</h1>
            <div className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-base">
              You are free to write whatever you like. The Wall will never be moderated. We believe that freedom of
              speech is one of the unalienable right for every man. Leave a message. It will be stored on-chain.
              Forever.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
