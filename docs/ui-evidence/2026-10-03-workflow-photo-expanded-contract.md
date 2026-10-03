# UI change contract — expanded pre-packages photograph

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Target: shared `corporate-format-photo` after the benefits CTA and before the
  package cards.
- Requested change: replace the blurred-side treatment with one seamless
  AI-outpainted full-bleed photograph based on `4444.png`.

## Expected visible delta

- The banner shows more of Timur's torso and a naturally continued banquet
  interior across the full container width.
- The head remains complete and has natural clearance from the upper edge.
- The existing outer container is unchanged. There are no blurred strips,
  solid side panels, duplicated edges or separate background layer.
- The source original stays outside `public/`; delivery uses responsive
  AVIF/WebP derivatives.

## Preserved invariants

- Block order, outer dimensions, border, copy and CTA remain unchanged.
- The redundant workflow photograph before the gallery is removed, so the
  gallery follows `Порядок работы` without another full-width image.
- Both corporate routes render the same shared photograph.
- Mobile keeps the subject's complete head and torso in its `3:2` crop without
  horizontal overflow.
