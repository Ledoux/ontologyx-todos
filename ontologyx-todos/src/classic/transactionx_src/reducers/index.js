import { combineReducers } from 'redux'

import ENTITIEX from './ENTITIEX'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  ENTITIEX,
  visibilityFilter
})

export default todoApp
