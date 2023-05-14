import React, { useContext, useState } from 'react'
import { TodoContext } from './TodoContext'
import { useNavigate } from 'react-router-dom'

interface Todo {
  title: string;
  priority: string;
  dueDate: string;
}

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");
  const [dueDate, setDueDate] = useState<string>("");

  const navigate = useNavigate();

  const { addTodo } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo :any = {
      
      title,
      priority,
      dueDate,
    };
    addTodo(newTodo);
    setTitle('');
    setPriority('low');
    setDueDate('');
    navigate('/');
  };

  return (
    <form className='form-control container' onSubmit={handleSubmit}>
      <label htmlFor="title">Task Name</label>
      <input className='form-control' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label htmlFor="priority">Priority</label>
      <select className='form-control' id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <br />
      <label htmlFor="dueDate">DueDate</label>
      <input className='form-control' type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /> <br />
      <button className='btn btn-success' type='submit'>Add Todo</button>
    </form>
  );
}

export default TodoForm;
