import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import todoApp from './reducers'
import App from './components/App'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(todoApp,
  compose(applyMiddleware(sagaMiddleware), window.devToolsExtension
  ? window.devToolsExtension()
  : null)
)

sagaMiddleware.run(rootSaga)

const membersStyleTransactionxProvider = () => (<Provider store={store}>
  <App />
</Provider>)

export default membersStyleTransactionxProvider


document.body.style['min-width'] = '800px'
