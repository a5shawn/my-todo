import type { Filter } from '../types';
import { useLanguage } from '../i18n';

interface TodoFiltersProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

function filterLabel(key: Filter): string {
  const map: Record<Filter, string> = {
    all: 'filter.all',
    active: 'filter.active',
    completed: 'filter.completed',
  };
  return map[key];
}

export function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  const { t } = useLanguage();

  const FILTERS: { key: Filter }[] = [
    { key: 'all' },
    { key: 'active' },
    { key: 'completed' },
  ];

  return (
    <div className="filters">
      {FILTERS.map(({ key }) => (
        <button
          key={key}
          className={currentFilter === key ? 'active' : ''}
          onClick={() => onFilterChange(key)}
        >
          {t(filterLabel(key))}
        </button>
      ))}
    </div>
  );
}
