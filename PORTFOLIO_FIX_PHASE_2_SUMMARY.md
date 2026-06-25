# Portfolio Fix — Phase 2 Summary

**Date:** 2026-06-23

## Status

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Pass |
| `npm run build` | ✅ Pass |
| `npm run typecheck` | ✅ Pass |

---

## What Changed

### Broken links (trustpay, avia-landing)
- Убраны live-ссылки с карточек
- Добавлен статус `demoUnavailable` → текст «Демо временно недоступно» / «Demo temporarily unavailable»
- Битые кнопки demo **не показываются**

### NDA / Internal projects
- `tWhale`, `web3Fintech`, `deepWaters` → `linkStatus: "nda"`
- Бейдж **NDA / Internal** на карточке
- Профессиональный текст вместо слабого «нет публичной ссылки»

### Усилены старые проекты
- Переписаны уникальные описания: `itdealgroup`, `trustpay`, `dezv3`, `mosca`, `aviaLanding`
- Обновлены также `tWhale`, `deepWaters` (в контексте NDA)
- Уточнены stack-бейджи где возможно

### Contact
- Добавлена contact-card с `tel:` для телефона
- Текст секции Contact упрощён (телефон в карточке, не в prose)

### Project model extensions
- `linkStatus`: `live` | `nda` | `demoUnavailable`
- Optional: `image`, `githubUrl` (подготовлено, без фейковых данных)
- `ProjectCard`: optional thumbnail, GitHub link, NDA badge, статусы ссылок

### Screenshots support
- Создана папка `public/projects/` (`.gitkeep`)
- Карточка рендерит `image`, если поле задано в meta
- **Скриншоты не добавлены** — ждут файлы от вас

### OG image
- Временный fallback: `/arslan-profile.png` (файл существует)
- Константа `ogImagePath` в `portfolio-meta.ts`
- **TODO:** финальный баннер `public/og-image.png` 1200×630

### SEO
- `app/robots.ts` → `/robots.txt`
- `app/sitemap.ts` → `/sitemap.xml` (`/en`, `/ru`)
- `siteUrl` централизован в `portfolio-meta.ts`

### Localized 404
- `app/[locale]/not-found.tsx` через i18n (`NotFound` namespace, RU + EN)

### CV / Resume
- `resumeHref` в meta = `undefined`
- **Кнопка CV не показана** — PDF в `public/` не найден

### GitHub per project
- Поле `githubUrl` в модели + UI в карточке
- Реальные repo URL **не добавлены**

### Cleanup
- Удалены unused: `vercel.svg`, `window.svg`, `file.svg`
- `brand-logo-dark.png` оставлен

### DX
- Добавлен `"typecheck": "tsc --noEmit"`

---

## Files Touched

| File | Change |
|------|--------|
| `data/portfolio-meta.ts` | `linkStatus`, `siteUrl`, `resumeHref`, `ogImagePath`, stacks |
| `lib/portfolio-content.ts` | Resolved fields: linkStatus, image, githubUrl |
| `components/project-card.tsx` | NDA badge, demo status, image, GitHub link |
| `messages/ru.json` | Projects, ProjectCard, NotFound, Contact |
| `messages/en.json` | Same |
| `app/[locale]/page.tsx` | Phone contact card |
| `app/[locale]/layout.tsx` | `siteUrl` for metadata |
| `app/[locale]/not-found.tsx` | Localized 404 |
| `app/robots.ts` | **New** |
| `app/sitemap.ts` | **New** |
| `package.json` | `typecheck` script |
| `public/projects/.gitkeep` | **New** |
| `public/vercel.svg` | Deleted |
| `public/window.svg` | Deleted |
| `public/file.svg` | Deleted |

---

## Issues Closed

| Issue | Status |
|-------|--------|
| Broken trustpay / avia demo buttons | ✅ No broken links shown |
| Weak NDA project presentation | ✅ NDA badge + professional copy |
| Generic dezv3/mosca/trustpay/avia/itdealgroup copy | ✅ Rewritten |
| No tel: contact | ✅ Phone card added |
| Missing robots.txt | ✅ `app/robots.ts` |
| Missing sitemap | ✅ `app/sitemap.ts` |
| English-only 404 | ✅ Localized |
| Broken OG reference to missing file | ✅ Fallback to profile photo |
| No screenshot field | ✅ Optional `image` support |
| No typecheck script | ✅ Added |
| Unused create-next-app SVGs | ✅ Removed (3 files) |
| CV button with missing PDF | ✅ Not shown (safe) |

---

## Still Needs Your Input

### URLs
- [ ] **trustpay.now** — актуальный URL или оставить без demo?
- [ ] **avia-landing.vercel.app** — передеплоить или новый URL?

### Assets
- [ ] **CV PDF** — положить в `public/` и задать `resumeHref` в `portfolio-meta.ts` (например `"/resume.pdf"`)
- [ ] **OG image** — финальный баннер 1200×630 → `public/og-image.png`, затем обновить `ogImagePath`
- [ ] **Screenshots** для Spy / Bunker в `public/projects/`:
  - `spy-home.png`, `spy-setup.png`, `spy-card.png`, `spy-voting.png`
  - `bunker-lobby.png`, `bunker-host.png`, `bunker-player.png`, `bunker-voting.png`
  - После добавления — прописать `image: "/projects/..."` в meta

### Decisions
- [ ] **Публичный телефон** — оставляем `tel:` карточку или убрать?
- [ ] **GitHub links** для Spy / Bunker — дать repo URL?
- [ ] **Featured** — оставить Web3/Fintech как 3-й featured или заменить на itdealgroup?

---

## Notes / Risks

- OG сейчас использует **квадратное фото профиля** — для LinkedIn/Twitter лучше заменить на 1200×630 баннер.
- Телефон добавлен в contact cards как `tel:` — подтвердите, что это ок для публичного портфолио.
- `resumeHref = undefined` — при добавлении PDF нужно также добавить кнопку в Hero (Phase 3 или вручную).
- Middleware deprecation warning (Next.js 16) — не блокер, отложено.

---

*Phase 2 complete. No projects removed. Architecture unchanged.*
