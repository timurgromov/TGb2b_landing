# Evening-flow photo headroom correction contract

- Change ID: `2026-10-03-evening-flow-photo-headroom`
- Reported defect: on desktop the central subject's hair and top of head are
  clipped by the upper edge of the wide corporate photo.
- Exact target: `#evening-flow .evening-flow__media img` on `/` and
  `/novogodniy-korporativ/`.
- Baseline signature: desktop `object-position: 50% 25%`; the crop removes the
  original upper safe area and visibly clips the central head.
- Expected signature: the same image and container remain, but every standing
  subject's complete head and visible breathing space above the hair remain in
  frame.
- Bounded change: move only the desktop focal position upward; the mobile
  `3:2` full-frame rule remains unchanged.
- Required viewports: `390x844`, `767x900`, `768x900`, `769x900`, `1179x900`,
  `1180x900`, `1181x900`, `1366x768`, `1440x900`, `1984x1046`.
- Preserved: image files and derivatives, container width/height, border,
  radius, five stage cards, route-specific CTA behavior and adjacent sections.
