import React, { useState, useContext } from "react";
import "../styles/search.css";
import alice from "../assets/alice.png";
import bob from "../assets/bob.png";
import { handleSubmit } from "../services/utils";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    resetInputField();
  };

  const contractAmount = 50;
  const balance = 2000;
  const searchResult = "0.23";

  return (
    <div className="search-box">
      <div className="search-box-one">
        <form>
          <input
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
            placeholder="Enter Token(e.g. BAT)"
            className="search"
          />

          <input onClick={callSearchFunction} type="submit" value="Check" />
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
        <p>Contract Allowance: <br></br> <strong id="bold-two">{contractAmount}</strong> of <strong id="bold">{balance}</strong></p>
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