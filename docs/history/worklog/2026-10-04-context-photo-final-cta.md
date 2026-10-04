# 2026-10-04 — move the second corporate context photo to the final CTA

## Scope

- Corporate `/` and `/novogodniy-korporativ/` only share the moved block.
- The Jubilee route was inspected separately. Its sole equivalent image is
  part of its event-flow section, so moving it would remove supporting visual
  context rather than reduce duplication.

## Change

- Removed `ContextPhoto` from directly before the package cards on both
  corporate routes.
- Inserted the unchanged component directly after FAQ and before each route’s
  final conversion CTA.
- Added build-time ordering checks so benefits lead directly into packages and
  FAQ leads into the photo and final CTA.

## Candidate verification

- `npm run build`, `npm run verify:seasonal` and `git diff --check` passed.
- In-app-browser matrix on both corporate routes at `390x844`, `767x900`,
  `768x900`, `769x900`, `1024x768` and `1440x900` confirmed the required DOM
  order, decoded AVIF, expected crop mode, visible final CTA and zero
  horizontal overflow.
- Visual review at mobile and desktop confirms that the picture now creates a
  calm transition from FAQ into the final ask rather than interrupting the
  package comparison.
- No form was submitted.

## Release

- Pending commit, push, production deployment and fresh live verification.
