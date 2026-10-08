# Seasonal date form and year-round price floor

## Report and cause

The owner entered 13 November 2026 with all visible fields filled. The page responded with `Проверьте обязательные поля.` The live browser showed `rangeUnderflow=true` and `Минимальное значение должно быть 01.12.2026.` for the date input. The acceptance test had covered December and preview states but had not submitted a non-December date. The iPhone screenshot also showed the native date control extending beyond its intended column and the floating contact button covering lower form content.

## Product decision

Future dates in any month can be requested. Outside December 2026 the five-hour starting prices are 145 000 ₽, 170 000 ₽ and from 320 000 ₽. The December 2026 matrix keeps date-specific premiums with no row below 145 000 ₽. The extra hour is 20 000 ₽ in ordinary/cheap days, 25 000 ₽ on premium December days and 35 000 ₽ on 31 December. The ordinary corporate route and jubilee route are outside this change.

## Implementation and local checks

- The form and pricing picker no longer constrain input to December 2026. The form explicitly rejects past dates and provides field-specific errors. The CRM comment records the selected date, five-hour price, six-hour calculation and extension rate when a public quote exists.
- The date control has explicit `min-width`, `max-width` and WebKit intrinsic-width reset. The floating contact control hides while `#proverit-datu` intersects the viewport.
- `npm run build`, `npm run verify:seasonal`, `node --check` for affected JavaScript, and `git diff --check` passed.
- A live candidate in the in-app browser passed the 12-width form geometry sweep, mobile visual inspection and the November/December/2027 price examples. A local-only POST substitute returned 201 and 500 to confirm the distinct success and error UI states. No production lead was submitted by local QA.

## Release

Pending source/static commits and production verification.
