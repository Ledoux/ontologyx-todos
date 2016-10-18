import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onToggleTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onToggleTodoClick(todo.id, todo.completed)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onToggleTodoClick: PropTypes.func.isRequired
}

export default TodoList
