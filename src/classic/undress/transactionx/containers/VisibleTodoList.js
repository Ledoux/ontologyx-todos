import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getFilteredElements } from '../reducers/filtex'
import TodoList from '../components/TodoList'

class VisibleTodoList extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: 'REQUEST_GET_TODOS',
      transactionx: 'GET',
      url: 'http://localhost:5000',
      databaseName: 'ontologyx',
      collectionName: 'todos'
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
    onDestroyTodoClick: (id, completed) => {
      dispatch({
        type: 'DESTROY_TODO',
        transactionx: 'DELETE',
        url: 'http://localhost:5000',
        databaseName: 'ontologyx',
        collectionName: 'todos',
        query: { id }
      })
    },
    onToggleTodoClick: (id, completed) => {
      dispatch({
        type: 'TOGGLE_TODO',
        transactionx: 'PUT',
        url: 'http://localhost:5000',
        databaseName: 'ontologyx',
        collectionName: 'todos',
        query: { id },
        update: { '$set': { completed: !completed } }
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList)
