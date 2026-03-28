# primedev.kz Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static landing page for primedev.kz with dark theme, red accent, 3-language support (RU/KZ/EN), and a lead-generation contact form.

**Architecture:** Astro SSG with Tailwind CSS for styling. File-based i18n with JSON translation files and route prefixes (`/`, `/kz/`, `/en/`). Each page section is an isolated Astro component receiving translations as props. Minimal JS — only for mobile menu toggle, FAQ accordion, scroll animations, and form validation.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript

---

## File Map

```
primedev/
├── src/
│   ├── components/
│   │   ├── Nav.astro              — Sticky nav: logo, links, language switcher, mobile hamburger
│   │   ├── Hero.astro             — Hero section with CTA buttons
│   │   ├── Services.astro         — 6-card services grid
│   │   ├── Portfolio.astro        — 4-card portfolio grid with tags
│   │   ├── Process.astro          — 4-step horizontal process flow
│   │   ├── FaqContact.astro       — Side-by-side FAQ accordion + contact form
│   │   └── Footer.astro           — Copyright footer
│   ├── i18n/
│   │   ├── ru.json                — Russian translations (default)
│   │   ├── kz.json                — Kazakh translations
│   │   ├── en.json                — English translations
│   │   └── utils.ts               — Helper: getTranslations(lang), getLangFromUrl()
│   ├── layouts/
│   │   └── Layout.astro           — HTML shell: <head>, meta, OG tags, global styles, <body>
│   ├── pages/
│   │   ├── index.astro            — RU landing (default)
│   │   ├── kz/index.astro         — KZ landing
│   │   └── en/index.astro         — EN landing
│   └── styles/
│       └── global.css             — Tailwind directives, custom CSS vars, animations
├── public/
│   ├── favicon.svg                — PrimeDev logo favicon
│   └── robots.txt                 — Allow all crawlers
├── astro.config.mjs               — Astro config with sitemap
├── tailwind.config.mjs            — Tailwind dark theme, custom colors
├── package.json
└── tsconfig.json
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `public/robots.txt`, `public/favicon.svg`, `.gitignore`

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/saiduly/Developer/primedev
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/tailwind @astrojs/sitemap tailwindcss
```

- [ ] **Step 3: Configure Astro**

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://primedev.kz',
  integrations: [tailwind(), sitemap()],
});
```

- [ ] **Step 4: Configure Tailwind**

Replace `tailwind.config.mjs` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        accent: '#ef4444',
        'accent-hover': '#dc2626',
        body: '#94a3b8',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create global CSS**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: #0a0a0f;
    color: #ffffff;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

@layer components {
  .section-label {
    @apply text-xs uppercase tracking-[3px] text-accent;
  }

  .section-heading {
    @apply text-2xl font-bold mt-2;
  }

  .card-base {
    @apply bg-accent/[0.06] border border-accent/[0.12] rounded-xl p-5;
  }

  .btn-primary {
    @apply bg-accent hover:bg-accent-hover text-white px-7 py-3 rounded-lg font-semibold text-sm transition-colors;
  }

  .btn-outline {
    @apply border border-accent/40 text-accent hover:bg-accent/10 px-7 py-3 rounded-lg text-sm transition-colors;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}
```

- [ ] **Step 6: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0a0a0f"/>
  <text x="4" y="23" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#ffffff">P</text>
  <text x="15" y="23" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#ef4444">D</text>
</svg>
```

- [ ] **Step 7: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://primedev.kz/sitemap-index.xml
```

- [ ] **Step 8: Update .gitignore**

Append to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at `localhost:4321`, shows blank page (no pages yet).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind and sitemap"
```

---

### Task 2: i18n System

**Files:**
- Create: `src/i18n/ru.json`, `src/i18n/kz.json`, `src/i18n/en.json`, `src/i18n/utils.ts`

- [ ] **Step 1: Create Russian translations**

Create `src/i18n/ru.json`:

```json
{
  "lang": "ru",
  "dir": "ltr",
  "meta": {
    "title": "PrimeDev — IT-разработка полного цикла",
    "description": "Веб-приложения, мобильные решения, Telegram-боты и автоматизация платежей Kaspi. primedev.kz"
  },
  "nav": {
    "services": "Услуги",
    "portfolio": "Кейсы",
    "process": "Процесс",
    "faq": "FAQ",
    "contact": "Контакты"
  },
  "hero": {
    "label": "IT-РАЗРАБОТКА ПОЛНОГО ЦИКЛА",
    "heading": "Превращаем идеи в",
    "headingAccent": "работающие продукты",
    "description": "Веб-приложения, мобильные решения, Telegram-боты и автоматизация платежей Kaspi",
    "cta": "Обсудить проект",
    "ctaSecondary": "Наши кейсы ↓"
  },
  "services": {
    "label": "УСЛУГИ",
    "heading": "Что мы делаем",
    "items": [
      { "icon": "🌐", "title": "Веб-разработка", "description": "Сайты, SaaS-платформы, лендинги на React/Next.js" },
      { "icon": "🤖", "title": "Telegram боты", "description": "Автоматизация, платежи, подписки, CRM-интеграции" },
      { "icon": "💳", "title": "Kaspi интеграции", "description": "Автооплата, выставление счетов, подтверждение без кассира" },
      { "icon": "📱", "title": "Мобильная разработка", "description": "iOS и Android приложения" },
      { "icon": "📊", "title": "CRM системы", "description": "Полный цикл клиента, аналитика продаж" },
      { "icon": "🎨", "title": "UI/UX дизайн", "description": "Интерфейсы, прототипы, дизайн-системы" }
    ]
  },
  "portfolio": {
    "label": "ПОРТФОЛИО",
    "heading": "Наши кейсы",
    "subtitle": "Реальные проекты, которые работают прямо сейчас",
    "items": [
      {
        "number": "01",
        "category": "Fintech / Payments",
        "title": "Tolemflow",
        "description": "Сервис автооплаты Kaspi API. Telegram-боты с автооплатой для инфобизнеса, курсов и цифровых продуктов.",
        "tags": ["Python", "Kaspi API", "Telegram"]
      },
      {
        "number": "02",
        "category": "Tickets / Events",
        "title": "FlowTickets",
        "description": "Сервис продажи билетов: Telegram-бот, выдача и проверка билетов, CRM для продажников, аналитика.",
        "tags": ["React", "CRM", "Telegram"]
      },
      {
        "number": "03",
        "category": "Community",
        "title": "Subscription Bots",
        "description": "Telegram-боты для сообществ: подписки, автооплата, админ-панель, рекуррентные платежи, напоминания.",
        "tags": ["Python", "Payments", "Admin Panel"]
      },
      {
        "number": "04",
        "category": "Websites",
        "title": "Лендинги",
        "description": "izzamuzzic.com, topspot.kz — дизайн и разработка лендингов для бизнеса и артистов.",
        "tags": ["Next.js", "Design", "Tailwind"]
      }
    ]
  },
  "process": {
    "label": "ПРОЦЕСС",
    "heading": "Как мы работаем",
    "steps": [
      { "number": "1", "title": "Брифинг", "description": "Обсуждаем задачу и цели" },
      { "number": "2", "title": "Дизайн", "description": "Проектирование и архитектура" },
      { "number": "3", "title": "Разработка", "description": "Итеративная разработка" },
      { "number": "4", "title": "Запуск", "description": "Деплой и поддержка" }
    ]
  },
  "faq": {
    "label": "FAQ",
    "heading": "Частые вопросы",
    "items": [
      {
        "question": "Сколько стоит разработка?",
        "answer": "Стоимость зависит от сложности проекта. Мы оцениваем каждый проект индивидуально после брифинга. Свяжитесь с нами для бесплатной оценки."
      },
      {
        "question": "Какие сроки разработки?",
        "answer": "Лендинг — от 1 недели. Веб-приложение — от 4 недель. Telegram-бот — от 2 недель. Точные сроки обсуждаем после брифинга."
      },
      {
        "question": "Как начать работу с нами?",
        "answer": "Оставьте заявку через форму или напишите нам. Мы проведём бесплатный брифинг, предложим решение и оценку."
      },
      {
        "question": "Какие технологии используете?",
        "answer": "Python, Django, FastAPI, React, Next.js, TypeScript, Tailwind CSS, PostgreSQL, Telegram Bot API, Kaspi API."
      },
      {
        "question": "Есть ли поддержка после запуска?",
        "answer": "Да, мы предоставляем поддержку и доработку после запуска проекта. Условия обсуждаем индивидуально."
      }
    ]
  },
  "contact": {
    "label": "КОНТАКТЫ",
    "heading": "Обсудим проект?",
    "namePlaceholder": "Ваше имя",
    "emailPlaceholder": "Телефон или email",
    "messagePlaceholder": "Расскажите о проекте",
    "submit": "Отправить заявку",
    "successMessage": "Заявка отправлена! Мы свяжемся с вами в ближайшее время.",
    "errorMessage": "Произошла ошибка. Попробуйте ещё раз."
  },
  "footer": {
    "copyright": "© 2026 PrimeDev. Все права защищены.",
    "site": "primedev.kz"
  }
}
```

- [ ] **Step 2: Create English translations**

Create `src/i18n/en.json`:

```json
{
  "lang": "en",
  "dir": "ltr",
  "meta": {
    "title": "PrimeDev — Full-Cycle IT Development",
    "description": "Web apps, mobile solutions, Telegram bots and Kaspi payment automation. primedev.kz"
  },
  "nav": {
    "services": "Services",
    "portfolio": "Cases",
    "process": "Process",
    "faq": "FAQ",
    "contact": "Contact"
  },
  "hero": {
    "label": "FULL-CYCLE IT DEVELOPMENT",
    "heading": "Turning ideas into",
    "headingAccent": "working products",
    "description": "Web apps, mobile solutions, Telegram bots and Kaspi payment automation",
    "cta": "Discuss your project",
    "ctaSecondary": "Our cases ↓"
  },
  "services": {
    "label": "SERVICES",
    "heading": "What we do",
    "items": [
      { "icon": "🌐", "title": "Web Development", "description": "Websites, SaaS platforms, landing pages with React/Next.js" },
      { "icon": "🤖", "title": "Telegram Bots", "description": "Automation, payments, subscriptions, CRM integrations" },
      { "icon": "💳", "title": "Kaspi Integrations", "description": "Auto-payments, invoicing, cashier-free confirmation" },
      { "icon": "📱", "title": "Mobile Development", "description": "iOS and Android applications" },
      { "icon": "📊", "title": "CRM Systems", "description": "Full client lifecycle, sales analytics" },
      { "icon": "🎨", "title": "UI/UX Design", "description": "Interfaces, prototypes, design systems" }
    ]
  },
  "portfolio": {
    "label": "PORTFOLIO",
    "heading": "Our cases",
    "subtitle": "Real projects that are running right now",
    "items": [
      {
        "number": "01",
        "category": "Fintech / Payments",
        "title": "Tolemflow",
        "description": "Kaspi API auto-payment service. Telegram bots with auto-payments for infobusiness, courses and digital products.",
        "tags": ["Python", "Kaspi API", "Telegram"]
      },
      {
        "number": "02",
        "category": "Tickets / Events",
        "title": "FlowTickets",
        "description": "Ticket sales service: Telegram bot, ticket issuance and verification, sales CRM, analytics.",
        "tags": ["React", "CRM", "Telegram"]
      },
      {
        "number": "03",
        "category": "Community",
        "title": "Subscription Bots",
        "description": "Telegram bots for communities: subscriptions, auto-payments, admin panel, recurring payments, reminders.",
        "tags": ["Python", "Payments", "Admin Panel"]
      },
      {
        "number": "04",
        "category": "Websites",
        "title": "Landing Pages",
        "description": "izzamuzzic.com, topspot.kz — design and development of landing pages for businesses and artists.",
        "tags": ["Next.js", "Design", "Tailwind"]
      }
    ]
  },
  "process": {
    "label": "PROCESS",
    "heading": "How we work",
    "steps": [
      { "number": "1", "title": "Briefing", "description": "Discuss goals and requirements" },
      { "number": "2", "title": "Design", "description": "UI/UX and architecture" },
      { "number": "3", "title": "Development", "description": "Iterative development" },
      { "number": "4", "title": "Launch", "description": "Deploy and support" }
    ]
  },
  "faq": {
    "label": "FAQ",
    "heading": "Frequently asked questions",
    "items": [
      {
        "question": "How much does development cost?",
        "answer": "The cost depends on the project complexity. We evaluate each project individually after a briefing. Contact us for a free estimate."
      },
      {
        "question": "What are the development timelines?",
        "answer": "Landing page — from 1 week. Web app — from 4 weeks. Telegram bot — from 2 weeks. Exact timelines are discussed after briefing."
      },
      {
        "question": "How do we get started?",
        "answer": "Submit a request via the form or contact us directly. We'll conduct a free briefing, propose a solution and provide an estimate."
      },
      {
        "question": "What technologies do you use?",
        "answer": "Python, Django, FastAPI, React, Next.js, TypeScript, Tailwind CSS, PostgreSQL, Telegram Bot API, Kaspi API."
      },
      {
        "question": "Do you provide post-launch support?",
        "answer": "Yes, we provide support and improvements after project launch. Terms are discussed individually."
      }
    ]
  },
  "contact": {
    "label": "CONTACT",
    "heading": "Discuss your project?",
    "namePlaceholder": "Your name",
    "emailPlaceholder": "Phone or email",
    "messagePlaceholder": "Tell us about your project",
    "submit": "Submit request",
    "successMessage": "Request sent! We'll get back to you shortly.",
    "errorMessage": "Something went wrong. Please try again."
  },
  "footer": {
    "copyright": "© 2026 PrimeDev. All rights reserved.",
    "site": "primedev.kz"
  }
}
```

- [ ] **Step 3: Create Kazakh translations**

Create `src/i18n/kz.json`:

```json
{
  "lang": "kk",
  "dir": "ltr",
  "meta": {
    "title": "PrimeDev — Толық циклді IT-әзірлеу",
    "description": "Веб-қосымшалар, мобильді шешімдер, Telegram-боттар және Kaspi төлемдерін автоматтандыру. primedev.kz"
  },
  "nav": {
    "services": "Қызметтер",
    "portfolio": "Кейстер",
    "process": "Процесс",
    "faq": "FAQ",
    "contact": "Байланыс"
  },
  "hero": {
    "label": "ТОЛЫҚ ЦИКЛДІ IT-ӘЗІРЛЕУ",
    "heading": "Идеяларды",
    "headingAccent": "жұмыс істейтін өнімдерге",
    "description": "Веб-қосымшалар, мобильді шешімдер, Telegram-боттар және Kaspi төлемдерін автоматтандыру",
    "cta": "Жобаны талқылау",
    "ctaSecondary": "Біздің кейстер ↓"
  },
  "services": {
    "label": "ҚЫЗМЕТТЕР",
    "heading": "Біз не істейміз",
    "items": [
      { "icon": "🌐", "title": "Веб-әзірлеу", "description": "Сайттар, SaaS-платформалар, React/Next.js лендингтер" },
      { "icon": "🤖", "title": "Telegram боттар", "description": "Автоматтандыру, төлемдер, жазылымдар, CRM-интеграциялар" },
      { "icon": "💳", "title": "Kaspi интеграциялар", "description": "Автотөлем, шот жазу, кассирсіз растау" },
      { "icon": "📱", "title": "Мобильді әзірлеу", "description": "iOS және Android қосымшалар" },
      { "icon": "📊", "title": "CRM жүйелер", "description": "Клиенттің толық циклі, сатылым аналитикасы" },
      { "icon": "🎨", "title": "UI/UX дизайн", "description": "Интерфейстер, прототиптер, дизайн-жүйелер" }
    ]
  },
  "portfolio": {
    "label": "ПОРТФОЛИО",
    "heading": "Біздің кейстер",
    "subtitle": "Қазір жұмыс істеп тұрған нақты жобалар",
    "items": [
      {
        "number": "01",
        "category": "Fintech / Payments",
        "title": "Tolemflow",
        "description": "Kaspi API автотөлем сервисі. Инфобизнес, курстар және цифрлық өнімдер үшін автотөлемді Telegram-боттар.",
        "tags": ["Python", "Kaspi API", "Telegram"]
      },
      {
        "number": "02",
        "category": "Tickets / Events",
        "title": "FlowTickets",
        "description": "Билет сату сервисі: Telegram-бот, билет беру және тексеру, сатушылар CRM, аналитика.",
        "tags": ["React", "CRM", "Telegram"]
      },
      {
        "number": "03",
        "category": "Community",
        "title": "Subscription Bots",
        "description": "Қауымдастықтар үшін Telegram-боттар: жазылымдар, автотөлем, админ панель, қайталанатын төлемдер.",
        "tags": ["Python", "Payments", "Admin Panel"]
      },
      {
        "number": "04",
        "category": "Websites",
        "title": "Лендингтер",
        "description": "izzamuzzic.com, topspot.kz — бизнес пен әртістерге арналған лендингтердің дизайны мен әзірлеуі.",
        "tags": ["Next.js", "Design", "Tailwind"]
      }
    ]
  },
  "process": {
    "label": "ПРОЦЕСС",
    "heading": "Біз қалай жұмыс істейміз",
    "steps": [
      { "number": "1", "title": "Брифинг", "description": "Міндет пен мақсатты талқылау" },
      { "number": "2", "title": "Дизайн", "description": "UI/UX және архитектура" },
      { "number": "3", "title": "Әзірлеу", "description": "Итеративті әзірлеу" },
      { "number": "4", "title": "Іске қосу", "description": "Деплой және қолдау" }
    ]
  },
  "faq": {
    "label": "FAQ",
    "heading": "Жиі қойылатын сұрақтар",
    "items": [
      {
        "question": "Әзірлеу қанша тұрады?",
        "answer": "Құны жобаның күрделілігіне байланысты. Брифингтен кейін әр жобаны жеке бағалаймыз. Тегін бағалау үшін бізге хабарласыңыз."
      },
      {
        "question": "Әзірлеу мерзімдері қандай?",
        "answer": "Лендинг — 1 аптадан. Веб-қосымша — 4 аптадан. Telegram-бот — 2 аптадан. Нақты мерзімдер брифингтен кейін талқыланады."
      },
      {
        "question": "Бізбен қалай жұмыс бастауға болады?",
        "answer": "Форма арқылы өтініш қалдырыңыз немесе бізге тікелей жазыңыз. Тегін брифинг өткіземіз, шешім ұсынамыз."
      },
      {
        "question": "Қандай технологиялар қолданасыздар?",
        "answer": "Python, Django, FastAPI, React, Next.js, TypeScript, Tailwind CSS, PostgreSQL, Telegram Bot API, Kaspi API."
      },
      {
        "question": "Іске қосқаннан кейін қолдау бар ма?",
        "answer": "Иә, жобаны іске қосқаннан кейін қолдау мен жетілдіру қызметін көрсетеміз. Шарттар жеке талқыланады."
      }
    ]
  },
  "contact": {
    "label": "БАЙЛАНЫС",
    "heading": "Жобаны талқылаймыз ба?",
    "namePlaceholder": "Сіздің атыңыз",
    "emailPlaceholder": "Телефон немесе email",
    "messagePlaceholder": "Жобаңыз туралы айтыңыз",
    "submit": "Өтініш жіберу",
    "successMessage": "Өтініш жіберілді! Жақын арада хабарласамыз.",
    "errorMessage": "Қате орын алды. Қайталап көріңіз."
  },
  "footer": {
    "copyright": "© 2026 PrimeDev. Барлық құқықтар қорғалған.",
    "site": "primedev.kz"
  }
}
```

- [ ] **Step 4: Create i18n utils**

Create `src/i18n/utils.ts`:

```ts
import ru from './ru.json';
import kz from './kz.json';
import en from './en.json';

export type Lang = 'ru' | 'kz' | 'en';

const translations = { ru, kz, en } as const;

export function getTranslations(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split('/');
  if (langSegment === 'kz') return 'kz';
  if (langSegment === 'en') return 'en';
  return 'ru';
}

export function getLocalizedPath(lang: Lang, anchor?: string): string {
  const prefix = lang === 'ru' ? '/' : `/${lang}/`;
  return anchor ? `${prefix}#${anchor}` : prefix;
}

export const languages: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
  { code: 'en', label: 'EN' },
];
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n system with RU/KZ/EN translations"
```

---

### Task 3: Layout and Page Shell

**Files:**
- Create: `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/pages/kz/index.astro`, `src/pages/en/index.astro`

- [ ] **Step 1: Create Layout component**

Create `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  lang: string;
  currentLang: 'ru' | 'kz' | 'en';
}

const { title, description, lang, currentLang } = Astro.props;

const langMap = { ru: '/', kz: '/kz/', en: '/en/' };
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate" hreflang="ru" href="https://primedev.kz/" />
    <link rel="alternate" hreflang="kk" href="https://primedev.kz/kz/" />
    <link rel="alternate" hreflang="en" href="https://primedev.kz/en/" />
    <link rel="alternate" hreflang="x-default" href="https://primedev.kz/" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://primedev.kz${langMap[currentLang]}`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <title>{title}</title>
  </head>
  <body class="bg-bg text-white antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Create Russian page (default)**

Create `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Portfolio from '../components/Portfolio.astro';
import Process from '../components/Process.astro';
import FaqContact from '../components/FaqContact.astro';
import Footer from '../components/Footer.astro';
import { getTranslations } from '../i18n/utils';

const t = getTranslations('ru');
---

<Layout title={t.meta.title} description={t.meta.description} lang={t.lang} currentLang="ru">
  <Nav t={t} currentLang="ru" />
  <main>
    <Hero t={t} />
    <Services t={t} />
    <Portfolio t={t} />
    <Process t={t} />
    <FaqContact t={t} />
  </main>
  <Footer t={t} />
</Layout>
```

- [ ] **Step 3: Create Kazakh page**

Create `src/pages/kz/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import Services from '../../components/Services.astro';
import Portfolio from '../../components/Portfolio.astro';
import Process from '../../components/Process.astro';
import FaqContact from '../../components/FaqContact.astro';
import Footer from '../../components/Footer.astro';
import { getTranslations } from '../../i18n/utils';

const t = getTranslations('kz');
---

<Layout title={t.meta.title} description={t.meta.description} lang={t.lang} currentLang="kz">
  <Nav t={t} currentLang="kz" />
  <main>
    <Hero t={t} />
    <Services t={t} />
    <Portfolio t={t} />
    <Process t={t} />
    <FaqContact t={t} />
  </main>
  <Footer t={t} />
</Layout>
```

- [ ] **Step 4: Create English page**

Create `src/pages/en/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import Services from '../../components/Services.astro';
import Portfolio from '../../components/Portfolio.astro';
import Process from '../../components/Process.astro';
import FaqContact from '../../components/FaqContact.astro';
import Footer from '../../components/Footer.astro';
import { getTranslations } from '../../i18n/utils';

const t = getTranslations('en');
---

<Layout title={t.meta.title} description={t.meta.description} lang={t.lang} currentLang="en">
  <Nav t={t} currentLang="en" />
  <main>
    <Hero t={t} />
    <Services t={t} />
    <Portfolio t={t} />
    <Process t={t} />
    <FaqContact t={t} />
  </main>
  <Footer t={t} />
</Layout>
```

- [ ] **Step 5: Create stub components so pages compile**

Create each file with a minimal placeholder:

`src/components/Nav.astro`:
```astro
---
const { t, currentLang } = Astro.props;
---
<header>Nav placeholder</header>
```

`src/components/Hero.astro`:
```astro
---
const { t } = Astro.props;
---
<section>Hero placeholder</section>
```

`src/components/Services.astro`:
```astro
---
const { t } = Astro.props;
---
<section>Services placeholder</section>
```

`src/components/Portfolio.astro`:
```astro
---
const { t } = Astro.props;
---
<section>Portfolio placeholder</section>
```

`src/components/Process.astro`:
```astro
---
const { t } = Astro.props;
---
<section>Process placeholder</section>
```

`src/components/FaqContact.astro`:
```astro
---
const { t } = Astro.props;
---
<section>FaqContact placeholder</section>
```

`src/components/Footer.astro`:
```astro
---
const { t } = Astro.props;
---
<footer>Footer placeholder</footer>
```

- [ ] **Step 6: Verify all 3 pages load**

```bash
npm run dev
```

Visit `localhost:4321/`, `localhost:4321/kz/`, `localhost:4321/en/` — all should render stub text.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/ src/pages/ src/components/
git commit -m "feat: add layout, page shell, and stub components for all 3 languages"
```

---

### Task 4: Nav Component

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Implement Nav**

Replace `src/components/Nav.astro` with:

```astro
---
import { languages, getLocalizedPath } from '../i18n/utils';
import type { Lang } from '../i18n/utils';

interface Props {
  t: any;
  currentLang: Lang;
}

const { t, currentLang } = Astro.props;

const navLinks = [
  { href: '#services', label: t.nav.services },
  { href: '#portfolio', label: t.nav.portfolio },
  { href: '#process', label: t.nav.process },
  { href: '#faq', label: t.nav.faq },
  { href: '#contact', label: t.nav.contact },
];
---

<header class="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-accent/10">
  <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
    <a href={getLocalizedPath(currentLang)} class="text-xl font-bold">
      PRIME<span class="text-accent">DEV</span>
    </a>

    <nav class="hidden md:flex items-center gap-6">
      {navLinks.map(link => (
        <a href={link.href} class="text-body hover:text-white text-sm transition-colors">
          {link.label}
        </a>
      ))}
    </nav>

    <div class="hidden md:flex items-center gap-2 text-xs">
      {languages.map(lang => (
        <a
          href={getLocalizedPath(lang.code)}
          class:list={[
            'transition-colors',
            lang.code === currentLang ? 'text-accent font-semibold' : 'text-muted hover:text-white',
          ]}
        >
          {lang.label}
        </a>
      ))}
    </div>

    <button
      id="mobile-menu-btn"
      class="md:hidden text-body hover:text-white"
      aria-label="Toggle menu"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <div id="mobile-menu" class="hidden md:hidden border-t border-accent/10 bg-bg/95 backdrop-blur-md">
    <nav class="flex flex-col px-6 py-4 gap-3">
      {navLinks.map(link => (
        <a href={link.href} class="text-body hover:text-white text-sm transition-colors mobile-nav-link">
          {link.label}
        </a>
      ))}
    </nav>
    <div class="flex gap-3 px-6 pb-4 text-xs">
      {languages.map(lang => (
        <a
          href={getLocalizedPath(lang.code)}
          class:list={[
            'transition-colors',
            lang.code === currentLang ? 'text-accent font-semibold' : 'text-muted hover:text-white',
          ]}
        >
          {lang.label}
        </a>
      ))}
    </div>
  </div>
</header>

<script>
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  btn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.add('hidden');
    });
  });
</script>
```

- [ ] **Step 2: Verify nav renders on all pages**

```bash
npm run dev
```

Check `localhost:4321/` — sticky nav with logo, links, language switcher. Resize to mobile — hamburger appears.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: implement sticky nav with language switcher and mobile menu"
```

---

### Task 5: Hero Component

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Implement Hero**

Replace `src/components/Hero.astro` with:

```astro
---
interface Props {
  t: any;
}

const { t } = Astro.props;
---

<section class="relative text-center py-24 px-6" style="background: radial-gradient(ellipse at center top, rgba(239,68,68,0.08) 0%, transparent 60%);">
  <div class="max-w-2xl mx-auto">
    <p class="section-label mb-4">{t.hero.label}</p>
    <h1 class="text-4xl md:text-5xl font-bold leading-tight">
      {t.hero.heading}<br />
      <span class="text-accent">{t.hero.headingAccent}</span>
    </h1>
    <p class="text-body mt-4 text-lg max-w-lg mx-auto">{t.hero.description}</p>
    <div class="mt-8 flex gap-3 justify-center flex-wrap">
      <a href="#contact" class="btn-primary">{t.hero.cta}</a>
      <a href="#portfolio" class="btn-outline">{t.hero.ctaSecondary}</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify Hero renders**

```bash
npm run dev
```

Check `localhost:4321/` — hero section with heading, description, two CTA buttons, red radial glow.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: implement hero section with CTA buttons"
```

---

### Task 6: Services Component

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Implement Services**

Replace `src/components/Services.astro` with:

```astro
---
interface Props {
  t: any;
}

const { t } = Astro.props;
---

<section id="services" class="py-20 px-6 border-t border-white/5">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <p class="section-label">{t.services.label}</p>
      <h2 class="section-heading">{t.services.heading}</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {t.services.items.map((item: any) => (
        <div class="card-base">
          <div class="text-2xl mb-3">{item.icon}</div>
          <h3 class="font-semibold text-sm">{item.title}</h3>
          <p class="text-muted text-xs mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify Services renders**

```bash
npm run dev
```

Check `localhost:4321/` — 6 service cards in 3x2 grid on desktop, stacking on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: implement services section with 6-card grid"
```

---

### Task 7: Portfolio Component

**Files:**
- Modify: `src/components/Portfolio.astro`

- [ ] **Step 1: Implement Portfolio**

Replace `src/components/Portfolio.astro` with:

```astro
---
interface Props {
  t: any;
}

const { t } = Astro.props;
---

<section id="portfolio" class="py-20 px-6 border-t border-white/5">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <p class="section-label">{t.portfolio.label}</p>
      <h2 class="section-heading">{t.portfolio.heading}</h2>
      <p class="text-body text-sm mt-2">{t.portfolio.subtitle}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {t.portfolio.items.map((item: any) => (
        <div class="relative overflow-hidden rounded-xl p-6 border border-accent/[0.15]" style="background: linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.03));">
          <div class="absolute top-3 right-4 text-5xl font-extrabold text-accent/[0.08] select-none">
            {item.number}
          </div>
          <p class="text-[11px] text-accent uppercase tracking-widest">{item.category}</p>
          <h3 class="text-lg font-bold mt-2">{item.title}</h3>
          <p class="text-body text-xs mt-2 leading-relaxed">{item.description}</p>
          <div class="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map((tag: string) => (
              <span class="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify Portfolio renders**

```bash
npm run dev
```

Check `localhost:4321/` — 4 case cards with background numbers, categories, descriptions, tech tags.

- [ ] **Step 3: Commit**

```bash
git add src/components/Portfolio.astro
git commit -m "feat: implement portfolio section with 4 case cards and tech tags"
```

---

### Task 8: Process Component

**Files:**
- Modify: `src/components/Process.astro`

- [ ] **Step 1: Implement Process**

Replace `src/components/Process.astro` with:

```astro
---
interface Props {
  t: any;
}

const { t } = Astro.props;
---

<section id="process" class="py-20 px-6 border-t border-white/5">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <p class="section-label">{t.process.label}</p>
      <h2 class="section-heading">{t.process.heading}</h2>
    </div>
    <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
      {t.process.steps.map((step: any, i: number) => (
        <>
          <div class="text-center flex-1 max-w-[160px]">
            <div class="w-11 h-11 rounded-full bg-accent flex items-center justify-center mx-auto font-bold text-base">
              {step.number}
            </div>
            <h3 class="font-semibold text-sm mt-3">{step.title}</h3>
            <p class="text-muted text-xs mt-1">{step.description}</p>
          </div>
          {i < t.process.steps.length - 1 && (
            <span class="hidden md:block text-accent/40 text-lg">→</span>
          )}
        </>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify Process renders**

```bash
npm run dev
```

Check `localhost:4321/` — 4 steps with red circles, arrows between them on desktop.

- [ ] **Step 3: Commit**

```bash
git add src/components/Process.astro
git commit -m "feat: implement process section with 4 horizontal steps"
```

---

### Task 9: FAQ + Contact Component

**Files:**
- Modify: `src/components/FaqContact.astro`

- [ ] **Step 1: Implement FaqContact**

Replace `src/components/FaqContact.astro` with:

```astro
---
interface Props {
  t: any;
}

const { t } = Astro.props;
---

<section id="faq" class="py-20 px-6 border-t border-white/5">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- FAQ -->
      <div>
        <p class="section-label">{t.faq.label}</p>
        <h2 class="section-heading mb-6">{t.faq.heading}</h2>
        <div class="flex flex-col gap-2">
          {t.faq.items.map((item: any, i: number) => (
            <details class="group bg-white/[0.03] border border-white/[0.06] rounded-lg">
              <summary class="flex items-center justify-between cursor-pointer px-4 py-3 text-sm list-none">
                <span>{item.question}</span>
                <span class="text-accent transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <div class="px-4 pb-4 text-body text-xs leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      <!-- Contact Form -->
      <div id="contact">
        <p class="section-label">{t.contact.label}</p>
        <h2 class="section-heading mb-6">{t.contact.heading}</h2>
        <form
          id="contact-form"
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          class="flex flex-col gap-3"
        >
          <input
            type="text"
            name="name"
            required
            placeholder={t.contact.namePlaceholder}
            class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
          />
          <input
            type="text"
            name="contact"
            required
            placeholder={t.contact.emailPlaceholder}
            class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
          />
          <textarea
            name="message"
            rows="3"
            placeholder={t.contact.messagePlaceholder}
            class="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors resize-none"
          ></textarea>
          <button type="submit" class="btn-primary text-center">
            {t.contact.submit}
          </button>
          <p id="form-success" class="hidden text-green-400 text-xs mt-1">{t.contact.successMessage}</p>
          <p id="form-error" class="hidden text-red-400 text-xs mt-1">{t.contact.errorMessage}</p>
        </form>
      </div>
    </div>
  </div>
</section>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const success = document.getElementById('form-success');
  const error = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    success?.classList.add('hidden');
    error?.classList.add('hidden');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        success?.classList.remove('hidden');
      } else {
        error?.classList.remove('hidden');
      }
    } catch {
      error?.classList.remove('hidden');
    }
  });
</script>
```

- [ ] **Step 2: Verify FAQ accordion and contact form render**

```bash
npm run dev
```

Check `localhost:4321/` — FAQ items expand/collapse on click, contact form side-by-side on desktop.

- [ ] **Step 3: Commit**

```bash
git add src/components/FaqContact.astro
git commit -m "feat: implement FAQ accordion and contact form with Formspree"
```

---

### Task 10: Footer Component

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Implement Footer**

Replace `src/components/Footer.astro` with:

```astro
---
interface Props {
  t: any;
}

const { t } = Astro.props;
---

<footer class="py-6 px-6 border-t border-white/5">
  <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-muted text-xs gap-2">
    <span>{t.footer.copyright}</span>
    <span>{t.footer.site}</span>
  </div>
</footer>
```

- [ ] **Step 2: Verify footer renders**

```bash
npm run dev
```

Check `localhost:4321/` — footer at bottom with copyright and site name.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: implement footer component"
```

---

### Task 11: Scroll Animations

**Files:**
- Modify: `src/styles/global.css`, `src/components/Services.astro`, `src/components/Portfolio.astro`, `src/components/Process.astro`, `src/components/FaqContact.astro`

- [ ] **Step 1: Add animation observer script to Layout**

Add before `</body>` in `src/layouts/Layout.astro`:

```astro
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
</script>
```

- [ ] **Step 2: Add initial hidden state to global CSS**

Add to `src/styles/global.css` in `@layer components`:

```css
  [data-animate] {
    opacity: 0;
  }
```

- [ ] **Step 3: Add data-animate to section wrappers**

In each section component (`Services.astro`, `Portfolio.astro`, `Process.astro`, `FaqContact.astro`), add `data-animate` to the outermost `<section>` tag. For example in `Services.astro`, change:

```
<section id="services" class="py-20 px-6 border-t border-white/5">
```

to:

```
<section id="services" class="py-20 px-6 border-t border-white/5" data-animate>
```

Apply the same to:
- `Portfolio.astro`: `<section id="portfolio" ...` → add `data-animate`
- `Process.astro`: `<section id="process" ...` → add `data-animate`
- `FaqContact.astro`: `<section id="faq" ...` → add `data-animate`

- [ ] **Step 4: Verify animations work**

```bash
npm run dev
```

Scroll down on `localhost:4321/` — sections should fade-in-up as they enter viewport.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/styles/global.css src/components/Services.astro src/components/Portfolio.astro src/components/Process.astro src/components/FaqContact.astro
git commit -m "feat: add scroll-triggered fade-in-up animations"
```

---

### Task 12: Build Verification and Final Polish

**Files:**
- No new files

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds, outputs to `dist/` with static HTML for `/`, `/kz/`, `/en/`.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Check all 3 language pages, verify:
- Nav links scroll to correct sections
- Language switcher navigates between languages
- Mobile menu opens/closes
- FAQ accordion works
- Contact form validates required fields
- Animations trigger on scroll
- All text matches the language

- [ ] **Step 3: Verify sitemap was generated**

```bash
cat dist/sitemap-index.xml
```

Expected: XML file referencing sitemap entries for `/`, `/kz/`, `/en/`.

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "feat: verify production build and finalize landing page"
```
