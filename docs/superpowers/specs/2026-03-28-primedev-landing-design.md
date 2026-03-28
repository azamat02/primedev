# primedev.kz — Landing Page Design Spec

## Overview

Landing page for primedev.kz — IT development company based in Kazakhstan. Full-cycle development: web, mobile, Telegram bots, Kaspi payment integrations, CRM systems.

**Goal:** Generate leads through a contact form ("Обсудить проект").

## Tech Stack

- **Framework:** Astro + Tailwind CSS
- **Animations:** CSS animations (minimal JS)
- **i18n:** 3 languages — Russian (default), Kazakh, English
- **Deployment:** Static site, deployable to any hosting

## Visual Style

- **Theme:** Dark mode — background `#0a0a0f`
- **Accent color:** Bold Red `#ef4444`
- **Text:** White `#ffffff` for headings, `#94a3b8` for body, `#64748b` for muted
- **Borders/cards:** `rgba(239,68,68,0.12)` borders, `rgba(239,68,68,0.06)` card backgrounds
- **Font:** System UI stack (system-ui, -apple-system, sans-serif)
- **Style:** Corporate + minimalist. Clean, serious, confident.
- **Logo:** Text-based — "PRIME" in white + "DEV" in `#ef4444`
- **Radial glows:** Subtle red radial gradients on Hero and Contact sections

## Page Structure

### 1. Navigation (sticky)
- Logo: PRIME**DEV**
- Links: Услуги, Кейсы, Процесс, FAQ, Контакты
- Language switcher: RU / KZ / EN
- Mobile: hamburger menu

### 2. Hero Section
- Subtitle tag: "IT-РАЗРАБОТКА ПОЛНОГО ЦИКЛА"
- Heading: "Превращаем идеи в **работающие продукты**"
- Description: "Веб-приложения, мобильные решения, Telegram-боты и автоматизация платежей Kaspi"
- CTA buttons: "Обсудить проект" (filled red) + "Наши кейсы ↓" (outlined)
- Background: radial gradient glow from top center

### 3. Services Section (Услуги)
- Section label: "УСЛУГИ"
- Heading: "Что мы делаем"
- 6 cards in 3x2 grid:
  1. Веб-разработка — Сайты, SaaS-платформы, лендинги на React/Next.js
  2. Telegram боты — Автоматизация, платежи, подписки, CRM-интеграции
  3. Kaspi интеграции — Автооплата, выставление счетов, подтверждение без кассира
  4. Мобильная разработка — iOS и Android приложения
  5. CRM системы — Полный цикл клиента, аналитика продаж
  6. UI/UX дизайн — Интерфейсы, прототипы, дизайн-системы
- Card style: dark bg with red border, icon at top

### 4. Portfolio Section (Кейсы)
- Section label: "ПОРТФОЛИО"
- Heading: "Наши кейсы"
- Subtitle: "Реальные проекты, которые работают прямо сейчас"
- 4 case cards in 2x2 grid with large background numbers (01-04):

  **01 — Tolemflow** (Fintech / Payments)
  Сервис автооплаты Kaspi API. Telegram-боты с автооплатой для инфобизнеса, курсов и цифровых продуктов.
  Tags: Python, Kaspi API, Telegram

  **02 — FlowTickets** (Tickets / Events)
  Сервис продажи билетов: Telegram-бот, выдача и проверка билетов, CRM для продажников, аналитика.
  Tags: React, CRM, Telegram

  **03 — Subscription Bots** (Community)
  Telegram-боты для сообществ: подписки, автооплата, админ-панель, рекуррентные платежи, напоминания.
  Tags: Python, Payments, Admin Panel

  **04 — Лендинги** (Websites)
  izzamuzzic.com, topspot.kz — дизайн и разработка лендингов для бизнеса и артистов.
  Tags: Next.js, Design, Tailwind

- Card style: gradient bg, red borders, tech stack tags at bottom

### 5. Process Section (Процесс)
- Section label: "ПРОЦЕСС"
- Heading: "Как мы работаем"
- 4 steps in horizontal flow with arrows:
  1. Брифинг — Обсуждаем задачу и цели
  2. Дизайн — Проектирование и архитектура
  3. Разработка — Итеративная разработка
  4. Запуск — Деплой и поддержка
- Steps: red circle with number, title, description

### 6. FAQ + Contact Section (side-by-side)
- Two columns layout:

  **Left — FAQ:**
  - Section label: "FAQ"
  - Heading: "Частые вопросы"
  - Accordion items (collapsed by default):
    - Сколько стоит разработка?
    - Какие сроки разработки?
    - Как начать работу с нами?
    - Какие технологии используете?
    - Есть ли поддержка после запуска?

  **Right — Contact Form:**
  - Section label: "КОНТАКТЫ"
  - Heading: "Обсудим проект?"
  - Fields: Имя, Телефон или email, Сообщение (textarea)
  - Submit button: "Отправить заявку" (red)
  - Form submission: static form (Formspree, Netlify Forms, or similar)

### 7. Footer
- Left: © 2026 PrimeDev. Все права защищены.
- Right: primedev.kz

## i18n Strategy

- File-based routing: `/ru/`, `/kz/`, `/en/` (Russian as default at `/`)
- JSON translation files for each language in `src/i18n/`
- Language switcher in nav updates URL prefix
- All content (headings, descriptions, FAQ answers, form labels) translated
- SEO: `hreflang` tags, localized `<title>` and `<meta description>`

## Responsive Design

- **Desktop:** Full layout as described (3-column service grid, 2-column cases, side-by-side FAQ+Contact)
- **Tablet:** 2-column grids, stacked FAQ+Contact
- **Mobile:** Single column, hamburger nav, stacked everything
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px` (Tailwind defaults)

## Animations

- Subtle fade-in-up on scroll for sections (CSS `@keyframes` + Intersection Observer)
- Smooth scroll for nav anchor links
- FAQ accordion open/close transitions
- No heavy animation libraries

## Form Handling

- Static form submission via Formspree (or equivalent)
- Client-side validation: required fields, email/phone format
- Success/error state feedback after submission
- No backend required

## SEO

- Static HTML output (Astro SSG) — crawlable by default
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- Open Graph and Twitter Card meta tags
- Favicon and touch icons
- Sitemap via `@astrojs/sitemap`
- `robots.txt`

## Project Structure

```
primedev/
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Portfolio.astro
│   │   ├── Process.astro
│   │   ├── FaqContact.astro
│   │   └── Footer.astro
│   ├── i18n/
│   │   ├── ru.json
│   │   ├── kz.json
│   │   └── en.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro          (RU — default)
│   │   ├── kz/index.astro
│   │   └── en/index.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

## Out of Scope

- Blog
- Admin panel / CMS
- User authentication
- Payment processing on the landing page itself
- Analytics dashboard (can add Google Analytics / Yandex Metrika later)
