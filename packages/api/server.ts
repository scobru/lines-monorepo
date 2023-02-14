
const contracts = require('./abi/hardhat_contracts.json');
const express = require('express');
//web3 add
const Web3 = require('web3')

// connection web3 provider mainnet polygon
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mainnet.g.alchemy.com/v2/X6EqG4ygSzVHfKVW1-xEoekBBCNQAtcY"));
// fetch chain id from web3
const abi = contracts['137'][0].contracts['Lines'].abi;
const address = contracts['137'][0].contracts['Lines'].address;

const ctx = new web3.eth.Contract(abi, address);
const app = express();
const port = process.env.PORT || 5000;

async function startApi() {
    app.get('/api/hello', (req: any, res: { send: (arg0: { express: string; }) => void; }) => {
        res.send({ express: 'Hello From Express' });
    });

    app.get('/api/lines/:fetch', async (req: { query: { uids: any; }; }, res: { send: (arg0: { express: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; }) => {
        try {
            console.log(req.query.uids)
            // eplode array
            let result = req.query.uids
            // convert to number
            let val = await ctx.methods.getLines(0, Number(result)).call();
            // formatting result
            let formattedResult = val.map((item: any[]) => {
                return {
                    uid: item[0],
                    line: item[1],
                    edits: item[2],
                }
            })
            res.send({ express: formattedResult });

        } catch (e: any) {
            const error = e.toString();
            res.status(400).json({ error });
        }

    });


    app.listen(port, () => console.log(`Listening on port ${port}`));
}

// define main function
async function main() {
    try {
        await startApi();
    } catch (e) {
        console.log(e);
    };
}
main()



