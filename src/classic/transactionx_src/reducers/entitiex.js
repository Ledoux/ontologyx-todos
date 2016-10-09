import { createReducer } from 'entitiex'

import { appSchema } from '../schemas'

const entitiexReducer = createReducer({ schema: appSchema })

export default entitiexReducer
