import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext, type I18nValue } from './context';
import { dictionaries } from './dictionaries';
import { DEFAULT_LANG, directionOf, type Lang } from './types';

// Browser-local preference only: no account, no server, no tracking.
const STORAGE_KEY = 'omar-dev-lang';

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    // Storage blocked or unavailable (private mode, SSR): use the default.
  }
  return DEFAULT_LANG;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the language still changes for this visit.
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLang]);

  const dir = directionOf(lang);
  const dict = dictionaries[lang];

  // Keep <html lang/dir> and the tab title in sync with the active language.
  // The 3D scene (added later) must not remount when this changes.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = dict.app.documentTitle;
  }, [lang, dir, dict]);

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, dict, setLang, toggleLang }),
    [lang, dir, dict, setLang, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
