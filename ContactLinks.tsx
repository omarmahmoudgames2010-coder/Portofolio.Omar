import { useI18n } from '../i18n/context';
import { buildMailtoLink, buildWhatsAppLink, CONTACT_EMAIL } from '../lib/contact';

export function ContactLinks() {
  const { dict } = useI18n();

  const whatsappHref = buildWhatsAppLink(dict.contact.whatsappMessage);
  const emailHref = buildMailtoLink({
    subject: dict.contact.emailSubject,
    body: dict.contact.emailBody,
  });

  return (
    <section className="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{dict.contact.heading}</h2>
      <div className="contact-actions">
        <a
          className="button button-primary"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.contact.whatsappLabel}
        >
          {dict.contact.whatsapp}
        </a>
        <a
          className="button button-secondary"
          href={emailHref}
          aria-label={dict.contact.emailLabel}
        >
          {dict.contact.email}
        </a>
      </div>
      <p className="contact-address">
        <bdi dir="ltr">{CONTACT_EMAIL}</bdi>
      </p>
    </section>
  );
}
