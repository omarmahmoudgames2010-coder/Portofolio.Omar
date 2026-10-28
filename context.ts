import { createContext, useContext } from 'react';
import type { Dictionary } from './ar';
import type { Direction, Lang } from './types';

export interface I18nValue {
  lang: Lang;
  dir: Direction;
  dict: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error('useI18n must be used inside <I18nProvider>.');
  }
  return value;
}
