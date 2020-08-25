import React, { useState } from 'react'
import alice from '../assets/alice.png'
import bob from '../assets/bob.png'
import spinner from '../assets/spinner.gif'
import '../styles/search.css'
import { 
  callClient, 
  formatResult, 
  getFormattedNonce,
  getLatestBlockID,
  getTransactions,
  getReceivedVal,
  getTransaction,
  getReceiptsFromAccountPrefix } from '../services/contractUtils'
import { useDiagramDispatch } from './DiagramState'

const Search = () => {

  // The useDiagramDispatch function from the DiagramState component is accessed to regulate whether the diagram is visible or not
  const dispatch = useDiagramDispatch()

  // The states are used to regulate the button behaviour between token price searches
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await callClient(searchValue).then(setLoading(true));
    window.firstTransactionHash = result.transaction.hash;
    const txObj = await getTransaction(window.firstTransactionHash, 'client');
    await getReceiptsFromAccountPrefix(txObj, 'oracle', 2)
    window.firstTransaction = result.transaction;
    const firstBlockID = result.transaction_outcome.block_hash;
    const requestNonce = getFormattedNonce(result);
    window.nonce = requestNonce;

    console.log('Request Nonce: ', requestNonce);

    fetchNonceAnswer(firstBlockID, requestNonce);
  }

  const fetchNonceAnswer = async (firstBlockID, nonce) => {
      let result = await getReceivedVal(nonce);
      console.log('Checking for result...');

      if (result !== '-1') {
        result = formatResult(result);
        const finalBlockID = await getLatestBlockID();
        setSearchResult(result);
        setLoading(false);
        dispatch({type: 'displayDiagram'});

        console.log('FIRST block ID: ', firstBlockID);
        console.log('LAST block ID: ', finalBlockID);

        window.transactions = await getTransactions(firstBlockID, finalBlockID);
        console.log('STEPS: ', window.nearSteps)
        console.log('Transaction Links: ', window.transactions)

      } else setTimeout(async ()=> {
        await fetchNonceAnswer(firstBlockID, nonce)
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
            disabled={loading}
          >
            <option value="" default hidden id="option">Select token</option>
            <option value="BAT" id="option">Basic Attention Token</option>
            <option value="BTC" id="option">Bitcoin</option>
            <option value="ETH" id="option">Ethereum</option>
            <option value="LINK" id="option">Chainlink</option>
          </select>
          <input
            onClick={handleSubmit} 
            type="submit"
            value="Check"
            className="submit-button"
            disabled={loading || searchValue === null}
          />
        </form>
        <div className="search-result">
          { loading ? <img src={spinner} className="spinner"/> : <p className="searchResult">{searchResult}</p> }
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
