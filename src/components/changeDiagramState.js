import React, { useState } from 'react';
import "../styles/diagramstatechange.css";
import { useDiagramDispatch } from "./DiagramState";

function ChangeDiagramState() {

    const [count, setCount] = useState(0);
    const dispatch = useDiagramDispatch();
    
    const incrementCounter = () => {
        if (count < 7) {
            setCount(count + 1);
            updateDiagram();
        }
        if (count === 7) {
            setCount(count - 7);
            updateDiagram();
        }
        console.log(count);
    };

    const decrementCounter = () => {
        if (count > 0){
            setCount(count - 1);
        }
        if (count === 0) {
            setCount(count + 7);
            updateDiagram();
        }
        console.log(count);
        updateDiagram();
    };

    const updateDiagram = () => {
        if (count === 0){
            dispatch({type: 'initialState'});
        }
        else if (count === 1)
        {
            dispatch({type: 'firstImageChange'});
        }
        else if (count === 2)
        {
            dispatch({type: 'secondImageChange'});
        }
        else if (count === 3)
        {
            dispatch({type: 'thirdImageChange'});
        }
        else if (count === 4)
        {
            dispatch({type: 'fourthImageChange'});
        }
        else if (count === 5)
        {
            dispatch({type: 'fifthImageChange'});
        }
        else if (count === 6)
        {
            dispatch({type: 'sixthImageChange'});
        }
    }
    
    return (
    <div className="counter">
      <button onClick={decrementCounter}>
        Back
      </button>
      <button onClick={incrementCounter}>
        Forward
      </button>
    </div>
  );
}

export default (ChangeDiagramState);