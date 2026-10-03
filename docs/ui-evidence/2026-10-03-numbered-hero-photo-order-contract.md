# Numbered hero photo order contract

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Surface: `[data-hero-slider]` only.
- Viewports: `1440x900` and `390x844`.

## Expected visible delta

The five approved numbered portraits are shown once each and in the exact
owner-selected order:

1. `01-smile` — source `1. 4324 — копия 2.png`.
2. `02-microphone` — source `2 аыа.png`.
3. `03-full-length` — source `3. imфыафвфage.png`.
4. `04-grey-suit` — source `4 image76868.png`.
5. `05-gesture` — source `5 image86876.png`.

Deterministic proof URL: `?hero-slide=<slide-id>`.

## Preserve

- Existing hero copy, CTA, square geometry and responsive layout.
- First-frame and subsequent-frame timing.
- AVIF primary delivery with WebP fallback.

## Failure conditions

- Any repeated portrait or repeated derivative bytes.
- Any missing numbered source, especially source 4.
- A source appears in a different position from 1–5.
- Horizontal overflow, zero-sized hero, console errors or a missing asset.
