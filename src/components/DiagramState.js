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

  // Variables 
   aliceTokens: 50,
   bobTokens: 0,
   descriptionstate: true,
  
   // css variables
   bobtokenscss: "bobtokens-inactive",
   transfertencss: "transfer-ten-inactive",
   bobcontractlockcss: "bob-contract-lock-inactive",
   explainercss: "explainer-one",
   stepcss: "step-one",
   desciption: `Alice’s contract allowance is set to cover tx fees`,
   longDescription: 'More information on the smart contract processes will go here.',

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

function diagramReducer(state, action) {
  switch (action.type) {
    case 'initialState':
      return initialState
    case 'firstImageChange':
      return {
        ...initialState,
        aliceTokens: 40,
        firsttoparrow: firsttoparrowtwo,
        secondImage: arrowtwo,
        fourthImage: bobtwo,
        step: steptwo,
        bobtokenscss: "bobtokens-active",
        transfertencss: "transfer-ten-active",
        explainercss: "explainer-two",   
        desciption: "Contract sends request & tokens to Oracle Contract",
      };
    case 'secondImageChange':
      return {
        ...initialState,
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
        desciption: "Tokens locked & request sent to Oracle Node.",
      }
    case 'thirdImageChange':
      return {
        ...initialState,
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
        desciption: "Oracle Node interfaces with API to retrieve data",
      }
    case 'fourthImageChange':
      return {
        ...initialState,
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
        desciption: `Price is returned to Oracle Contract`,
      }
      //`Price ${result} is returned to Oracle Contract`
    case 'fifthImageChange':
      return {
        ...initialState,
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
        desciption: `Price is returned to Alice’s Contract`,
      }
    case 'sixthImageChange':
      return {
        ...initialState,
        tenthImage: oracletwo,
        fourthImage: bobtwo,
        aliceTokens: 40,
        bobTokens: 10,
        firsttoparrow: firsttoparrowtwo,
        secondtoparrow: secondtoparrowtwo,
        seventhImage: robottwo,
        explainerbackground: explainerbackgroundthree,
        explainerbuttoncss: "explainer-button-two",
        stepcss: "step-two",
        bobtokenscss: "bobtokens-active",
        bobcontractlockcss: "bob-contract-lock-active",
        desciption: `Learn more about using Chainlink on NEAR`,
        descriptionstate: false,
      }
    default:
      return initialState
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