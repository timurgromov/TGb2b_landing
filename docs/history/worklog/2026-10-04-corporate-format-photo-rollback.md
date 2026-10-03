# Corporate format photo rollback

Date: 2026-10-04

## Scope

- Restored the original real photograph before the package cards on `/` and
  `/novogodniy-korporativ/`.
- Left the gallery, packages, copy, forms, analytics and other routes unchanged.

## Change

- Removed the rejected AI-outpainted delivery assets.
- Removed the intermediate expanded-photo derivatives and the CSS-generated
  blurred side backdrop.
- Restored the existing responsive `corporate-format` AVIF/WebP asset.
- Kept the redundant pre-gallery photograph removed.

## Local verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed after the final edit.
- Both shared routes checked at `390`, `768`, `769`, `1024`, `1180`, `1440`
  and `1984` CSS widths in the Codex in-app browser.
- The rendered source is `corporate-format-1536.avif`, pseudo-element backdrop
  is absent, horizontal overflow is `0`, and the gallery still follows
  `Порядок работы` directly.
- Browser console warnings/errors: `0`.
- No form was submitted.

## Release

- Runtime source commit: `948d026` on `origin/astro-migration`.
- Static production commit: `fa5b3ad` on `origin/gh-pages`.
- Fresh live checks passed on both routes at `390x844` and `1440x900`: the
  original AVIF decoded, the pseudo-element backdrop was absent, horizontal
  overflow was `0`, and browser console warnings/errors were `0`.
- Rejected AI and expanded delivery URLs return `404`; the restored responsive
  photograph returns `200`.
