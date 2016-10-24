import React, { PropTypes } from 'react'

import Entity from './Entity'

const EntitiesList = ({
  icon,
  entities,
  textKey,
  onSaveEntityClick
}) => {
  console.log('entities', entities)
  return <div className='entities-list'> {entities.map((entity, index) => {
    return <Entity
      icon={icon}
      key={index}
      textKey={textKey}
      {...entity}
      onSave={(text) => onSaveEntityClick(text, index)}
    />
  })} </div>
}

EntitiesList.propTypes = {
  onSaveEntityClick: PropTypes.func.isRequired,
  entities: PropTypes.array.isRequired,
  textKey: PropTypes.string.isRequired
}

export default EntitiesList
