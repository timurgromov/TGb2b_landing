# UI change contract — final evening-flow photo replacement

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Exact target: `#evening-flow .evening-flow__media img`, after the five
  `Как проходит корпоратив` stages and immediately before the existing CTA and
  `Ваши преимущества — мои гарантии`.
- Requested source: owner-supplied `куку.png`.

## Baseline signature

- Production serves `corporate-evening-flow-wide-v3`.
- At `1440x900` the image renders `1118x430` with `object-fit: cover`,
  `object-position: 50% 30%` and horizontal overflow `0`.
- At mobile widths the existing responsive contract switches to the complete
  2:1 composition with `object-fit: contain`.

## Expected visible delta

- The existing `wide-v3` photograph is replaced by the final owner-supplied
  composition.
- Desktop keeps the complete left and right source edges and may crop only the
  top and bottom inside the existing banner height.
- Mobile preserves the complete 2:1 source frame.
- No generated fill, blurred side strips or duplicated background is used.

## Preserved invariants

- The existing container, five evening-flow cards, CTA, following benefits
  section, package photograph and gallery remain unchanged.
- Both corporate routes use the same shared responsive asset.
- No horizontal overflow or form submission is introduced.

## Required viewports

- `390x844`, `767x900`, `768x900`, `769x900`;
- `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
