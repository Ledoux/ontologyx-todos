import { range } from 'lodash'
import { connect } from 'react-redux'

import ItemsList from '../components/ItemsList'
import { MAX_ENTITIES_COUNT } from '../utils'

const mapStateToProps = ({entitiex: { membersById }}, {memberIds}) => {
  return {
    items: range(MAX_ENTITIES_COUNT)
              .map(index => (
                memberIds[index] && membersById[memberIds[index]]) || {})
  }
}
const mapDispatchToProps = (dispatch, {memberIds, todoId}) => {
  return {
    onSaveItemClick: (text, index) => {
      /*
      dispatch({
        type: 'SET_MEMBER_IN_TODO',
        todoId,
        memberIndex: index,
        name: text
      })
      */
      dispatch({
        type: 'SET_MEMBER_IN_TODO',
        todoId,
        itemIndex: index
      })
    }
  }
}
const TodoMembersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList)

export default TodoMembersList
