# Seasonal pricing buttons removal — 2026-10-08

## Scope

- changed: only the package interaction on `/novogodniy-korporativ/`;
- unchanged: prices, price matrix, package contents, ordinary corporate `/`, Jubilee, CRM API, Metrika goals and advertising projects;
- no real lead was submitted during verification.

## Product result

- after entering a date, all three package prices and the extra-hour price appear immediately;
- the three redundant `Выбрать состав` buttons and the selected-card state are removed;
- one CTA transfers the selected date to the detailed form;
- the package is selected once in that form and is not preselected silently.

## Verification

- `npm run build` — passed;
- `npm run verify:seasonal` — passed, including rejection of the retired buttons and state;
- `node --check public/seasonal.js` — passed;
- `git diff --check` — passed;
- UI evidence validation — passed;
- fresh production mobile QA at `390x844`: date `2026-12-25` immediately produced `220 000 ₽`, `250 000 ₽`, `от 400 000 ₽` and extra hour `25 000 ₽`; button count `0`; CTA transferred the date and left the package empty; `scrollWidth=390`; no console warnings or errors;
- fresh production desktop QA at `1440x900`: button count `0`; three equal columns showed the same prices; `scrollWidth=1440`; no console warnings or errors;
- ordinary corporate `/`: three format cards remain, seasonal pricing block count `0`, no overflow or console warnings/errors.

## Release

- source: `9dc157c` on `origin/astro-migration`;
- production: `d7745c6` on `origin/gh-pages`;
- public URL: `https://corp.timurgromov.ru/novogodniy-korporativ/`.
