//NEAR-LINK Functions
export function getAccountBalance(account){
  window.nearLinkContract
    .get_balance({ 
      owner_id: account
    })
    .then(result => console.log(result))
}

export function getAllowance(baseAccount){
  window.nearLinkContract
  .get_allowance({
    owner_id: `client.${baseAccount}`,
    escrow_account_id: `oracle.${baseAccount}`
  })
  .then(result => console.log(result))

}

//Oracle Functions
export function isOracleAuthorized(baseAccount){
  window.oracleContract
    .is_authorized({ 
      node: `oracle-node.${baseAccount}`
    })
    .then(result => console.log(result))
}

export function getOracleRequestSummary(){
  window.oracleContract
    .get_requests_summary({ 
      max_num_accounts: '10'
    })
    .then(result => console.log(result))
}     

export function getOracleRequests(baseAccount){
  window.oracleContract
    .get_requests({
      account: `client.${baseAccount}`,
      // account: `oracle-node.${baseAccount}`,
      max_requests: "10"
    })
    .then(result => console.log(result)) 
}

export function checkWithdrawableTokens(){
  window.oracleContract 
    .get_withdrawable_tokens()
    .then(result => console.log(result))
}
