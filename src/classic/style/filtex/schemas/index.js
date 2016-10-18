import { CollectionSchema, SingleSchema } from 'entitiex'

const todosById = new CollectionSchema('todo', {
  types: {
    completed: 'bool',
    id: 'number',
    text: 'string'
  },
  defaults: {
    completed: false,
    id: null,
    text: ''
  }
})
export const appSchema = new SingleSchema('app')
appSchema.define({todosById})
