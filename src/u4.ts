import {WarpFactory} from 'warp-contracts-temp';
import {LmdbCache} from "warp-contracts-lmdb";
import { VM2Plugin } from 'warp-contracts-plugin-vm2';
import path from 'path';
import fs from 'fs';

const volumeDir = './fileCache';
if (!fs.existsSync(volumeDir)) {
  fs.mkdirSync(volumeDir);
}

const contractId = 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw';
const warp = WarpFactory.forMainnet()
  .use(new VM2Plugin())
  .useStateCache(new LmdbCache({inMemory: false, dbLocation: path.join(volumeDir, 'redstone/state')}))


const c = warp.contract(contractId).setEvaluationOptions({
 internalWrites: true,
 allowBigInt: true,
 unsafeClient: "skip"
});

//const c = warp.contract(contractId)

async function getState() {
  try {
    const { sortKey, cachedValue } = await c.readState();

    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}

getState()
