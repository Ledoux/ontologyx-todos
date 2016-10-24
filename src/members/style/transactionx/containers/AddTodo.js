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
          dispatch({
            documents: [{ text: input.value }],
            transactionx: 'POST',
            databaseName: 'ontologyx',
            url: 'http://localhost:5000',
            collectionName: 'todos',
            type: 'ADD_TODO'
          })
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
