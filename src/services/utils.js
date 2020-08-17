import { connect, keyStores, KeyPair } from 'near-api-js'
import { getBlockByID } from './contractMethods';

const nearConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  contractName: `client.${process.env.ACCOUNT_ID}.testnet`,
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};


export async function initContract() {    
  const keyStore = new keyStores.InMemoryKeyStore()
  const keyPair = KeyPair.fromString(process.env.CLIENT_PRIVATE_KEY)
  // console.log(keyPair)
  //sets key in memory
  await keyStore.setKey(nearConfig.networkId, nearConfig.contractName, keyPair)
  const near = await connect(Object.assign({ deps: { keyStore: keyStore } }, nearConfig))
  window.near = near
  window.clientAcct = await near.account(`client.${process.env.ACCOUNT_ID}.testnet`)
}

export async function getTransactions(firstBlock, lastBlock){
  const blockArr = [];
  for (let i = firstBlock; i <= lastBlock; i++) {
    blockArr.push(i)
  }

  const blockDetails = await Promise.all(
    blockArr.map(block => {
      return getBlockByID(block);
  }))
  
  const chunkHashArr = [];
  blockDetails.map(block => {
    block.chunks.map(chunk => {
      chunkHashArr.push(chunk.chunk_hash);
    });
  });
  
  const chunkDetails = await Promise.all(
    chunkHashArr.map(chunk => {
      return window.near
        .connection.provider.chunk(chunk);
  }));
  
  const transactions = []
  chunkDetails.map(chunk => {
    chunk.transactions?.map(txs => {
      if(txs.signer_id.includes('oracle-node.development.testnet') 
      || txs.signer_id.includes('client.development.testnet')) {
        transactions.push(txs);
      } 
    });
  });

 const matchingTxs = transactions.reduce((acc, curr) => {
    curr.actions.map(action => {
      if((action.FunctionCall.method_name === "fulfill_request") 
      || (action.FunctionCall.method_name === "demo_token_price")){
        acc.push(curr);
      }  
    }); return acc;
  }, [])
  console.log("Transactions: ", matchingTxs)
  return matchingTxs
}
