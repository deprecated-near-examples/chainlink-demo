import React, { useState } from 'react'
import '../styles/diagramstatechange.css'
import { useDiagramDispatch, useDiagramState } from './DiagramState'

function ChangeDiagramState() {

  const [count, setCount] = useState(0)

  const dispatch = useDiagramDispatch()
  const state = useDiagramState()
  
  const incrementCounter = () => {
    const newCount = count + 1 === 7 ? 0 : count + 1
    setCount(newCount)
    console.log(newCount)
    updateDiagram(newCount)
  }

  const decrementCounter = () => {
    const newCount = count - 1 === -1 ? 6 : count - 1
    setCount(newCount)
    console.log(newCount)
    updateDiagram(newCount)
  }

  const updateDiagram = (newCount) => {
      if (newCount === 0) dispatch({type: 'displayDiagram'})
      if (newCount === 1) dispatch({type: 'firstImageChange'})
      if (newCount === 2) dispatch({type: 'secondImageChange'})
      if (newCount === 3) dispatch({type: 'thirdImageChange'})
      if (newCount === 4) dispatch({type: 'fourthImageChange'})
      if (newCount === 5) dispatch({type: 'fifthImageChange'})
      if (newCount === 6) dispatch({type: 'sixthImageChange'})
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
