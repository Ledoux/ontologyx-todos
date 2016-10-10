import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import todoApp from './reducers'
import App from './components/App'

const store = createStore(todoApp,
  window.devToolsExtension
  ? window.devToolsExtension()
  : null
)

const classicUndressBaseProvider = () => (<Provider store={store}>
  <App />
</Provider>)

export default classicUndressBaseProvider
