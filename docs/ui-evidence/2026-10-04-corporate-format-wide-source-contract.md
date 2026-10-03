# UI change contract — wide corporate format photo

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Target: shared `corporate-format-photo` between the benefits block and the
  package cards.
- Requested change: use the owner-supplied wide `4444.png` composition without
  cropping its left or right edge.

## Expected visible delta

- The photograph fills the existing banner width with no blurred or generated
  side strips.
- Desktop cropping, when required by the fixed banner height, occurs only at
  the top and bottom of the source.
- Mobile preserves the full 2:1 source frame, so no side crop is introduced.
- More of Timur's body remains visible than in the replaced 3:2 photograph.

## Preserved invariants

- Outer banner container, block order, package cards, copy and CTA stay
  unchanged.
- The redundant photograph before `Моменты с событий` remains removed.
- Both corporate routes use the same shared asset and presentation.
- No horizontal overflow or form submission is introduced.
