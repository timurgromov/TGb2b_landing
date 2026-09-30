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
- `/` now has a seasonal promo, verified-letter cases and FAQ while keeping the approved shared design;
- seasonal route now has three service formats, three source-backed company cases, video captions and FAQ;
- package contract now starts with `Ведущий + DJ`; there is no `Только ведущий` option in the cards, FAQ, form or lead comment mapping;
- the three offered compositions are `Ведущий + DJ`, `Ведущий + DJ + звук` and `Ведущий + DJ + звук + кавер-группа` with two vocalists;
- the proof section now shows the three freshest available letters (`L1`, `L2`, `L11`) with consistent letter dates, larger document previews and a direct link to the full 13-letter archive;
- the full archive remains intact and starts with the same three freshest letters;
- all root modal forms use the same confirmed endpoint and no longer show success before HTTP `201`;
- automatic delayed popup has been disabled;
- messenger and phone clicks have explicit corporate goals.

## External boundary

The form uses the existing EventBudjet endpoint `POST https://calcul.timurgromov.ru/api/v1/site/consultation-request` with `form_source=site_meeting_corporate`. This repository does not own CRM persistence or notification behavior.

An actual production submission is intentionally not part of automated verification because it creates a real working lead. Until an authorized test is received in the work contour, end-to-end delivery remains `not_verified`.

## Release state

- local build: passed (`npm run build`);
- contract regression check: passed (`npm run verify:seasonal`);
- local visual verification: passed for 19 viewports from `390x844` through `1984x1046`, including `B-1/B/B+1` around `768`, `1024`, `1180` and `1280`;
- latest proof/package responsive check: passed for 13 viewports from `390x844` through `1984x1046`, including `767/768/769` and `1179/1180/1181`; horizontal overflow failures: `0`;
- latest interaction check: fresh proof opens `L1` in the shared lightbox; `Больше благодарственных писем` lands on `#letters`; no browser console warnings or errors;
- interaction verification: video playback, proof-letter lightbox, FAQ disclosure, confirmed-success preview and retryable-error preview passed without a real submission;
- responsive defect found and fixed: the workflow connector no longer creates `1200px` document width at the `1181px` boundary;
- runtime source commit: `6b3d77a` on local and `origin/astro-migration`;
- production commit: `1fd5c76` on `origin/gh-pages`;
- GitHub Pages build: `built`;
- live seasonal route: passed at `390x844` and `1280x720`; fresh proof dates and L1/L2/L11 order are visible, all 13 archive letters remain, the archive link and proof lightbox work, valid package cards/form options are published, no overflow or browser console errors;
- live root regression: original H1 and both hero actions preserved; the refreshed shared proof section is published;
- release assets and routes: root, seasonal, privacy, versioned CSS/JS, L1/L2/L11 and sitemap all returned HTTP `200`;
- production CRM lead: not verified without owner approval.

## YandexDirectGrowth handoff

The separate local campaign package is prepared in `../YandexDirectGrowth/` as `EXP-20260930-002` / `CMP-CORP-NY-2026-001`, state `LOCAL_DRAFT/OFF`. It contains five groups, 15 seed phrases, safe/conditional negatives, five creative sets, UTM and stop rules. No provider campaign, forecast, budget, funding, moderation or launch action occurred.
