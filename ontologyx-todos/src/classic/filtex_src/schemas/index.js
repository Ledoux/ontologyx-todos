import { CollectionSchema, SingleSchema } from 'ENTITIEX'

const todosById = new CollectionSchema('todo', {
  defaults: {
    completed: false,
    id: null,
    text: ''
  }
})
const appSchema = new SingleSchema('app')
appSchema.define({todosById})
