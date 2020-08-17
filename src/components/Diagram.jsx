
import React, {useState} from 'react'
import '../styles/diagram.css'
import DiagramOverlay from './diagramOverlay'
import { useDiagramState } from './DiagramState'

const Diagram = () => {
    const state = useDiagramState()

    const [active, setActive] = useState(false)
    const [button, setButton] = useState("Expand")
    const [explainerBackground, setExplainerBackground] = useState(state.explainerbackground)
    const [nearkat, setNearKat] = useState(state.nearkatone)
    const [nearkatcss, setNearKatcss] = useState("nearkat-one")
    const [description, setDescription] = useState("Here’s more detail on this part if needed")

    const expandExplainer = () => {
        if (active === false){
            setButton("Show Less")
            setDescription(state.longDescription)
            setExplainerBackground(state.explainerbackgroundtwo)
            setNearKat(state.nearkattwo)
            setNearKatcss("nearkat-two")
            setActive(true)
         }
        else if (active === true){
           setButton("Expand");
           setDescription("Here’s more detail on this part if needed")
           setExplainerBackground(state.explainerbackground)
           setNearKat(state.nearkatone)
           setNearKatcss("nearkat-one")
           setActive(false)
        }
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
                    <img 
                        src={explainerBackground} 
                        alt="ExplainerBackground" 
                        className="explainer-background"
                    />
                    <div className="explainer-one-content">
                        <img src={nearkat} alt="NEARKAT" className={nearkatcss}/>
                        <img src={state.step} alt="Step" className={state.stepcss}/>
                        <h4>{state.desciption}</h4>
                        <div className="explainer-content">
                            {state.descriptionstate ? 
                                <div>
                                    <p className="description" >{description}</p>
                                        <div className="explainer-button" onClick={expandExplainer}>
                                            <p>{button}</p>
                                            <img 
                                                src={state.glass} 
                                                alt="Glass" 
                                                className="glass"
                                            />
                                        </div>
                                </div>
                        : <button className="learn-more">Learn More</button> }
                        </div>
                    </div>
                </div>
            </div> : <DiagramOverlay/>}
        </div>
    )
}

export default Diagram
