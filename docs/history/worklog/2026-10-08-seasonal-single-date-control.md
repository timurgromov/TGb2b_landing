# Seasonal pricing: one date action above the cards

The owner reported that the native date field overflowed on mobile and that
the lower date button and per-card calendar icons made the next step unclear.

The seasonal route now has one explicit date action before the three cards.
It uses the native date picker, while the chosen day and weekday appear inside
each price card. The extension quote is shared, the equipment qualification
is in the relevant disclosures, and the lower action leads to the existing
availability form without a second date-selection step.

Runtime source: `ca84303` on `astro-migration`. Static production: `be2e101`
on `gh-pages`. GitHub Pages build status: `built`. Local build, seasonal
contract, JavaScript syntax, staged UI evidence and a seven-width viewport
matrix passed. Fresh live 320/390/1440 checks confirmed the action fits,
25 and 31 December prices are correct, the native picker opens, form date
sync works, and browser console errors and horizontal overflow are absent.
No real form or messenger request was sent.
