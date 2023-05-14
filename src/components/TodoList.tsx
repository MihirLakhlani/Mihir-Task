import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

const TodoList = (): JSX.Element => {
  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  console.log(todos);

  const handleDelete = (id: number): void => {
    removeTodo(id);
  };

  const handleComplete = (id: number): void => {
    const todo :any = todos.find((todo) => todo.id === id);
    updateTodo(id, todo );
  };

  return (
    <>
      <h1>Todo List</h1>

      <table className='table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.priority}</td>
              <td>{todo.dueDate}</td>
              <td>
                <Link to={`/edit/${todo.id}`} className='btn btn-sm btn-primary'>
                  Edit
                </Link>
              </td>
              <td>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className='btn btn-sm btn-success' onClick={() => handleComplete(todo.id)}>
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
