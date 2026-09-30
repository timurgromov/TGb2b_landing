# UX — корпоративный сайт

## Primary user and job

Primary user: человек, которому поручено организовать новогодний корпоратив компании.

Job: за несколько минут убедиться, что ведущий подходит по стилю и уровню, понять состав работы и отправить данные для проверки даты.

## Primary flow

`поисковый запрос / рекомендация → первый экран → доказательства и формат → проверка даты → подтверждённая заявка → личный ответ`.

Первичное действие на всей сезонной странице одно: `Проверить дату`.

## Screen structure

1. Compact header: бренд, телефон, CTA.
2. Hero: сезон, H1, ясное обещание, trust facts, CTA, портрет ведущего.
3. Decision strip: что получает компания и кто держит процесс.
4. Video proof: реальные фрагменты с пояснениями.
5. Formats: ведущий; ведущий + DJ; команда со звуком.
6. B2B proof: договор ИП, тайминг, работа с площадкой и подрядчиками, письма компаний.
7. Process: короткая последовательность подготовки.
8. FAQ.
9. Date-check form.
10. Legal footer.

## Form states

- `idle`: поля доступны, кнопка `Проверить дату`;
- `invalid`: браузерная валидация и конкретная ошибка рядом со статусом;
- `sending`: кнопка disabled, текст `Отправляем…`;
- `success`: форма скрыта, показано подтверждение и обещание личного ответа;
- `server_error`: форма сохранена, кнопка снова доступна, показан телефон как резерв;
- `network_error`: то же поведение без ложной аналитической конверсии.

## Copy decisions

- Публичный ценовой якорь пока не используется: он не утверждён владельцем.
- Не обещать свободную дату до ручной проверки.
- Не использовать свадебную лексику.
- Не обещать «под ключ», если конкретный состав техники ещё не подтверждён.
- Опыт указывается единообразно как `15+ лет`, пока владелец не утвердит другое значение.

## Visual direction

Сохраняется существующая система корпоративного сайта:

- тёмный графитовый фон;
- белая типографика;
- оранжевый CTA;
- реальный портрет и реальные материалы;
- спокойная B2B-плотность без декоративного шума.

Сезонный слой:

- тёплое янтарное освещение и тонкие световые точки;
- никаких шаблонных ёлок, снежинок, стеклянных карточек и неоновых градиентов;
- памятный элемент — `date rail`: короткая полоса проверки декабрьской даты рядом с hero/form narrative.

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
- no seasonal route or date-check form exists;
- root page width equals viewport width.

Exact target:

- route: `/novogodniy-korporativ/`;
- state: initial page and form states;
- primary selector: `[data-testid="seasonal-primary-cta"]`;
- form selector: `[data-testid="seasonal-lead-form"]`;
- expected visible delta: seasonal 2026 promise, single primary CTA, date rail, corporate proof and qualification form;
- preserved: root route, existing media assets, contact details and brand language.

Acceptance evidence must record route, served candidate, viewport, H1, CTA label, form state, horizontal overflow, console errors and root regression result after the final edit.
