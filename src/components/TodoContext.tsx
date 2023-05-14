import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  status: string;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, newTodo: Todo) => void;
  removeTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  removeTodo: () => {},
});

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, { ...todo, status: 'not started' }]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newTodo: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return newTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
