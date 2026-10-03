# Curated corporate gallery

Date: 2026-10-03

## Scope

- Updated the shared `Моменты с событий` gallery on `/` and
  `/novogodniy-korporativ/`.
- Left the Jubilee repository, wide context photographs, Hero, forms, pricing
  and analytics unchanged.

## Change

- Replaced the repetitive opening photoshoot sequence with a 14-frame curated
  order that alternates current portraits and documentary event photographs.
- The first four frames are: current full-height stage, documentary guest
  interaction, black-and-white portrait with two guests, documentary dance
  floor.
- Removed the former similar stage image, one redundant microphone portrait
  and the repeated close-up from the rendered gallery.
- Added responsive `640/1024` AVIF/WebP derivatives for the three owner-supplied
  photographs. Originals remain outside `public/`; all delivery assets are
  between `29 KiB` and `116 KiB`.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- Local Codex in-app browser: both routes across 11 viewports each, 22/22
  passed; 14 frames, exact first/third current images and horizontal overflow
  `0`.
- Rendered local review: `1440x900` and `390x844`; the first four images form
  the intended current/event/current/event rhythm and the complete portrait
  subjects remain visible.
- GitHub Pages build for production commit `f061497`: `built`.
- Fresh production review: `/` at `1440x900` and
  `/novogodniy-korporativ/` at `390x844`; decoded expected AVIF assets,
  removed duplicates absent, horizontal overflow `0`, console errors `0`.
- Public delivery: all three new `640px` AVIF assets return HTTP `200` with
  `content-type: image/avif`.
- No form was submitted.

## Release

- Runtime source commit: `3b9f9bf` on `origin/astro-migration`.
- Static production commit: `f061497` on `origin/gh-pages`.
