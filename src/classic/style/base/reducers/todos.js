const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        editing: false,
        text: action.text,
        completed: false
      }
    case 'CANCEL_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        editing: false
      })
    case 'EDIT_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        editing: true
      })
    case 'SAVE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        editing: false,
        text: action.text
      })
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        completed: !state.completed
      })
    case 'TOGGLE_ALL_TODOS':
      // we here toggle any kind of todo !
      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'DESTROY_TODO':
      return [
        ...state.filter(todo => todo.id !== action.id)
      ]
    case 'CANCEL_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'EDIT_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'SAVE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    case 'TOGGLE_ALL_TODOS':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos
