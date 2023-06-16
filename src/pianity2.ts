// from warp gateway
import {WarpFactory, SourceType} from 'warp-contracts';
import { VM2Plugin } from 'warp-contracts-plugin-vm2';

const contractId = 'n05LTiuWcAYjizXAu-ghegaWjL89anZ6VdvuHcU6dno';
const warp = WarpFactory.forMainnet().use(new VM2Plugin());
const c = warp.contract(contractId).setEvaluationOptions({
  allowBigInt: true,
  unsafeClient: 'allow',
  //useVM2: false,
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
