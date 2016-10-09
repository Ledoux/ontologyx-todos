import { connect } from 'react-redux'

import { getFilteredElements } from '../reducers/filtex'
import TodoList from '../components/TodoList'

const mapStateToProps = (state) => {
  return {
    todos: getFilteredElements(state, state.visibilityFilter, 'todos')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id, completed) => {
      dispatch({ type: 'TOGGLE_TODO', entitiex: { patch: {
        todosById: {
          [id]: { completed: !completed }
        }
      }}})
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
