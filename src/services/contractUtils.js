import { getClientAcct, getNear } from './utils';
const bs58 = require('bs58');

const nearAcct = process.env.NEAR_ACCT

export async function getLatestBlockID() {
  const near = await getNear();
  const latestHash = (await near
    .connection.provider.status())
    .sync_info.latest_block_hash;
  const latestBlock = await near
    .connection.provider.block(latestHash);
  return latestBlock.header.height
}

export async function getBlockByHash(blockHash) {
  const near = await getNear();
  const blockInfoByHash = await near
    .connection.provider.block({
      blockId: blockHash,
  })
  console.log(`BlockInfo for ${blockHash} :`, blockInfoByHash)
  return blockInfoByHash
};

export async function getBlockByID(blockID){
    const near = await getNear();
    const blockInfoByHeight = await near
      .connection.provider.block({
        blockId: blockID,
    })
  return blockInfoByHeight
}

export async function getReceiptsFromAccountPrefix(txObj, prefix, step) {
  const matchingTxs = txObj.receipts_outcome.filter(r => {
    return r.outcome.executor_id === `${prefix}.${nearAcct}` && r.outcome.logs.length !== 0
  })
  window.nearSteps[step] = matchingTxs
}

export async function getTransaction(hash, subaccountPrefix) {
  const near = await getNear();
  return await near.connection.provider.txStatus(bs58.decode(hash), `${subaccountPrefix}.${nearAcct}`);
}

// returns two transactions associated with client <> oracle-node call
export async function getTransactions(firstBlock, lastBlock, nonce) {
  const near = await getNear();

  // creates an array of block IDs based on first and last block
  const blockArr = [];
  let blockHash = lastBlock;
  let currentBlock;
  do {
    currentBlock = await getBlockByID(blockHash);
    blockArr.push(currentBlock.header.hash);
    blockHash = currentBlock.header.prev_hash;
  } while (blockHash !== firstBlock)

  // returns block details based on ID's in array
  const blockDetails = await Promise.all(
    blockArr.map(block => {
      return getBlockByID(block);
    }))

  // returns an array of chunk hashes from block details
  const chunkHashArr = [];
  blockDetails.map(block => {
    block.chunks.map(chunk => {
      chunkHashArr.push(chunk.chunk_hash);
    });
  });

  // returns chunk details based from the array of hashes
  const chunkDetails = await Promise.all(
    chunkHashArr.map(chunk => {
      return near.connection.provider.chunk(chunk);
  }));

  // checks chunk details for transactions
  // if there are transactions in the chunk
  // find ones associated with our two accounts
  const transactions = []
  chunkDetails.map(chunk => {
    chunk.transactions?.map(txs => {
      if (txs.signer_id.includes(`oracle-node.${nearAcct}`)) {
        transactions.push(txs);
      }
    });
  });

  // we want to exclude transactions from the oracle-node
  // so we return only transactions that contain these two methods
  const matchingTxs = transactions.reduce((acc, curr) => {
    curr.actions.map(action => {
      if (action.FunctionCall.method_name === "fulfill_request") {
        const args = action.FunctionCall.args;
        const base64DecodedArgs = Buffer.from(args, 'base64');
        const jsonArgs = JSON.parse(base64DecodedArgs.toString());
        if (jsonArgs.nonce === nonce) {
          acc.push(curr);
        }
      }
    }); return acc;
  }, [])
  // Note: at this point should be only one transaction

  //insert initial transaction into matchingTxs array
  matchingTxs.push(window.firstTransaction)

  //transaction receipts from other steps
  const txObj = await getTransaction(matchingTxs[0].hash, 'oracle-node');
  await getReceiptsFromAccountPrefix(txObj, 'client', 6)

  //creates transaction links from matchingTxs
  const txsLinks = matchingTxs.map(txs => (({
    method: txs.actions[0].FunctionCall.method_name,
    link: `https://explorer.testnet.near.org/transactions/${txs.hash}`
  })));
  return txsLinks
}

export function formatResult(result){
  const price = result / 100
  return `$${
    Number(price)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }`
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

export async function callClient(searchValue) {
  const clientAcct = await getClientAcct()
  const tokenSearch = convertArgs(searchValue.toUpperCase())
  return await clientAcct.functionCall(
    `client.${nearAcct}`,
    'get_token_price',
    {
      symbol: tokenSearch,
      spec_id: "ZDJjOWY5MjE4N2YyNGVjMDk1N2NmNTAyMGMwN2FmZGE="
    },
    '300000000000000'
  )
}

export async function getReceivedVal(nonce) {
  const clientAcct = await getClientAcct()
  return await clientAcct.viewFunction(
    `client.${nearAcct}`,
    'get_received_val',
    { nonce: nonce.toString() }
  )
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
