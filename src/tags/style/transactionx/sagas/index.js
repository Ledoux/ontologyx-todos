//
// IMPORTS
//
import { fork } from 'redux-saga/effects'
import {
  getSagasFromImportObject,
  transactionxSagas
} from 'transactionx-client'

import * as tagsSagas from './tags'

//
// ROOT
//
export default function * rootSaga () {
  yield [
    ...getSagasFromImportObject(transactionxSagas),
    ...getSagasFromImportObject(tagsSagas)
  ].map(fork)
}
