# Current state

Дата: 2 октября 2026 года.

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
- `/` now has a seasonal promo while keeping the approved universal hero and CTA;
- both `/` and `/novogodniy-korporativ/` now render the same shared non-seasonal sequence: video, the five-stage `Как проходит корпоратив` guest flow, benefits, three service formats, the music-program offer, letter-backed cases, workflow, gallery, letters and FAQ;
- the four shared corporate case videos are delivered directly from `corporate-ground` on Aeza `open-blue` (`213.176.94.245`) rather than Boomstream; the owner-safe access path and upload protocol are in `docs/corporate-media-host.md`;
- the shared video block keeps only the heading `Тимур в работе`; unverified per-video headings and descriptions have been removed from both routes;
- `Как проходит корпоратив` is a shared component placed between video and benefits; it describes the guest experience and remains distinct from the customer-facing `Порядок работы` process;
- package contract now starts with `Ведущий + DJ`; there is no `Только ведущий` option in the cards, FAQ, form or lead comment mapping;
- the three offered compositions are `Ведущий + DJ`, `Ведущий + DJ + звук` and `Ведущий + DJ + звук + два вокалиста`; every next card explicitly repeats the included services rather than using an abstract `всё из базового состава`. The third card includes three 30-minute blocks with professional arrangements and explicitly states that the music part can be supplemented with saxophone or guitar;
- the proof section now shows four available letters (`L1`, `L2`, `L11`, `L3`) as self-contained event cases with a clickable document preview, company/date, event title and short source-backed extract;
- desktop uses the owner-requested `2 x 2` case grid; mobile shows the first three cases and keeps the `Все 13 писем` archive action visible;
- the technical proof subtitle has been removed from both `/` and `/novogodniy-korporativ/`; the shared heading remains `Корпоративы глазами заказчиков` without a year;
- `2026` has been removed from the public seasonal offer: seasonal H1/title/description/schema name, the `Декабрь` hero tag and the root seasonal promo are year-free; December 2026 form bounds and the internal CRM marker remain operationally unchanged;
- shared non-seasonal corporate improvements now have an implemented parity rule: benefits, packages, cases, letters, video and FAQ reach both routes through shared components and in the same order; seasonal hero/promo-context, copy, dates, CTA, form and future pricing remain route-specific;
- pricing remains unimplemented until the owner separately approves the New Year price matrix and the price-block layout;
- next implementation sequence is fixed in `TASKS.md`: the evening-flow and music-program blocks are complete; next comes pricing, the shared lead form, one authorized end-to-end production lead test, final QA and only then the Direct handoff;
- the original hero subtitle has been restored verbatim after an unapproved copy change;
- the original responsive package grid has been restored after the proof-section CSS edit accidentally removed its grid declaration;
- the proof-section direction follows the owner-supplied wedding case-card reference rather than repeating the archive as a list;
- the full archive remains intact and starts with `L1`, `L2`, `L11`, `L3`;
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
- latest proof/package responsive check: passed in one Codex in-app browser for 16 viewports from `390x844` through `1984x1046`, including `767/768/769`, `1023/1024/1025` and `1179/1180/1181`; horizontal overflow failures: `0`;
- current proof check: desktop renders four cases in two columns; mobile renders three cases in one column with a full-width archive action;
- shared-route subtitle-removal check: passed on both live routes at `1280x900`, `768x844` and `390x844`; the technical sentence and `.proof-cases__intro` are absent, archive action remains visible, horizontal overflow failures: `0`;
- year-free offer check: passed live at `1280x900` and `390x844`; seasonal H1/title are `Ведущий на новогодний корпоратив в Москве`, first hero tag is `Декабрь`, root promo exposes no year, both CTAs remain usable and horizontal overflow failures: `0`;
- restoration check: passed for the same 13-view matrix; the exact approved hero subtitle is present, packages render as `3` columns on desktop, `2+1` on tablet and `1` on mobile, with no horizontal overflow;
- shared-route parity check: passed live on `/` and `/novogodniy-korporativ/` at `1280x720` and `390x844`; each route has six benefits and the same three package cards, mobile cards are `359px`, horizontal overflow failures: `0`;
- package CTA check: root `Обсудить дату и состав` opens the existing contact modal; seasonal `Проверить дату и состав` lands on `#proverit-datu`; no form was submitted;
- shared evening-flow production check: passed on both routes at `390x844` and `1440x900`; each route renders five stages, horizontal overflow failures: `0`, browser console errors: `0`; the root CTA opens the contact modal and the seasonal CTA lands on `#proverit-datu`; no form was submitted;
- production cache delivery check: passed; both public routes return main stylesheet key `astro_12`, mobile stylesheet key `astro_5` and shared script key `astro_4`;
- latest interaction check: the first case opens `L1`, lightbox next opens `L2`, and `Все 13 писем` lands on the 13-item `#letters` archive; no browser console warnings or errors;
- interaction verification: video playback, proof-letter lightbox, FAQ disclosure, confirmed-success preview and retryable-error preview passed without a real submission;
- responsive defect found and fixed: the workflow connector no longer creates `1200px` document width at the `1181px` boundary;
- runtime source commit: `54e8631` on `origin/astro-migration`;
- production commit: `4a718cf` on `origin/gh-pages`;
- GitHub Pages build: `built`;
- live music-program block: published immediately after the shared package grid on both routes; it states three 30-minute blocks, lists the three real compositions, explains the backline boundary and keeps route-specific CTA behavior. It now includes the owner-provided, cropped maximum-line-up photo as an AVIF/WebP derivative; the source presentation's group name, account and contacts are not published. Seasonal passed live at `390x844` with the AVIF decoded at `1200x843` and rendered `357x250`; root passed live at `1280x720` with the AVIF decoded at `1200x843` and rendered `505x358`; no horizontal overflow or console errors. Local responsive sweep passed at `390`, `768`, `769`, `1180`, `1181`, `1366`, `1440` and `1984` CSS widths;
- live seasonal route: the case grid and shared evening-flow block passed with `style.css?v=astro_8`, `mobile.css?v=astro_3` and `script.js?v=astro_4`; mobile passed at `390x844` with three visible cases, one package column, five evening stages, no overflow and all 13 archive letters intact;
- live cumulative-package check: both routes publish the same three cards without descriptive paragraphs below their headings. The title zone reserves two lines on desktop, so all three lists begin on one baseline: `375px` on seasonal and `392px` on root at `1280x720`. The second card repeats the three base services and adds `Техническое оснащение площадки`; the third repeats all four, then adds three 30-minute music blocks with professional arrangements and the saxophone/guitar option. Seasonal passed at `1280x720` and `390x844`, root at `1280x720`; mobile cards are one column at `359px`, horizontal overflow failures: `0`, console errors: `0`. No real lead was submitted;
- live music-package linkage check: both routes now name the third card `С живой музыкой` and publish `Подробнее о живой музыке` as an anchor to `#music-program`. The target begins `Третий пакет — с живой музыкой`, clearly describes the third package and lists its configurations under `Состав третьего пакета`. The obsolete “not a separate concert” sentence and separate “бэклайн” explainer are not published. On seasonal, clicking the card link changed the URL to `#music-program`; root exposes the same shared markup. No real lead was submitted;
- live music-package value check: the third-card item explicitly says that two vocalists perform three 30-minute vocal blocks over professional arrangements. The detail copy explains the concrete cost boundary: vocals use the base sound set, so a full musician line-up, concert sound and backline are not separately paid for. Seasonal production returned the exact new copy; no real lead was submitted;
- refined live-music heading check: both public routes now serve `Эффект живой группы — без затрат на полный состав`; the retired headline is absent.
- live music-showreel playback: both shared routes publish the owner-supplied showreel from `https://media.213-176-94-245.sslip.io/corporate-ground/live-music-showreel.mp4`. On root at `1280x720` and seasonal at `390x844`, the existing image rendered as a poster with one Play control and no video before interaction; the explicit click replaced it with one native video (`readyState=4`, `paused=false`), without horizontal overflow or console errors. HTTPS range delivery returned `206 video/mp4`; no form was submitted.
- live showreel control refinement: the Play icon no longer overlaps the musicians' photograph. Both routes publish a compact outlined `Смотреть шоу-рил · 3:45` control immediately below the full poster; root passed at `1280x720` and seasonal at `390x844` with no overflow. On seasonal mobile, its explicit click hid the action and started one native video (`readyState=4`, `paused=false`), with no console errors.
- live showreel overlay refinement: the labelled `Смотреть шоу-рил · 3:45` action is centred 16px above the lower image edge on a dark translucent glass surface, restoring the music-summary card's even lower edge. Root passed at `1280x720`; seasonal passed at `390x844` with a 46px single-line control, no face covered, no overflow, no console errors and working native playback after click.
- self-hosted corporate-video check: both routes now contain the same four `https://media.213-176-94-245.sslip.io/corporate-ground/*.mp4` URLs and contain no Boomstream URL or SDK. The first video loaded and played on both routes with `readyState=4`, `paused=false` and no console errors; public range requests return `206 video/mp4`. The `corporate-ground` directory occupies `404M` on the VPS, which has `23G` free.
- unverified video-copy removal: live `/` at `1280x720` and live `/novogodniy-korporativ/` at `390x844` each render `Тимур в работе`, four playable video cards and zero `.video-case__copy` blocks; no horizontal overflow or console errors. The first root video played with `readyState=4` and `paused=false`.
- live root regression: original H1 and both hero actions are preserved; the same subtitle-free shared proof section is published and passed at desktop/mobile widths;
- release assets and routes: root, seasonal, privacy, versioned CSS/JS, L1/L2/L11/L3 and sitemap all returned HTTP `200`;
- browser/process cleanup: all standalone Playwright QA sessions and the local dev server were stopped after verification;
- production CRM lead: not verified without owner approval.

## YandexDirectGrowth handoff

The separate local campaign package is prepared in `../YandexDirectGrowth/` as `EXP-20260930-002` / `CMP-CORP-NY-2026-001`, state `LOCAL_DRAFT/OFF`. It contains five groups, 15 seed phrases, safe/conditional negatives, five creative sets, UTM and stop rules. No provider campaign, forecast, budget, funding, moderation or launch action occurred.
