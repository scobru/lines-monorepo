# Lines ▤

> ⚠️ This project is currently under active development. Things might break. Feel free to check the open issues & create new ones.

## **🤔 What is this?**

Lines is a decentralized message board.

* It is a place where you can leave a message for others.
* It is a place where you can read messages left by others.
* It is a place where you can express yourself.
* It is a place where you can be free.

Lines is a plain-text file stored on the Polygon blockchain. There are 2^256-1 lines on this wall. Each line is 100 characters long. The Wall will never be moderated. We believe that freedom of speech is one of the unalienable right for every man. Leave a message. It will be stored on-chain. Forever. Check out the website to try it yourself.

***

## **👛 Is it free?**

### **Lines Board**

Creation of new lines is free. Each modification of a line increases the cost for editing by 0.01 MATIC. If someone replaces your text you will receive 90% of what one has paid.

### **Line Tweets**

Any time you like , create, repost, or follow an user, a small amount of MATIC is transferred to the user's wallet. The more followers you have, the more you earn.

```
FOLLOW_PRICE = 0.0015;
LIKE_PRICE = 0.001;
RETWEET_PRICE = 0.0025;
```

***

## **📖 Any Rules?**

You are free to write whatever you like. The Wall will never be moderated. We believe that freedom of speech is one of the unalienable right for every man. Leave a message. It will be stored on-chain. Forever.

***

## **💻 Deployments**

Polygon Mainnet

* Lines v1 : 0x31215c9C7fa6241765547F0b13e5A21d229C5168.
* LineTweets v1 : 0x85044CDDA4f445E605888BEf29Ad137c3317f0B1

***

## **Packages 📦**

* [hardhat](packages/hardhat/) - Hardhat smart contracts for the Lines project
* [nextjs](packages/nextjs/) - NextJS frontend for the Lines project

***

## **Quickstart 🚀**

### 1. Clone this repo & install dependencies

```bin/bash

git clone <https://github.com/Lines/lines-monorepo.git>
cd lines-monorepo
yarn install

```

### 2. Run a local network in the first terminal

```bin/bash

yarn chain

```

### 3. On a second terminal, deploy the test contract

```bin/bash

yarn deploy

```

### 4. On a third terminal, start your NextJS app

```bin/bash

yarn start

```

***

&#x20;        &#x20;

## **Deploying Smart Contracts ⚒️**

Once you are ready to deploy your smart contracts, there are a few things you need to adjust.

### 1: Select the network

By default, `yarn deploy` will deploy the contract to the local network. You can change the defaultNetwork in `packages/hardhat/hardhat.config.js.` You could also simply run `yarn deploy --network target_network` to deploy to another network.

Check the `hardhat.config.js` for the networks that are pre-configured. You can also add other network settings to the `hardhat.config.js file`. Here are the [Alchemy docs](https://docs.alchemy.com/docs/how-to-add-alchemy-rpc-endpoints-to-metamask) for information on specific networks.

### 2: Generate a new account or add one to deploy the contract(s) from. Additionally you will need to add your Alchemy API key. Rename `.env.example` to `.env` and fill the required keys

```

ALCHEMY_API_KEY="",
DEPLOYER_PRIVATE_KEY=""

```

The deployer account is the account that will deploy your contracts and execute calls you make in your deployment script.

You can generate a random account / private key with `yarn generate` or add the private key of your crypto wallet. `yarn generate` will create a random account and add the DEPLOYER\_PRIVATE\_KEY to the .env file. You can check the generated account with `yarn account`.

### 3: Deploy your smart contract(s)

Run the command below to deploy the smart contract to the target network. Make sure to have some funds in your deployer account to pay for the transaction.

```bash

yarn deploy --network network_name

```

## **Deploying your NextJS App 📡**

Run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

**Make sure your `.env.production` file has the values you need.**

**Hint**: We recommend connecting the project GitHub repo to Vercel so you the gets automatically deployed when pushing to `main`

## Contributing to Lines 👨‍👩‍👧‍👦

We welcome contributions to Lines !

Please see [CONTRIBUTING.MD](https://github.com/scobru/lines-monorepo/blob/master/CONTRIBUTING.md) for more information and guidelines for contributing to Lines .
