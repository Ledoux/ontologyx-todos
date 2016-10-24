import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { ESCAPE_KEY, ENTER_KEY } from '../utils'

const EMPTY = 'empty'
const MAX_CHARACTERS_COUNT = 10

class Tag extends Component {
  constructor () {
    super()
    this.state = {editLabel: '', editing: false}
    this.handleChange = this._handleChange.bind(this)
    this.handleKeyDown = this._handleKeyDown.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }
  componentDidUpdate (prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const node = ReactDOM.findDOMNode(this.refs.editField)
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }
  _handleChange (event) {
    if (this.state.editing) {
      this.setState({editLabel: event.target.value})
    }
  }
  _handleKeyDown (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editLabel: this.props.label, editing: false})
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }
  _handleSubmit (event) {
    const val = this.state.editLabel.trim()
    this.props.onSave(val)
    this.setState({editing: false})
  }
  render () {
    let {
      color,
      label
    } = this.props
    const {
      editing
    } = this.state
    if (label.replace(/\s/g, '') === '') { label = EMPTY }
    const isEmpty = label === EMPTY
    if (editing) {
      return <input
      className='tag tag-input'
      ref='editField'
			value={this.state.editLabel}
			onBlur={this.handleSubmit}
			onChange={this.handleChange}
			onKeyDown={this.handleKeyDown} />
    }
    const isLabelCut = label.length > MAX_CHARACTERS_COUNT
    return (<button
      className={classnames('tag', { 'tag-filled': !isEmpty, 'tag-empty': isEmpty })}
      style={{backgroundColor: isEmpty ? 'white' : color}}
      onClick={(event) => {
        const label = this.props.label
        event.preventDefault()
        event.stopPropagation()
        this.setState({
          editLabel: label === EMPTY ? '' : label,
          editing: true
        })
      }}
      title={isLabelCut ? label : null}
    >
      {isLabelCut
        ? `${label.slice(0, MAX_CHARACTERS_COUNT)}...`
        : label
      }
    </button>)
  }
}

Tag.propTypes = {
  onSave: PropTypes.func.isRequired,
  color: PropTypes.string,
  editing: PropTypes.bool,
  label: PropTypes.string
}

Tag.defaultProps = {
  label: EMPTY
}

export default Tag
