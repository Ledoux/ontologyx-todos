import { range } from 'lodash'
import { connect } from 'react-redux'

import MembersBar from '../components/MembersBar'
import { MAX_MEMBERS_COUNT } from '../utils'

const mapStateToProps = ({entitiex: { membersById }}, {memberIds}) => {
  return {
    members: range(MAX_MEMBERS_COUNT).map(index => (memberIds[index] && membersById[memberIds[index]]) || {})
  }
}
const mapDispatchToProps = (dispatch, {id}) => {
  return {
    onSaveMemberClick: (name, index) => {
      dispatch({
        type: 'SET_MEMBER_IN_TODO',
        todoId: id,
        memberIndex: index,
        name
      })
    }
  }
}
const TodoMembersBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersBar)

export default TodoMembersBar
