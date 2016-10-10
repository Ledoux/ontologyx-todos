import { combineReducers } from 'redux'

import entitiexReducer from './entitiex'
import filtexReducer from './filtex'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  entitiex: entitiexReducer,
  filtex: filtexReducer,
  visibilityFilter
})

export default todoApp
