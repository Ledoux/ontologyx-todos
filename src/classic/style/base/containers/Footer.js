import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import FilterLink from './FilterLink'
import { getVisibleTodos } from './VisibleTodoList'
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
        <FilterLink
          className={classnames({selected: nowShowing === 'SHOW_ALL'})}
          filter='SHOW_ALL'
        >
          All
        </FilterLink>
      </li>
      {' '}
      <li>
        <FilterLink
          className={classnames({selected: nowShowing === 'SHOW_ACTIVE'})}
          filter='SHOW_ACTIVE'>
          Active
        </FilterLink>
      </li>
      {' '}
      <li>
        <FilterLink
          className={classnames({selected: nowShowing === 'SHOW_COMPLETED'})}
          filter='SHOW_COMPLETED'>
          Completed
        </FilterLink>
      </li>
    </ul>
  </footer>)
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, 'SHOW_ALL')
  }
}

export default connect(mapStateToProps)(Footer)
