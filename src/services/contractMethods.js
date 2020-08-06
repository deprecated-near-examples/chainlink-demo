import Big from 'big.js'
import { utils } from 'near-api-js';

const max_gas = Big(3).times(10 ** 14).toFixed()
const storageStakePayment = utils.format.parseNearAmount('.0365')

//NEAR-LINK change functions
export function makeTransfer(baseAcct){
  window.nearLinkContract
    .transfer({
      new_owner_id: `client.${baseAcct}`,
      amount: "50",
    }, max_gas, storageStakePayment)
    .then(result => 
      console.log(`Transfer done `, result)
    )
}

//NEAR-LINK view functions
export function getAccountBalance(acct){
  window.nearLinkContract
    .get_balance({ 
      owner_id: acct
    })
    .then(result => 
      console.log(`${acct} balance: `, result)
      )
}

export function getAllowance(baseAcct){
  window.nearLinkContract
  .get_allowance({
    owner_id: `client.${baseAcct}`,
    escrow_account_id: `oracle.${baseAcct}`
  })
  .then(result => 
    console.log(`oracle.${baseAcct} allowance: `, result)
    )
}

//Oracle view functions
export function isOracleAuthorized(baseAcct){
  window.oracleContract
    .is_authorized({ 
      node: `oracle-node.${baseAcct}`
    })
    .then(result => 
      console.log('oracle authorized? ', result)
      )
}

export function getOracleRequestSummary(){
  window.oracleContract
    .get_requests_summary({ 
      max_num_accounts: '10'
    })
    .then(result => 
      console.log('oracle request summary: ', result)
      )
}     

export function getOracleRequests(baseAcct){
  window.oracleContract
    .get_requests({
      account: `client.${baseAcct}`,
      max_requests: "10"
    })
    .then(result => console.log(result)) 
}

export function checkWithdrawableTokens(){
  window.oracleContract 
    .get_withdrawable_tokens()
    .then(result => 
      console.log('withdrawable tokens amt: ', result)
      )
}
