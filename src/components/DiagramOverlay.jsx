import React from 'react'
import '../styles/diagramOverlay.css'

// This component is used to hide the diagram before the first search result
const DiagramOverlay = () => {

    return (
        <div className="diagram-overlay">
            <div>
                <p> 
                    This simple front-end dApp demonstrates how smart contracts on <a href="http://near.org">NEAR</a> can access off-chain data by using an incentivized <a href="http://chain.link">Chainlink</a> Oracle Node. 
                </p>
                <p> 
                    Begin by selecting one of the token prices, then click on "Check" to initiate your request on the NEAR blockchain. Once the request is fulfilled, we will show you the Oracle process step-by-step.
                </p>
            </div>
        </div>
    )
}

export default DiagramOverlay
