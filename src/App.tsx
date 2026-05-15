import { useState, useEffect, useMemo } from 'react';
import type { Todo, Filter } from './types';
import { TodoInput } from './components/TodoInput';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(
    () => todos.filter((t) => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    }),
    [todos, filter],
  );

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="container">
      <h1>待办清单</h1>
      <TodoInput onAdd={addTodo} />
      <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoStats activeCount={activeCount} onClearCompleted={clearCompleted} />
    </div>
  );
}

export default App;
