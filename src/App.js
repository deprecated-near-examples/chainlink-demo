import 'regenerator-runtime/runtime'
import React, {useState} from 'react'
import Header from './components/Header'
import Search from './components/Search'
import Diagram from './components/Diagram'
import { DiagramProvider } from './components/DiagramState'

function App() {

  return (
    <div className="App">
      <Header/>
      <DiagramProvider>
          <Search/>
          <Diagram/>
      </DiagramProvider>
    </div>
  )
}

export default App;