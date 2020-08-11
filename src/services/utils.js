import { connect, Contract, keyStores, KeyPair } from 'near-api-js'
import { functionCall } from 'near-api-js/lib/transaction';
//const nearConfig = getConfig(process.env.NODE_ENV || 'development')

const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: "near-link.joshford.testnet",
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

export async function initContract() {    
  const keyStore = new keyStores.InMemoryKeyStore()
  // const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  const keyPair = KeyPair.fromString(process.env.NEARLINK_PRIVATE_KEY)
  //sets key in memory
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
  const near = await connect(Object.assign({ deps: { keyStore: keyStore} }, nearConfig))
  window.near = near

  window.nearLinkAcct = await near.account(nearConfig.contractName)
  console.log('window.nearLinkAccount: ', window.nearLinkAcct)
  console.log('near-link accountID', window.nearLinkAcct.accountId)

  // const transferArgs = {
  //   "new_owner_id": "joshford.testnet",
  //   "amount": "1" // because numbers can be enormous and JavaScript sux we send most amounts as strings
  // }
  // await window.nearLinkAcct.functionCall(
  //   window.nearLinkAcct.accountId,
  //   'transfer',
  //   transferArgs,
  //   null,
  //   '36500000000000000000000'
  // )
  
  // window.nearLinkContract = await new Contract(nearLink, nearConfig.contractName, 
  //     {
  //       viewMethods: ['get_balance', 'get_allowance' ],
  //       changeMethods: [ 'transfer', 'inc_allowance', 'transfer_from' ],
  //     }
  //   )
  
  window.oracleContract = await new Contract(
    await near.account('oracle.joshford.testnet'), 
    'oracle.joshford.testnet', 
      { 
        viewMethods: [
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

const transferArgs = {
  "new_owner_id": "client.joshford.testnet",
  "amount": "1"
}

const handleSubmit = () => {
  transfer(transferArgs);
 // getAccountBalance(baseAcct);
  // getAccountBalance('near-link.joshford.testnet');
  // getAccountBalance(oracleAcct);
  // getAllowance(baseAcct)
  // isOracleAuthorized();
  // getOracleRequestSummary();
  // getOracleRequests(baseAcct);
  // checkWithdrawableTokens();
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