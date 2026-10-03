# Current photo in shared evening flow — 2026-10-03

## Intent

Add one current photo of Timur to the existing `Как проходит корпоратив` block
on both corporate routes without changing its five stages, CTA or page order.

## Candidate

- Reused the shared `EveningFlow` component for `/` and
  `/novogodniy-korporativ/`.
- Added one responsive `<picture>` after the five stage cards and before the
  existing CTA.
- Published only `768px` and `1536px` AVIF/WebP derivatives; the 2.3 MiB PNG
  original remains outside `public/`.
- Desktop uses a wide crop with the full head visible; mobile preserves the
  complete `3:2` frame.

## Local verification

- `npm run build`, `npm run verify:seasonal` and strict media audit: passed.
- Fresh in-app browser review passed on both corporate routes at `390x844` and
  desktop widths.
- Boundary matrix passed at `767/768/769`, `1023/1024/1025`,
  `1179/1180/1181`, `1366`, `1440` and `1984` CSS widths.
- New media stays within the container, CTA remains present, and console errors
  are `0`; no form was submitted.

## Release

Pending source commit, static `gh-pages` publication and fresh production
verification.
