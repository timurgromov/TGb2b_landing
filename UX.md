# UX — корпоративный сайт

## Primary user and job

Primary user: человек, которому поручено организовать новогодний корпоратив компании.

Job: за несколько минут убедиться, что ведущий подходит по стилю и уровню, понять состав работы и отправить данные для проверки даты.

## Primary flow

`поисковый запрос / рекомендация → первый экран → доказательства и формат → проверка даты → подтверждённая заявка → личный ответ`.

Первичное действие на всей сезонной странице одно: `Проверить дату`.

## Screen structure

1. Штатный header основного корпоративного сайта.
2. Штатный hero основного сайта с сезонным H1, подзаголовком, тегами, CTA и тем же портретом.
3. Штатный блок видео `VideoCases` с короткими пояснениями, что именно показывает каждый фрагмент.
4. Три понятных варианта состава: ведущий + DJ; ведущий + DJ + звук; ведущий + DJ + звук + кавер-группа. Это не публичный прайс и не обещание фиксированной комплектации.
5. Четыре подтверждённых корпоративных примера, собранных только из опубликованных благодарственных писем без выдуманных чисел гостей и результатов.
6. Штатный workflow с этапами подготовки новогоднего корпоратива.
7. Штатные галерея и благодарственные письма.
8. FAQ по составу команды, подготовке, договору, стоимости и бронированию.
9. Квалифицированная форма проверки даты внутри штатного CTA-блока.
10. Штатный footer и существующие modal/lightbox-компоненты.

Главная `/` сохраняет универсальный оффер, но все несезонные улучшения дизайна, кейсов, писем, видео, FAQ и пакетов синхронно получает через shared-компоненты. Сезонные тексты, даты, CTA, форма и декабрьская логика на главную не переносятся. Ценовые блоки остаются раздельными и не создаются до отдельного утверждения владельцем ценовой матрицы и вёрстки.

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
- Первый экран говорит прямо: ведущий, DJ, программа под компанию, понятная подготовка и договор. Формулировки «бережно вовлекает» и другие искусственно звучащие обороты не используются.
- Кейсы пересказывают только факты из уже опубликованных писем. Название компании, дата и формат можно указывать, если они читаются в источнике; число гостей не придумывается.

## Visual direction

Единственный визуальный эталон — главная страница `corp.timurgromov.ru`.

- используются те же `Header`, hero-сетка, портрет, типографика, теги и кнопки;
- используются готовые `VideoCases`, gallery, letters, workflow и `Footer`;
- цвета, градиенты, радиусы, ширины контейнеров и responsive-поведение приходят из существующих `style.css` и `mobile.css`;
- сезон меняет только H1, подзаголовок, содержание тегов, карточек, этапов и CTA;
- отдельная новогодняя дизайн-система, декоративный seasonal layer и новые типы карточек запрещены;
- `seasonal.css` отвечает только за квалифицированную форму, которой нет на основной странице.

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
