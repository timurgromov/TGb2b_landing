# Hero numbered-photo correction — 2026-10-03

## Scope

- Corporate `/` and New Year `/novogodniy-korporativ/` hero slider only.
- Jubilee receives the same media set in its owning repository.

## Correction

- Restored the exact owner-selected order 1 through 5.
- Removed the alternate-background duplicate that occupied frame 3.
- Restored the missing grey-suit photo 4.
- Kept the already approved crops for sources 1, 2, 3 and 5; created only the
  missing square derivatives for source 4.
- Renamed frame IDs so the deterministic QA URL describes the actual source:
  `01-smile`, `02-microphone`, `03-full-length`, `04-grey-suit`, `05-gesture`.
- Original PNG files remain outside `public/`; delivery files are responsive
  AVIF/WebP derivatives at 640 and 1024 pixels.

## Local evidence

- `npm run build`: passed.
- `npm run verify:seasonal`: passed.
- All 20 delivery files have distinct per-frame hashes and stay below 116 KiB.
- Codex in-app browser at `1440x900` and `390x844`: all five deterministic
  frames visible in the expected order on both routes; non-zero square geometry,
  AVIF selected, horizontal overflow `0`, console warnings/errors `0`.
- No form was submitted.
