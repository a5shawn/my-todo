import type { Todo } from '../types';
import { TodoItem } from './TodoItem';
import { useLanguage } from '../i18n';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const { t } = useLanguage();

  if (todos.length === 0) {
    return <p className="empty-msg">{t('list.empty')}</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
