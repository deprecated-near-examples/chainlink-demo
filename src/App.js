import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import { logout, onSubmit } from './utils'
import './global.css'

import getConfig from './config'
import SignIn from './components/signIn'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [greeting, setGreeting] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract.get_balance({ owner_id: window.accountId })
          .then(result => console.log(result))
      }
  },[])

  const handleSubmit = async () => {
     const newGreeting = event.target.elements.greeting.value
     await onSubmit(event)
     setGreeting(newGreeting)
  }

  if (!window.walletConnection.isSignedIn()) return <SignIn/>
  
  return (
    <>
      <button className="link" onClick={logout}>
        Sign out
      </button>

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset id="fieldset">
            <div>
              <input
                autoComplete="off"
                defaultValue={greeting}
                id="greeting"
                onChange={e => setButtonDisabled(e.target.value === greeting)}
              />
              <button disabled={buttonDisabled}>
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </main>

    </>
  )
}
