import 'regenerator-runtime/runtime'
import React from 'react'
import { logout, onSubmit } from './services/utils'
import SignIn from './components/signIn'
import Header from './components/header'
import Search from './components/search'
import Diagram from './components/diagram'
import Signout from './components/signout'
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
  


export default function App() {

  // if (!window.walletConnection.isSignedIn()) return <SignIn/>
  
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
