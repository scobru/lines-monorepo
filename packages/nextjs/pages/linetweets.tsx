import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useContract, useProvider, useNetwork, useSigner, useAccount } from "wagmi";

import { getDeployedContract } from "../components/scaffold-eth/Contract/utilsContract";
import { ContractInterface } from "ethers";
import { toast } from "~~/utils/scaffold-eth";
import { HeartIcon, ArrowPathIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import { formatEther } from "ethers/lib/utils.js";
const LineTweets: NextPage = () => {
  // Define Tweet type
  type Tweet = {
    id: number;
    author: string;
    message: string;
    likes: number;
    retweets: string;
    createdAt: number;
  };

  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const account = useAccount();
  const provider = useProvider();

  const [followPrice, setFollowPrice] = React.useState(0);
  const [likePrice, setLikePrice] = React.useState(0);
  const [reTweetPrice, setReTweetPrice] = React.useState(0);
  const [listTweet, setListTweet] = React.useState<Tweet[]>([]);
  const [message, setMessage] = React.useState("");
  const [userSearch, setUserSearch] = React.useState("");
  const deployedContract = getDeployedContract(chain?.id.toString(), "LineTweets");
  const [followerCount, setFollowerCount] = React.useState(0);
  let ctxAddress!: string;
  let ctxAbi: ContractInterface = [];

  if (deployedContract) {
    ({ address: ctxAddress, abi: ctxAbi } = deployedContract);
  }

  const ctx = useContract({
    address: ctxAddress,
    abi: ctxAbi,
    signerOrProvider: signer ? signer : provider,
  });

  // function to get contract data
  const getContractData = async function getContractData() {
    if (ctx) {
      const followPrice = await ctx.FOLLOW_PRICE();
      const likePrice = await ctx.LIKE_PRICE();
      const reTweetPrice = await ctx.RETWEET_PRICE();
      const tweetList: Tweet[] = await ctx?.getTweets();
      setFollowPrice(Number(followPrice));
      setLikePrice(Number(likePrice));
      setReTweetPrice(Number(reTweetPrice));
      setListTweet(tweetList);
      getFollowerCount();

      console.log(tweetList);
      console.log(ctx);
      console.log("followPrice: ", followPrice, "likePrice: ", likePrice, "reTweetPrice: ", reTweetPrice);
    }
  };

  useEffect(() => {
    if (ctx) {
      getContractData();
    }
  }, [ctx]);

  const getAllTweetsForUser = async function getAllTweetsForUser(user: string) {
    if (ctx && account) {
      const tweetList: Tweet[] = await ctx?.getTweets();
      const len = tweetList.length;
      const tweetList2: Tweet[] = await ctx?.getTweetsOf(user, len);
      setListTweet(tweetList2);
    }
  };

  // function to tweet new message
  const tweet = async function tweet() {
    if (ctx && message) {
      const tx = await ctx.tweet(message);
      toast.info("Tweeting...");
      await tx.wait();
      toast.success("Tweeted!");
      setMessage("");
      getContractData();
    }
  };

  // function to like a tweet
  const like = async function like(id: number) {
    if (ctx && account && likePrice) {
      const tx = await ctx.like(id, { value: likePrice });
      toast.info("Liking...");
      await tx.wait();
      toast.success("Liked!");
    }
  };

  // function to retweet a tweet
  const reTweet = async function reTweet(id: number) {
    if (ctx && account && reTweetPrice) {
      const tx = await ctx.retweet(id, { value: reTweetPrice });
      toast.info("Retweeting...");
      await tx.wait();
      toast.success("Retweeted!");
    }
  };

  // function to follow a user
  const follow = async function follow(address: string) {
    if (ctx && account && followPrice) {
      const tx = await ctx.follow(address, { value: followPrice });
      toast.info("Following...");
      await tx.wait();
      toast.success("Followed!");
    }
  };

  const getFollowerCount = async function getFollowerCount() {
    if (ctx && signer) {
      const followerCount = await ctx.getFollowersCount(signer?.getAddress());
      setFollowerCount(Number(followerCount));
    }
  };


  return (
    <>
      <Head>
        <title>L I N E S</title>
        <meta name="description" content="Lines Open Board" />
      </Head>
      <div className="flex flex-col flex-grow w-3/4 justify-center text-left mx-auto my-5">
        <div className="flex flex-col w-full">
          <input type="checkbox" id="modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box flex flex-col">
              <div className="text-2xl font-bold my-5 text-center">Post</div>
              <textarea
                className="textarea border-2 border-gray-300 bg-gray-300 h-60 mx-auto px-5 rounded-lg focus:outline-none w-full text-lg text-black"
                name="message"
                placeholder="What's happening?"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-5 mx-auto py-2 px-5 rounded w-1/4"
                onClick={tweet}
              >
                Send
              </button>

              <div className="modal-action">
                <label htmlFor="modal" className="btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
        <label htmlFor="modal" className="btn btn-secondary rounded font-bold w-1/4 mx-auto my-5 ">
          POST
        </label>
        <div className="flex flex-col justify-center items-center mx-auto my-5 w-3/4">
          <input
            className="border-2 border-gray-300 bg-gray-300 h-10 mx-auto px-5 py-2 rounded-lg focus:outline-none w-2/4 text-lg text-black"
            type="text"
            name="userSearch"
            placeholder="Search for a user"
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-5  py-2 px-5 rounded w-2/4"
            onClick={() => getAllTweetsForUser(userSearch)}
            disabled={userSearch == ""}
          >
            search
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-5 py-2 px-5 rounded w-2/4"
            onClick={getContractData}
          >
            Reset
          </button>
          <div className="flex flex-row justify-center items-center">
            <div className="text-base font-bold my-2 text-center mx-2">
              Follow <div className="font-light"> {formatEther(followPrice)}  </div>
            </div>{" "}
            <div className="text-base font-bold my-2 text-center mx-2">
              Like <div className="font-light"> {formatEther(likePrice)}  </div>
            </div>{" "}
            <div className="text-base font-bold my-2 text-center mx-2">
              Repost <div className="font-light"> {formatEther(reTweetPrice)}   </div>
            </div>{" "}
          </div>
          <div className="text-xl font-bold align-text-top items-start justify-start text-left w-full h-full mx-5 px-10">
            <UsersIcon className=" w-8 h-8" />{''} <div className="font-base"> {followerCount} </div>
          </div>{" "}
          {listTweet.map((tweet, index) => (
            // create a card for each tweet
            <div className="card card-body card-compact card-bordered w-full" key={index}>
              <div className="border-2">
                <div className="flex flex-row">
                  <button
                    className="card-title mx-4 text-primary text-xl hover:font-bold hover:text-gray-500 justify-start  text-left"
                    onClick={() => getAllTweetsForUser(tweet.author)}
                  >
                    {tweet.author}
                  </button>
                  <div className="card-title ml-auto px-2 text-sm text-primary justify-end  text-right">
                    <p>
                      {new Date(Number(tweet.createdAt) * 1000).toLocaleString("en-US", {
                        timeZone: "Europe/Rome",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="card-title text-2xl font-mono mx-4">
                    <p>{tweet.message}</p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <button className="flex flex-row items-center mx-3" onClick={() => like(tweet.id)}>
                    <HeartIcon className="h-5 w-5 text-red-500" />
                    <p className="ml-1">{Number(tweet.likes)} </p>
                  </button>
                  <button className="flex flex-row items-center mx-3" onClick={() => reTweet(tweet.id)}>
                    <ArrowPathIcon className="h-5 w-5 text-red-500" />
                    <p className="ml-1">{Number(tweet.retweets)} </p>
                  </button>
                  <button className="flex flex-row items-center mx-3" onClick={() => follow(tweet.author)}>
                    <UserPlusIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LineTweets;
