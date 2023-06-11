import { defaultCacheOptions, WarpFactory} from 'warp-contracts'
const contractId = '-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ';
const warp = WarpFactory.forMainnet(defaultCacheOptions, true)
const c = warp.contract(contractId)
async function getState() {
  try {
    const { sortKey, cachedValue } = await c.readState();

    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}

getState()

