# Music-program poster head-safe crop — 2026-10-04

## Change

The shared live-music poster on `/` and `/novogodniy-korporativ/` now anchors to the top of its fixed-height cover frame. This keeps every musician's head visible when the layout becomes a wide single column on tablet and preserves the approved mobile and desktop composition.

The stylesheet cache key was bumped so production browsers do not reuse the former centred crop. The seasonal contract now fails if the shared top framing disappears.

## Verification

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- `git diff --check`: passed.
- Strict media budget audit for the existing AVIF/WebP poster: passed.
- In-app browser visual review: passed at `390x844`, `768x1024`, `1180x820` and `1440x900` on both public route variants.
- Show-reel start: overlay disappears, native video controls remain and playback starts.

## Boundary

No photo or video file changed. The existing optimized AVIF/WebP poster and provider-hosted show-reel are reused; only framing, cache keys and regression checks changed.
