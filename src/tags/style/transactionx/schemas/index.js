import { CollectionSchema, SingleSchema } from 'entitiex'

const doer = new SingleSchema('doer', {
  types: {
    id: 'string'
  },
  defaults: {
    id: null
  }
})

const tagsById = new CollectionSchema('tag', {
  types: {
    id: 'string',
    label: 'string'
  },
  defaults: {
    id: null,
    label: null
  }
})

const todosById = new CollectionSchema('todo', {
  types: {
    completed: 'bool',
    id: 'string',
    text: 'string'
  },
  defaults: {
    completed: false,
    id: null,
    text: ''
  }
})
todosById.define({doer, tagsById})

export const appSchema = new SingleSchema('app')
appSchema.define({tagsById, todosById})
