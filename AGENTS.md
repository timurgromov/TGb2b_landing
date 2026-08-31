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
viewport constraints в `PROJECT_SPEC.md`/`UX.md`), затем по риску
`frontend-design`/`web-interface-guidelines`; visible delta — `ui-change-proof`
with rendered exact-diff evidence; responsive — `frontend-responsive-layout-audit`
+ `responsive-qa-gate` (matrix/overflow); acceptance — `web-ui-verify`.
Это не блокирует docs-only, backend-only или узкий incident repair.

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

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.
