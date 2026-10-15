# Public form privacy and consent

Updated: 2026-10-15. Scope: `corp.timurgromov.ru/` и `/novogodniy-korporativ/`.

## Implemented contract

- `/privacy/`: operator identity/contact, fields, purposes, recipients, analytics/storage, retention and deletion request.
- `/consent/`: separate document v2026-10-15; no advertising consent or automatic offer acceptance.
- `public/legal-consent.js` validates each form's checkbox in capture phase, including novalidate/custom submit; native required remains a second guard. `method=post` prevents default no-JS form values from appearing in the URL.
- Receipt is added through the FormData event for wedding forms, explicitly in callback/seasonal payloads otherwise. Existing CRM comment/details retains it; version and timestamp originate in the browser and are not server-attested. Backend code was read to confirm persistence, not modified. No claim of backend rejection for a direct request without consent.
- Wedding free text is limited to 2500 characters to leave room inside the existing 3000-character API limit.
- Footer navigation exists on the main wedding, Jubilee and both corporate routes. Old `/privacy/#consent` links retain a bridge to the new document.

## Data and services observed

Form-dependent name/phone/comment; event date/location/guests/team/company; wedding-material role/timing/location where that form is enabled. Submission uses the existing EventBudjet HTTPS API. Backend saves a CRM request then sends private operator alerts through Telegram/MAX. Yandex Metrika/Webvisor runs as before. GitHub Pages serves the public website. Attribution uses campaign/referrer information and browser storage; the main wedding first-touch record has a 30-day TTL. No statement that foreign services/localization/notifications have been legally verified.

## Follow-ups / owner facts

- [ ] Confirm published operator identity and public postal address, email for requests. Existing published identity/email reused; no address invented or personal address added.
- [ ] Verify applicable RKN operator notification and the legal basis/notifications for recipients and international processing.
- [ ] Implement a separately reviewed analytics/cookie choice if consent is the selected legal basis; the form checkbox must never be treated as permission for analytics or newsletters. Preserve Direct attribution through an explicitly reviewed design.
- [ ] If a stronger audit trail is required, add versioned immutable consent storage and server-side enforcement in the EventBudjet-owned task. Current frontend receipt is not that system.

## Checks

Build; source/built-HTML contracts; consent absent/present; synthetic 500 and 201 POST responses; responsive form/document review; production markers and assets after deploy. No live form submission is authorized by this task.

Legal source: [156-FZ article 5](https://www.consultant.ru/document/cons_doc_LAW_508287/1500545af6526db1dfa11aba44d4df42208a0b05/) (separate consent effective 2025-09-01); [152-FZ article 18.1](https://www.consultant.ru/document/cons_doc_LAW_61801/eeeebe22bf738fd65bb66b95cc278911ae2525ee/) (public policy).
