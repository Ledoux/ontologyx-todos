import { range } from 'lodash'
import { connect } from 'react-redux'

import EntitiesList from '../components/EntitiesList'
import { MAX_ENTITIES_COUNT } from '../utils'

const mapStateToProps = ({entitiex: { tagsById }}, {tagIds}) => {
  return {
    entities: range(MAX_ENTITIES_COUNT)
              .map(index => (
                tagIds[index] && tagsById[tagIds[index]]) || {})
  }
}
const mapDispatchToProps = (dispatch, {todoId}) => {
  return {
    onSaveEntityClick: (text, index) => {
      dispatch({
        type: 'SET_TAG_IN_TODO',
        todoId,
        tagIndex: index,
        name: text
      })
    }
  }
}
const TodoTagsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntitiesList)

export default TodoTagsList
