import classnames from 'classnames'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { ESCAPE_KEY, ENTER_KEY } from '../utils'

const EMPTY = 'empty'
const MAX_CHARACTERS_COUNT = 10

class Member extends Component {
  constructor () {
    super()
    this.state = {editName: '', editing: false}
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
      this.setState({editName: event.target.value})
    }
  }
  _handleKeyDown (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({editName: this.props.name, editing: false})
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event)
    }
  }
  _handleSubmit (event) {
    const val = this.state.editName.trim()
    this.props.onSave(val)
    this.setState({editing: false})
  }
  render () {
    let {
      color,
      name
    } = this.props
    const {
      editing
    } = this.state
    if (name.replace(/\s/g, '') === '') { name = EMPTY }
    const isEmpty = name === EMPTY
    const isNameCut = name.length > MAX_CHARACTERS_COUNT
    return (<div className='feature'>
      <div className='feature-column flex col col-3 mr1'>
        <svg className='feature-svg'>
          <use xlinkHref='#member' />
        </svg>
      </div>
      <div className='feature-content feature-column col col-9'>
      {editing
        ? (<input
          className='feature-content-ui feature-content-ui-input'
          ref='editField'
          value={this.state.editName}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} />)
        : (<button
            className={classnames('feature-content-ui', {
              'feature-content-ui-button-filled': !isEmpty,
              'feature-content-ui-button-empty': isEmpty
            })}
            style={{
              backgroundColor: isEmpty ? 'white' : color,
              height: '100%',
              width: '100%'
            }}
            onClick={(event) => {
              const name = this.props.name
              event.preventDefault()
              event.stopPropagation()
              this.setState({
                editName: name === EMPTY ? '' : name,
                editing: true
              })
            }}
            title={isNameCut ? name : null}
          >
            {isNameCut
              ? `${name.slice(0, MAX_CHARACTERS_COUNT)}...`
              : name
            }
          </button>)
        }
        </div>
      </div>)
  }
}

Member.propTypes = {
  onSave: PropTypes.func.isRequired,
  color: PropTypes.string,
  editing: PropTypes.bool,
  name: PropTypes.string
}

Member.defaultProps = {
  name: EMPTY
}

export default Member
