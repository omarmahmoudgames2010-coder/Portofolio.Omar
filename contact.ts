// Contact logic: pure functions only (no DOM, no framework), so it can be
// unit-checked from Node with `npm run check`.
//
// There is no backend. Every action opens the visitor's own mail app or
// WhatsApp; nothing here pretends a message was "sent".

export const CONTACT_EMAIL = 'omarmahmoudgames2025@gmail.com';

// Number as supplied by the owner (domestic format, with the leading zero).
export const WHATSAPP_LOCAL_NUMBER = '01070869799';

const EGYPT_COUNTRY_CODE = '20';
// Egyptian mobile numbers: 01 + operator digit (0, 1, 2 or 5) + 8 digits = 11 digits.
const EGYPT_MOBILE_PATTERN = /^01[0125]\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEgyptMobile(local: string): boolean {
  return EGYPT_MOBILE_PATTERN.test(local);
}

export function isValidEmail(address: string): boolean {
  return EMAIL_PATTERN.test(address);
}

/** "01070869799" -> "201070869799" (domestic leading zero dropped, +20 added). */
export function toInternationalNumber(local: string): string {
  if (!isValidEgyptMobile(local)) {
    throw new Error(`Invalid Egyptian mobile number: "${local}"`);
  }
  return EGYPT_COUNTRY_CODE + local.slice(1);
}

/** wa.me link. The optional text is only pre-filled; the visitor decides whether to send it. */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${toInternationalNumber(WHATSAPP_LOCAL_NUMBER)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface MailDraft {
  subject: string;
  body: string;
}

/** mailto link with a URL-encoded subject and body (line breaks as CRLF, per RFC 6068). */
export function buildMailtoLink(draft: MailDraft): string {
  const body = draft.body.replace(/\r?\n/g, '\r\n');
  return (
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(draft.subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}
