# Seasonal inline package details — 2026-10-08

## Scope

- changed: only the pricing calculator on `/novogodniy-korporativ/`;
- unchanged: approved prices and date ranges, package contents, complete price
  matrix, detailed form contract, ordinary corporate `/`, Jubilee, CRM,
  Metrika and advertising projects;
- no real lead was submitted during verification.

## Product result

- before a date is selected, the three cards show December minimums:
  `от 135 000 ₽`, `от 160 000 ₽`, `от 310 000 ₽`; the extra hour shows
  `от 20 000 ₽`;
- the panel explicitly asks `Введите дату своего мероприятия`;
- each card has its own calendar button; every button focuses and opens the
  shared date input, and one date recalculates all three cards;
- the primary price and smaller extra-hour value sit in the same row;
- each card has its own native `Что входит` disclosure. It expands the package
  composition inside the same card and changes to `Скрыть состав`;
- the detached shared package disclosure was removed; the separate 14-row
  December matrix remains.

## Verification

- `npm run build` — passed;
- `npm run verify:seasonal` — passed;
- `node --check public/seasonal.js` — passed;
- staged diff check and UI evidence validation — passed;
- local responsive matrix passed at `320x844`, `390x844`, `768x1024`,
  `1024x768`, `1025x768`, `1180x820`, `1440x900` and `1984x1046` with zero
  overflow, no control collisions and the documented one/three-column switch;
- fresh production QA at `320x844`, `390x844` and `1440x900` confirmed the
  initial minimums, all three calendars, values `220 000 ₽`, `250 000 ₽`,
  `от 400 000 ₽` and extra hour `25 000 ₽` for `2026-12-25`;
- all package disclosures opened independently with `3 / 4 / 6` list items;
  the matrix opened with 14 rows; the CTA transferred `2026-12-25` to the
  form without submitting it;
- ordinary corporate `/` had no seasonal calculator, seasonal script or
  calendar controls; browser console warnings and errors were empty.

## Release

- runtime source: `9f4dc60` on `origin/astro-migration`;
- production: `ba03bd8` on `origin/gh-pages`;
- public URL: `https://corp.timurgromov.ru/novogodniy-korporativ/`.
