# 2026-10-04 — full-width corporate format photo

## Scope

- Shared photograph before the package cards on `/` and
  `/novogodniy-korporativ/`.
- Gallery, package content, forms and other photographs were not changed.

## Change

- Replaced the previous tightly framed 3:2 asset with responsive derivatives of
  the owner-supplied `4444.png` composition.
- Desktop keeps the source's complete left and right edges and uses only a
  vertical crop inside the existing banner height.
- Mobile uses the source's full 2:1 frame with no crop.
- The original PNG remains outside `public/`; only 768px and 1536px AVIF/WebP
  derivatives ship.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- UI evidence validator: passed for the staged candidate.
- Local two-route matrix: `390x844`, `768x900`, `769x900`, `1024x768`,
  `1440x900`, `1984x1046`; horizontal crop `0` in every case, horizontal
  overflow `0`, console errors `0`.
- Fresh production checks: both routes at `390x844` and `1440x900`; the decoded
  AVIF is the new `corporate-format-wide-v4` asset, horizontal crop `0`,
  horizontal overflow `0`, console errors `0`.
- No form was submitted.

## Media audit

- New AVIF/WebP derivatives: `ready`; each file is below 61 KiB.
- Existing unrelated warnings remain for `public/contact/Логотип_MAX.svg.png`
  and `public/assets/og_og.jpg`.

## Release

- Runtime source commit: `481aff1` on `origin/astro-migration`.
- Production commit: `a13ebe9` on `origin/gh-pages`.
