import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

// import TodoMembersBar from '../containers/TodoMembersBar'
import TodoMembersList from '../containers/TodoMembersList'
import TodoTagsList from '../containers/TodoTagsList'
// import TodoTagsBar from '../containers/TodoTagsBar'
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
      // this.props.onDestroy()
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
    let {
      onToggle, onDestroy,
      completed, editing, id, tagIds, text,
      membersById
    } = this.props
    const memberIds = Object.keys(membersById)
    // editing = true
    return (<li
      className={classnames({
        completed: completed,
        editing: editing
      })}
      style={{
        height: '120px'
      }}
    >
      <div className='col col-1 full-column'>
        <input
          className='toggle'
          type='checkbox'
          checked={completed}
          onChange={onToggle}
        />
      </div>
      <div className='col col-6 flex full-column' style={{
        overflow: 'auto'
      }}>
        {
          editing
          ? <input
          ref='editField'
          className='edit'
          style={{
            width: '85%',
            marginLeft: '0px',
            marginBottom: 'auto',
            marginTop: 'auto'
            // margin: 0,
            // padding: 0,
            // height: '100px',
            // textOverflow: 'ellipsis'
          }}
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />
          : (<label
            onDoubleClick={this.handleEdit}
            style={{
              marginLeft: '0px',
              marginBottom: 'auto',
              marginTop: 'auto'
            }}
          >
            {text}
          </label>)
        }
      </div>
      <div className='col col-2 flex full-column' style={{
        overflow: 'auto'
      }}>
        <TodoMembersList
          icon='member'
          todoId={id}
          memberIds={memberIds}
          textKey='name'
        />
      </div>
      <div className='col col-2 flex full-column'>
        <TodoTagsList
          icon='tag'
          todoId={id}
          tagIds={tagIds}
          textKey='label'
        />
      </div>
      <div className='col col-1'>
        <button
          className='destroy'
          style={{top: 0, marginBottom: 'auto'}}
          onClick={onDestroy}
        />
      </div>
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
  membersById: PropTypes.object.isRequired,
  tagIds: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
