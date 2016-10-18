import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import FilterButton from './FilterButton'
import { getFilteredElements } from '../reducers/filtex'
import { pluralize } from '../utils'

const Footer = ({nowShowing, todos}) => {
  const activeTodoCount = todos.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1
  }, 0)
  const completedCount = todos.length - activeTodoCount
  const activeTodoWord = pluralize(activeTodoCount, 'item')
  if (!activeTodoCount && !completedCount) { return <div /> }
  return (<footer className='footer'>
    <span className='todo-count'>
      <strong>{activeTodoCount}</strong> {activeTodoWord} left
    </span>
    <ul className='filters'>
			<li>
        <FilterButton filter='ALL'>
          All
        </FilterButton>
      </li>
      {' '}
      <li>
        <FilterButton filter='ACTIVE'>
          Active
        </FilterButton>
      </li>
      {' '}
      <li>
        <FilterButton filter='COMPLETED'>
          Completed
        </FilterButton>
      </li>
    </ul>
  </footer>)
}

const mapStateToProps = (state) => {
  return {
    todos: getFilteredElements(state, 'ALL', 'todos'),
    nowShowing: state.visibilityFilter
  }
}

export default connect(mapStateToProps)(Footer)
