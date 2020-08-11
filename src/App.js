import 'regenerator-runtime/runtime'
import React from 'react'
import { logout, onSubmit } from './services/utils'
import SignIn from './components/signIn'
import Header from './components/header'
import Search from './components/search'
import Diagram from './components/diagram'
import Signout from './components/signout'
import {DiagramProvider} from './components/DiagramState'

export default function App() {

  if (!window.walletConnection.isSignedIn()) return <SignIn/>
  
  return (
    <div className="App">

        <Header/>

      <DiagramProvider>
          <Search/>
          <Diagram/>
      </DiagramProvider>

      <Signout />
    
    </div>
  )
}
