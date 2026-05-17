import { useLanguage } from '../i18n';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const { t } = useLanguage();

  return (
    <button className="theme-btn" onClick={onToggle} title={t('theme.tooltip')}>
      {theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
    </button>
  );
}
