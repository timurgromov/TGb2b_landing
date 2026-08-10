# AGENTS

## Model Routing

Перед любой новой существенной задачей в первом ответе пиши отдельную строку:

`Model note: <recommended model>/<reasoning effort> — <короткая причина>`

### Исполнение задач

`Model note` — рекомендация, а не автоматическое переключение, запрет или требование создать новую задачу. Агент продолжает работу на доступной текущей модели, включая исследование, правки, commit и deploy. Рекомендация `GPT-5.6 Sol/Высокий` не отменяет работу `GPT-5.6 Terra/Высокий`.

Для deploy действуют только реальные safety-гейты проекта: проверка scope, тесты, backup и отдельное approval там, где они нужны для рискованных production-данных, платежей, security или необратимых действий. Модельный роутинг сам по себе не блокирует deploy.

Префикс `Роутинг сначала:` означает только оценку модели: ответ без инструментов и без выполнения, пока пользователь явно не попросит продолжить.

Используй только модели и labels reasoning effort, реально видимые в текущем Codex UI:

- `GPT-5.6 Luna` — дешёвые задачи: docs, поиск, мелкие правки, README/TASKS/AGENTS, простые CSS/HTML изменения, классификация и первичный ресёрч.
- `GPT-5.3-Codex-Spark` — быстрые UI/frontend итерации в существующем интерфейсе, лендинги и компоненты без тяжёлой логики.
- `GPT-5.6 Terra` — обычный кодинг, scripts, scaffold, интеграции, CI/debug средней сложности и продуктовые итерации по умолчанию.
- `GPT-5.6 Sol` — архитектура, production, безопасность, данные, сложный debug, multi-service, deploy, risky migrations и задачи с высокой ценой ошибки.

Если Sol/Terra/Luna отсутствуют в интерфейсе, выбирай эквивалент по роли: cheapest -> balanced -> flagship. Не используй устаревшие номера моделей как единственно допустимые.

Reasoning effort:

- `Низкий` — дешёвые и короткие задачи.
- `Средний` — обычная повседневная работа и дефолт для Terra.
- `Высокий` — стандарт для Sol и ограниченной сложной работы: сложный debug, важные изменения, production-задачи с ясным scope и rollback, additive migrations, bounded data changes, важные UX/API/runtime изменения.
- `Очень высокий` — только для критической фазы: неизвестная причина или новая архитектура вместе с высоким blast radius; irreversible/destructive production-data migration; активация реальных платежей или финансовый cutover; live auth/security/privacy incident; multi-service cutover без надёжного rollback.
- Само наличие слов `production`, `deploy`, `database`, `migration`, `security` или `privacy` не является основанием для `Очень высокого`.
- После утверждения архитектуры и разделения работы на безопасные gates понижай реализацию до `Высокого`; возвращай `Очень высокий` только для критического review/cutover.
- `Максимальный/Max` используй только для hardest quality-first задач, где одновременно присутствуют несколько факторов `Очень высокого` и измеримо важен дополнительный reasoning.

Если задача несущественная и ответ односложный, `Model note` можно опустить. Если пользователь просит экономить токены, предпочитай более дешёвую модель и явно скажи об этом. Если текущая модель неизвестна, не утверждай её; укажи оптимальную модель для задачи.

<!-- ruslan-project-workflows:start -->
## Global Reusable Skills

В Codex reusable workflows доступны глобально из personal plugin `ruslan-project-workflows`. Перед существенной задачей выбери только skills, релевантные текущей задаче, по их descriptions; не загружай весь набор без причины.

Используй namespaced skill `ruslan-project-workflows:<skill-name>`. Если personal plugin недоступен на другом компьютере или в другом агенте, используй локальный fallback `skills/<skill-name>/SKILL.md`, если такой файл существует. Project-specific правила этого `AGENTS.md` имеют приоритет над общим skill.

Если пользователь просит несколько параллельных разработок или другой пишущий чат уже активен в том же проекте, используй `ruslan-project-workflows:parallel-project-lanes`: отдельный Git worktree/branch на worker и один coordinator для integration/release.

Hook не блокирует редактирование файлов: при активном `.git/codex-parallel/lanes.json` новый пишущий чат до первой правки проверяет lane status и не переиспользует worktree другого lane.

## Surface-aware Release State

Не называй один SHA «текущим commit» для всей системы. В release/status отчёте отдельно показывай feature/worker HEAD, local release branch, `origin/<release-branch>` и commit каждой реально развёрнутой поверхности (например frontend, backend, worker или static site).

Production drift существует только тогда, когда между live commit конкретной поверхности и release branch есть изменения файлов, влияющих на эту поверхность. Pure docs, tests и local operator tooling могут быть впереди production без повторного rebuild; это объяснённый non-runtime ahead, а не незавершённый deploy. Неизвестные пути классифицируй fail-closed до project-specific решения.

Backend runtime passport не доказывает версию frontend. Если поверхности деплоятся независимо, каждой нужен собственный проверяемый version/build passport или immutable artifact identity. После интеграции и после deploy проверяй все затронутые поверхности, а не только один общий endpoint.

Не удаляй и не коммить пользовательские untracked-файлы автоматически. Deploy может разрешать явно классифицированные non-runtime owner files только когда release строится из exact commit/artifact и эти файлы гарантированно не входят в build context; конфликтные копии, secrets и неизвестные runtime-файлы блокируют release. Prunable metadata очищай только после dry-run; существующие worktree/branch не удаляй без проверки dirty state, ancestry/containment и явного решения.
<!-- ruslan-project-workflows:end -->

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.
