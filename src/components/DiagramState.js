import React, { useReducer } from "react";
import divider from "../assets/divider.png";
import transferten from "../assets/transfer-ten.png";
import aliceone from "../assets/alice-one.png";
import bobone from "../assets/bob-one.png";
import bobtwo from "../assets/bob-two.png";
import arrowone from "../assets/arrow-one.png";
import arrowtwo from "../assets/arrow-two.png"
import arrowoneotherdirection from "../assets/arrow-one-other-direction.png";
import longarrowone from "../assets/long-arrow-one.png";
import longarrowoneotherdirection from "../assets/long-arrow-one-other-direction.png";
import robotone from "../assets/robot-one.png";
import oracleone from "../assets/oracle-one.png";
import oracleExplainer from "../assets/oracleExplainer.png";
import firsttoparrowone from "../assets/first-top-arrow-one.png";
import firsttoparrowtwo from "../assets/first-top-arrow-two.png";
import secondtoparrowone from "../assets/second-top-arrow-one.png";

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

  // Variables to hold token amount per contract
   aliceTokens: 50,
   bobTokens: 0,

   divider: divider,
   transferten: transferten,
   oracleExplainer: oracleExplainer,

};

const DiagramStateContext = React.createContext(initialState);
const DiagramDispatchContext = React.createContext(initialState);


function diagramReducer(state, action) {
  switch (action.type) {
    case 'firstImageChange':
      return {
        ...state,
        aliceTokens: 40,
        firsttoparrow: action.firsttoparrowtwo,
        secondImage: action.arrowtwo,
        fourthImage: action.bobtwo,
      };
    case 'secondImageChange':
      // the second change goes here
    default:
      throw new Error();
  }
}

function DiagramProvider ({children}) {

  const [state, dispatch] = useReducer(diagramReducer, initialState);

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
    throw new Error('useDiagramState must be used within a DiagramProvider');
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

export {DiagramProvider, useDiagramState, useDiagramDispatch};