// required just for webpack bundling
require('../node_modules/todomvc-common/base.css')
require('../node_modules/todomvc-app-css/index.css')

import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Route, Router } from 'react-router'

import classicUndressBaseProvider from './classic/undress/base'
import classicUndressEntitiexProvider from './classic/undress/entitiex'
import classicUndressFiltexProvider from './classic/undress/filtex'
import classicUndressTransactionxProvider from './classic/undress/transactionx'

import classicStyleBaseProvider from './classic/style/base'
import classicStyleEntitiexProvider from './classic/style/entitiex'
import classicStyleFiltexProvider from './classic/style/filtex'
import classicStyleTransactionxProvider from './classic/style/transactionx'

import tagsUndressEntitiexProvider from './tags/undress/entitiex'

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
    <Route path='/classic/style/base' component={classicStyleBaseProvider} />
    <Route path='/classic/style/entitiex' component={classicStyleEntitiexProvider} />
    <Route path='/classic/style/filtex' component={classicStyleFiltexProvider} />
    <Route path='/classic/style/transactionx' component={classicStyleTransactionxProvider} />
    <Route path='/tags/undress/entitiex' component={tagsUndressEntitiexProvider} />
  </Router>,
  document.getElementsByClassName('todoapp')[0]
)
