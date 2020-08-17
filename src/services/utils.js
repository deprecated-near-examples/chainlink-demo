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
  console.log(keyPair)
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

  const blockResults = await Promise.all(blockArr.map(block => {
    return getBlockByID(block);
  }))

  console.log('blockResults', blockResults);
  
  const chunkArr = [];
  blockResults.map(block => {
    block.chunks.map(chunk => {
      chunkArr.push(chunk.chunk_hash);
    });
  });
  
  const chunkDetails = await Promise.all(chunkArr.map(chunk => {
      return window.near.connection.provider.chunk(chunk);
  }));
  
  console.log('chunkDetail', chunkDetails)
  
  const transactions = []
  chunkDetails.map(chunk => {
    chunk.transactions?.map(transaction => {
      console.log(transaction)
      if(transaction.signer_id.includes('development.testnet')) {
        transactions.push(transaction);
      };
    });
  });
  console.log(transactions)
  }
  