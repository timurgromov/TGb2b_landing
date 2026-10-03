# Expanded pre-packages photo

Date: 2026-10-03

## Scope

- Updated the shared wide context photograph on `/` and
  `/novogodniy-korporativ/`.
- Left Hero, package content, gallery order, forms, pricing, analytics and the
  Jubilee route unchanged.

## Change

- Replaced the photograph immediately before the package cards with one
  seamless AI-outpainted version based on the owner-supplied `4444.png`, while
  keeping the existing outer container.
- The subject is framed farther away and more torso is visible. The banquet
  interior is continued across the image itself, so the former blurred side
  strips and separate CSS backdrop are gone. Mobile uses a `3:2` crop.
- Removed the separate wide photograph that previously appeared after
  `Порядок работы` and immediately before `Моменты с событий`.
- Added `768/1536` AVIF/WebP derivatives. The generated PNG source remains
  outside `public/`; every delivery file is between `32 KiB` and `73 KiB`.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- UI-evidence validation: passed.
- Local Codex in-app browser: both routes at `390`, `768`, `769`, `1024`,
  `1180`, `1440` and `1984` CSS widths. The new AVIF rendered before
  `#formats`, the retired workflow photo was absent, `#photos` followed the
  workflow section directly and horizontal overflow was `0`.
- Fresh production review: both routes at `1440x900` and `390x844`; expected
  AVIF decoded, layout order correct, horizontal overflow `0`, console errors
  `0`.
- No form was submitted.

## Release

- Runtime source commit: `230a1f0` on `origin/astro-migration`.
- Static production commit: `e4f8bf4` on `origin/gh-pages`.
