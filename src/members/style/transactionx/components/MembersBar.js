import React, { PropTypes } from 'react'

import Member from './Member'

const MembersBar = ({
  members,
  onSaveMemberClick
}) => {
  return <div className='features-bar'> {members.map((member, index) => {
    return <Member
      key={index} {...member}
      onSave={(label) => onSaveMemberClick(label, index)}
    />
  })} </div>
}

MembersBar.propTypes = {
  onSaveMemberClick: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired
}

export default MembersBar
