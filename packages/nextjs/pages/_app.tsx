import "~~/styles/globals.css";

import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";

import "@rainbow-me/rainbowkit/styles.css";
import { appChains } from "~~/services/web3/wagmiConnectors";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import Header from "~~/components/Header";
import Footer from "~~/components/Footer";

import { useEffect } from "react";
import { useAppStore } from "~~/services/store/store";
import { useEthPrice } from "~~/hooks/scaffold-eth";

import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/evm-utils";


if (Moralis.start) {
  Moralis.start({
    apiKey: 'P5PxBDMKWp0SyTDt9aDt5aVu3zbLETtBUNIKPSI1QEQVc7apdkEeri9LB1muHb50',
  });
}

const stream = {
  chains: [EvmChain.ETHEREUM, EvmChain.POLYGON], // list of blockchains to monitor
  description: "monitor Scobru wallet", // your description
  tag: "scobru", // give it a tag
  webhookUrl: "https://webhook.site/53e81f4f-f4c7-4b52-88ed-908ccf57ad25", // webhook url to receive events,
  includeNativeTxs: true
}

async function addStream() {
  const newStream = await Moralis.Streams.add(stream);
  const { id } = newStream.toJSON(); // { id: 'YOUR_STREAM_ID', ...newStream }
  console.log(newStream)

  const address = "0xb542E27732a390f509fD1FF6844a8386fe320f7f";
  await Moralis.Streams.addAddress({ address, id });
}


import NextNProgress from "nextjs-progressbar";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useEthPrice();
  const setEthPrice = useAppStore(state => state.ethPriceSlice.setEthPrice);

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price);
    }

  }, [setEthPrice, price]);

  useEffect(() => {
    addStream();
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <NextNProgress />
      <RainbowKitProvider chains={appChains.chains}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
