import { combineReducers } from 'redux'

import entitiexReducer from './entitiex'
import filtexReducer from './filtex'
import transactionxReducer from './transactionx'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  entitiex: entitiexReducer,
  filtex: filtexReducer,
  transactionx: transactionxReducer,
  visibilityFilter
})

export default todoApp
