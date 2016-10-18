import {every, fromPairs, size, values} from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

let AddTodo = ({ dispatch, todosById }) => {
  let input
  return (
    <div>
      <button onClick={e => {
        const isAllCompleted = every(values(todosById), { completed: true })
        dispatch({ type: 'TOGGLE_ALL_TODOS', entitiex: { patch: {
          todosById: fromPairs(Object.keys(todosById)
                     .map(key => [key, {completed: !isAllCompleted}])
        )}}})
      }}> toggle all </button>
      {' '}
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch({type: 'ADD_TODO', entitiex: { patch: { todosById: {
          [size(todosById)]: { text: input.value }
        }}}})
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
    todosById
  }
}
AddTodo = connect(mapStateToProps)(AddTodo)

export default AddTodo
