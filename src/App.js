import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import { onSubmit } from './services/utils'
import Header from './components/header'
import Search from './components/search'
import Diagram from './components/diagram'
import {DiagramProvider} from './components/DiagramState'
import { 
  getAccountBalance, 
  isOracleAuthorized, 
  getOracleRequestSummary, 
  getOracleRequests, 
  getAllowance,
  checkWithdrawableTokens,
  makeTransfer,
  transfer} from './services/contractMethods'

const baseAcct = 'joshford.testnet'
const clientAcct = `client.${baseAcct}`
const oracleAcct = `oracle.${baseAcct}`

export default function App() {
  const [greeting, setGreeting] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const transferArgs = {
    "new_owner_id": "client.joshford.testnet",
    "amount": "1"
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
