import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'

// import app from './classic/base_src'
// import app from './classic/entitiex_src'
// import app from './classic/filtex_src'
import app from './classic/transactionx_src'

// import app from './tags/base_src'
// import app from './tags/entitiex_src'
// import app from './tags/filtex_src'
// import app from './tags/transactionx_src'

const devToolsExtension = window.devToolsExtension
? window.devToolsExtension()
: null

let store = createStore(
  app.todoApp, app.sagaMiddleware
  ? compose(applyMiddleware(app.sagaMiddleware), devToolsExtension)
  : devToolsExtension
)

if (app.sagaMiddleware) {
  app.sagaMiddleware.run(app.rootSaga)
}

render(
  <Provider store={store}>
    <app.App />
  </Provider>,
  document.getElementById('root')
)
