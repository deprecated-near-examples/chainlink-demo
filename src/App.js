import 'regenerator-runtime/runtime'
import React, {useState} from 'react'
import Header from './components/Header'
import Search from './components/Search'
import Diagram from './components/Diagram'
import ChangeDiagramState from './components/changeDiagramState';
import { DiagramProvider } from './components/DiagramState'

function App() {

  return (
    <div className="App">
      <Header/>
      <DiagramProvider>
          <Search/>
          <Diagram/>
          <ChangeDiagramState/>
      </DiagramProvider>
    </div>
  )
}

export default App;