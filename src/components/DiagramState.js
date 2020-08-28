import React, { useReducer } from 'react'
import divider from '../assets/divider.png'
import glass from '../assets/glass.png'
import explainerbackgroundone from '../assets/explainer-background.png'
import explainerbackgroundtwo from '../assets/explainerbackgroundtwo.png'
import explainerbackgroundthree from '../assets/explainerbackgroundthree.png'
import nearkatone from '../assets/nearkat-one.png'
import nearkattwo from '../assets/nearkat-two.png'
import stepone from '../assets/step-one.png'
import steptwo from '../assets/step-two.png'
import stepthree from '../assets/step-three.png'
import stepfour from '../assets/step-four.png'
import stepfive from '../assets/step-five.png'
import stepsix from '../assets/step-six.png'
import transferten from '../assets/transfer-ten.png'
import bobcontractlock from '../assets/bob-contract-lock.png'
import bobcontractunlock from '../assets/bob-contract-unlock.png'
import aliceone from '../assets/alice-one.png'
import bobone from '../assets/bob-one.png'
import bobtwo from '../assets/bob-two.png'
import arrowone from '../assets/arrow-one.png'
import arrowtwo from '../assets/arrow-two.png'
import arrowoneotherdirection from '../assets/arrow-one-other-direction.png'
import arrowtwootherdirection from '../assets/arrow-two-other-direction.png'
import longarrowone from '../assets/long-arrow-one.png'
import longarrowtwo from '../assets/long-arrow-one-green.png'
import longarrowoneotherdirection from '../assets/long-arrow-one-other-direction.png'
import longarrowtwootherdirection from '../assets/long-arrow-two-other-direction.png'
import robotone from '../assets/robot-one.png'
import robottwo from '../assets/robot-two.png'
import oracleone from '../assets/oracle-one.png'
import oracletwo from '../assets/oracle-two.png'
import oracleExplainer from '../assets/oracleExplainer.png'
import firsttoparrowone from '../assets/first-top-arrow-one.png'
import firsttoparrowtwo from '../assets/first-top-arrow-two.png'
import secondtoparrowone from '../assets/second-top-arrow-one.png'
import secondtoparrowtwo from '../assets/second-top-arrow-two.png'

// The initialState is the first diagram displayed in the demo
const initialState = { 
  // Naming Image Placeholder
  firsttoparrow: firsttoparrowone,
  secondtoparrow: secondtoparrowone,

  firstImage: aliceone,
  secondImage: arrowone,
  thirdImage: arrowoneotherdirection,
  fourthImage: bobone,
  fifthImage: longarrowoneotherdirection,
  sixthImage: longarrowone,
  seventhImage: robotone,
  eighthImage: arrowone,
  ninethImage: arrowoneotherdirection,
  tenthImage: oracleone,

  // Variable to display token transfer
  aliceTokens: 50,
  bobTokens: 0,

  // State Varables 
  descriptionstate: true,
  diagramVisibility: false, //set to 'true' for development... change back to 'false' before deploying
  
  // css variables and changing text which are displayed in the diagram
  bobtokenscss: "bobtokens-inactive",
  transfertencss: "transfer-ten-inactive",
  bobcontractlockcss: "bob-contract-lock-inactive",
  explainercss: "explainer",
  stepcss: "step-one",
  seeExplorerLink: "See transaction in NEAR Explorer!",
  explorerLink: null,
  description: `Call is placed to the Client Contract`,
  longDescription: `The user search initiates a call to the "Client" contract requesting the token price. The Client Contract has an existing balance of 50 fungible tokens (FT) that it can access to pay for requests.`,

  // additional images
  divider: divider,
  glass: glass,
  explainerbackground: explainerbackgroundone,
  explainerbackgroundtwo: explainerbackgroundtwo,
  nearkatone: nearkatone,
  nearkattwo: nearkattwo,
  step: stepone,
  transferten: transferten,
  oracleExplainer: oracleExplainer,
  bobcontractlock: bobcontractlock,
};

// The diagramReducer defines the different states that the diagram can be in -- state changes are initiated through the ChangeDiagramState
function diagramReducer(state, action) {
  switch (action.type) {
    case 'initialState':
      return initialState
    case 'displayDiagram':  
      return {
        ...initialState,
        diagramVisibility: true,
        explorerLink: window.transactions ? window.transactions[1].link : null
      }
    case 'firstImageChange':
      return {
        ...initialState,
        diagramVisibility: true,
        aliceTokens: 40,
        firsttoparrow: firsttoparrowtwo,
        secondImage: arrowtwo,
        fourthImage: bobtwo,
        step: steptwo,
        bobtokenscss: "bobtokens-active",
        transfertencss: "transfer-ten-active",
        explainercss: "explainer-two",
        seeExplorerLink: null,   
        description: "Initial request & 10 FT are sent to the on-chain Oracle Contract",
        longDescription: `10 fungible tokens are sent to the on-chain Oracle Contract along with a the user's request.`,
      };
    case 'secondImageChange':
      return {
        ...initialState,
        diagramVisibility: true,
        aliceTokens: 40,
        bobTokens: 10,
        fourthImage: bobtwo,
        transfertencss: "transfer-ten-inactive",
        firsttoparrow: firsttoparrowtwo,
        secondImage: arrowone,
        fifthImage: longarrowtwo,
        seventhImage: robottwo,
        step: stepthree,
        bobtokenscss: "bobtokens-active",
        bobcontractlockcss: "bob-contract-lock-active",
        explainercss: "explainer-three",  
        seeExplorerLink: null, 
        description: "Off-chain Oracle-Node retrieves the new request",
        longDescription:`The Oracle-Node, created using Chainlink, finds requests by consistently polling the on-chain Oracle Contract. When a new request is found, the Oracle-Node begins processing the request. The FT payment is locked until the Client Contract receives a successfully completed request.`
      }
    case 'thirdImageChange':
      return {
        ...initialState,
        diagramVisibility: true,
        eighthImage: arrowtwo,
        tenthImage: oracletwo,
        ninethImage: arrowtwootherdirection,
        fourthImage: bobtwo,
        aliceTokens: 40,
        bobTokens: 10,
        firsttoparrow: firsttoparrowtwo,
        secondImage: arrowone,
        seventhImage: robottwo,
        step: stepfour,
        bobtokenscss: "bobtokens-active",
        bobcontractlockcss: "bob-contract-lock-active",
        explainercss: "explainer-four",
        seeExplorerLink: null,    
        description: "Chainlink Oracle-Node interfaces with API",
        longDescription: `With the original request in hand, the off-chain oracle node interfaces with an API and retrieves the requested token price.`
      }
    case 'fourthImageChange':
      return {
        ...initialState,
        diagramVisibility: true,
        tenthImage: oracletwo,
        fourthImage: bobtwo,
        aliceTokens: 40,
        bobTokens: 10,
        firsttoparrow: firsttoparrowtwo,
        secondImage: arrowone,
        seventhImage: robottwo,
        sixthImage: longarrowtwootherdirection,
        step: stepfive,
        bobtokenscss: "bobtokens-active",
        bobcontractlockcss: "bob-contract-lock-active",
        explainercss: "explainer-five",
        seeExplorerLink: null,    
        description: `Price is returned to Oracle Contract`,
        longDescription: `The off-chain Oracle-Node passes the token price from the API to the on-chain Oracle Contract.`        
      }
    case 'fifthImageChange':
      return {
        ...initialState,
        diagramVisibility: true,
        tenthImage: oracletwo,
        fourthImage: bobtwo,
        aliceTokens: 40,
        bobTokens: 10,
        firsttoparrow: firsttoparrowtwo,
        secondImage: arrowone,
        seventhImage: robottwo,
        thirdImage: arrowtwootherdirection,
        step: stepsix,
        bobtokenscss: "bobtokens-active",
        bobcontractlockcss: "bob-contract-lock-active",
        bobcontractlock: bobcontractunlock,
        seeExplorerLink: "See transaction in NEAR Explorer!",
        explorerLink: window.transactions ? window.transactions[0].link : null,
        description: `Initial request is fulfilled!`,
        longDescription: `The on-chain Oracle Contract fulfills the original request by providing the token price from the API to the Client Contract. With this fulfilled request, the initial FT payment is now unlocked and can be accessed by the owner of the Oracle Contract / Oracle Node. Both the on-chain Oracle Contract and off-chain Oracle Node are typically owned by the same party.`
      }
    case 'sixthImageChange':
      return {
        ...initialState,
        diagramVisibility: true,
        tenthImage: oracletwo,
        fourthImage: bobtwo,
        aliceTokens: 40,
        bobTokens: 10,
        firsttoparrow: firsttoparrowtwo,
        secondtoparrow: secondtoparrowtwo,
        seventhImage: robottwo,
        explainerbackground: explainerbackgroundthree,
        explainercss: "explainer-seven",
        explainerbuttoncss: "explainer-button-two",
        stepcss: "step-two",
        bobtokenscss: "bobtokens-active",
        bobcontractlockcss: "bob-contract-lock-active",
        description: `Requested token price is now rendered to the front-end dApp!`,
        descriptionstate: false,
      }
    default:
      return {
        ...initialState,
        diagramVisibility: true,
      }
    }
}

const DiagramStateContext = React.createContext()
const DiagramDispatchContext = React.createContext()

function DiagramProvider ({children}) {
  const [state, dispatch] = useReducer(diagramReducer, initialState)

  return (
    <DiagramStateContext.Provider value={state}>
      <DiagramDispatchContext.Provider value={dispatch}>
        {children}
      </DiagramDispatchContext.Provider>
    </DiagramStateContext.Provider>
  );
};

function useDiagramState() {
  const context = React.useContext(DiagramStateContext);
  if (context === undefined) {
    throw new Error('useDiagramState must be used within a DiagramProvider')
  }
  return context;
}

function useDiagramDispatch() {
  const context = React.useContext(DiagramDispatchContext)
    if (context === undefined) {
      throw new Error('useDiagramDispatch must be used within a DiagramProvider')
    }
  return context
}

export {DiagramProvider, useDiagramState, useDiagramDispatch}
