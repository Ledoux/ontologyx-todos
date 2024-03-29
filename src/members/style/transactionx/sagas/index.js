//
// IMPORTS
//
import { fork } from 'redux-saga/effects'
import {
  getSagasFromImportObject,
  transactionxSagas
} from 'transactionx-client'

import * as membersSagas from './members'
import * as tagsSagas from './tags'

//
// ROOT
//
export default function * rootSaga () {
  yield [
    ...getSagasFromImportObject(transactionxSagas),
    ...getSagasFromImportObject(membersSagas),
    ...getSagasFromImportObject(tagsSagas)
  ].map(fork)
}
