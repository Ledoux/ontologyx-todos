import classnames from 'classnames'
import React, { PropTypes } from 'react'

import Item from './Item'

const ItemsList = ({
  extraClass,
  icon,
  items,
  textKey,
  onSaveItemClick
}) => {
  return (<div className={classnames('items-list center', extraClass)}>
    <svg className='items-list-svg'>
      <use xlinkHref={`#${icon}`} />
    </svg>
    {items.map((item, index) => {
      return <Item
        key={index}
        textKey={textKey}
        {...item}
      onSave={(text) => onSaveItemClick(text, index)}
    />
    })}
  </div>)
}

ItemsList.propTypes = {
  extraClass: PropTypes.string,
  onSaveItemClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  textKey: PropTypes.string.isRequired
}

export default ItemsList
