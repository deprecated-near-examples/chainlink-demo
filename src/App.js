import 'regenerator-runtime/runtime'
import React from 'react'
import { logout, onSubmit } from './services/utils'
import SignIn from './components/signIn'
import Header from './components/header'
import Search from './components/search'
import Diagram from './components/diagram'
//import './styles/global.css';

export default function App() {

  if (!window.walletConnection.isSignedIn()) return <SignIn/>
  
  return (
    <div className="App">

      <div>
        <Header/>
      </div>

      <div>
        <Search/>
      </div>

      <div>
        <Diagram/>
      </div>

      <button className="link" onClick={logout}>
        Sign out
      </button>
    
    </div>
  )
}
