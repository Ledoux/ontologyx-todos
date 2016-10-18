import { size } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

const ENTER_KEY = 13

let AddTodo = ({ dispatch, todosById }) => {
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
          dispatch({type: 'ADD_TODO', entitiex: { patch: { todosById: {
            [size(todosById)]: { text: input.value }
          }}}})
          input.value = ''
        }}
        ref={node => { input = node }}
      />
    </header>
  )
}
const mapStateToProps = ({
  entitiex: {todosById}
}) => {
  return {
    todosById
  }
}
AddTodo = connect(mapStateToProps)(AddTodo)

export default AddTodo
