# Seasonal date pricing live — 2026-10-08

## Scope

- changed: `/novogodniy-korporativ/` price presentation and its existing detailed form context;
- unchanged: ordinary corporate `/`, Jubilee, CRM API contract, Metrika goals and advertising projects;
- no real lead was submitted during verification.

## Product result

- the visitor selects a December 2026 date and immediately sees three package prices;
- the public contract states up to 5 hours and shows the extra-hour price for the same date group;
- the full 14-range December matrix is available in a disclosure below the cards;
- equipment is included in packages two and three, with the exact set confirmed after the venue check;
- the music package adds at least `150 000 ₽` to the package with equipment; saxophone and guitar remain a separate calculation;
- date and explicitly selected composition are synchronized with the existing detailed form; no package is selected silently.

## Verification

- `npm run build` — passed;
- `npm run verify:seasonal` — passed, including all 14 price rows and root-route exclusion;
- `node --check public/seasonal.js` — passed;
- `git diff --check` — passed;
- UI evidence validation — passed;
- local responsive QA — `390x844`, `768x900`, `769x900`, `1180x900`, `1440x900`, no horizontal overflow or console errors;
- fresh production QA — `390x844` and `1440x900`, exact 25/31 December prices, form synchronization, 14 rows and root-route exclusion passed.

## Release

- source: `6f817dc` on `origin/astro-migration`;
- production: `aaf089d` on `origin/gh-pages`;
- public URL: `https://corp.timurgromov.ru/novogodniy-korporativ/`.
