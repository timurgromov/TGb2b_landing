# UX — корпоративный сайт

## Primary user and job

Primary user: человек, которому поручено организовать новогодний корпоратив компании.

Job: за несколько минут убедиться, что ведущий подходит по стилю и уровню, понять состав работы и отправить данные для проверки даты.

## Primary flow

`поисковый запрос / рекомендация → первый экран → как проходит вечер → состав и музыкальное предложение → доказательства → цена → проверка даты → подтверждённая заявка → личный ответ`.

Первичное действие на всей сезонной странице одно: `Проверить дату`.

## CTA and callback contract

После первого экрана доступна подписанная плавающая кнопка `Связаться`. Все
контактные CTA на `/` открывают одну панель: Калькулятор мероприятий, звонок и
подтверждаемая callback-форма. На `/novogodniy-korporativ/` тот же выбор связи
сохраняется для контактных CTA, а `Проверить дату` ведёт к подробной форме.

Карточка после `Порядок работы` просит личную подборку для подготовки
корпоратива. При callback-заявке её intent сохраняется как `materials`; PDF,
мгновенная выдача и срок ответа не обещаются.

Панель на desktop — компактный диалог, на ширине до `768px` — нижняя панель с
safe-area отступом. Закрытие работает по кнопке, backdrop и Escape, фокус
возвращается к CTA, а фоновая прокрутка блокируется.

## Target screen structure

1. Штатный header.
2. Hero: универсальный на `/`, сезонный на `/novogodniy-korporativ/`.
3. `VideoCases`: ведущий в работе.
4. Новый shared-блок `Как проходит корпоратив`: пять этапов самого вечера глазами гостей.
5. Shared-блок преимуществ.
6. Три shared-пакета используют одну сетку: номер и понятное имя (`Базовый`, `С техникой`, `С живой музыкой`), заголовок с резервом под две строки и короткий список без отдельных подзаголовков. Составы читаются как полное наращивание, а не через формулировку «всё из базового состава»: второй пакет повторяет три пункта первого и добавляет техническое оснащение площадки; третий повторяет состав второго, добавляет три вокальных блока по 30 минут в исполнении двух вокалистов под профессиональные аранжировки и возможность дополнить музыкальную часть саксофоном или гитарой. В третьей карточке есть якорная ссылка `Подробнее о живой музыке` на расшифровку пакета ниже.
7. Новый shared-блок музыкальной программы сразу после пакетов.
8. Четыре подтверждённых корпоративных кейса по письмам.
9. `Порядок работы`: заявка, знакомство, смета, договор, подготовка и мероприятие.
10. Галерея и полный архив благодарственных писем.
11. FAQ по составу команды, подготовке, договору, стоимости и бронированию.
12. На сезонном маршруте — интерактивная цена по выбранной дате внутри трёх карточек и раскрываемая публичная матрица декабря. По прямому решению владельца от 8 октября 2026 года этот выпуск не добавляет цену на `/` и не затрагивает юбилей.
13. Shared-форма проверки даты с route-specific текстом, ограничением даты и source.
14. Footer и существующие modal/lightbox-компоненты.

Главная `/` и `/novogodniy-korporativ/` — две контекстные версии одного корпоративного сайта. Главная сохраняет универсальный оффер, сезонная версия — новогодний. Любое общее изменение структуры, дизайна, порядка блоков, пакетов, доказательств, FAQ или формы применяется сразу к обеим версиям через shared-компоненты. Различаются только контекстные формулировки, hero/promo, допустимые даты, source/атрибуция и значения цен: обычные на `/`, более высокие новогодние на `/novogodniy-korporativ/`.

## Content boundary: вечер и работа

### Как проходит корпоратив

Это продуктовый сценарий, который описывает опыт гостей:

1. `Сбор гостей и welcome` — знакомство с пространством, фоновая музыка; саксофонист упоминается только для музыкального пакета.
2. `Открытие и официальная часть` — приветствие, слово руководства, награждения и обязательные части программы.
3. `Основная программа` — общение ведущего с залом, материалы о компании и вовлечение без неловких активностей.
4. `Музыка и танцы` — DJ во всех пакетах; вокалисты и саксофонист только в музыкальном шоу.
5. `Финал` — согласованный общий момент и продолжение музыкальной части без обещания фиксированного сценария.

Блок не показывает договор, смету или подготовительные созвоны.

### Порядок работы

Это сервисный сценарий заказчика: заявка → знакомство → концепция и смета → договор и подготовка → мероприятие. Он подтверждает организованность и не описывает программу вечера для гостей.

### Музыкальная программа

Блок расшифровывает третий пакет `С живой музыкой`: три музыкальных блока по 30 минут. Базовый состав — два вокалиста; доступны также два вокалиста с саксофонистом и два вокалиста с саксофонистом и гитаристом. Саксофонист работает на welcome только в выбранном составе. Вокальные блоки исполняются под профессиональные аранжировки. Правая колонка объясняет каждую комплектацию через состав, короткую пользу и компактные теги: репертуар, welcome и участие инструментов. Экономия объясняется тем, что вокалисты используют базовый комплект звука, поэтому не требуется отдельно оплачивать полный состав музыкантов, концертный звук и бэклайн.

Блок не использует название подрядчика, не обещает полностью живой инструментальный состав и не подменяет его. Термин `бэклайн` не объясняется отдельным техническим блоком.

### Контракт блока музыкальной программы

- job: после выбора пакета понять объём музыкальной части, состав и отличие от полной кавер-группы;
- location: shared section сразу после `#formats`, перед `#proof-cases` на `/` и `/novogodniy-korporativ/`;
- headline: `Три музыкальных блока по 30 минут`;
- CTA: `Обсудить музыкальный состав`; на `/` открывает панель выбора связи, на сезонной странице ведёт к `#proverit-datu`;
- desktop: две равные колонки в одном широком контейнере — объяснение и подтверждающее фото состава слева, три конфигурации справа; фото не выше `360px`, чтобы не вытеснять сравнение составов; ниже нейтральная строка про бэклайн;
- mobile: одна колонка; сначала заголовок и объём программы, затем фото высотой около `250px`, три конфигурации, пояснение и CTA во всю ширину;
- visual direction: существующие тёмные поверхности, тонкая рамка, оранжевый акцент и те же радиусы; фото располагается внутри уже существующей информационной карточки, без новой галереи, градиента, счётчика или отдельной seasonal-стилизации;
- source boundary: владелец передал презентацию состава `Костюмы Богемия .pdf` для выбора фото. В публичный путь попадает только производный кадр страницы 8 презентации: из него кадрированием убраны название, ник и номер страницы. Имя группы, ссылка и контакты на сайте не публикуются. Оригинальный PDF и рендер страницы в `public/` не попадают.

## Сезонная цена по дате

- job: выбрать дату любого будущего корпоративного мероприятия и сразу увидеть стоимость каждого доступного состава, продолжительность и цену дополнительного часа; для декабря 2026 применяется отдельная матрица;
- location: внутри `#formats` только на `/novogodniy-korporativ/`;
- initial state: одна кнопка `Выбрать дату` над тремя компактными карточками; без даты видны круглогодичные базовые цены за 5 часов `от 145 000 / 170 000 / 320 000 ₽`;
- selected state: дата вне декабря 2026 оставляет базовые цены `от`, дата декабря 2026 подставляет строку декабрьской матрицы во все три карточки; рядом с выбранной датой показывается день недели. Дополнительный час составляет от 20 000 ₽ в обычные и недорогие дни, 25 000 ₽ на дорогие декабрьские даты, 35 000 ₽ 31 декабря. Единственный общий CTA переносит дату в форму `#proverit-datu`, где состав выбирается один раз;
- package details: каждая карточка раскрывает собственный состав внутри своих границ и меняет контрол на `Скрыть состав`; отдельного общего блока с повтором трёх пакетов нет;
- full matrix: `details` раскрывает 14 актуальных публичных диапазонов с итоговыми ценами трёх составов и продлением; музыкальный пакет использует собственную декабрьскую ставку состава от `150 000 ₽` до `300 000 ₽`, которая прибавляется к варианту с оборудованием;
- public boundary: скидки, минимальная цена для торга, повышение при второй заявке и внутренняя экономика не публикуются;
- equipment boundary: второй и третий пакеты включают комплект звука и DJ-оборудования; точный состав подтверждается после проверки площадки;
- desktop: дата и три закрытые карточки помещаются в одну обзорную панель; каждая карточка раскрывается независимо, полная таблица остаётся отдельным disclosure;
- mobile: карточки идут сразу под общим выбором даты; в каждой карточке цена за 5 часов и ставка `Доп. час` находятся в одной ценовой зоне рядом друг с другом и пересчитываются синхронно после выбора даты; верхняя строка не дублирует продление; состав раскрывается прямо внутри выбранной карточки; горизонтальной прокрутки нет;
- accessibility: native date input, единый `aria-live` для цен, три независимых `details/summary` для пакетов и отдельный `details/summary` для полной матрицы;
- no-JS: состав каждого пакета и полная таблица доступны через нативные disclosure; интерактивные значения требуют JavaScript.

## Form states

### Seasonal date form repair (2026-10-08)

- Scope: `/novogodniy-korporativ/#proverit-datu`; the ordinary corporate and jubilee routes stay as they are.
- A future event date in any month is valid for a request. Outside December 2026, all three displayed packages use the year-round starting prices: 145 000 ₽, 170 000 ₽ and from 320 000 ₽ for five hours. Each extra hour starts at 20 000 ₽, so the baseline host-and-DJ package for six hours is from 165 000 ₽. December 2026 has 14 date ranges: the first weekdays start at the same 145 000 ₽ floor; Friday and Saturday premiums rise through the month; 27–28 December remains 190 000 / 220 000 ₽ for host and equipment, while 29–30 December rises to 210 000 / 240 000 ₽ and uses the 250 000 ₽ musical-composition rate, producing a third-package total from 490 000 ₽; 31 December starts at 280 000 ₽ for host and DJ and 300 000 ₽ for the musical composition. Early extra hours are 20 000 ₽, premium December extra hours 25 000 ₽, and 31 December 35 000 ₽.
- The top date control and the lead form share the selected date and price. The confirmation message names the field to fix. No success state or conversion goal appears before HTTP 201.
- Mobile layout: the date, number, composition, company, name and phone controls must each remain within the same inner edges of the form card at 320, 375 and 390 CSS pixels. The submitted date and a focused date field must not expand the card. The floating contact button disappears while the detailed form is in view so it cannot cover a field or submit action. The desktop two-column layout remains.
- Acceptance: reproduce the former 13 November 2026 failure before editing; after editing, the same completed form must reach the HTTP request path, and a mocked 201 must show success. Check 320/375/390, 768/769, 1024/1025, 1366/1440 and a wide desktop viewport; inspect the live seasonal form in the browser. Check the ordinary corporate route for regression.

- `idle`: поля доступны, кнопка `Проверить дату`;
- `invalid`: браузерная валидация и конкретная ошибка рядом со статусом;
- `sending`: кнопка disabled, текст `Отправляем…`;
- `success`: форма скрыта, показано подтверждение и обещание личного ответа;
- `server_error`: форма сохранена, кнопка снова доступна, показан телефон как резерв;
- `network_error`: то же поведение без ложной аналитической конверсии.

## Copy decisions

- Сезонная публичная матрица утверждена владельцем 8 октября 2026 года; общий минимальный якорь не используется, цена появляется после выбора даты.
- Не обещать свободную дату до ручной проверки.
- Не использовать свадебную лексику.
- Не обещать «под ключ», если конкретный состав техники ещё не подтверждён.
- Опыт указывается единообразно как `15+ лет`, пока владелец не утвердит другое значение.
- Первый экран говорит прямо: ведущий, DJ, программа под компанию, понятная подготовка и договор. Формулировки «бережно вовлекает» и другие искусственно звучащие обороты не используются.
- Кейсы пересказывают только факты из уже опубликованных писем. Название компании, дата и формат можно указывать, если они читаются в источнике; число гостей не придумывается.

## Visual direction

Единственный визуальный эталон — главная страница `corp.timurgromov.ru`.

- используются те же `Header`, hero-сетка, портрет, типографика, теги и кнопки;
- используются готовые `VideoCases`, gallery, letters, workflow и `Footer`;
- цвета, градиенты, радиусы, ширины контейнеров и responsive-поведение приходят из существующих `style.css` и `mobile.css`;
- сезон меняет только H1, подзаголовок, содержание тегов, карточек, этапов и CTA;
- отдельная новогодняя дизайн-система, декоративный seasonal layer и новые типы карточек запрещены;
- До унификации формы `seasonal.css` содержит её сезонную реализацию. Целевое состояние — общий компонент формы и только минимальные route-specific стили/параметры.

## Responsive layout contract

Target route: `/novogodniy-korporativ/`.

Modes:

- mobile: `320–767px`, один столбец, CTA на полную ширину, media после основного обещания;
- tablet: `768–1023px`, один или два столбца по смыслу, без уменьшения tap targets;
- desktop: `1024–1599px`, hero в две колонки;
- wide: `1600px+`, ограниченный container, без растягивания строк текста.

Affected breakpoints: `768px`, `1024px`, `1280px`.

Required viewport checks after the last edit:

- `390x844`;
- `767x900`, `768x900`, `769x900`;
- `1023x820`, `1024x820`, `1025x820`;
- `1180x820`;
- `1279x900`, `1280x900`, `1281x900`;
- `1366x768`;
- `1440x900`;
- `1984x1046`;
- tablet anchors `768x1024`, `1024x768`.

Invariants:

- `document.documentElement.scrollWidth === window.innerWidth`;
- header and CTA remain reachable;
- H1, supporting copy and CTA share one text-module width;
- button labels do not wrap at supported widths;
- portrait face and top of head remain visible;
- form labels, status and consent do not overflow;
- root `/` design and behavior remain unchanged.

## UI change contract

Baseline observed on live `https://corp.timurgromov.ru/` at CSS viewport `1280x720`, DPR `2`:

- route `/` has generic H1 `Интеллигентный ведущий на корпоратив в Москве`;
- two hero CTAs: `Обсудить корпоратив` and `Назначить встречу`;
- no seasonal promo, explanatory video captions, proof-case block or FAQ exists;
- root page width equals viewport width.

Additional baseline observed on live seasonal route at CSS viewport `1280x720`, DPR `2`:

- H1: `Ведущий на новогодний корпоратив в Москве`;
- subtitle: `Тимур Громов — ведущий, который держит темп вечера, бережно вовлекает гостей и собирает программу под характер вашей компании.`;
- selectors `[data-testid="proof-cases"]`, `[data-testid="faq-section"]` and `.video-case__copy` are absent;
- `document.documentElement.scrollWidth === window.innerWidth === 1280`.

Exact target:

- route: `/novogodniy-korporativ/`;
- state: initial page and form states;
- primary selector: `[data-testid="seasonal-primary-cta"]`;
- form selector: `[data-testid="seasonal-lead-form"]`;
- expected visible delta: та же композиция и визуальные метрики основного hero, но с сезонным H1 `Ведущий на новогодний корпоратив в Москве`, без года в публичном оффере, с сезонным контентом и квалифицированной формой;
- expected content delta: естественный подзаголовок, пояснения к видео, три состава команды, подтверждённые примеры, FAQ и ссылка с главной на сезонную страницу;
- preserved: root and seasonal hero geometry, current black/warm-brown/orange visual language, existing media assets, contact details, form contract and primary CTA.

Acceptance evidence must record route, served candidate, viewport, H1, CTA label, form state, horizontal overflow, console errors and root regression result after the final edit.

## Shared current-photo hero slider

The hero media surface is shared by `/` and `/novogodniy-korporativ/`. It keeps
the approved square frame, text, tags and CTA layout, but replaces the old
single portrait with five current photographs in one fixed order.

- first frame: smiling portrait; it remains visible for `4.5s`;
- frames 2–5: event photographs; each remains visible for `4s`;
- transition: `650ms` opacity dissolve with no arrows, dots or moving text;
- first frame is eager/high priority; later frames are lazy/low priority;
- images are delivered as responsive AVIF with WebP fallback; original PNG
  files never enter `public/`;
- autoplay pauses while the document is hidden; with
  `prefers-reduced-motion: reduce`, photographs still change on schedule but
  the opacity animation is removed;
- stable `data-slide-id` values and the `hero-slide` query parameter provide a
  deterministic visual-QA state without changing the normal anonymous flow.

Required regression viewports: `390x844`, `767/768/769x900`,
`1023/1024/1025x820`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
Both routes must show five slides, preserve their exact H1/CTA context and have
no horizontal overflow or console errors.

## Curated current-photo gallery

- Change ID: `2026-10-03-curated-current-photo-gallery`.
- Requested visible change: mix current portraits with documentary event
  photographs instead of showing a visually repetitive photoshoot sequence.
- Surfaces: `/` and `/novogodniy-korporativ/`; anonymous public state.
- Canonical source: existing `EveningFlow` wide-media treatment and existing
  `Gallery` scroll-snap/lightbox mechanics. No new card or slider system is
  introduced.
- Exact targets:
  - a wide current photo between benefits and packages;
  - a second wide current photo between workflow and gallery;
  - the gallery opens with the current full-height stage photograph;
  - position 2 is a documentary guest-interaction photograph;
  - position 3 is the black-and-white portrait with two guests;
  - current portraits and documentary event frames continue in a varied rhythm;
  - near-duplicate smiling/gesturing portraits are reduced to one gesturing
    frame, and the repeated close-up portrait is not rendered.
- Expected visible signature: both routes render the same curated 14-image
  sequence. The first four frames are current stage, documentary guests,
  current group portrait and documentary dance floor. No more than one current
  portrait appears without an event photograph separating it from the next
  current portrait.
- Media contract: originals remain outside `public/`; wide inserts use
  `768/1536` derivatives and gallery images use `640/1024` derivatives.
- Crop contract: mobile wide inserts show the complete `3:2` frame; desktop may
  use a shallow crop only after head, hair, hands, focal point and breathing
  space have been visually checked. Portrait gallery images use `contain`, so
  the complete person remains visible.
- Required viewports after the last edit: `390x844`, `767x900`, `768x900`,
  `769x900`, `1023x820`, `1024x820`, `1025x820`, `1180x820`, `1366x768`,
  `1440x900`, `1984x1046` on both routes. No horizontal overflow or console
  errors are allowed.

## CTA stage 1 contract — 2026-10-05

## Seasonal price date control — 2026-10-08

- Surface: only `/novogodniy-korporativ/`, `#formats`; the ordinary corporate route has no approved price matrix.
- Job: compare three December prices, choose one date once, then discuss availability via the existing form.
- Initial state: a concise explanation says the minimum December prices are shown; one visible `Выбрать дату` control sits before all three cards. Cards show their `от` prices.
- Selected state: the control becomes `Изменить дату`; each card shows the selected day and weekday immediately above its updated price. The live music price stays `от`; 31 December prices stay `от`.
- Remove all per-card calendar controls and the lower `Выбрать дату` action. Keep one unobtrusive link to the existing date-check form after the cards. Keep package disclosures and the full December matrix.
- Mobile contract at `320x844` and `390x844`: the date action is visible before the first card, text and control remain within the viewport, and tapping the action opens the native date picker. Desktop contract at `1440x900`: the action remains beside the explanation above the three-card grid.
- Preserved: approved price ranges, 5-hour duration, extension rate, form date sync, CRM comment and HTTP 201 success gate, ordinary corporate route and Jubilee.

### Калькулятор мероприятий routing — 2026-10-07

On both corporate routes the first Telegram action in the shared panel opens
Калькулятор мероприятий with a source specific to route and placement. Opening Telegram does not itself
prove a lead; CRM request and offline conversion begin only after the visitor
starts the bot. A request for a corporate preparation selection remains a
personal request, not a wedding-material flow. The mobile panel scrolls inside
its safe-area bounded bottom sheet.

- Target: `/` and `/novogodniy-korporativ/`, sticky contact control after `scrollY > innerHeight`, shared contact panel, in-page contact CTA, and shared materials card immediately after `Порядок работы`.
- Baseline observed live at actual 1280×720: the sticky control is an icon-only WhatsApp link; seasonal primary CTA goes to `#proverit-datu`; no materials card exists. The existing contact/video forms show success only after backend HTTP 201.
- Expected visible delta: labelled `Связаться` button; compact desktop dialog or bottom sheet at <=768px containing Калькулятор мероприятий, phone, and `Оставить номер`; text-only materials card on both routes. The last option opens an existing confirmed form; materials selection is recorded as `materials_request` in the lead comment.
- Updated on 2026-10-07: the header WhatsApp action is now `Связаться` on both routes and opens the same panel. Its label and the sticky button label are white. The seasonal Hero now uses `Обсудить корпоратив` and `Назначить встречу`; the detailed `Проверить дату` form remains below. Header and panel phone links stay `tel:` on desktop and mobile.
- Preserved: seasonal detailed `Проверить дату` form, contact details, visual palette, hero media/layout, and other routes.
- States and access: open, close button/backdrop/Escape, focus return, focus containment, background scroll lock; mobile safe-area padding. No automatic popup, PDF or delivery-time promise. Check 390×844 and 1280×720 plus narrow 320px and windowed 1024px.
