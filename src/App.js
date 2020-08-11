import 'regenerator-runtime/runtime'
import React from 'react'
import Header from './components/header'
import Search from './components/search'
import Diagram from './components/diagram'
import { DiagramProvider } from './components/DiagramState'

export default function App() {
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
