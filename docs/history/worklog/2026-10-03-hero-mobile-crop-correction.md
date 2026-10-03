# Shared hero mobile crop correction — 2026-10-03

## Intent

Correct the four specific portrait crops reported by the owner without changing
the five-photo order, Hero geometry, copy, CTA or slider behavior.

## Candidate

- `02-microphone`: source crop moved from `top=245` to `top=295`.
- `03-full-length`: source crop moved from `top=205` to `top=165`.
- `04-grey-suit`: source crop moved from `top=256` to `top=100` so the complete
  hair/head silhouette is visible.
- `05-gesture`: source crop moved from `top=175` to `top=135`.
- Generated responsive AVIF/WebP derivatives at `640px` and `1024px`; the
  original PNG files remain outside `public/`.
- Added `crop-20261003a` to changed asset URLs so browsers do not reuse the old
  crop from cache.

## Local verification

- `npm run build` and `npm run verify:seasonal`: passed.
- Fresh Codex in-app-browser visual review passed for all four exact slides at
  `390x844` after the dissolve completed.
- Shared-route parity passed on `/` and `/novogodniy-korporativ/`.
- Matrix passed at `375x812`, `390x844`, `430x932`, `767/768/769x900`,
  `1180x820`, `1366x768`, `1440x900` and `1984x1046`; horizontal overflow and
  console errors: `0`.
- No form was submitted.

Release details are recorded after the production deployment.
