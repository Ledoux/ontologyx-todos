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
    dispatch({
      type: 'REQUEST_GET_TAGS',
      transactionx: 'GET',
      url: 'http://localhost:5000',
      databaseName: 'ontologyx',
      collectionName: 'tags'
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
    onCancelTodoClick: (id) => {
      dispatch({ type: 'CANCEL_TODO', entitiex: { patch: {
        todosById: {
          [id]: { editing: false }
        }}}})
    },
    onDestroyTodoClick: (id) => {
      dispatch({
        type: 'DESTROY_TODO',
        transactionx: 'DELETE',
        url: 'http://localhost:5000',
        databaseName: 'ontologyx',
        collectionName: 'todos',
        query: { id }
      })
    },
    onEditTodoClick: (id) => {
      dispatch({ type: 'EDIT_TODO', entitiex: { patch: {
        todosById: {
          [id]: { editing: true }
        }}}})
    },
    onSaveTodoClick: (id, text) => {
      dispatch({ type: 'CANCEL_TODO', entitiex: { patch: {
        todosById: {
          [id]: { editing: false }
        }}}})
      dispatch({
        type: 'SAVE_TODO',
        transactionx: 'PUT',
        url: 'http://localhost:5000',
        databaseName: 'ontologyx',
        collectionName: 'todos',
        query: { id },
        update: { '$set': { text } }
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
    },
    onToggleAllTodosClick: (ids, completed) => {
      dispatch({
        type: 'TOGGLE_ALL_TODOS',
        transactionx: 'PUT',
        url: 'http://localhost:5000',
        databaseName: 'ontologyx',
        collectionName: 'todos',
        query: { id: { '$in': ids } },
        update: { '$set': { completed: !completed } }
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList)
