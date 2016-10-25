import { range } from 'lodash'
import { connect } from 'react-redux'

import ItemsList from '../components/ItemsList'
import { MAX_ENTITIES_COUNT } from '../utils'

const mapStateToProps = ({entitiex: { tagsById }}, {tagIds}) => {
  return {
    items: range(MAX_ENTITIES_COUNT)
              .map(index => (
                tagIds[index] && tagsById[tagIds[index]]) || {})
  }
}
const mapDispatchToProps = (dispatch, {todoId}) => {
  return {
    onSaveItemClick: (text, index) => {
      dispatch({
        type: 'SET_TAG_IN_TODO',
        todoId,
        tagIndex: index,
        // this is here that you do the impedance adaptation
        // given the text and the specific key into this kind of entity
        // that handles this text
        label: text
      })
    }
  }
}
const TodoTagsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList)

export default TodoTagsList
