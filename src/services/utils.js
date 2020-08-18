import { connect, keyStores, KeyPair } from 'near-api-js'
const nearAcct = process.env.NEAR_ACCT

//configuration for connection to NEAR
const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: `client.${process.env.NEAR_ACCT}`,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

// These get set the first time we attempt a connection, and get
// returned by getNear and getClientAcct below so we aren't unnecessarily
// making more calls
let near;
let clientAcct;

async function connectToNear() {
  const keyStore = new keyStores.InMemoryKeyStore()
  const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  //sets key in memory
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
  return await connect(Object.assign({ deps: { keyStore: keyStore } }, nearConfig))
}

export async function getNear() {
  return near || await connectToNear();
}

//connect to contract using .env private key
export async function initContract() {
  return await (await getNear()).account(`client.${nearAcct}`)
}

export async function getClientAcct() {
  return clientAcct || await initContract();
}

