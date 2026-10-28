import { useI18n } from '../i18n/context';

export function LanguageSwitch() {
  const { lang, dict, toggleLang } = useI18n();
  const targetLang = lang === 'ar' ? 'en' : 'ar';

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={toggleLang}
      aria-label={dict.lang.switchLabel}
    >
      <span lang={targetLang}>{dict.lang.switchTo}</span>
    </button>
  );
}
