import { range } from 'lodash'
import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { transactionxSagas } from 'transactionx-client'
import pluralize from 'pluralize'

import { getFilteredElements } from '../reducers/filtex'
import { MAX_ENTITIES_COUNT, getRandomColor, uuid } from '../utils'

function * setItemInTodoData (action) {
  const {
    collectionName,
    isNested,
    text,
    textKey,
    todoId,
    itemIndex
  } = action
  // we select first useful data from the state
  const singularName = pluralize(collectionName, 1)
  const itemIdsKey = `${singularName}Ids`
  let { itemIds } = yield select(
    ({entitiex: { todosById }}) => todosById[todoId][itemIdsKey])
  let items = yield select(getFilteredElements, 'ALL', 'items')
  // when we need to determine if this label is already used in an other item
  const matchedItem = items.find(item => item[textKey] === text)
  const updatedItemIds = itemIds.length !== MAX_ENTITIES_COUNT
  ? range(MAX_ENTITIES_COUNT).map(index => itemIds[index] || null)
  : [...itemIds]
  // if matchedItem then no need to post a new item, just update the itemIds
  let updatedItem
  if (matchedItem) {
    updatedItemIds[itemIndex] = matchedItem.id
    updatedItem = matchedItem
  } else if (isNested) {
    updatedItemIds[itemIndex] = uuid()
    updatedItem = yield select(
      ({entitiex: { defaultsByCollectionName: { items } }}) => items)
    updatedItem = Object.assign({}, updatedItem, {
      color: getRandomColor(),
      id: updatedItemIds[itemIndex],
      text
    })
  } else {
    // Note that we don't use an action here with the put generator
    // we need to stay here waiting for the yield to give in the callback
    // the id of the new posted item
    let { documents } = yield call(transactionxSagas.postTransactionxData, {
      transactionx: 'POST',
      url: 'http://localhost:5000',
      databaseName: 'ontologyx',
      collectionName,
      documents: [{ text, color: getRandomColor() }]
    })
    updatedItemIds[itemIndex] = documents[0].id
  }
  // define the object
  let setObject
  setObject = isNested
  ? { [`${collectionName}ById`]: {
    [updatedItemIds[itemIndex]]: updatedItem
  } }
  : { '$set': { [itemIdsKey]: updatedItemIds } }

  // then call the put edit action
  yield put({
    type: `REQUEST_SET_${singularName.toUpperCase()}_IN_TODO`,
    transactionx: 'PUT',
    url: 'http://localhost:5000',
    databaseName: 'ontologyx',
    collectionName: 'todos',
    query: { id: todoId },
    update: { '$set': setObject }
  })
}

export function * watchSetItemInTodo () {
  yield * takeEvery([
    'SET_MEMBER_IN_TODO',
    'SET_TAG_IN_TODO'
  ], setItemInTodoData)
}
