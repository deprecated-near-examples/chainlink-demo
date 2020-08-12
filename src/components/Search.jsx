import React, { useState } from "react";
import "../styles/search.css";
import alice from "../assets/alice.png";
import bob from "../assets/bob.png";
import { convertArgs } from "../services/utils";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [curNonce, setCurNonce] = useState(0);

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token_search = convertArgs(searchValue.toUpperCase());
    const result = await window.clientAcct.functionCall(
      'client.dev.testnet',
      'demo_token_price',
      {
        symbol: token_search,
        spec_id: "dW5pcXVlIHNwZWMgaWQ="
      },
      '300000000000000'
    )
    const requestNonce = atob(result.status.SuccessValue).replace(/['"]+/g, '')
    setCurNonce(requestNonce)

    const result2 = await window.clientAcct.functionCall(

    )
  }



  console.log(curNonce)

  // const resetInputField = () => {
  //   setSearchValue("");
  // };

  // const callSearchFunction = e => {
  //   e.preventDefault();
  //   resetInputField();
  // };

  const contractAmount = 50;
  const balance = 2000;
  const searchResult = "0.23";

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
          <input onClick={handleSubmit} type="submit" value="Check" />
        </form>
        <div className="search-result">
          <p>{searchResult}</p>
        </div>
        <div className="border"></div>
      </div>

      <div className="search-box-two">
        <img src={alice} alt="Alice" className="person"/>
        <p><strong id="bold">Alice</strong> owns Client Contract</p>
      </div>

      <div className="search-box-three">
        <p>Contract Allowance: <br></br> 
          <strong id="bold-two">{contractAmount}</strong> 
          of 
          <strong id="bold">{balance}</strong>
        </p>
        <div className="border"></div>
      </div>

      <div className="search-box-four">
        <img src={bob} alt="Bob" className="person"/>
        <p><strong id="bold">Bob</strong> owns Oracle Contract & Node</p>
      </div>

    </div>
  );
};

export default Search;
