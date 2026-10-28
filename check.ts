// Content & contact integrity checks. Run with:  npm run check
// CI runs this before every build, so a broken contact link or an unverified
// project can never be deployed by accident.

import assert from 'node:assert/strict';
import { projects, getVisibleProjects } from '../src/data/projects';
import { dictionaries } from '../src/i18n/dictionaries';
import {
  buildMailtoLink,
  buildWhatsAppLink,
  CONTACT_EMAIL,
  isValidEmail,
  isValidEgyptMobile,
  toInternationalNumber,
  WHATSAPP_LOCAL_NUMBER,
} from '../src/lib/contact';

let passed = 0;
const failures: string[] = [];

function check(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`  ok   ${name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${name}\n       ${message}`);
    console.log(`  FAIL ${name}`);
  }
}

function keysOf(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) return [prefix];
  return Object.entries(value as Record<string, unknown>)
    .flatMap(([key, child]) => keysOf(child, prefix ? `${prefix}.${key}` : key))
    .sort();
}

function stringsOf(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (typeof value !== 'object' || value === null) return [];
  return Object.values(value as Record<string, unknown>).flatMap(stringsOf);
}

console.log('Contact links');

check('email address is valid', () => {
  assert.ok(isValidEmail(CONTACT_EMAIL), CONTACT_EMAIL);
});

check('WhatsApp number is a valid Egyptian mobile number', () => {
  assert.ok(isValidEgyptMobile(WHATSAPP_LOCAL_NUMBER));
});

check('domestic zero is dropped and +20 is added', () => {
  assert.equal(toInternationalNumber('01070869799'), '201070869799');
});

check('malformed numbers are rejected', () => {
  for (const bad of ['1070869799', '0107086979', '010708697999', '01370869799', '+201070869799', '']) {
    assert.throws(() => toInternationalNumber(bad), Error, `should reject "${bad}"`);
  }
});

check('plain WhatsApp link has no stray characters', () => {
  assert.equal(buildWhatsAppLink(), 'https://wa.me/201070869799');
});

check('WhatsApp message is URL-encoded and round-trips (Arabic and English)', () => {
  for (const lang of ['ar', 'en'] as const) {
    const message = dictionaries[lang].contact.whatsappMessage;
    const href = buildWhatsAppLink(message);
    assert.ok(!/\s/.test(href), 'link must not contain raw whitespace');
    const url = new URL(href);
    assert.equal(url.origin + url.pathname, 'https://wa.me/201070869799');
    assert.equal(url.searchParams.get('text'), message);
  }
});

check('mailto link carries the encoded subject and body (Arabic and English)', () => {
  for (const lang of ['ar', 'en'] as const) {
    const { emailSubject, emailBody } = dictionaries[lang].contact;
    const href = buildMailtoLink({ subject: emailSubject, body: emailBody });
    assert.ok(href.startsWith(`mailto:${CONTACT_EMAIL}?subject=`), href);
    assert.ok(!/\s/.test(href), 'link must not contain raw whitespace');
    const params = new URL(href).searchParams;
    assert.equal(params.get('subject'), emailSubject);
    assert.equal(params.get('body'), emailBody.replace(/\n/g, '\r\n'));
  }
});

console.log('Localization');

check('Arabic and English dictionaries have identical keys', () => {
  assert.deepEqual(keysOf(dictionaries.ar), keysOf(dictionaries.en));
});

check('no dictionary value is empty', () => {
  for (const lang of ['ar', 'en'] as const) {
    for (const text of stringsOf(dictionaries[lang])) {
      assert.ok(text.trim().length > 0, `empty string in "${lang}" dictionary`);
    }
  }
});

console.log('Content integrity');

check('project ids are unique', () => {
  const ids = projects.map((project) => project.id);
  assert.equal(new Set(ids).size, ids.length);
});

check('every visible project is verified and complete', () => {
  for (const project of getVisibleProjects()) {
    assert.equal(project.status, 'verified', `${project.id} is visible but not verified`);
    for (const lang of ['ar', 'en'] as const) {
      assert.ok(project.name[lang].trim(), `${project.id}: missing ${lang} name`);
      assert.ok(project.description[lang].trim(), `${project.id}: missing ${lang} description`);
    }
    assert.ok(project.stack.length > 0, `${project.id}: empty technology list`);
    assert.ok(project.liveUrl.startsWith('https://'), `${project.id}: live URL must be https`);
    if (project.sourceUrl) {
      assert.ok(project.sourceUrl.startsWith('https://'), `${project.id}: source URL must be https`);
    }
  }
});

check('projects that need verification are not public', () => {
  for (const project of projects) {
    if (project.status === 'needs-verification') {
      assert.equal(project.visible, false, `${project.id} must stay hidden until verified`);
    }
  }
});

check('public text never mentions school or academic status', () => {
  const forbidden = /school|grade|student|pupil|مدرس|طالب|الصف|دراس/i;
  const publicText = [
    ...stringsOf(dictionaries),
    ...getVisibleProjects().flatMap((project) => stringsOf([project.name, project.description])),
  ];
  for (const text of publicText) {
    assert.ok(!forbidden.test(text), `forbidden wording in: ${text}`);
  }
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length > 0) {
  console.error('\nFailures:\n' + failures.map((f) => ` - ${f}`).join('\n'));
  process.exit(1);
}
