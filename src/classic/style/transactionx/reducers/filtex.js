import { createReducer } from 'filtex'

const initialState = {
  'ALL': {},
  'COMPLETED': {},
  'ACTIVE': {}
}

const filtexReducer = createReducer({initialState,
  // This function says for the elements to be filtered given a rule
  // and the actual state for a specific filter
  getFilteredElements: (filter, elements) => {
    switch (filter.id) {
      case 'ALL':
        return elements
      case 'COMPLETED':
        return elements.filter(element => element.completed)
      case 'ACTIVE':
        return elements.filter(element => !element.completed)
      default:
        return []
    }
  }}
)

export default filtexReducer
export const getFilteredElements = filtexReducer.getFilteredElements
