import React, { useState } from 'react'
import '../styles/search.css'
import alice from '../assets/alice.png'
import bob from '../assets/bob.png'
import spinner from '../assets/spinner.gif'
import { convertArgs } from '../services/utils'

const Search = () => {

  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitButtoncss, setButtonCss] = useState("submit-button")
  const [curNonce, setCurNonce] = useState(0)

  let timer;
  const timedFetchLatest = async (nonce) => {
    // timer = setInterval(await fetchNonceAnswer(), 500)
      await fetchNonceAnswer(nonce)
      if (timer !== null) {
        timer = setTimeout(timedFetchLatest(nonce), 500)
    }
  };

  const fetchNonceAnswer = async (nonce) => {
    const result = await window.clientAcct.viewFunction(
      `$client.${process.env.ACCOUNT_ID}.testnet`,
      'get_received_val',
      { nonce: nonce.toString() }
    )
    console.log(result)
    if (result !== '-1') {
      console.log('clearing out timer')
      console.log(result)
      setSearchResult(result)
      clearTimeout(timer)
      setLoading(false)
      setButtonCss("submit-button")
    }
    
  }

  const handleChange = e => {
    setSearchValue(e.target.value)
  };

  const handleSubmit = async (e) => {
    setButtonCss("")
    e.preventDefault()
    const token_search = convertArgs(searchValue.toUpperCase())
    const result = await window.clientAcct.functionCall(
      `$client.${process.env.ACCOUNT_ID}.testnet`,
      'demo_token_price',
      {
        symbol: token_search,
        spec_id: "dW5pcXVlIHNwZWMgaWQ="
      },
      '300000000000000'
    ).then(setLoading(true));
    const requestNonce = atob(result.status.SuccessValue).replace(/['"]+/g, '')
    console.log('requestNonce: ', requestNonce)
    timedFetchLatest(requestNonce)
  }

  console.log(curNonce)

  return (
    <div className="search-box">

      <div className="search-box-one">
        <form>
          <input
            value={searchValue}
            onChange={handleChange}
            type="text"
            placeholder="Enter Token(e.g. BAT)"
            className="search"
          />
          <input onClick={handleSubmit} type="submit" value="Check" disabled={loading} className={submitButtoncss} />
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
