# Portfolio Fix — Phase 3 Summary

**Date:** 2026-06-23

## Status

| Check | Result |
|-------|--------|
| `npm run lint` | ✅ Pass |
| `npm run build` | ✅ Pass |
| `npm run typecheck` | ✅ Pass |

---

## Applied Decisions

### TrustPay
- Проект **оставлен** в портфолио
- `linkStatus: "demoUnavailable"`, live URL **не показывается**
- Статус: RU «Демо временно недоступно» / EN «Demo temporarily unavailable»
- Битая demo-кнопка **отсутствует** (без изменений с Phase 2, подтверждено)

### Avia Landing
- Аналогично TrustPay: `demoUnavailable`, без live-ссылки
- Аккуратный unavailable status вместо кнопки

### CV
- `resumeHref` остаётся `undefined` (PDF в `public/` нет)
- Кнопка **не отображается** в Hero
- Подготовлена инфраструктура: при задании `resumeHref` в `portfolio-meta.ts` появится кнопка RU «Скачать CV» / EN «Download CV» с `rel="noopener noreferrer"`

### Phone
- Публичный `tel:` contact-card **сохранён**
- В описании секции Contact — только «телефон … ниже», без дублирования номера в prose

### GitHub links
- **Шпион:** `https://github.com/4rchi-nv/spy-game-next`
- **Бункер:** `https://github.com/4rchi-nv/bunker-game`
- Кнопка в карточке: RU «Код» / EN «Code»
- `target="_blank"` + `rel="noopener noreferrer"`
- Другим проектам фейковые repo **не добавлены**

### Featured
- Без изменений (уже корректно):
  - Шпион ✅
  - Бункер ✅
  - Web3/Fintech ✅
- itdealgroup **не** featured

---

## Files Touched

| File | Change |
|------|--------|
| `data/portfolio-meta.ts` | `githubUrl` для spy и bunker |
| `messages/ru.json` | `viewGitHub` → «Код», `Hero.downloadCv` |
| `messages/en.json` | `viewGitHub` → «Code», `Hero.downloadCv` |
| `components/hero-block.tsx` | Условная CV-кнопка при `resumeHref` |
| `app/[locale]/page.tsx` | Передача `resumeHref` / `downloadCvLabel` в Hero |

---

## Issues Closed

| Issue | Status |
|-------|--------|
| GitHub links for Spy / Bunker | ✅ |
| CV button without PDF | ✅ Hidden until `resumeHref` set |
| TrustPay / Avia broken demo buttons | ✅ Confirmed no live buttons |
| Featured trio (Spy, Bunker, Web3) | ✅ Confirmed |
| Phone public + tel card | ✅ Confirmed |
| RU/EN labels for Code button | ✅ |

---

## Remaining

- [ ] **Final OG image** 1200×630 → `public/og-image.png`, обновить `ogImagePath`
- [ ] **Screenshots** для Spy / Bunker в `public/projects/` + `image` в meta
- [ ] **CV PDF** — положить в `public/`, задать `resumeHref` (кнопка появится автоматически)
- [ ] **Актуальные demo URLs** для TrustPay / Avia Landing, когда появятся
- [ ] Middleware → proxy migration (Next.js 16, low priority)

---

*Phase 3 complete. User decisions applied. No projects removed, no redesign.*
