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
   - три формата работы: ведущий + DJ; ведущий + DJ + звук; ведущий + DJ + звук + кавер-группа;
   - четыре кейса, основанные на опубликованных благодарственных письмах;
   - подписи к видео, объясняющие наблюдаемую пользу;
   - FAQ без неподтверждённых обещаний и искусственного дефицита.
3. Форма собирает:
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
11. Все три модальные формы главной страницы используют тот же подтверждённый backend-контракт; автоматический popup отключён.
12. Общие несезонные улучшения дизайна, кейсов, писем, видео, FAQ и пакетов публикуются одновременно на `/` и `/novogodniy-korporativ/` через shared-компоненты. Исключения: новогодние формулировки/даты/CTA и ценовые блоки. Цена появится только после отдельного утверждения матрицы и вёрстки.

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
