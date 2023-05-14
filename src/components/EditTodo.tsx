import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoContext } from './TodoContext';

interface FormValues {
  title: string;
  priority: string;
  dueDate: string;
}

const EditTodo: React.FC = () => {
  const { todos, updateTodo } = useContext<any>(TodoContext);
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const [formdata, setFormData] = useState<FormValues>({
    title: '',
    priority: '',
    dueDate: ''
  });

  useEffect(() => {
    const todo = todos.find((todo: any) => todo.id === parseInt(id));
    if (todo) {
      setFormData({
        title: todo.title,
        priority: todo.priority,
        dueDate: todo.dueDate
      });
    }
  }, [id, todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo(parseInt(id), formdata);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Edit</h1>
      <form className='form-control container' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            required
            onChange={handleChange}
            name='title'
            type='text'
            className='form-control'
            value={formdata.title}
          />
        </div>
        <br />
        <div className='form-group'>
          <label>Priority</label>
          <select
            className='form-control'
            value={formdata.priority}
            onChange={handleChange}
            name='priority'
            required
          >
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </select>
        </div>
        <br />
        <div className='form-control'>
          <label> Due Date</label>
          <input
            type='date'
            className='form-control'
            value={formdata.dueDate}
            name='dueDate'
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type='submit' className='btn btn-primary'>
          Update
        </button>
      </form>
    </>
  );
};

export default EditTodo;
