import {WarpFactory, defaultCacheOptions, ArweaveGatewayBundledContractDefinitionLoader, ArweaveGatewayBundledInteractionLoader} from 'warp-contracts';
import Arweave from 'arweave';
import fs from 'fs';
import path from 'path';
import {LmdbCache} from "warp-contracts-lmdb";
import { VM2Plugin } from 'warp-contracts-plugin-vm2';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 200000
});

const volumeDir = './fileCache';
if (!fs.existsSync(volumeDir)) {
  fs.mkdirSync(volumeDir);
}


const arContractLoader = new ArweaveGatewayBundledContractDefinitionLoader('mainnet');
const arInteractionLoader = new ArweaveGatewayBundledInteractionLoader(arweave, 'mainnet');
const contractId = 'TlqASNDLA1Uh8yFiH-BzR_1FDag4s735F3PoUFEv2Mo';
const warp = WarpFactory.custom(
  arweave,
  defaultCacheOptions,
  'mainnet'
)
  .useArweaveGateway()
  .setInteractionsLoader(arInteractionLoader)
  .setDefinitionLoader(arContractLoader)
  .build()
  .use(new VM2Plugin())
  .useStateCache(new LmdbCache({inMemory:false, dbLocation:path.join(volumeDir, 'arweave/state')}))


const c = warp.contract(contractId).setEvaluationOptions({
  allowBigInt: true,
  unsafeClient: "skip"
});

async function getState() {
  try {
    const { sortKey, cachedValue } = await c.readState();
    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}

getState()