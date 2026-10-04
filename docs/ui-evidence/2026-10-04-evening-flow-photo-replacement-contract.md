# UI change contract — evening-flow photo replacement

## Scope

- Routes: `/` and `/novogodniy-korporativ/`.
- Exact target: `#evening-flow .evening-flow__media img`, after the five
  `Как проходит корпоратив` stages and before the existing CTA and
  `Ваши преимущества — мои гарантии`.
- Requested source: owner-supplied `232323.png`.

## Expected visible delta

- The existing `corporate-evening-flow-wide-v2` photograph is replaced by the
  new owner-supplied composition.
- Desktop keeps the complete left and right source edges and may crop only the
  top and bottom inside the existing banner height.
- Mobile preserves the complete 2:1 source frame.
- No generated fill, blurred side strips or background duplication is used.

## Preserved invariants

- The five evening-flow cards, CTA, following benefits section, package photo
  and gallery remain unchanged.
- Both corporate routes use the same shared asset and responsive behavior.
- No horizontal overflow or form submission is introduced.

## Required viewports

- `390x844`, `767x900`, `768x900`, `769x900`;
- `1024x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
