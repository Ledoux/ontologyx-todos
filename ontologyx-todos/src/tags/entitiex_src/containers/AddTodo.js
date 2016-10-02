import { mergeIntoEntitiex } from 'entitiex'
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
        dispatch(mergeIntoEntitiex({
          todosById: {
            [todosCount++]: { text: input.value }
          }}))
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
