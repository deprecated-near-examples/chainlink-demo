import React, {useState} from 'react'
import '../styles/diagram.css'
import DiagramOverlay from './DiagramOverlay'
import { useDiagramState } from '../services/diagramState'

const Diagram = () => {
    // The useDiagramState function is used to access the state of the diagram from the DiagramState component
    const state = useDiagramState()

    // The following states are used to control whether the explainer section is expanded and the explanation visible or not
    const [showExplorerLink, setExplorerLink] = useState(true)

    const handleClick = () => {
        window.open('https://near.org/blog/near-bringing-chainlinks-leading-oracle-solution-to-its-open-web-ecosystem/', '_blank'); 
    }

    return (
        <div className="diagram">
            {state.diagramVisibility ? 
            <div>
                <div className="first-top-arrow">
                    <img src={state.firsttoparrow} alt="FirstTopArrow"/>
                </div>

                <div className="second-top-arrow">
                    <img src={state.secondtoparrow} alt="FirstTopArrow"/>
                </div>

                <div className="middle-header">
                    <div>
                        <p>On-Chain</p>
                    </div>
                    <div className="divider">
                        <img src={state.divider} alt="BlockchainDivider"/>
                    </div>
                    <div>
                        <p>Off-Chain</p>
                    </div>
                </div>

                <div className="oracle-explainer">
                    <div>
                        <img src={state.oracleExplainer} alt="OracleExplainer"/>
                        <p>Oracle Node constantly polls for requests</p>
                    </div>
                </div>

                <div className={state.transfertencss}>
                    <img src={state.transferten} alt="transferten"/>
                </div>

                <div className={state.bobcontractlockcss}>
                    <img src={state.bobcontractlock} alt="bobcontractlock"/>
                </div>

                <div className="contract-box">
                    <div className="contract-box-one">
                        <img src={state.firstImage} alt="AliceContract"/>
                        <p>{state.aliceTokens}</p>
                    </div>
                    <div className="contract-box-two">
                        <img src={state.secondImage} alt="firstArrow"/>
                        <img src={state.thirdImage} alt="secondArrow" id="second-arrow"/>
                    </div>
                    <div className="contract-box-three">
                        <img src={state.fourthImage} alt="BobContract"/>
                        <p className={state.bobtokenscss}>{state.bobTokens}</p>
                    </div>
                    <div className="contract-box-four">
                        <img src={state.fifthImage} alt="LongArrowOne"/>
                        <img src={state.sixthImage} alt="LongArrowTwo" id="long-arrow-two"/>
                    </div>
                    <div className="contract-box-five">
                        <img src={state.seventhImage} alt="Robot"/>
                    </div>
                    <div className="contract-box-six">
                        <img src={state.eighthImage} alt="thirdArrow"/>
                        <img src={state.ninethImage} alt="fourthArrow" id="fourth-arrow"/>
                    </div>
                    <div className="contract-box-seven">
                        <img src={state.tenthImage} alt="Oracle"/>
                    </div>
                </div>

                <div className={state.explainercss}>
                    <div className="arrow"></div>
                    <div className="explainer-one-content">
                        <img src={state.nearkatone} alt="NEARKAT" className="nearkat-one"/>
                        <img src={state.step} alt="Step" className={state.stepcss}/>
                        <h4>{state.description}</h4>
                        <div className="explainer-content">
                            {state.descriptionstate ? 
                                <div>
                                    <p className="description" >{state.longDescription}</p>
                                    { showExplorerLink ?
                                    <p className="explorer-link">
                                        <a href={state.explorerLink} target="_blank">
                                            {state.seeExplorerLink}
                                        </a>
                                    </p> 
                                    : null }
                                </div> : 
                                <button onClick={handleClick} className={"learn-more-button"}>
                                    Learn More
                                </button>}
                        </div>
                    </div>
                </div>
            </div> : <DiagramOverlay/>}
        </div>
    )
}

export default Diagram
