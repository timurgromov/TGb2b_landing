# Package contact CTA — 2026-10-09

## Scope

The ordinary corporate and New Year routes use one fast contact flow. The
detailed six-field date form is no longer rendered. Prices and date matrices
remain unchanged.

## UX

- Every pricing card has `Обсудить этот вариант`.
- The shared contact panel shows the chosen package, selected date, displayed
  price and extension rate.
- The panel offers the attributed Telegram bot, a phone call and a two-field
  callback form.
- Generic header, sticky and final CTAs open the same panel without a package.
- Callback success is shown only after HTTP `201`; local success/error preview
  states do not create a production request.

## Verification

- `npm run build` passed.
- `npm run verify:seasonal` passed for both routes.
- The in-app browser verified ordinary corporate and New Year package panels
  on desktop and 390x844 mobile, including a dated New Year package and local
  HTTP 201/error states.
- No production lead was created during candidate UI verification.
