import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onTodoToggleClick, onTodoDeleteClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onToggleClick={() => onTodoToggleClick(todo.id, todo.completed)}
        onDeleteClick={() => onTodoDeleteClick(todo.id)}
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
  onTodoToggleClick: PropTypes.func.isRequired,
  onTodoDeleteClick: PropTypes.func.isRequired
}

export default TodoList
