# UI change contract — expanded workflow photograph

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Target: shared `corporate-workflow-photo` after `Порядок работы`.
- Requested change: replace the current tight portrait with the owner-supplied
  expanded version `4444.png`.

## Expected visible delta

- The banner shows more of Timur's torso and more lateral context.
- The head remains complete and has natural clearance from the upper edge.
- The existing outer container is unchanged; on desktop the sharp photograph is
  slightly zoomed out and its side space blends into a subdued backdrop made
  from the same image instead of leaving empty bars.
- The source original stays outside `public/`; delivery uses responsive
  AVIF/WebP derivatives.

## Preserved invariants

- Block order, outer dimensions, border, copy and CTA remain unchanged.
- The photo gallery and the first context photograph remain unchanged.
- Both corporate routes render the same shared photograph.
- Mobile keeps the complete vertical frame without horizontal overflow.
