import { defaultCacheOptions, WarpFactory} from 'warp-contracts'
const contractId = 'rO8f4nTVarU6OtU2284C8-BIH6HscNd-srhWznUllTk';
const warp = WarpFactory.forMainnet(defaultCacheOptions, true)
const c = warp.contract(contractId).setEvaluationOptions({
  internalWrites: true,
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

