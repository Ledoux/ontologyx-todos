import { createReducer } from 'entitiex'

import { appSchema } from '../schemas'

const entitiex = createReducer({ schema: appSchema })

export default entitiex
