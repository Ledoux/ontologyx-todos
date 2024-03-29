import React from 'react'

import Footer from '../containers/Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => {
  return (<div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>)
}

export default App
