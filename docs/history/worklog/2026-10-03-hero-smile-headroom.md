# Shared hero smile headroom — 2026-10-03

## Intent

Give slide `01-smile` natural space above the hair on both corporate routes
without changing the square Hero, five-photo order, copy, CTA or slider timing.

## Candidate

- Changed the source crop from `top=150` to `top=95`, moving the portrait down
  by 55 source pixels.
- Rebuilt only the `640px` and `1024px` AVIF/WebP delivery derivatives.
- Added `crop-20261003b` to the changed asset URLs and preload so cached old
  crops cannot survive the release.
- The original PNG remains outside `public/`.

## Local verification

- `npm run build`, `npm run verify:seasonal` and `git diff --check`: passed.
- Fresh Codex in-app-browser review passed at `390x844` and `1440x900`.
- Matrix passed at `390x844`, `767/768/769x900`, `1180x820`, `1366x768`,
  `1440x900` and `1984x1046`; horizontal overflow and console errors: `0`.
- Shared-route parity passed on `/` and `/novogodniy-korporativ/`.
- Autoplay still advances from `01-smile` to `02-microphone`.
- Strict media audit passed; the four delivery files are `18–60 KiB`.
- No form was submitted.

## Release

Pending commit, push, static deploy and fresh production verification.
