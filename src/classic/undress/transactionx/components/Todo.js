import React, { PropTypes } from 'react'

const Todo = ({ onToggleClick, onDestroyClick, completed, text }) => (
  <li
    onClick={onToggleClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
    {' '}
    <button onClick={(e) => { e.stopPropagation(); onDestroyClick() }}> x </button>
  </li>
)

Todo.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  onDestroyClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
