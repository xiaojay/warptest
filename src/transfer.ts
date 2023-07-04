import {WarpFactory} from 'warp-contracts';
import path from 'path';
import * as fs from 'fs';
//const contractId = 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw';
const contractId = 'TlqASNDLA1Uh8yFiH-BzR_1FDag4s735F3PoUFEv2Mo';
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

transfer("8PpH2ICURWN8B8w2_J85ejNwXJCb229_4PgWEVTrlxM", 1000000000000);
