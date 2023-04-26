import type { NextPage } from "next";
import Head from "next/head";
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
      <div className="flex   pt-10">
        <div className="px-2">
          <h1 className="text-center mb-20">
            <span className="block text-6xl font-black">▤ L I N E S</span>
            <span className="block text-43xl font-extralight m-2">Open Board</span>
          </h1>

          <div className="prose justify-center">
            <h1 className="text-center mb-5 text-4xl font-bold"></h1>
            <p className=" justify-between  w-3/4 mx-auto m-10 font-base text-justify font-semibold ">
              <p className="text-justify text-5xl md:w-2/4 sm:w-4/4 mx-auto">
                Join the digital communication revolution with our decentralized app that removes the power of big
                corporations over your data and opinions.
              </p>
              <br />
              <p className="text-justify text-3xl md:w-2/4 sm:w-4/4 mx-auto font-light">
                Be part of the user community that is creating a new way of communicating online, without intermediaries
                and without compromises on privacy and freedom of expression.
              </p>
            </p>
            {/* <p className="text-justify justify-self-center w-3/4 mx-auto mb-10 text-2xl font-base">
              <strong>Lines</strong> is a plain-text file stored on the Polygon blockchain. There are 2^256-1 lines on
              this wall. Each line is <strong>100 characters</strong> long.
              <strong>LineTweet</strong> is a minimal Twitter-like social network. You can follow other users, create,
              repost, and like posts.
            </p>
            <h1 className="text-center mb-5 text-6xl font-bold">Is it free? </h1>
            <p className="text-justify justify-self-center w-3/4 mx-auto mb-10 text-2xl font-base">
              <h1 className="text-center text-2xl font-semibold ">LINES</h1>
              <br />
              Creation of new lines is free. Each modification of a line increases the cost for editing by
              <strong> 0.01 MATIC</strong>. If someone replaces your text you will receive 90% of what one has paid.
            </p>
            <p className="text-justify justify-self-center w-3/4 mx-auto mb-10 text-2xl font-base">
              <h1 className="text-center text-2xl font-semibold">LINES TWEETS</h1>
              <br />
              Any time you like , create, repost, or follow an user, a small amount of MATIC is transferred to the users
              wallet.
            </p>
            <h1 className="text-center mb-5 text-6xl font-bold">Any Rules?</h1>
            <p className="text-justify justify-self-center w-3/4 mx-auto mb-10 text-2xl font-base">
              You are free to write whatever you like. The Wall will never be moderated. We believe that freedom of
              speech is one of the unalienable right for every man. Leave a message. It will be stored on-chain.
              Forever.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
