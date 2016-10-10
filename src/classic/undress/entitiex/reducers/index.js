import { combineReducers } from 'redux'

import entitiex from './entitiex'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  entitiex,
  visibilityFilter
})

export default todoApp
