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

- Source commit `84c093f` is pushed to `origin/astro-migration`.
- Static production commit `fae6c12` is pushed to `origin/gh-pages`; GitHub
  Pages reports the build as `built`.
- Fresh live checks passed on both `/` and `/novogodniy-korporativ/` at
  `1440x900` and `390x844`: the AVIF decoded, the complete image and CTA were
  visible, document width matched viewport width, and console errors were `0`.
- No real form was submitted.
