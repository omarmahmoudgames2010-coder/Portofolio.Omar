// Arabic dictionary (default language). en.ts must have exactly the same shape:
// TypeScript will fail the build if a key is missing there.

export const ar = {
  app: {
    brand: 'Omar Dev.',
    title: 'مطوّر ومبدع رقمي',
    tagline: 'الأفكار تتحول إلى واقع من خلال البرمجة.',
    documentTitle: 'Omar Dev. | مطوّر ومبدع رقمي',
  },
  lang: {
    switchTo: 'English',
    switchLabel: 'تغيير لغة الموقع إلى الإنجليزية',
  },
  status: {
    heading: 'الموقع قيد البناء',
    body: 'هذه هي المرحلة الأولى من البورتفوليو. العالم ثلاثي الأبعاد وأقسام المشاريع والمهارات والخدمات تُضاف تباعاً. يمكنك التواصل معي مباشرة من هنا في أي وقت.',
  },
  contact: {
    heading: 'تواصل معي',
    whatsapp: 'واتساب',
    whatsappLabel: 'فتح محادثة واتساب مع عمر في تبويب جديد',
    email: 'البريد الإلكتروني',
    emailLabel: 'كتابة رسالة بريد إلكتروني إلى عمر',
    whatsappMessage: 'مرحباً عمر، اطلعت على موقعك وأود الاستفسار عن مشروع.',
    emailSubject: 'استفسار عن مشروع',
    emailBody:
      'مرحباً عمر،\n\nاطلعت على موقعك وأود الاستفسار عن مشروع.\n\nنوع المشروع:\nالتفاصيل:\n\nشكراً لك.',
  },
};

export type Dictionary = typeof ar;
