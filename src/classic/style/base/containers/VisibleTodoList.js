import { connect } from 'react-redux'
import {
  cancelTodo,
  destroyTodo,
  editTodo,
  saveTodo,
  toggleTodo,
  toggleAllTodos
} from '../actions'
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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancelTodoClick: (id) => {
      dispatch(cancelTodo(id))
    },
    onDestroyTodoClick: (id) => {
      dispatch(destroyTodo(id))
    },
    onEditTodoClick: (id) => {
      dispatch(editTodo(id))
    },
    onSaveTodoClick: (id, text) => {
      dispatch(saveTodo(id, text))
    },
    onToggleTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },
    onToggleAllTodosClick: (id) => {
      dispatch(toggleAllTodos(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
