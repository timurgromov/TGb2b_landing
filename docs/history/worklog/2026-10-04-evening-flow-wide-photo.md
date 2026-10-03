# 2026-10-04 — wide evening-flow photo

## Scope

- Shared photograph after the five `Как проходит корпоратив` stages and before
  `Ваши преимущества — мои гарантии` on `/` and
  `/novogodniy-korporativ/`.
- Gallery, package photograph, copy, CTA and forms were not changed.

## Change

- Replaced the previous interaction photograph with responsive derivatives of
  the owner-supplied `57565.png` composition.
- Desktop keeps the complete left and right source edges and crops only the top
  and bottom inside the existing banner height, positioned at `50% 30%`.
- Mobile uses the complete 2:1 source frame with no crop.
- The original PNG remains outside `public/`; only 768px and 1536px AVIF/WebP
  derivatives ship.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- UI evidence validator: passed for the staged candidate.
- Local two-route matrix: `390x844`, `767x900`, `768x900`, `769x900`,
  `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`; horizontal
  crop `0`, horizontal overflow `0`, console warnings and errors `0`.
- Fresh production checks: both routes at `390x844` and `1440x900`; the decoded
  AVIF is the new `corporate-evening-flow-wide-v2` asset. Mobile renders the
  complete 2:1 composition with `object-fit: contain`; desktop reports
  `object-fit: cover`, `object-position: 50% 30%` and horizontal crop `0`.
- All four new public AVIF/WebP assets return HTTP `200` with the expected MIME
  types.
- No form was submitted.

## Media audit

- New AVIF/WebP derivatives: `ready`; each file is below 107 KiB.
- Existing unrelated warnings remain for `public/contact/Логотип_MAX.svg.png`
  and `public/assets/og_og.jpg`.

## Release

- Runtime source commit: `8643a86` on `origin/astro-migration`.
- Production commit: `391287c` on `origin/gh-pages`.
