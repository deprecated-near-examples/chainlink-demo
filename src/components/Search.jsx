import React, { useState } from 'react'
import '../styles/search.css'
import alice from '../assets/alice.png'
import bob from '../assets/bob.png'
import spinner from '../assets/spinner.gif'
import { convertArgs } from '../services/utils'

const Search = () => {
  const [searchValue, setSearchValue] = useState(null)
  const [searchResult, setSearchResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitButtonCss, setButtonCss] = useState("submit-button")
  const [curNonce, setCurNonce] = useState(0)

  const fetchNonceAnswer = async (nonce) => {
      let result = await window.clientAcct.viewFunction(
        'client.dev.testnet',
        'get_received_val',
        { nonce: nonce.toString() }
      )
      console.log('Checking for result...')
      if (result !== '-1') {
        result = `$${
          Number(result)
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }`
        console.log('Result: ', result)
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
    const result = await window.clientAcct.functionCall(
      'client.dev.testnet',
      'demo_token_price',
      {
        symbol: token_search,
        spec_id: "dW5pcXVlIHNwZWMgaWQ="
      },
      '300000000000000'
    ).then(setLoading(true));
    const requestNonce = atob(result.status.SuccessValue).replace(/['"]+/g, '')
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
