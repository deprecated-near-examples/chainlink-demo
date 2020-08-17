import { connect, keyStores, KeyPair } from 'near-api-js'
import { getBlockByID } from './contractUtils';

//configuration for connection to NEAR
const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: `client.${process.env.ACCOUNT_ID}.testnet`,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

//connect to contract using .env private key
export async function initContract() {    
  const keyStore = new keyStores.InMemoryKeyStore()
  const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  //sets key in memory
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
  const near = await connect(Object.assign({ deps: { keyStore: keyStore } }, nearConfig))
  window.near = near
  window.clientAcct = await near.account(`client.${process.env.ACCOUNT_ID}.testnet`)
}

// returns two transactions associated with client <> oracle-node call
export async function getTransactions(firstBlock, lastBlock){
  // creates an array of block IDs based on first and last block
  const blockArr = [];
  for (let i = firstBlock; i <= lastBlock; i++) {
    blockArr.push(i)
  }

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
      return window.near
        .connection.provider.chunk(chunk);
  }));
  
  // checks chunk details for transactions
  // if there are transactions in the chunk 
  // find ones associated with our two accounts
  const transactions = []
  chunkDetails.map(chunk => {
    chunk.transactions?.map(txs => {
      if(txs.signer_id.includes('oracle-node.development.testnet') 
      || txs.signer_id.includes('client.development.testnet')) {
        transactions.push(txs);
      } 
    });
  });

  // we want to exclude transactions from the oracle-node
  // so we return only transactions that contain these two methods
 const matchingTxs = transactions.reduce((acc, curr) => {
    curr.actions.map(action => {
      if((action.FunctionCall.method_name === "fulfill_request") 
      || (action.FunctionCall.method_name === "get_token_price")){
        acc.push(curr);
      }  
    }); return acc;
  }, [])
  console.log("Transactions: ", matchingTxs)
  return matchingTxs
}
