import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onToggleTodoClick, onDestroyTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onToggleClick={() => onToggleTodoClick(todo.id, todo.completed)}
        onDestroyClick={() => onDestroyTodoClick(todo.id)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onToggleTodoClick: PropTypes.func.isRequired,
  onDestroyTodoClick: PropTypes.func.isRequired
}

export default TodoList
