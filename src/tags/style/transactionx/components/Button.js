import classnames from 'classnames'
import React, { PropTypes } from 'react'

const Button = ({ active, children, onClick }) => {
  return (
    <a
      className={classnames({selected: active})}
      onClick={e => { e.preventDefault() ; onClick() }} >
      {children}
    </a>
  )
}

Button.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
