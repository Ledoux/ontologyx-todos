//
// IMPORTS
//
import { fork } from 'redux-saga/effects'
import {
  getSagasFromImportObject,
  transactionxSagas
} from 'transactionx-client'

//
// ROOT
//
export default function * rootSaga () {
  yield [
    ...getSagasFromImportObject(transactionxSagas)
  ].map(fork)
}
