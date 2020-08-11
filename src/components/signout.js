import React from 'react'
import { logout } from '../services/utils'
import '../styles/signout.css';

export default function App() {
  
  return (
      <div className="sign-out">
        <button id="sign-out" onClick={logout}>
          Sign out
        </button>
      </div>
    )
}