import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getFilteredElements } from '../reducers/filtex'
import TodoList from '../components/TodoList'

class VisibleTodoList extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch({ type: 'MERGE_TODOS_TRANSACTIONX', transactionx: { patch: {
      ontologyx: {todos: null}
    }}})
    dispatch({
      type: 'REQUEST_GET_TRANSACTIONX',
      protocol: 'GET',
      url: 'http://localhost:5000'
    })
  }
  render () {
    return <TodoList {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getFilteredElements(state, state.visibilityFilter, 'todos')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onTodoClick: (id, completed) => {
      dispatch({ type: 'TOGGLE_TODO', entitiex: { patch: {
        todosById: {
          [id]: { completed: !completed }
        }
      }}})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList)
