# UI change contract — three music blocks

- Change ID: `2026-10-01-three-music-blocks`
- Requested visible change: third package must state the real offer immediately: three sets of three songs, two vocalists as the base, with saxophone and guitar as optional expansions.
- Surface: `/` and `/novogodniy-korporativ/`.
- User state / fixture: public landing; the third card in `#formats`; on the seasonal route, the package select in `#proverit-datu`.
- Exact target: `#formats .service-format:nth-child(3)` and `select[name="equipment_needed"]`.
- Action to reveal target: scroll to `#formats`; on the seasonal route open the native select without submitting the form.
- Required CSS viewports: `390x844`, `1280x720`, `1366x768`.
- Baseline visible signature: the card says `музыкальное шоу`, assumes two vocalists and a saxophonist, and the seasonal select exposes only that single premium configuration.
- Expected visible signature: the card says `3 музыкальных блока`, explains `три выхода по три песни`, and names the three configurations: two vocalists; two vocalists plus saxophone; two vocalists plus saxophone and guitar.
- Must remain unchanged: existing dark design system, first two package cards, package CTA behavior, no public prices, and route-specific form destination.
- Attempt number: `1`.

Acceptance: the exact composition and number of musical exits are readable directly in the third package on both routes; the seasonal lead form passes the chosen configuration unchanged to the existing lead contract.
