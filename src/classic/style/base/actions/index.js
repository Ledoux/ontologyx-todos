let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const cancelTodo = (id) => {
  return {
    type: 'CANCEL_TODO',
    id
  }
}

export const destroyTodo = (id) => {
  return {
    type: 'DESTROY_TODO',
    id
  }
}

export const editTodo = (id) => {
  return {
    type: 'EDIT_TODO',
    id
  }
}

export const saveTodo = (id, text) => {
  return {
    type: 'SAVE_TODO',
    id, text
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const toggleAllTodos = () => {
  return {
    type: 'TOGGLE_ALL_TODOS'
  }
}
