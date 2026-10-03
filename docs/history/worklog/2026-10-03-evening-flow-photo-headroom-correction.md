# Corporate evening-flow photo headroom correction — 2026-10-03

## Defect

The first production crop used desktop `object-position: 50% 25%`. In the wide
banner this removed the source image's upper safe area and visibly clipped the
central subject's hair/head. The earlier acceptance evidence that described all
heads as visible was incorrect.

## Correction

- Desktop focal position is `50% 5%`; photo asset, container geometry and CTA
  remain unchanged.
- Mobile keeps the complete `3:2` image at `50% 50%`.
- Both `/` and `/novogodniy-korporativ/` inherit the correction from the shared
  stylesheet.

## Verification

- Fresh local visual review passed at `769x900`, `1440x900`, `1984x1046` and
  `390x844`.
- The full two-route matrix passed at `390`, `767`, `768`, `769`, `1179`,
  `1180`, `1181`, `1366`, `1440` and `1984` CSS widths.
- Every standing head remains complete with upper breathing space; mobile
  composition, CTA and document width remain unchanged. Console errors: `0`.
- `npm run build`, `npm run verify:seasonal`, UI evidence validation and
  `git diff --check` passed. No form was submitted.

## Release

Pending commit, push, static publication and fresh production verification.
