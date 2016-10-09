import { connect } from 'react-redux'
import { mergeIntoEntitiex } from 'ENTITIEX'

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
  ENTITIEX: {todosById},
  visibilityFilter
}) => {
  return {
    todos: getVisibleTodos(todosById.values(), visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoToggleClick: (id, completed) => {
      dispatch(mergeIntoEntitiex({
        todosById: {
          [id]: { completed: !completed }
        }
      }))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
