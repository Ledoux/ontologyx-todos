import { values } from 'lodash'
import { connect } from 'react-redux'

import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = ({
  entitiex: {todosById},
  visibilityFilter
}) => {
  return {
    todos: getVisibleTodos(values(todosById), visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoToggleClick: (id, completed) => {
      dispatch({ type: 'TOGGLE_TODO', entitiex: { patch: {
        todosById: {
          [id]: { completed: !completed }
        }}}})
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
