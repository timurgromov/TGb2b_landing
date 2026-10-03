# Shared current-photo hero slider — 2026-10-03

## Scope

Updated only the hero portrait area on `/` and `/novogodniy-korporativ/`. Copy, CTA, tags and all blocks below the hero remain unchanged.

## Implementation

- Added one shared five-frame slider component used by both routes.
- Published only optimized `AVIF` and responsive `WebP` derivatives (`640px`, `1024px`); original PNG files remain outside `public/`.
- Added automatic crossfade, hidden-tab pause, reduced-motion fallback and deterministic `?hero-slide=<slide-id>` visual-QA mode.
- Added a permanent seasonal contract assertion for slide count, formats and route parity.

## Verification

- `npm run build` — passed.
- `npm run verify:seasonal` — passed.
- strict media-budget audit — passed with zero warnings.
- rendered checks — passed on both routes at 11 widths from `390px` through `1984px`; horizontal overflow and collapsed hero geometry: `0`.
- autoplay and reduced-motion behavior — passed.

## Release

- Source commit: `2a18171` on `origin/astro-migration`.
- Production commit: `22eac70` on `origin/gh-pages`; GitHub Pages build status: `built`.
- Fresh live checks passed on `/` and `/novogodniy-korporativ/` at `1440x900` and `390x844`: five slides, square non-zero media frame, AVIF current source, preserved H1 and zero horizontal overflow.
- Live autoplay advanced from `01-smile` to `02-stage`; AVIF/WebP assets returned HTTP `200` with correct MIME types; browser console errors: `0`.
