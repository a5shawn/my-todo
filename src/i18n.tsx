import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'zh' | 'en';

const messages: Record<Lang, Record<string, string>> = {
  zh: {
    'app.title': '待办清单',
    'input.placeholder': '添加新任务...',
    'input.button': '添加',
    'filter.all': '全部',
    'filter.active': '进行中',
    'filter.completed': '已完成',
    'list.empty': '暂无待办事项',
    'stats.left': '{n} 项待办',
    'stats.clear': '清除已完成',
    'theme.tooltip': '切换主题',
    'lang.tooltip': '切换语言',
  },
  en: {
    'app.title': 'Todo List',
    'input.placeholder': 'Add a new task...',
    'input.button': 'Add',
    'filter.all': 'All',
    'filter.active': 'Active',
    'filter.completed': 'Completed',
    'list.empty': 'Nothing here yet',
    'stats.left': '{n} items left',
    'stats.clear': 'Clear completed',
    'theme.tooltip': 'Toggle theme',
    'lang.tooltip': 'Switch language',
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'zh' || stored === 'en' ? stored : 'zh';
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let text = messages[lang][key];
      if (text === undefined) return key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          text = text.replace(`{${k}}`, String(v));
        }
      }
      return text;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
