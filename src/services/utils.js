import { connect, Contract, keyStores, WalletConnection, KeyPair} from 'near-api-js'
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores';
//const nearConfig = getConfig(process.env.NODE_ENV || 'development')
const nearConfig = {
  networkId: 'default',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: "near-link.joshford.testnet",
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

export async function initContract() {    
  const keyStore = new keyStores.InMemoryKeyStore()
  const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  const near = await connect(Object.assign({ deps: { keyStore: keyStore} }, nearConfig))
  const nearLink = await near.account('near-link.joshford.testnet')
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)

  console.log('key_pair', keyPair)
  console.log('keyStore', keyStore)

  window.walletConnection = new WalletConnection(near)
  window.accountId = window.walletConnection.getAccountId()

  window.nearLinkContract = await new Contract(nearLink, nearConfig.contractName, 
      {
        viewMethods: ['get_balance', 'get_allowance' ],
        changeMethods: [ 'transfer', 'inc_allowance', 'transfer_from' ],
      }
    )
  
  window.oracleContract = await new Contract(
    await near.account('oracle.joshford.testnet'), 
    'oracle.joshford.testnet', 
      { viewMethods: [
          'is_authorized', 
          'get_requests_summary', 
          'get_requests',
          'get_all_requests',
          'get_withdrawable_tokens' 
        ],
        changeMethods: [ 
          'add_authorization',
          'fulfill_request',
          'request'
        ],
      }
    )
}
// attached to the form used to update the greeting
// in utils because it works with a vanilla JS or a React approach
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