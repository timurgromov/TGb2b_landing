# Seasonal pricing: extension price inside every package card

The owner reported that the additional-hour amount was missing beside each
package price even though the rate is part of the approved date matrix.

The seasonal route now shows `Доп. час` in the same price zone as each of the
three five-hour package prices. The existing date selection updates all three
package prices and all three extension values together. The detached extension
rate above the cards was removed to avoid duplication. No price values, CRM
payloads, form behavior or ordinary corporate content changed.

Runtime source: `57831f1` on `astro-migration`. Static production: `2821e0d`
on `gh-pages`. The exact GitHub Pages build status is `built`. Local build,
`verify:seasonal`, staged UI evidence and the 320–1984 px responsive checks
passed. Fresh production verification confirmed 20 000 ₽ extension on
1 December and 25 000 ₽ on 25 December in every card, with no console errors
or horizontal overflow. No real form or messenger request was sent.
