# AGENTS

<!-- ruslan-project-workflows:start -->
## Global Reusable Skills

В Codex reusable workflows доступны глобально из personal plugin `ruslan-project-workflows`. Перед существенной задачей выбери только skills, релевантные текущей задаче, по их descriptions; не загружай весь набор без причины.

Используй namespaced skill `ruslan-project-workflows:<skill-name>`. Если personal plugin недоступен на другом компьютере или в другом агенте, используй локальный fallback `skills/<skill-name>/SKILL.md`, если такой файл существует. Project-specific правила этого `AGENTS.md` имеют приоритет над общим skill.

Если пользователь просит несколько параллельных разработок или другой пишущий чат уже активен в том же проекте, используй `ruslan-project-workflows:parallel-project-lanes`: отдельный Git worktree/branch на worker и один coordinator для integration/release.

Hook не блокирует редактирование файлов: при активном `.git/codex-parallel/lanes.json` новый пишущий чат до первой правки проверяет lane status и не переиспользует worktree другого lane.
<!-- ruslan-project-workflows:end -->

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.
