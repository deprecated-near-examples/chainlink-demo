
import React, {useContext} from "react";
import "../styles/diagram.css";
import {useDiagramState} from "./DiagramState";

const Diagram = () => {

    const state = useDiagramState();

    return (
        <div className="diagram">
        <div className="first-top-arrow">
            <img src={state.firsttoparrow} alt="FirstTopArrow"/>
        </div>
        <div className="second-top-arrow">
            <img src={state.secondtoparrow} alt="FirstTopArrow"/>
        </div>
        <div className="middle-header">
            <div><p>On-Chain</p></div>
            <div className="divider">
            <img src={state.divider} alt="BlockchainDivider"/>
            </div>
            <div><p>Off-Chain</p></div>
        </div>

        <div className="oracle-explainer">
            <img src={state.oracleExplainer} alt="OracleExplainer"/>
            <p>Oracle Node constantly polls for requests</p>
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
        </div>
    );
};

export default Diagram;


