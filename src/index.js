import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Route, Router } from 'react-router'

import classicUndressBaseProvider from './classic/undress/base'
import classicUndressEntitiexProvider from './classic/undress/entitiex'
import classicUndressFiltexProvider from './classic/undress/filtex'
import classicUndressTransactionxProvider from './classic/undress/transactionx'

const MainApp = () => {
  return (<div>
    <div> ONTOLOGYX </div>
    <div>
      <div> classic </div>
      <div>
        <div>
          <div> undress </div>
          <div>
            <div> base
              <button onClick={() => window.location.pathname = '/classic/undress/base'}>
                Go
              </button>
            </div>
            <div> entitiex </div>
            <div> filtex </div>
            <div> transactionx </div>
          </div>
        </div>
        <div>
          <div> style </div>
          <div>
            <div> base </div>
            <div> entitiex </div>
            <div> filtex </div>
            <div> transactionx </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div> tags </div>
      <div>
        <div> undress </div>
        <div>
          <div> base </div>
        </div>
      </div>
    </div>
  </div>)
}

render(
  <Router history={browserHistory} >
    <Route path='/' component={MainApp} />
    <Route path='/classic/undress/base' component={classicUndressBaseProvider} />
    <Route path='/classic/undress/entitiex' component={classicUndressEntitiexProvider} />
    <Route path='/classic/undress/filtex' component={classicUndressFiltexProvider} />
    <Route path='/classic/undress/transactionx' component={classicUndressTransactionxProvider} />
  </Router>,
  document.getElementById('root')
)
