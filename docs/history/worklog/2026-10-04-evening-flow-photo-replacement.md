# 2026-10-04 — evening-flow photo replacement

## Scope

- Shared photograph after the five `Как проходит корпоратив` stages and before
  `Ваши преимущества — мои гарантии` on `/` and
  `/novogodniy-korporativ/`.
- Copy, cards, CTA, benefits, package photograph, gallery and forms were not
  changed.

## Change

- Replaced the preceding `wide-v2` photograph with responsive derivatives of
  the owner-supplied `232323.png`.
- Desktop retains the source's complete left and right edges and crops only the
  top and bottom at the existing `50% 30%` position.
- Mobile displays the complete 2:1 source frame.
- The original PNG remains outside `public/`; only 768px and 1536px AVIF/WebP
  derivatives ship.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- UI evidence validator: passed for the staged candidate.
- Local two-route matrix: `390x844`, `767x900`, `768x900`, `769x900`,
  `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`; horizontal
  overflow `0`, console warnings and errors `0`.
- Fresh production checks: both routes at `390x844` and `1440x900`; the decoded
  AVIF is `corporate-evening-flow-wide-v3`. Mobile renders the complete 2:1
  composition with `object-fit: contain`; desktop reports `object-fit: cover`,
  `object-position: 50% 30%` and horizontal crop `0`.
- All four new public AVIF/WebP assets return HTTP `200` with the expected MIME
  types and sizes.
- No form was submitted.

## Media audit

- New AVIF/WebP derivatives: `ready`; each file is below 100 KiB.
- Existing unrelated warnings remain for `public/contact/Логотип_MAX.svg.png`
  and `public/assets/og_og.jpg`.

## Release

- Runtime source commit: `8c00d61` on `origin/astro-migration`.
- Production commit: `477cb20` on `origin/gh-pages`.
