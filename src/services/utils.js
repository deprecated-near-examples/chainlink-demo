import { connect, keyStores, KeyPair } from 'near-api-js'

const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: `client.${process.env.ACCOUNT_ID}.testnet`,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

export async function initContract() {    
  const keyStore = new keyStores.InMemoryKeyStore()
  const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  //sets key in memory
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
  const near = await connect(Object.assign({ deps: { keyStore: keyStore } }, nearConfig))
  window.near = near
  window.clientAcct = await near.account(`client.${process.env.ACCOUNT_ID}.testnet`)

}

export function convertArgs(tokenSymbol) {
  const obj = {
    get: `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD`,
    path: 'USD',
    times: 100
  }
  return btoa(JSON.stringify(obj))
}


export async function getBlock(blockHash) {
  const config = {
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
  }

  const near = await connect(Object.assign(config, { deps: { keyStore: new keyStores.InMemoryKeyStore() }}));
  // const blockInfoByHeight = await near.connection.provider.block({
  //   blockId: 12406248,
  // })
  // console.log('blockInfoByHeight', blockInfoByHeight)
  const blockInfoByHash = await near.connection.provider.block({
    blockId: blockHash,
  })
  console.log('blockInfoByHash', blockInfoByHash)
};