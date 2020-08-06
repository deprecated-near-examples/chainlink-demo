import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import { logout, onSubmit } from './services/utils'
import getConfig from './services/config'
import SignIn from './components/signIn'
import { 
  getAccountBalance, 
  isOracleAuthorized, 
  getOracleRequestSummary, 
  getOracleRequests, 
  getAllowance,
  checkWithdrawableTokens} from './services/contractMethods'
import './global.css'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const baseAccount = 'joshford.testnet'

export default function App() {
  const [greeting, setGreeting] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleSubmit = () => {
    getAccountBalance(`client.${baseAccount}`);
    getAccountBalance(baseAccount);
    //getAllowance(baseAccount)
    // isOracleAuthorized();
    // getOracleRequestSummary();
    //getOracleRequests(baseAccount);
    // checkWithdrawableTokens();
  }

  if (!window.walletConnection.isSignedIn()) return <SignIn/>
  
  return (
    <>
      <main>
        <button onClick={handleSubmit}>
          TEST
        </button>
      </main>
      <button className="link" onClick={logout}>
        Sign out
      </button>
    </>
  )
}
