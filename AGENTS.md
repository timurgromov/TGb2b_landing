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
## Reusable workflow router

Version: 0.1.4

Root `AGENTS.md` хранит policy/router; scoped `AGENTS.md` — только domain rules.
Используй релевантные `ruslan-project-workflows:<skill-name>`; без plugin —
`skills/<skill-name>/SKILL.md`. Optional skills не копируй в каждый root.

Task ledger v1.0: root `TASKS.md` — единственный canonical active backlog.
Запрос добавить/обновить задачи означает reconcile всего файла, не append:
сверь repo, current state и worklog; подтверждённо выполненное убери из active,
значимый результат запиши в один worklog; obsolete удали, дубли объедини,
unknown оставь как `needs verification`; новые пункты вставь по priority/
dependency с acceptance criteria. Не создавай `TASKS-*`, `TASKS_*`, `TODO`,
`BACKLOG`, `ROADMAP` или phase-plan без явного запроса owner; одобренный
отдельный план свяжи из `TASKS.md`.

UI route: `product-design-ux`; затем по задаче `design-atlas`/`frontend-design`/
`web-interface-guidelines`; новый admin/CRM/dashboard без direction —
`ui-ux-pro-max`. Existing Hero/slider/crop visible delta — `ui-change-proof`
with rendered exact-diff evidence; responsive —
`frontend-responsive-layout-audit` + `responsive-qa-gate`; acceptance —
`web-ui-verify`. Не мигрируй static/vanilla ради 21st/React/Tailwind.
Только в React+Tailwind/shadcn 21st MCP/`21st-ai` допустим после brief при
`get_usage.aiGenerationEnabled=true`; generated HTML не production code.

Browser lifecycle v1.1: research делай через filesystem/task tools/web-search.
Для UI QA сначала используй открытый встроенный browser Codex; отдельный browser — один
bounded-сеанс без user profile. Сразу закрой созданные agent browser/dev-server/
QA-container, включая путь ошибки; обычный Chrome пользователя не закрывай.

Telegram access v1.0: до blocker проверь открытые авторизованные Telegram Desktop
и Telegram Web;
сбой одной поверхности не доказывает отсутствие доступа. Не проси screenshots,
не открывай посторонние чаты и не сохраняй session/personal data.

Для нового/заменённого site photo/video используй `media-asset-optimization`.
Original не web-ready до delivery-derivative и audit. Warn: image >500 KiB
(hero >800 KiB), video >5 MiB desktop/>2.5 MiB mobile; >=10 MiB —
stop-and-review. До integration/commit/release дай verdict `ready`, `needs
compression or derivative` или `owner decision needed`; в handoff назови
warnings/stop-and-review либо чистый audit.

В release/status разделяй feature/local/origin и live commit каждой поверхности;
docs/tests могут быть `non_runtime_ahead`. Не трогай чужие untracked файлы;
secrets, конфликты и unknown runtime-files блокируют release. Runtime asset
обязан быть tracked в том же commit. До «готово/опубликовано» нужны local checks,
exact pushed commit, successful deploy и fresh live-check изменённого flow/assets.
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
