import { connect, keyStores, KeyPair } from 'near-api-js'

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
  // sets key in memory
  if (nearConfig.contractName.endsWith('undefined') || nearConfig.contractName.substr(nearConfig.contractName.length -1) === '.') {
    console.warn('Please make sure you have set environment variables NEAR_ACCT and CLIENT_PRIVATE_KEY')
    return null;
  } else {
    const keyStore = new keyStores.InMemoryKeyStore()
    const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
    await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
    near = await connect(Object.assign({ deps: { keyStore } }, nearConfig))
    return near;
  }
}

export async function getNear() {
  return near || await connectToNear();
}

//connect to contract using .env private key
export async function initContract() {
  const initNear = await getNear();
  if (initNear) {
    clientAcct = await initNear.account(near.config.contractName)
    return clientAcct;
  }
}

export async function getClientAcct() {
  return clientAcct || await initContract();
}

