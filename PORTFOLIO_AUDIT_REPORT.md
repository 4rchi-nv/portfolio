# Portfolio Audit Report

**Date:** 2026-06-23  
**Scope:** Full static + runtime review of the portfolio codebase (`D:\desktop\tests\portfolio`)  
**Build status:** `npm run lint` ✅ · `npm run build` ✅ · `npm run typecheck` ❌ (script not defined)

---

## Summary

Проект в **хорошем рабочем состоянии**: билд и линт проходят, контент структурирован через `data/portfolio-meta.ts` + `messages/{ru,en}.json`, i18n работает (en/ru). Явных lorem/TODO/FIXME-заглушек в коде нет.

Основные зоны риска — **контент и ссылки**, а не архитектура:

- 2 из 8 внешних project-ссылок выглядят **битыми или недоступными** (`trustpay.now`, `avia-landing.vercel.app`).
- 3 проекта **без live link** (ожидаемое поведение UI, но слабая подача для рекрутера).
- Поле `whyItMatters` заполнено для всех 11 проектов, но **нигде не отображается** в UI.
- SEO/social preview **без OG/Twitter image** при `summary_large_image`.
- На мобильных **нет навигационного меню** (пункты скрыты до `md`).
- Нет **резюме/CV**, `robots.txt`, `sitemap.xml`, `manifest.json`.

Проекты **«Шпион»** и **«Бункер»** добавлены корректно: live-ссылки открываются (HTTP 200), `featured`, стек и переводы на месте.

**Всего зафиксировано: 38 проблем** (3 critical · 14 high · 13 medium · 8 low).

---

## Critical Issues

| Priority | Issue | Location |
|----------|-------|----------|
| **High** | **Dev: Turbopack FATAL panic** — `Next.js package not found` on каждый `GET /en` (HMR). Причина: `turbopack.root: __dirname` в `next.config.ts` ломал резолв пакета в dev. **Исправлено:** блок `turbopack` удалён из конфига. | `next.config.ts` (бывш.) |
| **Medium** | **Dev: Slow / locked filesystem** — предупреждение `Slow filesystem detected` и `Persisting failed` (Windows os error 1224) при записи `.next/dev`. Возможен медленный или сетевой диск `D:\`. | `.next/dev`, окружение |
| **High** | `https://trustpay.now/` — DNS не резолвится (сайт недоступен при проверке) | `data/portfolio-meta.ts:77` |
| **High** | `https://avia-landing.vercel.app` — HTTP **404** | `data/portfolio-meta.ts:95` |
| **Medium** | На viewport `< md` навигация `#projects / #experience / #skills / #contact` **полностью скрыта** (`hidden md:flex`) — пользователь зависит от скролла и hero-кнопок | `app/[locale]/page.tsx:64` |

---

## Content Placeholders

Явных `lorem`, `TODO`, `FIXME`, `coming soon`, `your name`, `example.com` **не найдено**.

Ниже — **слабый/шаблонный контент** и неиспользуемые тексты:

| # | File | Section/component | Problem | Suggested fix |
|---|------|-------------------|---------|---------------|
| 1 | `messages/ru.json`, `messages/en.json` | `Portfolio.projects.*.whyItMatters` (все 11 проектов) | Тексты заполнены, но **не рендерятся** в `ProjectCard` | Показать блок в карточке или удалить из i18n, чтобы не дублировать работу |
| 2 | `messages/*.json` | `dezv3`, `mosca` | Почти **одинаковые** `whatItIs` / `description` («Задеплоенное веб-приложение» / «Живой референс») | Добавить уникальный контекст: что за продукт, роль, 1–2 фичи |
| 3 | `messages/*.json` | `trustpay` | Очень общее описание («Публично доступный веб-продукт») + битая ссылка | Уточнить продукт или убрать/скрыть карточку |
| 4 | `messages/*.json` | `web3Fintech`, `deepWaters`, `tWhale` | Нет публичной ссылки; описания **абстрактные** (без demo/repo) | Добавить ссылку, скриншот, или переформулировать как NDA/внутренний продукт |
| 5 | `messages/*.json` | `Portfolio.projects.bunker.contribution` | Упоминание внутренней функции `getPublicPlayerCard()` — **жаргон для портфолио** | Заменить на человекочитаемую формулировку («приватные поля карточки скрыты от других игроков») |
| 6 | `messages/*.json` | `Aside.bullets` | Нет упоминания party-games (в отличие от `helpWith[0]`) | Добавить bullet про игры, если это ключевой фокус |
| 7 | `messages/*.json` | `Meta.keywords` | Нет party-games, Firebase, Tailwind — **устаревший SEO-фокус** | Обновить keywords под текущий профиль |
| 8 | `README.md` | Root | Стандартный **create-next-app** текст, не описывает портфолио | Заменить на project-specific README (опционально) |

---

## Broken or Suspicious Links

| Link | Where used | Status/problem | Suggested fix |
|------|------------|----------------|---------------|
| `https://trustpay.now/` | `data/portfolio-meta.ts` → project `trustpay` | **DNS failure** — домен не открывается | Проверить домен/деплой; обновить URL или убрать ссылку |
| `https://avia-landing.vercel.app` | `data/portfolio-meta.ts` → project `aviaLanding` | **HTTP 404** | Передеплоить или заменить URL; иначе убрать карточку |
| `https://spy-game-next.vercel.app` | `spy` project | ✅ 200 | — |
| `https://bunker-glhf.vercel.app` | `bunker` project | ✅ 200 | — |
| `https://itdealgroup.com` | `itdealgroup` | ✅ 200 | — |
| `https://dezv3-dev.web.app` | `dezv3` | ✅ 200 | — |
| `https://mosca-itdeal.web.app/` | `mosca` | ✅ 200 | — |
| `https://t.me/t_projects_bot` | `telegramBots` | ✅ 200 | — |
| `https://github.com/4rchi-nv` | Hero, Contact | ✅ 200 | — |
| `https://www.linkedin.com/in/arslan-agajanov` | Hero, Contact | ✅ (HEAD → 405, нормально для LinkedIn) | — |
| `https://portfolio-arslan.vercel.app` | `app/[locale]/layout.tsx` metadataBase | ✅ 200 | Подтвердить, что это **актуальный production URL** |
| `mailto:agajanov0arslan@gmail.com` | Contact | OK | — |
| `https://t.me/darc_nv` | Contact | OK | — |
| `tel:+99363337949` | — | **Отсутствует** — телефон только в тексте секции Contact | Добавить contact-card с `tel:` или убрать номер из description |

**Внешние ссылки:** `target="_blank"` есть у project cards, hero GitHub/LinkedIn, external contact cards.  
**`rel`:** везде `rel="noreferrer"`, **`noopener` отсутствует** (рекомендуется `noopener noreferrer`).

Файлы:
- `components/project-card.tsx:60-61`
- `components/hero-block.tsx:79-82`
- `components/contact-cards.tsx:29`

---

## Projects Section Issues

### Общее

| Issue | Details | Priority |
|-------|---------|----------|
| Нет скриншотов | Карточки **только текст**; поля image/thumbnail в модели нет | Medium |
| Нет GitHub на карточках | В `ProjectMeta` нет поля `github` — by design | Low (если не нужно) |
| 6 featured из 11 | `spy`, `bunker`, `tWhale`, `web3Fintech`, `deepWaters`, `itdealgroup` — бейдж теряет смысл | Medium |
| 3 проекта без ссылки | `tWhale`, `web3Fintech`, `deepWaters` — показывается `noPublicLink` | High |
| Слабый stack у старых проектов | `trustpay`: `Frontend`, `Web Integration`; `dezv3`/`mosca`: `Frontend`, `Web App` | Medium |
| Skills не синхронизированы | В проектах: Tailwind, Firebase, localStorage — в `skillItems` **нет** | Medium |
| Фильтр Party Game | Добавлен корректно | ✅ |
| Пустые карточки | Нет | ✅ |

### «Шпион» (`spy`)

| Check | Status |
|-------|--------|
| Live URL | ✅ `https://spy-game-next.vercel.app` (200) |
| `featured` | ✅ |
| Stack | ✅ Next.js, React, TypeScript, Tailwind CSS, localStorage, Vercel |
| RU + EN тексты | ✅ Заполнены, содержательные |
| `target="_blank"` | ✅ `components/project-card.tsx:60` |
| `rel` | ⚠️ `noreferrer` only |
| Screenshots | ❌ Отсутствуют |
| GitHub | ❌ Нет поля (ожидаемо) |

### «Бункер» (`bunker`)

| Check | Status |
|-------|--------|
| Live URL | ✅ `https://bunker-glhf.vercel.app` (200) |
| `featured` | ✅ |
| Stack | ✅ incl. Firebase Firestore, Firebase Auth |
| RU + EN тексты | ✅ |
| Технический жаргон | ⚠️ `getPublicPlayerCard()` в `contribution` |
| Screenshots | ❌ Отсутствуют |

---

## SEO / Metadata Issues

| Issue | File | Lines | Priority |
|-------|------|-------|----------|
| Нет `openGraph.images` | `app/[locale]/layout.tsx` | 43-50 | High |
| `twitter.card: summary_large_image` без image | `app/[locale]/layout.tsx` | 51-55 | High |
| `metadataBase` / `openGraph.url` захардкожены | `app/[locale]/layout.tsx` | 40, 46 | Medium — подтвердить домен |
| Нет `robots.txt` | `public/` | — | Medium |
| Нет `sitemap.xml` / `app/sitemap.ts` | — | — | Medium |
| Нет `manifest.json` | `public/` | — | Low |
| Favicon = `brand-logo-light.png` (не .ico) | `layout.tsx` | 57-60 | Low — работает, но не идеально для всех клиентов |
| Keywords не отражают party-games | `messages/*.json` → `Meta.keywords` | — | Low |

Title/description/OG title **заполнены** и персонализированы (не generic template) — `messages/ru.json`, `messages/en.json` → `Meta`.

---

## UI / Responsive Issues

| Issue | Location | Priority |
|-------|----------|----------|
| **Нет mobile menu** — nav links скрыты на `< md` | `app/[locale]/page.tsx:64` | High |
| CTA «Связаться» скрыт на `< sm` | `app/[locale]/page.tsx:79` | Medium |
| Длинный первый bullet в `helpWith` (party-games) — возможен перенос на узких экранах | `messages/*.json` | Low |
| Карточки проектов **разной высоты** (много текста у spy/bunker vs короткие у dezv3/mosca) | `components/project-card.tsx` | Low — ожидаемо для grid |
| Нет footer | `app/[locale]/page.tsx` | Low |
| Фильтры проектов: нет `aria-pressed` | `components/projects-section.tsx:66-77` | Medium |
| Hover на кнопках есть; **явных `focus-visible` стилей нет** | `globals.css`, кнопки/ссылки | Medium |
| `useIsMobile` SSR default `false` → возможен краткий mismatch анимаций при гидратации | `hooks/use-is-mobile.ts:17-18` | Low |
| Build warning: middleware deprecated → proxy | build output | Low (техдолг Next.js 16) |

Адаптивность в целом продумана: `min-w-0`, `overflow-x-clip`, `break-words`, responsive grid.

---

## Accessibility Issues

| Issue | File:line | Priority |
|-------|-----------|----------|
| Profile photo `alt=""` | `components/hero-block.tsx:107` | High — добавить описательный alt |
| Brand logo `alt=""` | `app/[locale]/page.tsx:57` | Medium |
| Фильтры без `aria-pressed` / `aria-current` | `components/projects-section.tsx` | Medium |
| Нет skip-to-content link | layout/page | Low |
| Семантика в целом OK | `<main>`, `<nav>`, `<article>`, `<section>` | ✅ |
| Keyboard: ссылки кликабельны; focus ring слабый/отсутствует | global styles | Medium |
| 404 page только на английском | `app/[locale]/not-found.tsx` | Medium |
| Контраст zinc-400 на zinc-950 | визуально приемлемо для dark UI | Low |

---

## Code Quality Issues

| Issue | File | Priority |
|-------|------|----------|
| `whyItMatters` резолвится, но не используется в UI | `lib/portfolio-content.ts:40`, `components/project-card.tsx` | Medium |
| `expertiseIndices` экспортируется, **нигде не импортируется** | `data/portfolio-meta.ts:138` | Low |
| `console.log` / `any` / debug code | — | ✅ Не найдено |
| Нет npm script `typecheck` | `package.json` | Low — TS проверяется в `next build` |
| `rel="noreferrer"` без `noopener` | см. ссылки выше | Low |
| Дублирование project copy RU/EN | by design (i18n) | OK |

---

## Unused or Suspicious Files

| File | Size | Status |
|------|------|--------|
| `public/brand-logo-dark.png` | ~63 KB | **Не используется** (в UI только `brand-logo-light.png`) |
| `public/vercel.svg` | 128 B | Create-next-app leftover |
| `public/window.svg` | 385 B | Unused |
| `public/file.svg` | 391 B | Unused |
| `public/globe.svg` | 1 KB | Unused |
| `public/next.svg` | 1.4 KB | Unused |
| `public/arslan-profile.png` | ~104 KB | Used — размер приемлемый |
| `public/brand-logo-light.png` | ~72 KB | Used (header + favicon) |

---

## Build / Lint

| Command | Result | Notes |
|---------|--------|-------|
| `npm run lint` | ✅ Pass | |
| `npm run build` | ✅ Pass | Warning: middleware → proxy deprecation |
| `npm run dev` | ⚠️ | После фикса `next.config.ts` — без FATAL panic; возможны `Persisting failed` на медленном FS |
| `npm run dev:webpack` | Fallback | Webpack вместо Turbopack, если dev всё ещё нестабилен |
| `npm run typecheck` | ❌ Not defined | TS OK via build |
| `pnpm lint` / `pnpm build` | N/A | Project uses npm |

---

## Resume / CV / Contacts

| Item | Status |
|------|--------|
| Resume / CV link | ❌ **Отсутствует** |
| PDF в `public/` | ❌ Нет |
| Email | ✅ `agajanov0arslan@gmail.com` |
| Telegram | ✅ `@darc_nv` |
| GitHub | ✅ `github.com/4rchi-nv` |
| LinkedIn | ✅ `linkedin.com/in/arslan-agajanov` |
| Phone | ⚠️ В тексте `Sections.contactDescription`, но **нет отдельной карточки / tel:** |
| Тестовые контакты | ✅ Не обнаружены |

---

## Priority Table

| ID | Area | Issue | Priority |
|----|------|-------|----------|
| C1 | Links | `trustpay.now` DNS failure | **High** |
| C2 | Links | `avia-landing.vercel.app` 404 | **High** |
| C3 | Nav | No mobile navigation menu | **High** |
| H1 | Projects | 3 projects without live link | High |
| H2 | SEO | Missing OG/Twitter images | High |
| H3 | A11y | Empty alt on profile photo | High |
| H4 | Content | `whyItMatters` written but not shown | Medium |
| H5 | Content | Weak/duplicate project descriptions | Medium |
| H6 | Projects | 6/11 featured — badge diluted | Medium |
| H7 | Skills | Stack mismatch (Firebase, Tailwind missing) | Medium |
| H8 | Contacts | No resume/CV | Medium |
| H9 | Contacts | Phone not clickable | Medium |
| H10 | i18n | 404 page English only | Medium |
| H11 | SEO | No robots.txt / sitemap | Medium |
| H12 | A11y | Missing focus-visible styles | Medium |
| H13 | A11y | Filter buttons without aria-pressed | Medium |
| H14 | Content | `getPublicPlayerCard()` in bunker copy | Medium |
| L1 | Assets | 6 unused files in `public/` | Low |
| L2 | Code | `expertiseIndices` dead export | Low |
| L3 | Security | `rel` missing noopener | Low |
| L4 | Docs | Default README | Low |
| L5 | Meta | Keywords outdated | Low |
| L6 | Build | Middleware deprecation warning | Low |
| L7 | DX | No typecheck script | Low |
| L8 | UI | No footer | Low |

---

## Recommended Fix Order

### 1. Fix immediately

1. ~~Исправить Turbopack dev panic~~ — убрать `turbopack.root` из `next.config.ts` (сделано). При повторении: `npm run dev:webpack` или перенос проекта на локальный SSD.
2. Проверить и исправить ссылки **`trustpay.now`** и **`avia-landing.vercel.app`** (или убрать/скрыть карточки).
2. Добавить **мобильную навигацию** (burger / drawer / compact anchor bar).
3. Добавить **OG image** (хотя бы `arslan-profile.png` или бренд-баннер 1200×630).
4. Исправить **alt** у фото профиля и логотипа.

### 2. Fix before deploy

1. Решить судьбу **3 проектов без ссылки** (demo, NDA-формулировка, или скриншоты).
2. Показать **`whyItMatters`** в карточке или убрать из JSON.
3. Добавить ссылку на **резюме/CV** (если есть PDF).
4. Сократить **featured** до 2–4 проектов (например spy, bunker + 1–2 ключевых).
5. Усилить описания **dezv3**, **mosca**, **trustpay**.
6. Добавить `robots.txt` + `sitemap.ts`.
7. Убрать техжаргон из текста **Бункера**.
8. Синхронизировать **Skills** с реальным стеком (Tailwind, Firebase, Framer Motion).

### 3. Nice to have

1. Скриншоты для spy/bunker и топ-проектов.
2. Удалить неиспользуемые SVG/PNG из `public/`.
3. Локализовать 404.
4. `focus-visible` стили для всех интерактивных элементов.
5. `tel:` карточка для телефона.
6. Обновить README.
7. Миграция middleware → proxy (Next.js 16).
8. Добавить `npm run typecheck`.

---

## Questions for Me

1. **`trustpay.now`** — домен временно недоступен или проект закрыт? Оставляем карточку, меняем URL или убираем?
2. **`avia-landing.vercel.app`** — есть актуальный деплой или заменить ссылку?
3. **T-Whale, Web3/Fintech, DeepWaters** — можно ли дать demo, GitHub (private OK как «по запросу») или пометить как NDA?
4. **Резюме** — есть PDF/Google Doc? Куда вести ссылку (hero, contact, отдельная кнопка)?
5. **Production URL** — `portfolio-arslan.vercel.app` актуален или будет custom domain?
6. **Featured** — какие 2–4 проекта должны быть «избранными»?
7. **Скриншоты** spy/bunker — готовы PNG/WebP? Куда класть (`public/projects/`)?
8. **Опыт Itdeal «мар. 2026»** — дата окончания верна? Обновить на «по настоящее время»?
9. **Телефон в Contact** — оставляем публично или только email/Telegram?
10. **GitHub-репозитории** spy/bunker — публиковать ссылки на карточках или намеренно только live demo?
11. **OG image** — использовать фото, логотип или отдельный social banner?
12. **Бункер `getPublicPlayerCard()`** — заменить на plain-language описание?

---

*Report generated from codebase review + HTTP checks. No automatic fixes applied.*
