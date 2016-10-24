import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { ESCAPE_KEY, ENTER_KEY } from '../utils'

const EMPTY = 'empty'
const MAX_CHARACTERS_COUNT = 10

class Entity extends Component {
  constructor () {
    super()
    this.state = {editText: '', editing: false}
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
      this.setState({editText: event.target.value})
    }
  }
  _handleKeyDown (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editText: this.props[this.props.textKey], editing: false})
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }
  _handleSubmit (event) {
    const val = this.state.editText.trim()
    this.props.onSave(val)
    this.setState({editing: false})
  }
  render () {
    const {
      color,
      icon,
      textKey
    } = this.props
    const {
      editing
    } = this.state
    let text = this.props[textKey] || ''
    if (text.replace(/\s/g, '') === '') { text = EMPTY }
    const isEmpty = text === EMPTY
    const isNameCut = text.length > MAX_CHARACTERS_COUNT
    return (<div className='entity'>
      <div className='full-column flex col col-3 mr1'>
        <svg className='entity-svg'>
          <use xlinkHref={`#${icon}`} />
        </svg>
      </div>
      <div className='entity-content full-column col col-9'>
      {editing
        ? (<input
          className='entity-content-ui entity-content-ui-input'
          ref='editField'
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />)
        : (<button
            className={classnames('entity-content-ui', {
              'entity-content-ui-button-filled': !isEmpty,
              'entity-content-ui-button-empty': isEmpty
            })}
            style={{
              backgroundColor: isEmpty ? 'white' : color
            }}
            onClick={(event) => {
              const text = this.props[this.props.textKey]
              event.preventDefault()
              event.stopPropagation()
              this.setState({
                editText: text === EMPTY ? '' : text,
                editing: true
              })
            }}
            title={isNameCut ? text : null}
          >
            {isNameCut
              ? `${text.slice(0, MAX_CHARACTERS_COUNT)}...`
              : text
            }
          </button>)
        }
        </div>
      </div>)
  }
}

Entity.propTypes = {
  onSave: PropTypes.func.isRequired,
  color: PropTypes.string,
  editing: PropTypes.bool,
  icon: PropTypes.string,
  textKey: PropTypes.string
}

export default Entity
