import { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="添加新任务..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button onClick={handleAdd}>添加</button>
    </div>
  );
}
