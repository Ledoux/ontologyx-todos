import { createReducer } from 'transactionx-client'

import { appSchema } from '../schemas'

const transactionxReducer = createReducer({ schema: appSchema })

export default transactionxReducer
