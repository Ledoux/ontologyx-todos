import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const ENTER_KEY = 13

let AddTodo = ({ dispatch }) => {
  let input
  return (
    <header className='header'>
      <h1> todos </h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        onKeyDown={event => {
          if (event.keyCode !== ENTER_KEY) { return }
          event.preventDefault()
          if (!input.value.trim()) { return }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
        ref={node => { input = node }}
      />
    </header>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
