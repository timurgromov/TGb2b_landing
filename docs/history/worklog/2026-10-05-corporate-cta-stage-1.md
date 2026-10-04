# Corporate CTA stage 1 — 2026-10-05

Owner request: make contact choices clear on both corporate routes before changing CRM sources, Metrika goals or advertising.

Implementation: shared `ContactChoice` panel and `MaterialsRequest` card; sticky control after the first screen; direct personal Telegram and visible `tel:` number; existing callback and video forms retained; `materials_request` passed into the existing lead comment. Removed the unused checklist popup. The seasonal date-check anchor and header WhatsApp remain.

Verification: `npm run build`, `npm run verify:seasonal`, local mobile/desktop CTA interaction and responsive checks, plus simulated success and failure states of the existing form. No live lead was sent. Public `t.me/timurgromovv` resolves to Timur's profile; the native deep-link transition was blocked by browser policy.

Next: stage 2 must define distinct CRM sources and Metrika goals, then verify an approved real lead and attribution separately. Opening Telegram alone is not a CRM application.
