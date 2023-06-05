import {WarpFactory, defaultCacheOptions,  ArweaveGatewayBundledInteractionLoader} from 'warp-contracts';
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 200000
});

const arLoader = new ArweaveGatewayBundledInteractionLoader(arweave, 'mainnet');
const contractId = 'rO8f4nTVarU6OtU2284C8-BIH6HscNd-srhWznUllTk';
const warp = WarpFactory.custom(
  arweave,
  {
    ...defaultCacheOptions,
    inMemory: true,
  },
  'mainnet'
)
  .useArweaveGateway()
  .setInteractionsLoader(arLoader)
  .build();

const bar = warp.contract(contractId);

async function getBarState() {
  try {
    const { sortKey, cachedValue } = await bar.readState();

    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}
getBarState()