import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import TodoTagsBar from '../containers/TodoTagsBar'
import { ESCAPE_KEY, ENTER_KEY } from '../utils'

class Todo extends Component {
  constructor () {
    super()
    this.state = {editText: ''}
    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleEdit = this._handleEdit.bind(this)
    this.handleKeyDown = this._handleKeyDown.bind(this)
    this.handleChange = this._handleChange.bind(this)
  }
  componentDidUpdate (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editField)
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }
  _handleSubmit (event) {
    const val = this.state.editText.trim()
    if (val) {
      this.props.onSave(val)
      this.setState({editText: val})
    } else {
      this.props.onDestroy()
    }
  }
  _handleEdit () {
    this.props.onEdit()
    this.setState({editText: this.props.text})
  }
  _handleKeyDown (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props.text})
      this.props.onCancel(event)
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }
  _handleChange (event) {
    if (this.props.editing) {
      this.setState({editText: event.target.value})
    }
  }
  render () {
    const {
      onToggle, onDestroy,
      completed, editing, id, tagIds, text
    } = this.props
    return (<li
      className={classnames({
        completed: completed,
        editing: editing
      })}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={completed}
          onChange={onToggle}
        />
        <label onDoubleClick={this.handleEdit}>
          <span className='text completed'> {text} </span>
          {<TodoTagsBar id={id} tagIds={tagIds} />}
        </label>
        <button className='destroy' onClick={onDestroy} />
      </div>
      <input
      ref='editField'
			className='edit'
			value={this.state.editText}
			onBlur={this.handleSubmit}
			onChange={this.handleChange}
			onKeyDown={this.handleKeyDown} />
    </li>)
  }
}

Todo.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  id: PropTypes.string.isRequired,
  tagIds: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
