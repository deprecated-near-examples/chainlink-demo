import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './services/utils'
import {  } from './services/contractUtils'

window.nearSteps = []
window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <App />,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
