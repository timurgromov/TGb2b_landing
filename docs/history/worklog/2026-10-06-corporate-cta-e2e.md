# Corporate CTA production verification — 2026-10-06

## Intent

Verify the ordinary corporate and new-year forms end to end before handing the
landing surface to the separate paid-acquisition project.

## Context

Runtime source `8d27478` and static production commit `d17f71b` were already
published. Forms must only report success after EventBudjet returns HTTP `201`.

## Changes

No runtime code changed. Documentation now replaces the earlier
"not submitted" status with the verified production result.

## Verification

- `/` created synthetic CRM request `#153` with context
  `corporate / corporate / consultation / hero`; the success UI and matching
  authenticated `CRM заявки` Telegram alert were observed.
- `/novogodniy-korporativ/` created `#154` with context
  `corporate / new_year / date_check / seasonal_form`; the success UI and
  matching Telegram alert were observed.
- The live page loaded Metrika counter `104468814` and `cta-analytics.js`
  without browser console errors. After provider processing, goal `670110144`
  (`Подтверждённая заявка`) reports one goal visit and one reach on 6 October.
  The two tests used one browser session, so this is confirmation of the
  session-level successful conversion, not one reach per CRM card.

## Result

Both corporate routes can be used as advertising destinations: separate CRM
sources, Telegram alerts and post-`201` goal tracking are live.

## Risks / Follow-up

- `#153` and `#154` remain explicitly marked test records until the owner
  instructs their deletion.
- Paid UTM/`yclid`, referrer and deduplication are not inferred from these
  direct synthetic visits. Validate them during the campaign preflight in
  `YandexDirectGrowth` before any launch.
- Prices and response SLA still require owner decisions.

## Links

- `../../../TASKS.md`
- `../CURRENT_STATE.md`
- `../../../../YandexDirectGrowth/campaigns/structure/corporate-newyear-search-2026-draft.md`
