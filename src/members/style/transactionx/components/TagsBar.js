import React, { PropTypes } from 'react'

import Tag from './Tag'

const TagsBar = ({
  tags,
  onSaveTagClick
}) => {
  return <span className='tags-bar'> {tags.map((tag, index) => {
    return <Tag
      key={index} {...tag}
      onSave={(label) => onSaveTagClick(label, index)}
    />
  })} </span>
}

TagsBar.propTypes = {
  onSaveTagClick: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired
}

export default TagsBar
