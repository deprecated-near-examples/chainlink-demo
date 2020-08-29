import React, {useEffect, useState} from 'react'
import '../styles/diagramOverlay.css'
import { useDiagramDispatch } from '../services/diagramState'

// This component is used to hide the diagram before the first search result
const DiagramOverlay = () => {

    const dispatch = useDiagramDispatch()

    const showDiagram = () => {
        dispatch({type: 'displayDiagram'});
    }

    const [isMissingEnvVars, setIsMissingEnvVars] = useState(false)

    useEffect(() => {
        if (typeof process.env.NEAR_ACCT === 'undefined' || process.env.NEAR_ACCT === '') {
            setIsMissingEnvVars(true);
        }
    }, [])


    return (
        <div className="diagram-overlay">
            <div>
                <p> 
                    This simple front-end dApp demonstrates how smart contracts on <a href="http://near.org">NEAR</a> can access off-chain data by using an incentivized <a href="http://chain.link">Chainlink</a> Oracle Node. 
                </p>
                <p> 
                    Begin by selecting one of the token prices, then click on "Check" to initiate your request on the NEAR blockchain. Once the request is fulfilled, we will show you the Oracle process step-by-step.
                </p>
                {
                    isMissingEnvVars ?
                      <p className={'warning'}><strong>Warning</strong>: <span className={'warning-text'}>it looks like you have not set up your environment variables for this demonstration.</span> Thank you for the interest in this project. Please reach out to us <a href="http://near.chat" target="_blank">on Discord</a> for help. Otherwise, please use the button below to see how an oracle request <em>would be</em> made and fulfilled.</p>
                      : null
                }
                <button className="diagram-button" onClick={showDiagram}>Show Diagram</button>
            </div>
        </div>
    )
}

export default DiagramOverlay
