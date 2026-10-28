import { ContactLinks } from './components/ContactLinks';
import { LanguageSwitch } from './components/LanguageSwitch';
import { useI18n } from './i18n/context';

export function App() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <header className="topbar">
        <LanguageSwitch />
      </header>

      <main className="hero">
        <p className="eyebrow">{dict.app.title}</p>
        <h1 className="brand" lang="en" dir="ltr">
          {dict.app.brand}
        </h1>
        <p className="tagline">{dict.app.tagline}</p>

        <section className="status" aria-labelledby="status-heading">
          <h2 id="status-heading">{dict.status.heading}</h2>
          <p>{dict.status.body}</p>
        </section>

        <ContactLinks />
      </main>

      <footer className="footer">
        <small>
          © {year} <bdi>{dict.app.brand}</bdi>
        </small>
      </footer>
    </div>
  );
}
