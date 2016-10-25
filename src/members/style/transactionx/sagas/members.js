import { range } from 'lodash'
import { put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import { getFilteredElements } from '../reducers/filtex'
import { MAX_ENTITIES_COUNT, getRandomColor, uuid } from '../utils'

function * setMemberInTodoData (action) {
  const {
    name,
    todoId,
    memberIndex
  } = action
  // we select first useful data from the state
  let { memberIds } = yield select(({entitiex: { todosById }}) => todosById[todoId])
  let members = yield select(getFilteredElements, 'ALL', 'members')
  // when we need to determine if this label is already used in an other member
  const matchedMember = members.find(member => member.name === name)
  const updatedMemberIds = memberIds.length !== MAX_ENTITIES_COUNT
  ? range(MAX_ENTITIES_COUNT).map(index => memberIds[index] || null)
  : [...memberIds]
  // if matchedMember then no need to post a new member, just update the memberIds
  let updatedMember
  if (matchedMember) {
    updatedMemberIds[memberIndex] = matchedMember.id
    updatedMember = matchedMember
  } else {
    updatedMemberIds[memberIndex] = uuid()

    updatedMember = yield select(
      ({entitiex: { defaultsByCollectionName: { members } }}) => members)
    updatedMember = Object.assign({}, updatedMember, {
      color: getRandomColor(),
      id: updatedMemberIds[memberIndex],
      name
    })
  }
  // define the object
  const setObject = { membersById: {
    [updatedMemberIds[memberIndex]]: updatedMember
  } }
  // then call the put edit action
  yield put({
    type: 'REQUEST_SET_MEMBER_IN_TODO',
    transactionx: 'PUT',
    url: 'http://localhost:5000',
    databaseName: 'ontologyx',
    collectionName: 'todos',
    query: { id: todoId },
    update: { '$set': setObject }
  })
}

export function * watchSetMemberInTodo () {
  yield * takeEvery('SET_MEMBER_IN_TODO', setMemberInTodoData)
}
