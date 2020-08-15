import React, { useState } from 'react'
import '../styles/diagramstatechange.css'
import { useDiagramDispatch } from './DiagramState'

function ChangeDiagramState() {
    const [count, setCount] = useState(1)
    const dispatch = useDiagramDispatch()
    
    const incrementCounter = () => {
        if (count < 7) {
            setCount(count + 1)
            updateDiagram()
        }
        else if (count === 7) {
            setCount(count - 7)
            updateDiagram()
        }
    };

    const updateDiagram = () => {
        if (count === 0) dispatch({type: 'initialState'})
        if (count === 1) dispatch({type: 'firstImageChange'})
        if (count === 2) dispatch({type: 'secondImageChange'})
        if (count === 3) dispatch({type: 'thirdImageChange'})
        if (count === 4) dispatch({type: 'fourthImageChange'})
        if (count === 5) dispatch({type: 'fifthImageChange'})
        if (count === 6) dispatch({type: 'sixthImageChange'})
    }
    
    return (
      <div>
        <div className="counter-gap"></div>
        <div className="counter">
          <button onClick={incrementCounter}>
            Next
          </button>
        </div>
      </div>
  )
}

export default ChangeDiagramState