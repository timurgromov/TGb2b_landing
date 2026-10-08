# Compact seasonal price calculator — 2026-10-08

## Scope

- changed: only the pricing interaction on `/novogodniy-korporativ/`;
- unchanged: prices, date ranges, package contents, detailed form contract,
  ordinary corporate `/`, Jubilee, CRM, Metrika and advertising projects;
- no real lead was submitted during verification.

## Product result

- the date input, all three package prices, extra-hour price and the primary CTA
  now form one compact calculator panel;
- through `1024px`, packages use short stacked rows; from `1025px`, they use
  three equal columns;
- the detailed package contents moved to a disclosure with three full cards;
- the complete December matrix remains a separate disclosure with 14 rows;
- the selected date still transfers to the existing detailed form, while the
  package remains for the visitor to choose in that form.

## Verification

- `npm run build` — passed;
- `npm run verify:seasonal` — passed;
- `node --check public/seasonal.js` — passed;
- staged diff check and UI evidence validation — passed;
- local responsive matrix passed at `320x844`, `390x844`, `768x1024`,
  `769x900`, `1023x768`, `1024x768`, `1025x768`, `1180x820`, `1366x768`,
  `1440x900` and `1984x1046`; every viewport had zero horizontal overflow;
- fresh production QA at `320x844`, `390x844` and `1440x900` showed
  `220 000 ₽`, `250 000 ₽`, `от 400 000 ₽` and extra hour `25 000 ₽` for
  `2026-12-25`, with zero overflow and no console warnings or errors;
- the package disclosure opened with three cards, the matrix opened with 14
  rows, and the CTA transferred `2026-12-25` to `#proverit-datu` without
  submitting the form;
- ordinary corporate `/` had no seasonal calculator or seasonal script.

## Release

- runtime source: `78412f9` on `origin/astro-migration`;
- production: `ad1adc7` on `origin/gh-pages`;
- public URL: `https://corp.timurgromov.ru/novogodniy-korporativ/`.
