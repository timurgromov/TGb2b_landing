# UI change contract — restore original corporate format photo

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Target: shared `corporate-format-photo` between the benefits block and the
  package cards.
- Requested change: remove the rejected AI/outpaint and blurred-edge variants,
  then restore the original real `corporate-format` photograph.

## Expected visible delta

- The photograph contains no AI-regenerated person or background.
- The desktop banner has no blurred or filled side strips.
- The original responsive AVIF/WebP photograph fills the existing container.

## Preserved invariants

- Block order, package cards, copy, CTA and outer container stay unchanged.
- The redundant photograph before `Моменты с событий` remains removed.
- Both corporate routes use the same shared photograph.
- Mobile and desktop have no horizontal overflow.
