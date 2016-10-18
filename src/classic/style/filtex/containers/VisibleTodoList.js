import { fromPairs } from 'lodash'
import { connect } from 'react-redux'
import { _DELETE_ } from 'entitiex'
import { getFilteredElements } from '../reducers/filtex'

import TodoList from '../components/TodoList'

const mapStateToProps = (state) => {
  return {
    todos: getFilteredElements(state, state.visibilityFilter, 'todos')
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
