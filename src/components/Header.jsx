import React from 'react'
import '../styles/header.css'
import nearlogo from '../assets/nearlogo.png'
import chainlinklogo from '../assets/chainlinklogo.png'

const Header = () => {

  return (
    <div className="header-block">

      <div className="header-block-one">
        <h1 id="project-title">
          Token Price Finder
        </h1>
      </div>

      <div className="header-block-two">
        <p id="project-description">
          NEAR/Chainlink Demo App
        </p>
        <img src={nearlogo} alt="NEARLogo" className="logos"/>
        <img src={chainlinklogo} alt="ChainlinkLogo" className="logos"/>
      </div>

    </div>
  )
}

export default Header
