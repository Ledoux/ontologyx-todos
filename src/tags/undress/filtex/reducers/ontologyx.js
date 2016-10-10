import { createReducer } from 'ENTITIEX'

import { appSchema } from '../schemas'

const ENTITIEX = createReducer({ schema: appSchema })

export default ENTITIEX
