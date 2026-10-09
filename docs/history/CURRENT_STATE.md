# Current state

## 29–30 December price correction — live (2026-10-09)

- Only `/novogodniy-korporativ/` changes. The 29–30 December host + DJ price is now 210 000 ₽ and the package with equipment is 240 000 ₽. The musical-composition addon remains 250 000 ₽, so the complete third package is now from 490 000 ₽. The additional hour remains 25 000 ₽.
- Source commit `12a2876` is pushed to `astro-migration`; static commit `131f91c` is pushed to `gh-pages`, and GitHub Pages reports that exact build as `built`.
- Local `npm run build`, `npm run verify:seasonal`, staged UI-evidence validation and `git diff --check` passed. The pricing panel passed 390, 767–769, 896, 1023–1025, 1366, 1440 and 1984 CSS px without horizontal overflow or console errors.
- Fresh production verification selected both 29 and 30 December and confirmed 210 000 / 240 000 / from 490 000 ₽ in the three cards, 25 000 ₽ in the additional-hour field, the same values in the expanded matrix and synchronization into the detailed form. No form was submitted.

## Date-indexed musical composition — live (2026-10-09)

- Only `/novogodniy-korporativ/` changes. Host, DJ, equipment and extension prices remain unchanged. The third package now uses a separate provisional musical-composition rate for each December range instead of adding the same 150 000 ₽ to every date.
- The composition rate is 150 000 ₽ on 1–3 and 6 December, 160 000 ₽ on 7–10, 170 000 ₽ on 4–5 and 13, 190 000 ₽ on 11–12 and 14–17, 200 000 ₽ on 20, 220 000 ₽ on 18–19, 21–24 and 27–28, 250 000 ₽ on 25–26 and 29–30, and 300 000 ₽ on 31 December.
- Source commit `b0a39c8` is pushed to `astro-migration`; static commit `3d446d7` is pushed to `gh-pages`, and the exact GitHub Pages build reports `built`.
- The detailed matrix now has 14 rows and shows the complete third-package price. Local rendered checks produced 320 000 ₽ on 1 December, 350 000 ₽ on 4 December, 500 000 ₽ on 25 December, 470 000 ₽ on 29–30 December and 630 000 ₽ on 31 December. The expanded matrix fit 320, 390, 767, 768, 1024, 1025 and 1440 CSS px without horizontal overflow or console errors.
- Fresh production verification confirmed script `20261009a`, all five representative totals and the unchanged host/equipment/extension values. At 390 CSS px, 29 December showed 190 000 / 220 000 / from 470 000 ₽; the expanded 14-row matrix remained within the viewport and the console had no errors. No form or messenger request was sent.

## Per-card extension price — live (2026-10-08)

- On `/novogodniy-korporativ/`, each of the three price cards now places `Доп. час` beside its five-hour price. The top picker only explains that displayed package prices cover up to five hours and no longer carries a detached extension rate.
- The three extension values use the existing date quote: from 20 000 ₽ before a date or outside December 2026, 20 000 ₽ on ordinary December dates, 25 000 ₽ on premium dates and 35 000 ₽ on 31 December. No pricing values or CRM calculation rules changed.
- Source commit `57831f1` is pushed to `astro-migration`; static commit `2821e0d` is pushed to `gh-pages`, and the exact GitHub Pages build reports `built`.
- Local build and `verify:seasonal` pass. The final responsive gate passed 390, 767–769, 896, 1023–1025, 1366, 1440 and 1984 CSS px without horizontal overflow or console errors. Local rendered checks at 320 and 390 px kept price and extension inside every card; 1440 px kept three equal columns.
- Fresh production verification confirmed the new `20261008g` stylesheet, three per-card extension outputs and no detached top rate. Selecting 1 December produced 145 000 / 170 000 / from 320 000 ₽ with 20 000 ₽ extension in every card; selecting 25 December produced 220 000 / 250 000 / from 400 000 ₽ with 25 000 ₽ extension in every card. All rows stayed inside their cards, with no horizontal overflow or console errors. No lead was submitted.

## Seasonal form and year-round floor — live (2026-10-08)

- The reported 13 November 2026 submission failed because the seasonal form's native date input had a hidden `2026-12-01` minimum. The former generic error hid the actual reason. The form and package date picker now accept any future date; past dates and invalid phone numbers have specific visible errors. Success remains gated on backend HTTP `201`.
- The owner set the five-hour minimum to 145 000 ₽ for host + DJ, 170 000 ₽ with equipment and from 320 000 ₽ with vocalists. Outside December 2026 these are year-round starting prices, including 2027. December 2026 now has 13 ranges: first-week weekdays stay at 145 000 ₽, ordinary Friday/Saturday starts at 155 000 ₽, then weekday and Friday/Saturday prices rise separately; 25–26 December is 220 000 ₽, and 31 December is from 280 000 ₽. A standard extra hour starts at 20 000 ₽; premium December dates use 25 000 ₽ and 31 December uses 35 000 ₽. Thus the base host + DJ package is from 165 000 ₽ for six hours.
- Mobile form controls now have explicit intrinsic-width limits. The sticky contact button hides while the detailed form is in view so it cannot cover fields or the submit action. The ordinary corporate route retains its existing content and no pricing panel was added there.
- Local build, seasonal contract and JavaScript syntax pass. Browser checks at 320, 375, 390, 767, 768, 769, 1023, 1024, 1025, 1366, 1440 and 1984 CSS px showed every form control inside the card, no horizontal overflow, and no sticky overlay on the detailed form. In a local server with the external POST replaced by a mock, the same November form showed success after HTTP 201 and stayed open with an error after HTTP 500. No real CRM lead was created by this candidate check.
- Source commits `99877b9` and `e934253` are on `origin/astro-migration`; static commit `6250bca` is on `origin/gh-pages` and GitHub Pages reported `built` for that exact commit. Fresh live `390x844` showed 13 price rows, no horizontal overflow, the November date valid and synced into the detailed form, form controls within the card, and the floating contact control hidden while the form is in view. Live prices for 4/18/25/31 December matched 155/200/220/from 280 thousand rubles for host + DJ, respectively. The ordinary corporate route has no seasonal pricing and no browser console errors. A production lead was not submitted in this release check; backend HTTP `201` and `500` UI states were verified against the local substitute.

## Seasonal single date control — prior release snapshot (2026-10-08)

- Only `/novogodniy-korporativ/` changed. One visible `Выбрать дату` action now
  sits above the three prices. The native date input remains under that action,
  opens the system picker, and no longer overflows the mobile panel. The three
  card calendars and the lower duplicate date button are removed.
- Before a date is chosen, the panel explains that the December minimums are
  shown. After selection, each card shows the day and weekday above its updated
  price; the top action becomes `Изменить дату`. The extension price is shown
  once beside the five-hour programme explanation. The equipment qualification
  sits inside the two relevant package disclosures.
- Source runtime `ca84303` is on `origin/astro-migration`; static output
  `be2e101` is on `origin/gh-pages`, and GitHub Pages reports `built` for that
  exact production commit. Local `build`, `verify:seasonal`, syntax and staged
  UI-evidence checks passed. Fresh live checks at `320x844`, `390x844`, and
  `1440x900` found no horizontal overflow or console errors. Selecting
  25 December showed `220 000 / 250 000 / от 400 000 ₽` and extension
  `25 000 ₽`; 31 December showed `от 280 000 / от 330 000 / от 480 000 ₽`
  and extension `35 000 ₽`. The selected date reached the existing form; no
  real form was submitted. The ordinary corporate page still has no seasonal
  pricing block.
- Release note: `docs/history/worklog/2026-10-08-seasonal-single-date-control.md`.

## Seasonal date pricing — prior release snapshot (2026-10-08)

- Только `/novogodniy-korporativ/` получил выбор декабрьской даты, цены трёх
  составов, ставку дополнительного часа и раскрываемую клиентскую матрицу из
  14 диапазонов. Обычный корпоративный `/` и юбилейный маршрут не изменены.
- Программа рассчитана до 5 часов. Два фиксированных пакета показывают цену
  выбранной даты; музыкальный пакет показывает `от` и добавляет минимум
  `150 000 ₽` к варианту с оборудованием. На 31 декабря все пакеты показывают
  `от`.
- Выбранная дата переносится в подробную форму; состав выбирается один раз уже
  в самой форме. В ценовых карточках нет кнопок выбора и отдельного состояния
  выбранного пакета: после ввода даты все три суммы появляются сразу. При
  отправке формы публичный ориентир и ставка продления добавляются в комментарий заявки;
  success по-прежнему возможен только после backend HTTP `201`.
- Ценовой блок собран в одну панель. До выбора даты три карточки показывают
  минимальные декабрьские цены `от 135 000 / 160 000 / 310 000 ₽` и одну
  общую ставку допчаса `от 20 000 ₽`. Кнопка выбора даты находится над
  карточками; дата пересчитывает все три варианта одновременно.
- Состав каждого пакета раскрывается внутри собственной карточки через
  `Что входит`; отдельного общего disclosure с повтором трёх пакетов больше
  нет. До `1024px` карточки идут в один столбец, с `1025px` — в три колонки.
  Полная матрица на 14 диапазонов остаётся отдельным disclosure.
- Runtime source commit `9f4dc60` опубликован на `astro-migration`; static
  production commit `ba03bd8` опубликован на `gh-pages`.
- Local build, `verify:seasonal`, JavaScript syntax, diff check и UI-evidence
  validation прошли. Fresh production QA подтвердил на `390x844` и
  `1440x900` цены 25 декабря `220 000 / 250 000 / от 400 000 ₽`, продление
  `25 000 ₽`; 31 декабря `от 280 000 / от 330 000 / от 480 000 ₽`, продление
  `35 000 ₽`; 14 строк, отсутствие overflow и console errors. На `/` ценового
  блока нет. После удаления лишнего выбора повторный fresh QA на `390x844` и
  `1440x900` подтвердил `0` кнопок, автоматические цены, перенос даты в форму
  и пустое поле состава до выбора в форме. Реальная форма не отправлялась.
- На предыдущем выпуске fresh production QA на `320x844`, `390x844` и
  `1440x900` подтвердил стартовые цены `от`, три календаря, независимые
  раскрытия составов на `3 / 4 / 6` пунктов и точные значения на 25 декабря
  `220 000 / 250 000 / от 400 000 ₽`, допчас `25 000 ₽`. Пересечений,
  overflow и console errors нет. Матрица содержит 14 строк, дата переносится
  в форму без отправки. Обычный `/` не загружает сезонный калькулятор.
- Release note:
  `docs/history/worklog/2026-10-08-seasonal-inline-package-details.md`.

## «Калькулятор мероприятий» — live (2026-10-07)

- Source `e64f869` is pushed to `astro-migration`; static production
  `14f5020` is live on `gh-pages` for corporate and New Year routes.
- Both routes use the Russian product name and stable EventBudjet messenger
  redirects. Active source no longer embeds the legacy bot username.
- Authorized Telegram corporate/New Year entries and the authorized MAX
  corporate entry reached CRM with their exact sources. Event flows do not
  expose a personal messenger CTA.
- Metrika goal `670525250` in counter `104468814` is now named
  `Старт Калькулятора мероприятий офлайн`; its ID, `action` type and exact
  `order_confirmed` condition are unchanged.
- Release note:
  `docs/history/worklog/2026-10-07-event-calculator-rebrand-final.md`.

## Contact CTA and Event Calculator — live (2026-10-07)

- The shared corporate and New Year header now uses a white-text `Связаться`
  button instead of WhatsApp. It opens the same contact panel as in-page CTAs;
  the labelled sticky button appears only after the first screen. The New Year
  hero says `Обсудить корпоратив` and `Назначить встречу`; the detailed
  `Проверить дату` form remains lower on the page. Phone controls use `tel:`.
- Runtime source `0a4ee13` was pushed on `astro-migration`; static production
  `32091cf` was built on `gh-pages`. Local build, `verify:seasonal` and UI
  evidence validation passed. Fresh live mobile checks on both routes and a
  desktop check on New Year confirm the header, panel, bot source, phone,
  white labels and no horizontal overflow or JavaScript console errors.
- EventBudjet backend `3f90b24` is deployed. Its source registry recognizes
  `header` and maps both corporate routes to counter `104468814`.
- A live New Year materials bot start previously created CRM `#155`, sent an
  operator alert and uploaded an offline conversion. A fresh normal corporate
  header start in the authorized native Telegram client created lead `55` /
  CRM `#158`; the matching `CRM заявки` alert is visible and logged as `sent`.
  Attribution `888` was accepted by counter `104468814` as `order_confirmed`,
  has provider upload ID `1214978805`, one attempt and no error. The bot showed
  the corporate reply without the persistent wedding keyboard/Web App menu.
  Matching to a real paid Direct visit remains part of campaign preflight.

- Shared corporate and new-year contact panels use Event Calculator as their
  only Telegram action; the contact page also enters the bot.
- Every bot CTA sends route and placement in its source. `ClientID` or
  `yclid` gets a server-issued `yd_...` token; when attribution is unavailable,
  the source-bearing deep link still opens the bot. Forms still require HTTP 201.
- Metrika `104468814`: `order_confirmed` goal `670525250`. The temporary
  personal-click goal `670526622` was deleted; API read-back excludes it.
- Prices and Direct campaigns are unchanged.

Дата: 8 октября 2026 года.

## CTA stages 2–3 — live (2026-10-06)

- Corporate and new-year forms pass `site`, `page`, `intent` and `placement`
  with their existing attribution bundle to the EventBudjet callback endpoint.
  The form only reports success after HTTP `201`.
- The corporate Metrika counter `104468814` has the seven JS goals
  `cta_open`, `telegram_click`, `phone_click`, `form_start`,
  `lead_submit_success`, `lead_submit_error`, `materials_request`. Events
  contain only the bounded CTA context, never name, phone or comment.
- Local `build`, `verify:seasonal` and JavaScript syntax checks pass. Source
  commit `8d27478` is pushed; static production commit `d17f71b` is live on
  `gh-pages`.
- Owner-authorized synthetic forms proved both live routes end to end:
  corporate `/` created CRM `#153` (`corporate / corporate / consultation /
  hero`); new-year `/novogodniy-korporativ/` created `#154` (`corporate /
  new_year / date_check / seasonal_form`). Both UI flows showed success after
  HTTP `201`, both records have their readable source and full CTA context, and
  both matching messages appeared in authenticated `CRM заявки` Telegram.
  The cards are explicitly marked as tests and remain in CRM until a separate
  owner deletion instruction.
- Live page inspection confirms `104468814`'s Metrika tag and
  `cta-analytics.js` load without console errors. After processing, the
  provider report for goal `670110144` (`Подтверждённая заявка`) reports one
  goal visit and one reach on 2026-10-06. Both corporate forms ran from one
  browser session, so this proves the goal for the successful session rather
  than assigning the aggregate reach to `#153` or `#154` individually.
  UTM/`yclid`, referrer and paid-click attribution remain a separate campaign
  preflight in `YandexDirectGrowth`.

## CTA stage 1 — corporate and seasonal

- Both routes use one contact-choice component. The labelled sticky control appears after the first screen; contact CTAs open Telegram, phone, and the existing callback form. The seasonal detailed `Проверить дату` form remains. The header WhatsApp mentioned in the original stage-1 release was replaced by `Связаться` on 2026-10-07.
- A shared materials-request card follows `Порядок работы`. Choosing the callback form writes `materials_request` to the existing lead comment. The obsolete checklist preview popup is removed. No new CRM source, Metrika goal, or ad campaign was added.
- Local build, seasonal contract, mock HTTP-201/error form states, and the responsive matrix passed. The personal Telegram public profile resolves to `Timur Gromov @timurgromovv`; the `tg://` transition into the authenticated native app was blocked by browser policy and is not claimed as verified.

## Source

- repository: `TGb2b_landing`;
- active source branch: `astro-migration`;
- production branch: `gh-pages`;
- framework: Astro, static output;
- production domain: `https://corp.timurgromov.ru/`.

## Context-photo relocation live

- On `/` and `/novogodniy-korporativ/`, the second solo event photograph is
  now after FAQ and immediately before the final CTA. Packages now begin
  immediately after the benefits section.
- The asset and crop rules are unchanged: `contain` preserves the complete
  2:1 frame through `768px`; desktop retains the existing `cover` composition
  at `50% 18%`.
- Jubilee was inspected independently and retains its one event-flow image
  after its five stages. It has no second comparable photograph to move.
- Local build, contract checks, a six-viewport in-app-browser sweep per
  corporate route and desktop/mobile visual review passed.
- Runtime source commit `cf70dfb` is published as production commit `86152a6`.
  Fresh production checks on both corporate routes at `390x844`, `768x900`,
  `769x900` and `1440x900` confirm the new order, expected crop contract,
  decoded AVIF, final CTA and zero horizontal overflow or console errors. No
  form was submitted.
- Fresh Jubilee production check at `390x844` confirms its one flow photo
  remains inside `#evening-flow`, before that section's CTA; there is no
  duplicate context image, overflow or console error.

## Expanded pre-packages photo live

- On both `/` and `/novogodniy-korporativ/`, the owner-supplied expanded
  photograph is placed after the benefits CTA and immediately before the three
  package cards.
- The photo keeps the existing outer container. Desktop shows the wider sharp
  frame over a subdued backdrop from the same image; mobile uses the full `3:2`
  frame, so more of the subject is visible without changing the section width.
- The former standalone photograph between `Порядок работы` and `Моменты с
  событий` is removed completely; the gallery now follows the workflow section
  directly.
- The original remains outside `public/`. Responsive `768/1536` AVIF/WebP
  derivatives are between `25 KiB` and `71 KiB`.
- Local build, seasonal contract, diff check and UI-evidence validation passed.
  The complete local two-route matrix passed at `390`, `768`, `769`, `1024`,
  `1180`, `1440` and `1984` CSS widths with horizontal overflow `0`.
- Fresh production checks passed on both routes at `1440x900` and `390x844`:
  the expanded AVIF renders before `#formats`, the retired workflow photo is
  absent, `#photos` follows the workflow section directly, horizontal overflow
  and console errors are `0`; no form was submitted.
- Runtime source commit `eccdbda` is live as production commit `b96f6c7`.

## Curated corporate gallery live

- Both corporate routes share one current-photo context block between benefits
  and packages. The former second context block between workflow and the
  gallery has been removed.
- The 14-frame gallery no longer starts with six similar photoshoot images.
  Current portraits are mixed with documentary event frames; the first four
  are the new full-height stage photograph, a guest-interaction frame, the
  black-and-white portrait with two guests and a dance-floor frame.
- The former first stage portrait, the redundant smiling portrait and the
  repeated close-up are not rendered in the curated sequence.
- Originals remain outside `public/`; the three newly supplied photographs are
  delivered as `640/1024` AVIF/WebP derivatives. Every file is below `117 KiB`.
- Runtime source commit `3b9f9bf` is live as production commit `f061497`.
- Local build and seasonal contract passed. The complete two-route 11-viewport
  matrix passed with 22/22 results, 14 photos and horizontal overflow `0`.
  Fresh production review passed on `/` at `1440x900` and on
  `/novogodniy-korporativ/` at `390x844`: the expected first four frames render,
  new AVIF files decode, removed duplicates are absent and console errors are
  `0`; no form was submitted.

## Shared current-photo hero slider

- `/` and `/novogodniy-korporativ/` use one shared five-frame portrait slider in the existing hero photo area;
- the copy, CTA, tags, hero geometry and route-specific context are unchanged;
- frame order now follows the owner-selected numbered originals exactly: `01-smile`, `02-microphone`, `03-full-length`, `04-grey-suit`, `05-gesture`; the former duplicate-background portrait is removed and photo 4 is present;
- public assets are optimized `AVIF` files with responsive `WebP` fallback at `640px` and `1024px`; source PNG files remain outside `public/`;
- autoplay advances after `4.5s` for the first frame and every `4s` afterwards with a `650ms` crossfade; it pauses in a hidden tab; when reduced motion is requested, photographs still change on schedule but without the fade;
- `?hero-slide=<slide-id>` is a deterministic visual-QA override and is not exposed in the public interface;
- local build, seasonal contract checks, media-budget audit and the shared desktop/mobile responsive matrix passed;
- the earlier reduced-motion release remains unchanged; the corrected second-frame identifier is now `02-microphone`;
- the numbered-order correction is released from source commit `92d72a4` to production commit `e5dab84`;
- fresh production checks passed on both routes at `1440x900` and `390x844`: all five deterministic frames rendered their matching distinct AVIF, square geometry was non-zero, route-specific H1 was preserved, horizontal overflow was `0` and browser console errors were `0`; live autoplay advanced from `01-smile` to `02-microphone` after `5.4s`.
- Owner-reviewed mobile crop corrections for frames `02`–`05` are released from source commit `b19f6e9` to production commit `ddc1392`: frame `02` is raised, frames `03` and `05` have more upper breathing space, and frame `04` shows the complete hair/head silhouette.
- Fresh production verification passed on both corporate routes at `390x844` and on the seasonal route at `1440x900`; versioned AVIF assets `crop-20261003a` rendered, autoplay still advanced `01` → `02`, horizontal overflow and console errors were `0`.
- The first `01-smile` frame now uses source crop `top=95` instead of `top=150`, adding natural space above the hair without changing the square Hero or copy. Source commit `67bd9a2` is released as production commit `6034030`; both routes passed fresh live checks at `390x844` and `1440x900`, and the live versioned AVIF matches the local derivative byte-for-byte.

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
- New Year pricing is live only on `/novogodniy-korporativ/`; ordinary corporate pricing remains deferred by the owner;
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
- final showreel control: both routes now use a 62px circular orange Play control centred in the artist photo and a compact `Смотреть шоу-рил · 3:45` caption 14px from the lower-left edge. The redundant visible `Состав третьего пакета` heading is removed. On click the whole custom overlay disappears and native video controls remain; root passed live at `1280x720`, seasonal at `390x844`, with no horizontal overflow or console errors.
- showreel Play pulse: the same circular control now uses the existing two-second `pulse` animation from the corporate video controls. Both live routes served `style.css?v=astro_15`; root passed at `1280x720` and seasonal at `390x844`, with a centred control, preserved caption placement, no horizontal overflow and no console errors.
- current runtime source commit: `3b9f9bf` on `origin/astro-migration`; current production commit: `f061497` on `origin/gh-pages`.
- current-photo evening-flow release: both `/` and `/novogodniy-korporativ/` now show the same current photo of Timur after the five `Как проходит корпоратив` stages and before the existing CTA. Only responsive AVIF/WebP derivatives are public; the original stays outside `public/`. Local build, seasonal contract, strict media audit and breakpoint review passed. Fresh production checks at `1440x900` and `390x844` on both routes confirmed the decoded AVIF, preserved CTA, no horizontal overflow and no console errors; no form was submitted.
- evening-flow crop correction released: the first desktop crop incorrectly used `object-position: 50% 25%` and clipped the central subject's head in the wide banner. Both routes now serve `50% 5%` on desktop; mobile remains full-frame at `50% 50%`. Local checks covered `769x900`, `1440x900`, `1984x1046`, `390x844` and the complete two-route boundary matrix. Fresh production visual checks passed on both routes at `390x844`, the seasonal route at `1440x900` and the root route at `1984x1046`: complete heads, preserved CTA, no horizontal overflow and no console errors.
- self-hosted corporate-video check: both routes now contain the same four `https://media.213-176-94-245.sslip.io/corporate-ground/*.mp4` URLs and contain no Boomstream URL or SDK. The first video loaded and played on both routes with `readyState=4`, `paused=false` and no console errors; public range requests return `206 video/mp4`. The `corporate-ground` directory occupies `404M` on the VPS, which has `23G` free.
- unverified video-copy removal: live `/` at `1280x720` and live `/novogodniy-korporativ/` at `390x844` each render `Тимур в работе`, four playable video cards and zero `.video-case__copy` blocks; no horizontal overflow or console errors. The first root video played with `readyState=4` and `paused=false`.
- live root regression: original H1 and both hero actions are preserved; the same subtitle-free shared proof section is published and passed at desktop/mobile widths;
- release assets and routes: root, seasonal, privacy, versioned CSS/JS, L1/L2/L11/L3 and sitemap all returned HTTP `200`;
- browser/process cleanup: all standalone Playwright QA sessions and the local dev server were stopped after verification;
- production CRM lead: not verified without owner approval.
- corporate format photo rollback: both corporate routes again use
  the original real `corporate-format` AVIF/WebP before the package cards. The
  rejected AI/outpaint and blurred-edge variants are absent; the redundant
  photograph before `Моменты с событий` remains removed. Local build,
  seasonal contract and a 14-case two-route viewport matrix passed with zero
  horizontal overflow and zero browser console errors. Fresh production checks
  at `390x844` and `1440x900` on both routes confirmed the original AVIF,
  absent backdrop and unchanged block order. Runtime source commit: `948d026`;
  production commit: `fa5b3ad`.
- full-width corporate format photo correction: both corporate routes now use
  responsive derivatives of the owner-supplied wide `4444.png` composition in
  the same pre-packages container. Desktop keeps the full left/right source
  edges and crops only vertically; mobile preserves the complete 2:1 frame.
  Fresh production checks at `390x844` and `1440x900` on both routes confirmed
  horizontal crop `0`, horizontal overflow `0`, no console errors, the removed
  pre-gallery photograph stayed absent, and no form was submitted. Runtime
  source commit: `481aff1`; production commit: `a13ebe9`.
- wide evening-flow photo correction: the shared photograph after the five
  `Как проходит корпоратив` stages and immediately before `Ваши преимущества —
  мои гарантии` now uses responsive derivatives of the owner-supplied
  `57565.png`. Desktop preserves both horizontal source edges and crops only
  vertically at `50% 30%`; mobile renders the complete 2:1 composition. Fresh
  production checks at `390x844` and `1440x900` on both routes confirmed the
  new AVIF, horizontal crop `0`, horizontal overflow `0`, no browser console
  warnings or errors and no form submission. Runtime source commit: `8643a86`;
  production commit: `391287c`.
- evening-flow photograph replacement: the same shared position on both
  corporate routes now uses responsive derivatives of the owner-supplied
  `232323.png` instead of the preceding `wide-v2` composition. Mobile preserves
  the complete 2:1 frame; desktop retains both horizontal source edges and
  crops only vertically at `50% 30%`. Local checks covered nine viewports from
  `390x844` through `1984x1046` on both routes. Fresh production checks at
  `390x844` and `1440x900` on both routes confirmed `wide-v3`, horizontal crop
  `0`, horizontal overflow `0`, no console warnings or errors and no form
  submission. Runtime source commit: `8c00d61`; production commit: `477cb20`.
- final evening-flow photograph replacement: the shared photograph immediately
  before `Ваши преимущества — мои гарантии` now uses responsive derivatives of
  the owner-supplied final `куку.png` composition on both corporate routes.
  Mobile preserves the complete 2:1 frame; desktop keeps both horizontal source
  edges and crops only vertically at `50% 30%`. Local checks covered nine
  viewports from `390x844` through `1984x1046` on both routes. Fresh production
  checks at `390x844` and `1440x900` on both routes confirmed `wide-v4`, complete
  heads, horizontal crop `0`, horizontal overflow `0`, no console warnings or
  errors and no form submission. Runtime source commit: `976a324`; production
  commit: `4b5761d`.

## YandexDirectGrowth handoff

The separate local campaign package is prepared in `../YandexDirectGrowth/` as `EXP-20260930-002` / `CMP-CORP-NY-2026-001`, state `LOCAL_DRAFT/OFF`. It contains five groups, 15 seed phrases, safe/conditional negatives, five creative sets, UTM and stop rules. No provider campaign, forecast, budget, funding, moderation or launch action occurred.
