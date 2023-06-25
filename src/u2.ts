import {WarpFactory} from 'warp-contracts';
const contractId = 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw';
const warp = WarpFactory.forMainnet()

//const c = warp.contract(contractId).setEvaluationOptions({
//  internalWrites: true,
//  allowBigInt: true,
//  unsafeClient: "skip"
//});

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
