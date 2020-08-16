export async function demoTokenPrice(tokenSearch){
  return await window.clientAcct.functionCall(
    'client.omg.testnet',
    'demo_token_price',
    {
      symbol: tokenSearch,
      spec_id: "dW5pcXVlIHNwZWMgaWQ="
    },
    '300000000000000'
  )
}

export async function getReceivedVal(nonce){
  return await window.clientAcct.viewFunction(
    'client.omg.testnet',
    'get_received_val',
    { nonce: nonce.toString() }
  )
}

export function formatResult(result){
  return `$${
    Number(result)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }`
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
