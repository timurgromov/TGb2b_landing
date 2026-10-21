# UI change contract — Ростсельмаш

- Change ID: `2026-10-21-rostselmash-letter`
- Requested visible change: новое письмо первым в архиве и первый короткий кейс с его выжимкой.
- Surface: `/` and `/novogodniy-korporativ/`, shared `#proof-cases` and `#letters`.
- User state: public page; no form submission.
- Exact target: first `.proof-case-card` and first `#letters .letter-card`.
- Action: scroll to cases, open its letter; follow archive link, open first letter.
- Baseline at 1280×720: cases Раймед Групп, Экоразвитие-МО, Т Плюс, НПФ «Экопром»; 13 archive letters, first L1.webp; no horizontal overflow.
- Expected: Ростсельмаш first case and first letter, archive 14 letters, old Экопром removed only from short cases but retained in archive.
- Must remain unchanged: total four short cases, existing other three cases and letters, shared route layout, modal interactions and primary CTA.
- Required viewports: 1280×720 and 390×844 on both routes.
- Attempt number: 1.

Acceptance: inspect the served candidate after the last edit and the fresh production pages at both viewports; confirm new first letter and modal full image, no overflow or console errors.
