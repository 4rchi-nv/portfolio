# Portfolio Fix — Phase 1 Summary

**Date:** 2026-06-23  
**Status:** `npm run lint` ✅ · `npm run build` ✅

---

## 1. What Changed

### Profile positioning (RU + EN)
- Hero title/role → **React / Next.js Engineer · TypeScript · Realtime Apps · Product UI**
- About summary and subtitle → full-stack product ownership wording (без преувеличений)
- Meta title/description/keywords обновлены под Next.js, Firebase, realtime, party games
- Aside bullets и helpWith — акцент на interactive games и product engineering

### Party-games / Interactive Games
- Тег фильтра: `Party Game` → **`Interactive Games`**
- Переписаны карточки **Шпион** и **Бункер** в engineering/product тоне
- Убран жаргон `getPublicPlayerCard()` из публичных текстов
- Добавлен **gamesIntro** при фильтре Interactive Games
- Обновлены stack-бейджи (PWA, Game FSM и т.д.)

### Featured projects
- **Featured (3):** Шпион, Бункер, Web3/Fintech
- Снят featured с: T-Whale, DeepWaters, itdealgroup

### `whyItMatters`
- Отображается в `ProjectCard` **только для featured** проектов

### Skills
- Синхронизированы с текущим профилем: Next.js App Router, Tailwind, Firebase, Firestore, Realtime Apps, PWA, Game Logic / FSM, Parser и др.

### Safe audit fixes
- `rel="noopener noreferrer"` на всех внешних ссылках
- Alt для фото профиля и логотипа
- `aria-pressed` на фильтрах проектов
- `focus-visible` стили для кнопок, ссылок, contact cards
- **Mobile nav** — горизонтальная anchor-полоса под header (`< md`)
- OG/Twitter metadata подготовлены для `/og-image.png`

---

## 2. Files Touched

| File | Changes |
|------|---------|
| `data/portfolio-meta.ts` | Tag rename, featured flags, skills, stacks, `ogImagePath` |
| `messages/ru.json` | Profile, projects, meta, games intro, hero alt |
| `messages/en.json` | Same as RU |
| `components/project-card.tsx` | `whyItMatters` (featured), `rel`, focus styles |
| `components/projects-section.tsx` | Filter rename, `gamesIntro`, `aria-pressed` |
| `components/mobile-nav.tsx` | **New** — mobile section navigation |
| `components/hero-block.tsx` | Profile alt, `rel`, focus styles |
| `components/contact-cards.tsx` | `rel="noopener noreferrer"` |
| `app/[locale]/page.tsx` | MobileNav, logo alt, profilePhotoAlt |
| `app/[locale]/layout.tsx` | OG/Twitter images via `ogImagePath` |
| `app/globals.css` | `focus-visible` on buttons and contact cards |
| `package.json` | `dev:webpack` script (from prior fix) |
| `next.config.ts` | Removed broken `turbopack.root` (from prior fix) |

---

## 3. Audit Issues Closed (Phase 1)

| Issue | Status |
|-------|--------|
| `whyItMatters` not rendered | ✅ Fixed (featured only) |
| Too many featured projects | ✅ Reduced to 3 |
| Skills out of sync | ✅ Updated |
| `getPublicPlayerCard()` jargon | ✅ Removed |
| `rel` missing noopener | ✅ Fixed |
| Empty image alts | ✅ Fixed |
| Filter buttons without aria-pressed | ✅ Fixed |
| Missing focus-visible styles | ✅ Added (core interactives) |
| No mobile navigation | ✅ MobileNav added |
| Outdated Meta keywords | ✅ Updated |
| OG image missing | ⚠️ Code ready — needs `public/og-image.png` |
| Party games weak positioning | ✅ Improved |
| Profile too “frontend-only” | ✅ Repositioned |

---

## 4. Remaining for Phase 2

| Priority | Issue |
|----------|-------|
| High | `trustpay.now` — DNS failure, link needs decision |
| High | `avia-landing.vercel.app` — HTTP 404 |
| Medium | Add `public/og-image.png` (1200×630) for social preview |
| Medium | 3 projects without live link (T-Whale, Web3, DeepWaters) |
| Medium | Weak/duplicate copy for dezv3, mosca, trustpay |
| Medium | Resume/CV link — not added |
| Medium | Phone in contact text but no `tel:` card |
| Low | `robots.txt` / `sitemap.ts` |
| Low | Localized 404 page |
| Low | Project screenshots |
| Low | Unused files in `public/` |
| Low | Middleware → proxy migration (Next.js 16) |

---

## 5. Questions for You

1. **trustpay.now** — обновить URL, убрать ссылку или скрыть карточку?
2. **avia-landing.vercel.app** — есть актуальный деплой?
3. **CV/Resume** — добавить PDF-ссылку? Куда (hero / contact)?
4. **Screenshots** для Шпион / Бункер — готовы файлы?
5. **Телефон** — оставить в тексте contact или добавить `tel:` карточку?
6. **GitHub** на карточках проектов — нужны ссылки на репозитории?
7. **og-image.png** — использовать фото, логотип или отдельный баннер?
8. **Featured** — оставить Web3/Fintech как третий featured или заменить на itdealgroup?

---

*Phase 1 complete. No architecture rewrite. No projects removed.*
