import React, { useState } from 'react'
import '../styles/search.css'
import alice from '../assets/alice.png'
import bob from '../assets/bob.png'
import spinner from '../assets/spinner.gif'
import { 
  callClient, 
  getReceivedVal, 
  formatResult, 
  getFormattedNonce, 
  getLatestBlock,
  getBlockByID } from '../services/contractMethods'

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitButtonCss, setButtonCss] = useState("submit-button");
  const [blockHash, setBlockHash] = useState("");
  const [curNonce, setCurNonce] = useState(0);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonCss("");
    const result = await callClient(searchValue).then(setLoading(true));
    const requestNonce = getFormattedNonce(result);

    console.log('Request Nonce: ', requestNonce);

    setBlockHash(result.receipts_outcome[0].block_hash);
    setCurNonce(requestNonce);
    fetchNonceAnswer(requestNonce);
    await getLatestBlock()
      .then(res => window.firstBlock = res.header.height)
  }

  const fetchNonceAnswer = async (nonce) => {
      let result = await getReceivedVal(nonce);
      console.log('Checking for result...');

      if (result !== '-1') {
        result = formatResult(result)
        const finalBlock = await getLatestBlock();
        setSearchResult(result);
        setLoading(false);
        setButtonCss("submit-button");

        console.log('First block ID: ', window.firstBlock);
        console.log('Final block ID: ', finalBlock.header.height);

        const firstBlockID = window.firstBlock
        const lastBlockID = finalBlock.header.height

        const blockArr = [];
        for (let i = firstBlockID; i <= lastBlockID; i++) {
          blockArr.push(i)
        }
        const blockResults = await Promise.all(blockArr.map(block => {
          return getBlockByID(block);
        }))
        console.log('blockResults', blockResults)

        const chunkArr = [];
        blockResults.map(block => {
          block.chunks.map(chunk => {
            chunkArr.push(chunk.chunk_hash)
          })
        })
        console.log('chunkArr', chunkArr)

        const chunkDetails = await Promise.all(chunkArr.map(chunk => {
            return window.near.connection.provider.chunk(chunk)
        }))
        console.log('chunkDetail', chunkDetails)

        const transactions = []
        chunkDetails.map(chunk => {
          chunk.transactions?.map(transaction => {
            console.log(transaction)
            if(transaction.signer_id.includes('check.testnet')) transactions.push(transaction)
          })
        })
        console.log(transactions)
      } else setTimeout(await fetchNonceAnswer(nonce), 1000);
        
}

  return (
    <div className="search-box">
  
      <div className="search-box-one">
        <form>
          <select 
            name="tokenSymbol" 
            className="search" 
            id="tokenSymbol" 
            onChange={handleChange}
          >
            <option value="" default hidden>Select token</option>
            <option value="BAT" >Basic Attention Token</option>
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="LINK">Chainlink</option>
          </select>
          { loading || (searchValue === null) ? null
            : <input 
                onClick={handleSubmit} 
                type="submit" value="Check" 
                disabled={loading} 
                className={submitButtonCss} 
              />
          }
        </form>
        <div className="search-result">
          { loading ? <img src={spinner} className="spinner"/> : <p>{searchResult}</p> }
        </div>
        <div className="border"></div>
      </div>

      <div className="search-box-two">
        <div className="alice-box">
          <img src={alice} alt="Alice" className="alice"/>
          <p>
            <strong id="bold">Alice</strong> owns Client Contract
          </p>
      </div>
        <div className="bob-box">
          <img src={bob} alt="Bob" className="bob"/>
          <p>
            <strong id="bold">Bob</strong> owns Oracle Contract & Node
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search
