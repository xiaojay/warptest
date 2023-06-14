// from everpay gateway
import {WarpFactory, defaultCacheOptions, ArweaveGatewayInteractionsLoader} from 'warp-contracts';
import Arweave from 'arweave';

const everpay = Arweave.init({
  host: 'arweave-dev.everpay.io',
  port: 443,
  protocol: 'https',
  timeout: 200000
});

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 200000
});

const arLoader = new ArweaveGatewayInteractionsLoader(everpay, 'custom')

const contractId = '-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ';
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

//arLoader.arweaveTransactionQuery.arweaveWrapper.baseUrl = "https://arweave-dev.everpay.io"

arLoader.warp =  WarpFactory.forMainnet(defaultCacheOptions, false, everpay)
const a = warp.contract(contractId)

async function getBarState() {
  try {
    const { sortKey, cachedValue } = await a.readState();

    console.log(sortKey, cachedValue.errorMessages, cachedValue.state, cachedValue.validity)
  } catch (error) {
    console.log('readState error:', error, 'contractId:', contractId);
  }
}
getBarState();
