//
// IMPORTS
//
import { fork } from 'redux-saga/effects'
import {
  getSagasFromImportObject,
  transactionxSagas
} from 'transactionx-client'

import * as itemsSagas from './items'

//
// ROOT
//
export default function * rootSaga () {
  yield [
    ...getSagasFromImportObject(transactionxSagas),
    ...getSagasFromImportObject(itemsSagas)
  ].map(fork)
}
