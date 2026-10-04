# Music-program tablet composition — 2026-10-04

## Change

The shared live-music block on `/` and `/novogodniy-korporativ/` now has a dedicated tablet composition from `769px` through `1180px`: the show-reel poster is on the left and the explanatory copy is on the right. The package cards stay below the summary row.

The poster frame uses the source `1200:843` ratio at mobile and tablet widths, so all four musicians, the guitar and the saxophone remain in the image. Widths up to `768px` keep the stacked mobile flow; desktop from `1181px` keeps the approved two-column section.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- In-app browser matrix: passed at `390x844`, `768x1024`, `769x1024`, `900x900`, `1180x820` and desktop transition widths with zero horizontal overflow.
- Both `/` and `/novogodniy-korporativ/` were rendered at `1180x820`; poster-left/copy-right order and `1.422` poster ratio were confirmed.
- Show-reel start: overlay disappears, native controls remain and playback starts.

## Boundary

No image or video asset changed. The existing optimized AVIF/WebP poster is reused and remains `ready`.
