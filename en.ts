import type { Dictionary } from './ar';

// English dictionary. Same shape as ar.ts (enforced by the Dictionary type).

export const en: Dictionary = {
  app: {
    brand: 'Omar Dev.',
    title: 'Developer & Digital Creator',
    tagline: 'Ideas become reality through code.',
    documentTitle: 'Omar Dev. | Developer & Digital Creator',
  },
  lang: {
    switchTo: 'العربية',
    switchLabel: 'Switch the site language to Arabic',
  },
  status: {
    heading: 'Under construction',
    body: 'This is the first stage of the portfolio. The 3D world and the projects, skills and services sections are being added step by step. You can contact me directly from here at any time.',
  },
  contact: {
    heading: 'Get in touch',
    whatsapp: 'WhatsApp',
    whatsappLabel: 'Open a WhatsApp chat with Omar in a new tab',
    email: 'Email',
    emailLabel: 'Write an email to Omar',
    whatsappMessage: "Hi Omar, I saw your website and I'd like to ask about a project.",
    emailSubject: 'Project inquiry',
    emailBody:
      "Hi Omar,\n\nI saw your website and I'd like to ask about a project.\n\nProject type:\nDetails:\n\nThank you.",
  },
};
