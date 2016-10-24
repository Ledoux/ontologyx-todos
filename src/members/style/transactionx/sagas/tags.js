import { range } from 'lodash'
import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { transactionxSagas } from 'transactionx-client'

import { getFilteredElements } from '../reducers/filtex'
import { MAX_TAGS_COUNT, getRandomColor } from '../utils'

function * setTagInTodoData (action) {
  const {
    label,
    todoId,
    tagIndex
  } = action
  // we select first useful data from the state
  let { tagIds } = yield select(({entitiex: { todosById }}) => todosById[todoId])
  let tags = yield select(getFilteredElements, 'ALL', 'tags')
  // when we need to determine if this label is already used in an other tag
  const matchedTag = tags.find(tag => tag.label === label)
  const updatedTagIds = tagIds.length !== MAX_TAGS_COUNT
  ? range(MAX_TAGS_COUNT).map(index => tagIds[index] || null)
  : [...tagIds]
  // if matchedTag then no need to post a new tag, just update the tagIds
  if (matchedTag) {
    updatedTagIds[tagIndex] = matchedTag.id
  } else {
    // Note that we don't use an action here with the put generator
    // we need to stay here waiting for the yield to give in the callback
    // the id of the new posted tag
    let { documents } = yield call(transactionxSagas.postTransactionxData, {
      transactionx: 'POST',
      url: 'http://localhost:5000',
      databaseName: 'ontologyx',
      collectionName: 'tags',
      documents: [{ label, color: getRandomColor() }]
    })
    updatedTagIds[tagIndex] = documents[0].id
  }
  // then call the put edit action
  yield put({
    type: 'REQUEST_SET_TAG_IDS_IN_TODO',
    transactionx: 'PUT',
    url: 'http://localhost:5000',
    databaseName: 'ontologyx',
    collectionName: 'todos',
    query: { id: todoId },
    update: { '$set': { tagIds: updatedTagIds } }
  })
}

export function * watchSetTagInTodo () {
  yield * takeEvery('SET_TAG_IN_TODO', setTagInTodoData)
}
