export type Lang = 'ar' | 'en';

export const LANGS: readonly Lang[] = ['ar', 'en'];

/** Arabic is the default language of the site. */
export const DEFAULT_LANG: Lang = 'ar';

export type Direction = 'rtl' | 'ltr';

export function directionOf(lang: Lang): Direction {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Text that lives in a data file (projects, skills, services...) and needs both
 * languages side by side. UI strings live in the dictionaries (ar.ts / en.ts).
 */
export type LocalizedText = Record<Lang, string>;

export function localize(text: LocalizedText, lang: Lang): string {
  return text[lang];
}
