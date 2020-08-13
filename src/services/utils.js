import { connect, Contract, keyStores, KeyPair } from 'near-api-js'
import { functionCall } from 'near-api-js/lib/transaction';
import transfer from '../services/contractMethods'

//const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: `$client.${process.env.ACCOUNT_ID}.testnet`,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

export async function initContract() {    
  const keyStore = new keyStores.InMemoryKeyStore()
  const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  console.log(keyPair)
  //sets key in memory
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
  const near = await connect(Object.assign({ deps: { keyStore: keyStore } }, nearConfig))
  window.near = near

  window.clientAcct = await near.account(`$client.${process.env.ACCOUNT_ID}.testnet`)

}

export function convertArgs(tokenSymbol) {
  const obj = {
    get: `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=USD`,
    path: 'USD',
    times: 100
  }
  return btoa(JSON.stringify(obj))
}

export async function onSubmit(event) {
  event.preventDefault()
  // get elements from the form using their id attribute
  const { fieldset, greeting } = event.target.elements
  // disable the form while the value gets updated on-chain
  fieldset.disabled = true
  try {
    // make an update call to the smart contract
    let balance = await contract.get_balance({
      // pass the value that the user entered in the greeting field
      owner_id: window.accountId
    })
    console.log(balance)
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  } finally {
    // re-enable the form, whether the call succeeded or failed
    fieldset.disabled = false
  }
}
export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}
export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}