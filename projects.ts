import type { LocalizedText } from '../i18n/types';

// =============================================================================
// PROJECTS — the single place to add, edit or hide a project.
//
// To add a project: copy one entry, give it a new `id`, fill in the fields,
// and set `visible: true` only after you have checked that every statement in
// the description is true. `npm run check` fails if a visible project has
// missing text, a non-https link, or a status other than 'verified'.
//
// Rules for the text: describe only what the project really does today, list
// only technologies that are really used, and never present sample numbers as
// real data.
// =============================================================================

export type ProjectStatus = 'verified' | 'needs-verification';

export interface Project {
  id: string;
  /** Only visible projects appear in the public gallery. */
  visible: boolean;
  status: ProjectStatus;
  name: LocalizedText;
  description: LocalizedText;
  /** Technologies verified in the project's source code. */
  stack: string[];
  liveUrl: string;
  sourceUrl?: string;
  /** Screenshot under /public/previews/, added later (e.g. 'previews/smart-track.webp'). */
  preview?: string;
  /** Owner-only notes. Never rendered on the public site. */
  internalNote?: string;
}

export const projects: Project[] = [
  {
    id: 'smart-track',
    visible: true,
    status: 'verified',
    name: { ar: 'Smart Track', en: 'Smart Track' },
    description: {
      ar: 'لوحة تحكم للتمويل الشخصي: إضافة المصروفات والدخل، وحساب الرصيد ونسبة الادخار تلقائياً، ورسم شهري للنشاط، وملاحظات عن الإنفاق حسب الفئة، وحدود ميزانية شهرية قابلة للتعديل. تُحفظ البيانات داخل متصفح المستخدم، وتبدأ بأرقام تجريبية يمكن مسحها.',
      en: 'A personal-finance dashboard: add expenses and income, with balance and savings rate calculated automatically, a monthly activity chart, spending insights by category, and adjustable monthly budget limits. Data is saved in the visitor\'s own browser, and it starts with sample figures that can be cleared.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://omarmahmoudgames2010-coder.github.io/smart-expensive-tracker/',
    sourceUrl: 'https://github.com/omarmahmoudgames2010-coder/smart-expensive-tracker',
    internalNote:
      'Rewritten on 2026-10-28 and tested in Chromium on local files (25 checks): add/delete transactions, totals, chart ranges, budgets, reload persistence. The "insights" are simple rules, not AI. Confirmed identical on GitHub; the live github.io page itself was opened by the owner, not by Claude.',
  },
  {
    id: 'life-os',
    visible: true,
    status: 'verified',
    name: { ar: 'Life OS', en: 'Life OS' },
    description: {
      ar: 'لوحة تحكم للإنتاجية الشخصية: مهام، وأهداف بنسب تقدم، وأحداث قادمة، وملاحظات، وتتبع للمصروفات، ومؤقت للتركيز. تُحفظ البيانات داخل متصفح المستخدم، وتبدأ بأمثلة تجريبية يمكن مسحها.',
      en: 'A personal productivity dashboard: tasks, goals with progress, upcoming events, notes, expense tracking and a focus timer. Data is saved in the visitor\'s own browser, and it starts with sample entries that can be cleared.',
    },
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://omarmahmoudgames2010-coder.github.io/Life-OS-/',
    sourceUrl: 'https://github.com/omarmahmoudgames2010-coder/Life-OS-',
    internalNote:
      'Rewritten on 2026-10-28 and tested in Chromium on local files (24 checks). The weather card calls the free Open-Meteo API; that call could not be tested online from the build environment, so weather is deliberately NOT mentioned in the public description. Confirmed identical on GitHub.',
  },
];

export function getVisibleProjects(): Project[] {
  return projects.filter((project) => project.visible);
}
