# UI change contract — corporate hero mobile crop correction

- Change ID: `2026-10-03-hero-mobile-crop-correction`.
- Surfaces: `/` and `/novogodniy-korporativ/`; shared `HeroPortraitSlider`.
- User state: public anonymous visitor at the first screen.
- Exact target: `[data-hero-slider]`; deterministic state via
  `?hero-slide=<data-slide-id>`.
- Baseline evidence: owner-provided mobile screenshots of slides
  `02-microphone`, `03-full-length`, `04-grey-suit` and `05-gesture`.
- Requested visible delta:
  - `02-microphone`: raise Timur slightly inside the square;
  - `03-full-length`: add a small top breathing space;
  - `04-grey-suit`: restore the complete hair/head silhouette;
  - `05-gesture`: add a small top breathing space.
- Selected source crop windows, all from the original 1024px-wide portraits:
  `top=295`, `top=165`, `top=100`, `top=135` respectively.
- Preserved invariants: slide `01-smile`, slide order, square Hero geometry,
  H1/subtitle/tags/CTA, `4500ms` first-frame and `4000ms` following-frame
  timing, dissolve behavior and desktop layout.
- Delivery contract: responsive AVIF/WebP derivatives only; original PNG files
  stay outside `public/`. Changed asset URLs receive a cache-busting version.
- Affected responsive boundary: the shared Hero switches composition at
  `768px`; verify `767/768/769` in addition to core anchors.
- Required viewports: `375x812`, `390x844`, `430x932`, `767/768/769x900`,
  `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Acceptance: every named slide is selected deterministically after a fresh
  load, the requested headroom is visibly present, image and H1 do not overlap
  incorrectly, `scrollWidth === innerWidth`, and the browser console has no
  errors.
