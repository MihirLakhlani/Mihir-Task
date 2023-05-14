import React from 'react'
import { TodoProvider } from './components/TodoContext'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom'
import EditTodo from './components/EditTodo'

const App = () => {
  return (
    <TodoProvider>
      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Todo</Link>
          </li>
         
        </ul>
      </nav>
        <Routes>
          <Route path='/' element={<TodoList/>}/>
          <Route path='/add' element={<TodoForm/>}/>
          <Route path='/edit/:id' element={<EditTodo/>}/>


        </Routes>
      
      </BrowserRouter>
    </TodoProvider>
  )
}

export default App