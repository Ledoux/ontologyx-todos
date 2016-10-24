import { CollectionSchema, SingleSchema } from 'entitiex'

const membersById = new CollectionSchema('member', {
  types: {
    id: 'string',
    label: 'string'
  },
  defaults: {
    id: null,
    name: null
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
todosById.define({membersById, tagsById})

export const appSchema = new SingleSchema('app')
appSchema.define({membersById, tagsById, todosById})
