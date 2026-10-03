# Current-photo content rollout — 2026-10-03

## Intent

Complete the owner-approved photo rollout instead of stopping after the single
evening-flow image. Keep `/` and `/novogodniy-korporativ/` in parity.

## Candidate

- Added `ек7.png` as a wide context photograph between benefits and packages.
- Added `рыкерц — копия.png` as a wide context photograph between workflow and
  the gallery.
- Replaced the first six corporate gallery positions with `85645 — копия.png`,
  `image10 — копия.png`, `image8 — копия.png`, `423423 — копия.png`,
  `23423432.png` and `image2 — копия.png`.
- Originals remain outside `public/`; delivery uses responsive AVIF/WebP.
- The second wide-photo crop was corrected during rendered QA so the head is
  not clipped. Both wide desktop crops now use `object-position: 50% 18%`;
  mobile keeps the complete `3:2` frame.

## Local verification

- `npm run build`, `npm run verify:seasonal` and `git diff --check`: passed.
- Strict media-budget audit: passed; all delivery assets are below `125 KiB`.
- Both corporate routes passed the same 11-view matrix from `390x844` through
  `1984x1046`, including `767/768/769` and `1023/1024/1025`; horizontal
  overflow failures: `0`.
- Fresh in-app-browser visual review passed at `390x844` and `1440x900` for
  both wide photos and the responsive gallery. Browser console errors: `0`.
- No form was submitted.

## Release

- Source commit `0458a07` is pushed to `origin/astro-migration`.
- Static production commit `676c717` is pushed to `origin/gh-pages`; GitHub
  Pages deployment completed successfully.
- Fresh live checks passed on both corporate routes at `390x844` and
  `1440x900`: the new AVIF assets decoded, both context photographs and six
  gallery sources are present, route-specific H1 values are preserved,
  horizontal overflow and console errors are `0`.
