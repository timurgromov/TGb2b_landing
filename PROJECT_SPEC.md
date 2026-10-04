# PROJECT_SPEC — корпоративный сайт

## Product boundary

`TGb2b_landing` — публичный статический Astro-сайт ведущего корпоративных мероприятий. Production-домен: `https://corp.timurgromov.ru/`.

Сайт отвечает за предложение, доказательства, форму и корректную передачу заявки. CRM, обработка заявки и рекламные кампании принадлежат соседним продуктам и меняются отдельно.

## Current seasonal objective

Подготовить измеримую посадочную страницу для новогодних корпоративов 2026 года:

- route: `/novogodniy-korporativ/`;
- аудитория: HR, офис-менеджер, собственник, внутренний организатор или агентство;
- задача пользователя: быстро понять формат и проверить доступность даты;
- primary CTA: `Проверить дату`;
- form source identifier: `site_meeting_corporate`;
- backend route: `POST https://calcul.timurgromov.ru/api/v1/site/consultation-request`;
- Metrika counter: `104468814`.

## Functional requirements

1. Первый экран сообщает услугу, сезон, географию, формат команды и следующий шаг.
2. Страница объясняет результат для компании, показывает реальные видео и B2B-доказательства.
   - четыре корпоративных MP4 и click-to-play showreel музыкального состава обслуживаются с собственного каталога `corporate-ground` на Aeza `open-blue`, а не через Boomstream;
   - отдельный блок `Как проходит корпоратив` описывает путь гостей внутри самого вечера;
   - `Порядок работы` отдельно описывает путь заказчика от заявки до проведения;
   - три формата работы: ведущий + DJ; ведущий + DJ + звук; ведущий + DJ + звук + музыкальное шоу из двух вокалистов и саксофониста;
   - отдельный блок музыкального шоу объясняет состав, концертный эффект, использование базового звука и отсутствие полного инструментального бэклайна; его существующая фотография служит постером и запускает showreel только по явному клику;
   - четыре кейса, основанные на опубликованных благодарственных письмах;
   - общий видеоблок «Тимур в работе» без неподтверждённых подписей к отдельным роликам;
   - FAQ без неподтверждённых обещаний и искусственного дефицита.
3. Обе страницы используют один shared-компонент формы с route-specific текстом, ограничениями даты и источником. Форма собирает:
   - дату;
   - количество гостей;
   - необходимость DJ/аппаратуры;
   - имя;
   - телефон;
   - необязательное название компании/площадки.
4. Форма передаёт безопасный payload существующему EventBudjet endpoint:
   - `name`, `phone`, `comment`, `form_source`, `page_url`;
   - `yclid`;
   - bounded `campaign_params`;
   - bounded `attribution_context`.
5. Success UI и цель `corporate_lead_submit_success` появляются только после HTTP `201` от backend.
6. Ошибка backend не считается лидом и предлагает повторить отправку или позвонить.
7. Публичная цена не показывается до отдельного решения владельца.
8. Персональные данные не передаются в Метрику, URL или console logs.
9. Страница содержит согласие и ссылку на собственную corporate privacy page.
10. Главная страница сохраняет универсальный оффер, но ведёт на сезонную посадочную через отдельный промоблок.
11. Контактная форма и форма назначения встречи используют подтверждённый backend-контракт; прежнее окно чек-листа удалено. Автоматический popup отключён.
12. `/` и `/novogodniy-korporativ/` являются двумя контекстными версиями одного корпоративного сайта, а не независимо развиваемыми сайтами. Общие блоки, структура, дизайн, порядок, пакеты, доказательства, FAQ и форма изменяются одновременно через shared-компоненты. Исключения допустимы только для обычного или новогоднего контекста, hero/promo, ограничений дат, source/атрибуции и утверждённых значений цен.
13. `Как проходит корпоратив` и `Порядок работы` являются разными обязательными блоками и не заменяют друг друга.
14. Ценовой блок использует одну верстку и одинаковые составы пакетов на обеих страницах, но обычные цены для `/` и более высокие новогодние цены для `/novogodniy-korporativ/` хранятся раздельно. Публикация возможна только после утверждения матрицы и макета владельцем.

## Analytics contract

Diagnostic goals:

- `corporate_seasonal_view`;
- `corporate_form_start`;
- `corporate_form_error`;
- `corporate_phone_click`;
- `corporate_messenger_click`;
- `corporate_video_play`.

Shared-site goal:

- `corporate_messenger_click` — клик по доступному мессенджеру на главной или сезонной странице.

Commercial goal:

- `corporate_lead_submit_success` — только после подтверждённого backend response.

Campaign parameters preserved when present:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `yclid`;
- `direct_campaign_id`;
- `direct_source_type`;
- `direct_region_id`;
- `creative_id`.

## Release gate

- `npm run build` passes;
- root route remains intact;
- shared corporate sections remain identical on root and seasonal routes except for documented seasonal copy/CTA and future approved pricing;
- seasonal route has no console errors or horizontal overflow;
- form validation, loading, error and success states are verified without claiming a production lead unless an authorized live submission is performed;
- desktop, mobile, tablet and breakpoint boundaries are checked;
- `390`, `767/768/769`, `1023/1024/1025`, `1179/1180/1181`, `1279/1280/1281`, `1366`, `1440` and `1984` widths have no document overflow;
- commit, push, deploy and fresh production verification are separate recorded states;
- Yandex Direct campaign work starts only after the live route and tracking contract pass this gate.
