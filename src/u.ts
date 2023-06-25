import {WarpFactory, defaultCacheOptions,  ArweaveGatewayBundledInteractionLoader} from 'warp-contracts';
import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 200000
});

const arLoader = new ArweaveGatewayBundledInteractionLoader(arweave, 'mainnet');
const contractId = 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw';
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

const u = warp.contract(contractId).setEvaluationOptions({
  internalWrites: true,
  allowBigInt: true,
  unsafeClient: "skip"
});

async function getBarState() {
  try {
    const { sortKey, cachedValue } = await u.readState();

    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}
getBarState()