# UI change contract — wide evening-flow photograph

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Exact target: `#evening-flow .evening-flow__media`, immediately before the
  existing CTA and the `Ваши преимущества — мои гарантии` section.
- Requested asset: owner-supplied `57565.png`.

## Expected visible delta

- The new photograph replaces the current interaction photograph.
- The full left and right source edges remain visible at every checked width;
  no person at either edge is cropped out.
- Desktop keeps the existing banner height and may crop only the top and bottom
  of the source.
- Mobile preserves the full 2:1 source frame.
- No generated fill, blurred side strips or background duplication is used.

## Focal point and safe region

- All five foreground people and every head must remain visible.
- Desktop vertical positioning may remove ceiling/background and lower
  foreground, but must retain comfortable headroom.

## Preserved invariants

- Evening-flow cards, copy, CTA and the following benefits section remain
  unchanged.
- The banner outer width, border and radius remain unchanged.
- The package photograph and gallery remain unchanged.
- Both corporate routes retain shared markup and responsive behavior.
- No horizontal overflow or form submission is introduced.

## Required viewports

- `390x844`, `767x900`, `768x900`, `769x900`;
- `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
