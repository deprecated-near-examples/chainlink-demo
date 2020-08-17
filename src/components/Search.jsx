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
  getLatestBlockID } from '../services/contractUtils'
import { getTransactions } from '../services/utils'

const Search = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitButtonCss, setButtonCss] = useState("submit-button");
  // const [blockHash, setBlockHash] = useState("");
  // const [curNonce, setCurNonce] = useState(0);


  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonCss("");
    window.firstBlockID = await getLatestBlockID();
    const result = await callClient(searchValue).then(setLoading(true));
    const requestNonce = getFormattedNonce(result);

    console.log('Request Nonce: ', requestNonce);

    // setBlockHash(result.receipts_outcome[0].block_hash);
    // setCurNonce(requestNonce);
    fetchNonceAnswer(requestNonce);
  }

  const fetchNonceAnswer = async (nonce) => {
      let result = await getReceivedVal(nonce);
      console.log('Checking for result...');

      if (result !== '-1') {
        result = formatResult(result);
        const finalBlockID = await getLatestBlockID();
        setSearchResult(result);
        setLoading(false);
        setButtonCss("submit-button");

        console.log('FIRST block ID: ', window.firstBlockID);
        console.log('LAST block ID: ', finalBlockID);

        getTransactions(window.firstBlockID, finalBlockID);

      } else setTimeout(async ()=> {
        await fetchNonceAnswer(nonce)
      }, 750);
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
          <input 
            onClick={handleSubmit} 
            type="submit" value="Check" 
            disabled={loading || searchValue === null} 
            className={submitButtonCss} 
          />
    
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
