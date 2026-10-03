# UI change contract — first hero portrait headroom

- Change ID: `2026-10-03-hero-smile-headroom`.
- Routes: `/` and `/novogodniy-korporativ/`.
- Exact target: active slide `01-smile`, selected through
  `?hero-slide=01-smile`.
- Reported viewport: mobile screenshot; reproduce at the exact CSS viewport
  `390x844` and also inspect desktop at `1440x900`.
- Baseline: source crop `top=150`; the hair has only a small visual gap from the
  upper edge and reads as attached to the frame.
- Expected delta: source crop `top=95`; the full head remains large while the
  upper gap becomes deliberate on mobile and desktop.
- Preserved invariants: square Hero geometry, all copy and CTA, the five-frame
  order, frames `02`–`05`, autoplay and route-specific context.
- Required responsive probes: `390x844`, `767/768/769x900`, `1180x820`,
  `1366x768`, `1440x900`, `1984x1046`.
- Acceptance: the exact slide is active after a fresh load, the current source
  is the versioned AVIF derivative, the complete head has balanced upper
  breathing space, `scrollWidth === innerWidth`, and console errors are empty.
