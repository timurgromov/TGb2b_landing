# UI change contract — shared current-photo hero slider

- Change ID: `2026-10-03-shared-hero-photo-slider`.
- Surface: hero media on `/` and `/novogodniy-korporativ/`.
- Baseline: one old square portrait in the approved hero grid.
- Requested visible change: five selected current photos in the owner-approved
  order, using a quiet automatic dissolve while hero copy and controls stay
  fixed.
- Exact target: `[data-hero-slider]` and its five `[data-hero-slide]` frames.
- Deterministic state: `?hero-slide=<data-slide-id>` freezes the requested frame
  for visual comparison.
- Expected signature: frame 1 is the smiling portrait; frame 2 preserves the
  full-body event context inside the existing square crop; the other three
  frames show the host working with guests.
- Timing: first frame `4500ms`, other frames `4000ms`, fade `650ms`.
- Required formats: responsive AVIF with WebP fallback; no original PNG in
  either public tree.
- Preserved invariants: existing square frame, gradients, H1, subtitle, tags,
  CTA destinations, route-specific wording, form and analytics.
- Accessibility: no autoplay under reduced motion; autoplay pauses in a hidden
  tab; the figure retains one descriptive accessible label.
- Required viewports: `390x844`, `767/768/769x900`, `1023/1024/1025x820`,
  `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
