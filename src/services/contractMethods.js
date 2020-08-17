export async function getLatestBlockID(){
  const latestHash = (await window.near
    .connection.provider.status())
    .sync_info.latest_block_hash;
  const latestBlock = await window.near
    .connection.provider.block(latestHash);
  return latestBlock.header.height
}

export async function getBlockByHash(blockHash) {
  const blockInfoByHash = await window.near
    .connection.provider.block({
      blockId: blockHash,
  })
  console.log(`BlockInfo for ${blockHash} :`, blockInfoByHash)
};

export async function getBlockByID(blockID){
    const blockInfoByHeight = await window.near
      .connection.provider.block({
        blockId: blockID,
    })
  // console.log(`BlockInfo for ID #${blockID}`, blockInfoByHeight)
  return blockInfoByHeight
}

export function getFormattedNonce(result){
  return atob(result.status.SuccessValue)
    .replace(/['"]+/g, '')
}

export function convertArgs(tokenSymbol, CUR = 'USD') {
  const URL = 'https://min-api.cryptocompare.com/data/price?fsym='
  const obj = {
    get: `${URL}${tokenSymbol}&tsyms=${CUR}`,
    path: 'USD',
    times: 100
  }
  return btoa(JSON.stringify(obj))
}

export async function callClient(searchValue){
  const tokenSearch = convertArgs(searchValue.toUpperCase())
  return await window.clientAcct.functionCall(
    'client.development.testnet',
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
    'client.development.testnet',
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
      console.log(`${acct} balance: `, result))
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
      console.log('oracle authorized? ', result))
}

export function getOracleRequestSummary(){
  window.oracleContract
    .get_requests_summary({ 
      max_num_accounts: '10'
    })
    .then(result => 
      console.log('oracle request summary: ', result))
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
      console.log('withdrawable tokens amt: ', result))
}
