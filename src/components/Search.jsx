import React, { useState } from 'react'
import '../styles/search.css'
import alice from '../assets/alice.png'
import bob from '../assets/bob.png'
import spinner from '../assets/spinner.gif'
import { convertArgs, getBlock } from '../services/utils'
import { demoTokenPrice, getReceivedVal, formatResult } from '../services/contractMethods'

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitButtonCss, setButtonCss] = useState("submit-button");
  const [blockHash, setBlockHash] = useState("");
  const [curNonce, setCurNonce] = useState(0);

  const fetchNonceAnswer = async (nonce) => {
      let result = await getReceivedVal(nonce);
      console.log('Checking for result...')
      if (result !== '-1') {
        result = formatResult(result)
        console.log('Result: ', result)
        // console.log('blockIDDDDD', blockHash)
        // console.log('curNonce', curNonce)
        const latestHash = (await window.near.connection.provider.status()).sync_info.latest_block_hash;
        const latestBlock = await window.near.connection.provider.block(latestHash);
        console.log('latest hash: ', latestHash)
        console.log('latest block: ', latestBlock)
        // const blockDetails = await getBlock(blockHash)
        // console.log('block details: ', blockDetails)
        setSearchResult(result)
        setLoading(false)
        setButtonCss("submit-button")
      } else await fetchNonceAnswer(nonce)
    }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  };

  const handleSubmit = async (e) => {
    setButtonCss("")
    e.preventDefault()
    const token_search = convertArgs(searchValue.toUpperCase())
    const result = await demoTokenPrice(token_search).then(setLoading(true))
    const requestNonce = atob(result.status.SuccessValue).replace(/['"]+/g, '')

    console.log('result', result)
    console.log('transaction_ID', result.transaction.hash)
    console.log('Block HASH',  result.receipts_outcome[0].block_hash)
    setBlockHash(result.receipts_outcome[0].block_hash)
    const blockDetails = await getBlock(result.receipts_outcome[0].block_hash)
    console.log('block details: ', blockDetails)
    setCurNonce(requestNonce)
    console.log('requestNonce: ', requestNonce)
    fetchNonceAnswer(requestNonce)
  }

  console.log(searchValue)
  return (
    <div className="search-box">
  
      <div className="search-box-one">
        <form>
          <select name="tokenSymbol" className="search" id="tokenSymbol" onChange={handleChange}>
            <option value="" default hidden>Select token</option>
            <option value="BAT" >Basic Attention Token</option>
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="LINK">Chainlink</option>
          </select>
          <input 
            onClick={handleSubmit} 
            type="submit" value="Check" 
            disabled={loading} 
            className={submitButtonCss} /
          >
        </form>
        <div className="search-result">
          {loading ? <img src={spinner} className="spinner"/> : <p>{searchResult}</p>}
        </div>
        <div className="border"></div>
      </div>

      <div className="search-box-two">
        <div className="alice-box">
          <img src={alice} alt="Alice" className="alice"/>
          <p><strong id="bold">Alice</strong> owns Client Contract</p>
      </div>
        <div className="bob-box">
          <img src={bob} alt="Bob" className="bob"/>
          <p><strong id="bold">Bob</strong> owns Oracle Contract & Node</p>
        </div>
      </div>
    </div>
  );
};

export default Search
