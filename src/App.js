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
  checkWithdrawableTokens,
  makeTransfer,
  transfer} from './services/contractMethods'
import './global.css'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const baseAcct = 'joshford.testnet'
const clientAcct = `client.${baseAcct}`
const oracleAcct = `oracle.${baseAcct}`

export default function App() {
  const [greeting, setGreeting] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const transferArgs = {
    "new_owner_id": "client.joshford.testnet",
    "amount": "1" // because numbers can be enormous and JavaScript sux we send most amounts as strings
  }
  const handleSubmit = () => {
    transfer(transferArgs);
   // getAccountBalance(baseAcct);
    // getAccountBalance('near-link.joshford.testnet');
    // getAccountBalance(oracleAcct);
    // getAllowance(baseAcct)
    // isOracleAuthorized();
    // getOracleRequestSummary();
    // getOracleRequests(baseAcct);
    // checkWithdrawableTokens();
  }

  // if (!window.walletConnection.isSignedIn()) return <SignIn/>
  
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
