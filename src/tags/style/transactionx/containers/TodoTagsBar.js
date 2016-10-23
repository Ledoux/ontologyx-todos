import { range, values } from 'lodash'
import { connect } from 'react-redux'

import TagsBar from '../components/TagsBar'
import { MAX_TAGS_COUNT } from '../utils'

const mapStateToProps = ({entitiex: { tagsById }}, {tagIds}) => {
  return {
    allTags: values(tagsById),
    tags: range(MAX_TAGS_COUNT).map(index => (tagIds[index] && tagsById[tagIds[index]]) || {})
  }
}
const mapDispatchToProps = (dispatch, {id}) => {
  return {
    onSaveTagClick: (label, index) => {
      dispatch({
        type: 'SET_TAG_IN_TODO',
        todoId: id,
        tagIndex: index,
        label
      })
    }
  }
}
const TodoTagsBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsBar)

export default TodoTagsBar
