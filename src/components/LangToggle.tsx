import { useLanguage } from '../i18n';

export function LangToggle() {
  const { lang, setLang, t } = useLanguage();

  const toggle = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <button className="lang-btn" onClick={toggle} title={t('lang.tooltip')}>
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  );
}
