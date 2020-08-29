import React, { useState } from 'react';
import '../styles/diagramstatechange.css';
import { useDiagramDispatch, useDiagramState } from '../services/diagramState';

function ChangeDiagramState() {
  const [count, setCount] = useState(0);

  // Accessing the React Context through the custom functions from the Diagram State
  const dispatch = useDiagramDispatch();
  const state = useDiagramState();

  // Counter will change the state of the diagram; the counter cannot go above 6 or below 0
  const incrementCounter = () => {
    const newCount = count + 1 === 7 ? 0 : count + 1
    setCount(newCount);
    updateDiagram(newCount);
  }

  const decrementCounter = () => {
    const newCount = count - 1 === -1 ? 6 : count - 1
    setCount(newCount);
    updateDiagram(newCount);
  }

  // Each number in the counter corresponds to one state of the diagram 
  const updateDiagram = (newCount) => {
      if (newCount === 1) dispatch({type: 'firstImageChange'});
      else if (newCount === 2) dispatch({type: 'secondImageChange'});
      else if (newCount === 3) dispatch({type: 'thirdImageChange'});
      else if (newCount === 4) dispatch({type: 'fourthImageChange'});
      else if (newCount === 5) dispatch({type: 'fifthImageChange'});
      else if (newCount === 6) dispatch({type: 'sixthImageChange'});
      else  dispatch({type: 'displayDiagram'});
  }
  
  return (
    <div>
      {state.diagramVisibility ? 
      <div className="counter">
        <button onClick={decrementCounter} className="counter-button">
          Prev
        </button>
        <button onClick={incrementCounter} className="counter-button">
          Next
        </button>
      </div> : <div></div>}
    </div>
  )
}

export default ChangeDiagramState
