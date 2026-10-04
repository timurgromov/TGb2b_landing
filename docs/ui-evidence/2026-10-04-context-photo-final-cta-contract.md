# UI change contract — context photo before final CTA

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Exact target: `#corporate-format-photo`, the existing solo panoramic
  photograph of Timur in the corporate event hall.
- Jubilee is deliberately not moved: its only comparable photograph belongs to
  `#evening-flow`, follows its five event stages, and is not a second,
  near-duplicate conversion image.

## Baseline signature

- The two corporate routes render the format photograph directly after
  `#benefits` and before `#formats`.
- This makes two large, warm, wide event images appear too close together in
  the upper commercial path.

## Expected visible delta

- Both corporate routes place `#formats` immediately after `#benefits`.
- The unchanged photograph follows `#faq` and immediately precedes the final
  CTA (`#cta` on `/`, `#proverit-datu` on the seasonal route).
- The photo asset and responsive crop contract do not change: complete 2:1
  frame with `contain` through `768px`, then the existing desktop `cover`
  composition at `50% 18%`.

## Preserved invariants

- Package cards, music section, cases, workflow, gallery, letters, FAQ, CTA
  copy and all lead behaviour remain unchanged.
- No new media is added and no original source file enters `public/`.
- Jubilee’s event-flow photo retains its narrative position after the Jubilee
  stages; it does not gain a redundant second large image.
- No horizontal overflow or form submission is introduced.

## Required viewports

- `390x844`, `767x900`, `768x900`, `769x900`, `1024x768`, `1440x900` on both
  corporate routes.
- Jubilee receives an order-only production check: its single
  `#evening-flow` image stays within the event-flow section, not before its
  final CTA.
