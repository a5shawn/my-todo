import { useLanguage } from '../i18n';

interface TodoStatsProps {
  activeCount: number;
  onClearCompleted: () => void;
}

export function TodoStats({ activeCount, onClearCompleted }: TodoStatsProps) {
  const { t } = useLanguage();

  return (
    <div className="stats">
      <span>{t('stats.left', { n: activeCount })}</span>
      <button className="clear-btn" onClick={onClearCompleted}>
        {t('stats.clear')}
      </button>
    </div>
  );
}
