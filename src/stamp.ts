// from warp gateway
import {WarpFactory, SourceType} from 'warp-contracts';
const contractId = 'TlqASNDLA1Uh8yFiH-BzR_1FDag4s735F3PoUFEv2Mo';
const warp = WarpFactory.forMainnet()
const c = warp.contract(contractId).setEvaluationOptions({
  allowBigInt: true,
  unsafeClient: "skip",
  sourceType: SourceType.WARP_SEQUENCER

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
