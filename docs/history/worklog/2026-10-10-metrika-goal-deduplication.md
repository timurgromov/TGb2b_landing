# Corporate Metrika goal deduplication — 2026-10-10

## Problem

The corporate and New Year form handlers emitted both the former
`corporate_lead_submit_success` event and the canonical
`lead_submit_success` event after one HTTP `201`. The live Metrika condition
uses `contains lead_submit_success`, so both calls could match one goal.

## Change

- Removed the duplicate legacy success event from both corporate routes.
- Removed redundant legacy form-start and form-error calls.
- Preserved canonical `form_start`, `lead_submit_success` and
  `lead_submit_error`, plus popup-specific diagnostic events.
- Strengthened `verify:seasonal` so the legacy duplicate cannot return.

## Verification and release

- `npm run build`: pass.
- `npm run verify:seasonal`: pass.
- JavaScript syntax and `git diff --check`: pass.
- Source `6191375` is pushed to `origin/astro-migration`.
- Production `76e1504` is pushed to `origin/gh-pages`.
- Fresh live source check: zero legacy success calls; one canonical success
  call in the New Year handler and the expected two independent form handlers
  on the ordinary corporate route.
- `/`, `/novogodniy-korporativ/` and `/privacy/` returned HTTP `200`.

No real lead was submitted for this regression check.
