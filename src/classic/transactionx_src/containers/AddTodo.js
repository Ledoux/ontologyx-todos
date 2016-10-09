import React from 'react'
import { connect } from 'react-redux'

let AddTodo = ({ dispatch, todosCount }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch({
          documents: [{ text: input.value }],
          transactionx: 'POST',
          databaseName: 'ontologyx',
          url: 'http://localhost:5000',
          collectionName: 'todos',
          type: 'ADD_TODO'
        })
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type='submit'>
          Add Todo
        </button>
      </form>
    </div>
  )
}
const mapStateToProps = ({
  entitiex: {todosById}
}) => {
  return {
    todosCount: Object.keys(todosById).length
  }
}
AddTodo = connect(mapStateToProps)(AddTodo)

export default AddTodo
