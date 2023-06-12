import {WarpFactory, SourceType} from 'warp-contracts';
const contractId = '-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ';
const warp = WarpFactory.forMainnet()
const c = warp.contract(contractId).setEvaluationOptions({
  sourceType: SourceType.ARWEAVE
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
