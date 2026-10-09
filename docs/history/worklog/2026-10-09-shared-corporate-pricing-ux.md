# Shared corporate pricing UX

Date: 2026-10-09

The ordinary corporate and New Year routes now share the same date-first pricing component and detailed lead form. The interaction pattern is also the required reference for `/yubiley/`: date action, three compact cards, extension beside the main price, in-card package disclosure and the common contact panel.

Route differences are limited to event wording, structured CRM source and approved prices. The ordinary route uses the year-round floor outside December 2026 and the existing seasonal matrix during December. The New Year route keeps its seasonal context and source.

The popup eyebrow was reduced to `ТИМУР ГРОМОВ`, the punctuation copy was corrected and the live-music options now place `два вокалиста` before `3 блока по 30 минут`.

Release:

- source: `711ca44` on `origin/astro-migration`;
- production: `b49e056` on `origin/gh-pages`, Pages status `built`;
- checks: build, `verify:seasonal`, JavaScript syntax, source diff check and fresh production checks at mobile and desktop widths;
- no production form or messenger request was sent.
