import {WarpFactory} from 'warp-contracts';
import path from 'path';
import * as fs from 'fs';
const contractId = 'rO8f4nTVarU6OtU2284C8-BIH6HscNd-srhWznUllTk';

const warp = WarpFactory.forMainnet()
const contract = warp.contract(contractId);

// connect wallet
const wallet = JSON.parse(fs.readFileSync(path.join("./G1ylJbqKaG-qL7LexEHtyKp1sgJ_Q0l52vsNvbOLRdU.json"), 'utf-8'));
contract.connect(wallet);

async function transfer(to: string, amount: number) {
  try {
    const result = await contract.writeInteraction({
      function: 'transfer',
      qty: amount,
      target: to,
    });
    console.log('transfer tx:', result);
  } catch (error) {
    console.log('transfer error:', error);
  }
}

transfer("FyINHRSrHW0teUhvJzd6R33Tl50qxLnSj8LJCP5puiI", 1);
