# AGENTS

## Model Routing

Перед существенной задачей: `Model note: <model>/<effort> — <причина>`.
Это рекомендация, не stop-gate; `Роутинг сначала:` — только оценка без tools.
Luna/Низкий — docs/поиск; Spark/Средний — простой UI; Terra/Средний — обычный
код; Sol/Высокий — production, данные, security, сложный debug/deploy. Если
модели нет, выбирай эквивалент. `Очень высокий` — только неизвестный высокий
blast radius, необратимый data/finance cutover или live auth/security incident;
после безопасного разделения понижай до `Высокого`. Сами слова
production/deploy/database не основание; при экономии выбирай дешевле.

<!-- ruslan-project-workflows:start -->
## Reusable skills, media and release state

Root `AGENTS.md` хранит global policy/router; scoped `AGENTS.md` наследуют его и
содержат только domain rules. Используй только релевантные
`ruslan-project-workflows:<skill-name>`; без plugin — `skills/<skill-name>/SKILL.md`.
Новые optional skills остаются в plugin-каталоге, не копируются в каждый root.
UI: `product-design-ux` до первого flow (P0 user/job, flow, CTA, states и
viewport constraints в `PROJECT_SPEC.md`/`UX.md`); для обычного UI и UX-аудита
по риску `frontend-design`/`web-interface-guidelines`; visible delta —
`ui-change-proof` with rendered exact-diff evidence; responsive —
`frontend-responsive-layout-audit` + `responsive-qa-gate`; acceptance —
`web-ui-verify`.
Новый admin/CRM/dashboard без утверждённой design system или visual direction:
после этого UX-этапа и до кода обязательно `ui-ux-pro-max`, затем весь
указанный design/audit/acceptance route обязателен, а не «по риску».
Если direction открыт, сначала `design-atlas`: public reference → 3–5 решений,
не копия. Только в React+Tailwind/shadcn можно через global `21st-ui-explore`
показать варианты; сначала owner choice и dependency/diff review, без framework
migration для static/vanilla surface.
Это не блокирует docs-only, backend-only или узкий incident repair.

Browser lifecycle v1.1: для desk-research, поиска по файлам/чатам и чтения
сайтов не запускай локальный Chrome, Chromium или Playwright: используй
filesystem, Codex task tools и web-search. Для UI QA сначала используй уже
открытый встроенный browser Codex. Отдельный browser допустим только для
конкретной непокрываемой UI-проверки: заранее назови причину, не используй
пользовательский Chrome profile и запусти один bounded-сеанс. Закрой созданные
агентом browser/Playwright, dev-server и QA-container сразу после проверки, в
том числе при ошибке; перед финалом проверь отсутствие этих процессов. Обычный
Chrome пользователя не закрывай.

Перед добавлением site photo/video используй `media-asset-optimization`: original
не клади в public, публикуй AVIF/WebP derivative и responsive sizes. Warn: image
>500 KiB (hero >800 KiB), video >5 MiB desktop/>2.5 MiB mobile; >=10 MiB —
stop-and-review. Inline video: MP4/WebM, максимум 1080p/30 fps, poster и lazy
loading; длинное видео — streaming/embed.

В release/status разделяй feature/local/origin и live commit каждой поверхности:
backend passport не доказывает frontend; docs/tests могут быть
`non_runtime_ahead`, unknown path — fail-closed. Не трогай чужие untracked
файлы; secrets, конфликты и unknown runtime-files блокируют release.
<!-- ruslan-project-workflows:end -->

## Corporate route parity

- `/` и `/novogodniy-korporativ/` — не два независимо развиваемых сайта, а две контекстные версии одного корпоративного сайта.
- Любое изменение дизайна, структуры, порядка блоков, компонентов, доказательств, пакетов, FAQ, формы или общего смысла по умолчанию обязательно вносить сразу в обе версии.
- Реализовывать общее через shared-компоненты, данные и стили. Если технически требуется route-specific код, обе эквивалентные версии всё равно должны быть изменены в рамках одной задачи и одной проверки.
- Различаться могут только элементы, которым действительно нужен контекст: обычные или новогодние формулировки, hero/promo, ограничения дат, source/атрибуция и утверждённые значения цен.
- Вёрстка ценового блока и состав пакетов должны быть одинаковыми. На `/` используются обычные корпоративные цены, на `/novogodniy-korporativ/` — более высокие новогодние цены.
- Цены не добавлять ни на один route до отдельного утверждения владельцем ценовой матрицы и вёрстки ценового блока.
- Не создавать отдельную дизайн-систему, уникальную структуру или самостоятельный набор общих блоков для одной версии без прямого указания владельца.
- После каждого общего UI-изменения проверять обе production-страницы; успешная проверка только одного route не доказывает parity.

## Corporate media host access

- Для `open-blue` (`213.176.94.245`) не искать ключ в браузере и не объявлять доступ отсутствующим: канонический локальный handoff — `../PastLife AI/.local/AEZA_DEPLOY_SECRETS.md` относительно workspace `1. Проекты WibeCoding`.
- Этот файл содержит действующий root-пароль данного VPS, не относится к Git и не должен читаться, печататься, копироваться в документы или коммиты. Использовать его только программно для конкретного SSH/SCP действия; передавать на экран лишь статус проверки.
- Ключ `~/.ssh/tg26_media_vps_ed25519` относится к другому старому host и не является способом доступа к `open-blue`.
- Все корпоративные медиа загружаются в `/srv/tg26-media-backup/public/corporate-ground/`; после загрузки обязательны SHA-256 и публичная HTTPS range-проверка.

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.
