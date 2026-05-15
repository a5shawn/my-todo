import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item">
      <div
        className={`checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
      />
      <span
        className={`text ${todo.completed ? 'completed' : ''}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        title="删除"
      >
        ✕
      </button>
    </li>
  );
}
