import 'regenerator-runtime/runtime'
import getConfig from '../services/config'
import { 
  getAccountBalance, 
  isOracleAuthorized, 
  getOracleRequestSummary, 
  getOracleRequests, 
  getAllowance,
  checkWithdrawableTokens} from '../services/contractMethods'

const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const baseAcct = 'joshford.testnet'
const clientAcct = `client.${baseAcct}`
const oracleAcct = `oracle.${baseAcct}`


export const handleSubmit = () => {
    getAccountBalance(baseAcct);
    getAccountBalance(clientAcct);
    getAccountBalance(oracleAcct);
    getAllowance(baseAcct)
    isOracleAuthorized();
    getOracleRequestSummary();
    getOracleRequests(baseAcct);
    checkWithdrawableTokens();
}
