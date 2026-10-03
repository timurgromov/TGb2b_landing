# Expanded pre-packages photo

Date: 2026-10-03

## Scope

- Updated the shared wide context photograph on `/` and
  `/novogodniy-korporativ/`.
- Left Hero, package content, gallery order, forms, pricing, analytics and the
  Jubilee route unchanged.

## Change

- Replaced the photograph immediately before the package cards with the
  owner-supplied expanded version, keeping the existing outer container.
- Desktop uses the wider sharp frame over a subdued backdrop from the same
  photograph; mobile uses the full `3:2` crop. This shows more of the subject
  without enlarging the block.
- Removed the separate wide photograph that previously appeared after
  `Порядок работы` and immediately before `Моменты с событий`.
- Added `768/1536` AVIF/WebP derivatives. The original remains outside
  `public/`; every delivery file is between `25 KiB` and `71 KiB`.

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

- Runtime source commit: `eccdbda` on `origin/astro-migration`.
- Static production commit: `b96f6c7` on `origin/gh-pages`.
