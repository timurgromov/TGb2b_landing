# 2026-10-04 — final evening-flow photo replacement

## Scope

- Shared photograph after the five `Как проходит корпоратив` stages and
  immediately before `Ваши преимущества — мои гарантии` on `/` and
  `/novogodniy-korporativ/`.
- Copy, cards, CTA, benefits, package photograph, gallery and forms were not
  changed.

## Change

- Replaced the preceding `wide-v3` photograph with responsive derivatives of
  the owner-supplied final `куку.png`.
- Desktop keeps the source's complete left and right edges and crops only the
  top and bottom at the existing `50% 30%` position.
- Mobile displays the complete 2:1 source frame.
- The 2.04 MiB original PNG remains outside `public/`; only 768px and 1536px
  AVIF/WebP derivatives ship.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- UI evidence validator: passed for the staged candidate.
- Local two-route matrix: `390x844`, `767x900`, `768x900`, `769x900`,
  `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`; horizontal
  crop and page overflow `0`, console warnings and errors `0`.
- Fresh production checks: both routes at `390x844` and `1440x900`; the decoded
  AVIF is `corporate-evening-flow-wide-v4`. Mobile renders the complete 2:1
  composition with `object-fit: contain`; desktop reports `object-fit: cover`,
  `object-position: 50% 30%` and horizontal crop `0`.
- Root, seasonal, privacy, sitemap and all four new AVIF/WebP assets return
  HTTP `200` with expected MIME types.
- No form was submitted.

## Media audit

- New AVIF/WebP derivatives: `ready`; the largest file is 108954 bytes.
- Existing unrelated warnings remain for `public/contact/Логотип_MAX.svg.png`
  and `public/assets/og_og.jpg`.

## Release

- Runtime source commit: `976a324` on `origin/astro-migration`.
- Production commit: `4b5761d` on `origin/gh-pages`.
