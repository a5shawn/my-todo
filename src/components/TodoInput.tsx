import { useState } from 'react';
import { useLanguage } from '../i18n';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const { t } = useLanguage();
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
        placeholder={t('input.placeholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button onClick={handleAdd}>{t('input.button')}</button>
    </div>
  );
}
