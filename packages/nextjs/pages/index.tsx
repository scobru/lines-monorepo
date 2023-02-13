import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">▤ L I N E S</span>
          </h1>
          <div className="prose">
            <h1 className="text-center mb-8 text-2xl font-semibold">What is this?</h1>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-thin">
              <strong>Lines</strong> is a plain-text file stored on the Polygon blockchain. There are 2^256-1 lines on
              this wall. Each line is <strong>100 characters</strong> long.
            </p>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-thin">
              <strong>LineTweet</strong> is a minimal Twitter-like social network. You can follow other users, create,
              repost, and like posts.
            </p>
            <h1 className="text-center mb-8 text-2xl font-semibold my-5">Is it free? </h1>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-thin">
              <strong>LINES</strong>
              <br />
              Creation of new lines is free. Each modification of a line increases the cost for editing by
              <strong>0.01 MATIC</strong>. If someone replaces your text you will receive 90% of what one has paid.
            </p>
            <p className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-thin">
              <strong>LINETWEETS</strong> <br />
              Any time you like , create, repost, or follow an user, a small amount of MATIC is transferred to the users
              wallet.
            </p>
            <h1 className="text-center mb-8 text-2xl font-semibold my-5">Any Rules?</h1>
            <div className="text-center justify-self-center w-2/4 mx-auto mb-8 text-xl font-thin">
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
