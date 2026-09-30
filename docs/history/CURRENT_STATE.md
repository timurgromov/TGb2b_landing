# Current state

Дата: 30 сентября 2026 года.

## Source

- repository: `TGb2b_landing`;
- active source branch: `astro-migration`;
- production branch: `gh-pages`;
- framework: Astro, static output;
- production domain: `https://corp.timurgromov.ru/`.

## New Year 2026 landing

Implemented locally:

- `/novogodniy-korporativ/` built from the main site's existing Header, hero, video, benefits, workflow, gallery, letters, footer and modal components, with only seasonal copy and a qualified date-check form changed;
- `/privacy/` with policy and consent text;
- confirmed-lead goal fires only after backend HTTP `201`;
- UTM, `yclid` and bounded Direct parameters are transmitted separately from the sanitized page URL;
- local validation/error/success states and responsive matrix have been checked;
- `/` keeps its existing design and primary hero actions.

## External boundary

The form uses the existing EventBudjet endpoint `POST https://calcul.timurgromov.ru/api/v1/site/consultation-request` with `form_source=site_meeting_corporate`. This repository does not own CRM persistence or notification behavior.

An actual production submission is intentionally not part of automated verification because it creates a real working lead. Until an authorized test is received in the work contour, end-to-end delivery remains `not_verified`.

## Release state

- local build: passed (`npm run build`);
- contract regression check: passed (`npm run verify:seasonal`);
- local visual verification: passed for the recorded responsive matrix, form states and root regression;
- runtime source commit: `c3ff86d` on local and `origin/astro-migration`;
- production commit: `e0abc6c` on `origin/gh-pages`;
- GitHub Pages build: `built`;
- live seasonal route: passed at `390x844` and `1280x720`, with no horizontal overflow or browser console errors;
- live root regression: original H1 and both hero actions preserved at `1280x720`;
- production CRM lead: not verified without owner approval.
