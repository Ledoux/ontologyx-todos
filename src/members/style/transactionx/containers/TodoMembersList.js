import { range } from 'lodash'
import { connect } from 'react-redux'

import EntitiesList from '../components/EntitiesList'
import { MAX_ENTITIES_COUNT } from '../utils'

const mapStateToProps = ({entitiex: { membersById }}, {memberIds}) => {
  return {
    entities: range(MAX_ENTITIES_COUNT)
              .map(index => (
                memberIds[index] && membersById[memberIds[index]]) || {})
  }
}
const mapDispatchToProps = (dispatch, {todoId}) => {
  return {
    onSaveEntityClick: (text, index) => {
      dispatch({
        type: 'SET_MEMBER_IN_TODO',
        todoId,
        memberIndex: index,
        name: text
      })
    }
  }
}
const TodoMembersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntitiesList)

export default TodoMembersList
