import type { Filter } from '../types';

interface TodoFiltersProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
];

export function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="filters">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={currentFilter === key ? 'active' : ''}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
