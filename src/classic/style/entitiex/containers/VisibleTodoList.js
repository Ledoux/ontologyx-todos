import { fromPairs, values } from 'lodash'
import { connect } from 'react-redux'
import { _DELETE_ } from 'entitiex'

import TodoList from '../components/TodoList'

export const getVisibleTodos = (todos, filter) => {
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
    onCancelTodoClick: (id) => {
      dispatch({ type: 'CANCEL_TODO', entitiex: { patch: {
        todosById: {
          [id]: { editing: false }
        }}}})
    },
    onDestroyTodoClick: (id) => {
      dispatch({ type: 'DESTROY_TODO', entitiex: { unPatch: {
        todosById: {
          [id]: _DELETE_
        }}}})
    },
    onEditTodoClick: (id) => {
      dispatch({ type: 'EDIT_TODO', entitiex: { patch: {
        todosById: {
          [id]: { editing: true }
        }}}})
    },
    onSaveTodoClick: (id, text) => {
      dispatch({ type: 'SAVE_TODO', entitiex: { patch: {
        todosById: {
          [id]: { editing: false, text }
        }}}})
    },
    onToggleTodoClick: (id, completed) => {
      dispatch({ type: 'TOGGLE_TODO', entitiex: { patch: {
        todosById: {
          [id]: { completed: !completed }
        }}}})
    },
    onToggleAllTodosClick: (ids, completed) => {
      dispatch({ type: 'TOGGLE_ALL_TODOS', entitiex: { patch: {
        todosById: fromPairs(ids.map(id => [id, {completed: !completed}]))
      }}})
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
