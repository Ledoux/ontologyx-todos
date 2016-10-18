import React, { PropTypes } from 'react'
import Todo from '../containers/Todo'

const TodoList = ({
  todos,
  onCancelTodoClick,
  onDestroyTodoClick,
  onEditTodoClick,
  onSaveTodoClick,
  onToggleTodoClick,
  onToggleAllTodosClick
}) => {
  const isAllCompleted = todos.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1
  }, 0) === 0
  return (<section className='main'>
    <input
      className='toggle-all'
      type='checkbox'
      onChange={() => onToggleAllTodosClick(!isAllCompleted)}
      checked={isAllCompleted}
    />
    <ul className='todo-list'>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onCancel={() => onCancelTodoClick(todo.id)}
          onClick={() => onToggleTodoClick(todo.id)}
          onEdit={() => onEditTodoClick(todo.id)}
          onDestroy={() => onDestroyTodoClick(todo.id)}
          onToggle={() => onToggleTodoClick(todo.id)}
          onSave={(text) => onSaveTodoClick(todo.id, text)}
        />
      )}
    </ul>
  </section>)
}

TodoList.propTypes = {
  onCancelTodoClick: PropTypes.func.isRequired,
  onDestroyTodoClick: PropTypes.func.isRequired,
  onEditTodoClick: PropTypes.func.isRequired,
  onSaveTodoClick: PropTypes.func.isRequired,
  onToggleTodoClick: PropTypes.func.isRequired,
  onToggleAllTodosClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TodoList
