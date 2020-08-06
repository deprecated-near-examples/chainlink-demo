//NEAR-LINK Functions
export function getAccountBalance(account){
  window.nearLinkContract
    .get_balance({ 
      owner_id: account
    })
    .then(result => 
      console.log(`${account} balance: `, result)
      )
}

export function getAllowance(baseAccount){
  window.nearLinkContract
  .get_allowance({
    owner_id: `client.${baseAccount}`,
    escrow_account_id: `oracle.${baseAccount}`
  })
  .then(result => 
    console.log(`client.${baseAccount}'s oracle allowance: `, result)
    )
}

//Oracle Functions
export function isOracleAuthorized(baseAccount){
  window.oracleContract
    .is_authorized({ 
      node: `oracle-node.${baseAccount}`
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

export function getOracleRequests(baseAccount){
  window.oracleContract
    .get_requests({
      account: `client.${baseAccount}`,
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
