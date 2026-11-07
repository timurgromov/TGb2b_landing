# Smart VPS Deploy Preset

Version: 1.0.0
Source: `Tamplates/DEPLOY_TEMPLATE.md`

Переносимый пресет для небольших web-проектов на VPS. Цель: ускорить частые deploy без перехода к ручному копированию файлов и без состояния "на сервере непонятно что".

## Principles

* Production deploy должен быть связан с git commit.
* Production deploy разрешён только из configured release branch и выполняется через один lock.
* Fast deploy не должен быть patch-ем прямо в живой контейнер.
* Deploy mode выбирает, какие части системы трогать; всё остальное остаётся запущенным.
* Release status разделяет worker/feature HEAD, release branch, origin и live commit каждой поверхности. Backend passport не доказывает frontend; docs/tests/operator-only ahead не требует rebuild.
* Неизвестные changed paths fail-closed до project-specific surface mapping.
* Classified non-runtime owner files могут оставаться untracked, потому что release собирается из exact commit artifact; conflict copies, secrets и неизвестные runtime-файлы блокируют release. Любой image/PDF/font/media, на который ссылается runtime-код, должен быть tracked в exact release commit.
* SPA/frontend за nginx/CDN должен отдавать JS/CSS/JSON с compression и keep-alive/HTTP2; `keepalive_timeout 0`, отключенный gzip/brotli или нормальный `Connection: close` для app shell/assets запрещены.
* Если nginx config смонтирован в Docker как single-file bind mount, config-change deploy должен пересоздавать только nginx container перед `nginx -t`/reload, иначе контейнер может читать старый inode после `git checkout`.
* Готовые образы и кэш сборки обслуживаются отдельно. Очистка сохраняет образы, привязанные к контейнерам, и версии для отката.
* Docker volumes не чистятся автоматом: там обычно база, Redis, uploads или очереди.
* Любой deploy заканчивается health checks и печатает `df -h /` + `docker system df`.

## Modes

```text
full
  Полный production release.
  Использовать для Dockerfile, dependencies, env/runtime, migrations, storage, queue, payments, risky changes.

code
  Backend + frontend code release без data/catalog sync.
  Использовать для обычных смешанных кодовых правок.

frontend
  Build/restart только frontend.
  Использовать для UI, текстов, CSS, статических frontend-правок.

backend
  Build/restart backend + workers, init DB/migrations if needed.
  Использовать для API, worker, server-side logic.

data
  Без Docker build/restart, только sync каталога/seed/data через проверенный endpoint или DB script.
  В конкретном проекте можно назвать cards, catalog, content или admin-data.
```

## Required Env

```bash
VPS_HOST="${VPS_HOST:-example.com}"
VPS_USER="${VPS_USER:-root}"
VPS_APP_DIR="${VPS_APP_DIR:-/opt/my-app}"
VPS_DEPLOY_MODE="${VPS_DEPLOY_MODE:-full}"
VPS_RELEASES_KEEP="${VPS_RELEASES_KEEP:-5}"
VPS_MIN_BUILD_FREE_GIB="${VPS_MIN_BUILD_FREE_GIB:-10}"
RELEASE_BRANCH="${RELEASE_BRANCH:-main}"
VPS_DEPLOY_LOCK="${VPS_DEPLOY_LOCK:-/var/lock/my-app-deploy.lock}"
```

Secrets передавать только через локальные env-переменные или хранить на VPS в shared `.env`. Не коммитить secrets и не печатать их в logs.

## Bash Template

```bash
#!/usr/bin/env bash
set -euo pipefail

mode="${VPS_DEPLOY_MODE:-full}"
while (($# > 0)); do
  case "$1" in
    --mode) mode="$2"; shift 2 ;;
    --mode=*) mode="${1#--mode=}"; shift ;;
    -h|--help) echo "Usage: deploy.sh --mode full|code|frontend|backend|data"; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 1 ;;
  esac
done

build_backend=0
build_frontend=0
restart_backend=0
restart_frontend=0
run_migrations=0
sync_data=0

case "$mode" in
  full)
    build_backend=1; build_frontend=1; restart_backend=1; restart_frontend=1; run_migrations=1; sync_data=1 ;;
  code)
    build_backend=1; build_frontend=1; restart_backend=1; restart_frontend=1; run_migrations=1 ;;
  frontend)
    build_frontend=1; restart_frontend=1 ;;
  backend)
    build_backend=1; restart_backend=1; run_migrations=1 ;;
  data)
    sync_data=1 ;;
  *)
    echo "invalid mode: $mode" >&2; exit 1 ;;
esac

commit="$(git rev-parse --short=12 HEAD)"
branch="$(git branch --show-current)"
release_branch="${RELEASE_BRANCH:-main}"
test "$branch" = "$release_branch" || {
  echo "production deploy requires $release_branch, got $branch" >&2; exit 1
}
test -z "$(git status --porcelain --untracked-files=no)" || {
  echo "tracked working tree is not clean" >&2; exit 1
}
if git ls-files --others --exclude-standard | grep -q .; then
  echo "untracked files are excluded from the exact-commit release; classify conflict copies, secrets and runtime paths in the project adapter"
fi
git fetch origin "$branch" >/dev/null
test "$(git rev-parse HEAD)" = "$(git rev-parse "origin/$branch")" || {
  echo "HEAD is not pushed" >&2; exit 1
}

# MANDATORY project adapter: this template is incomplete until the real remote release command
# below is wrapped by the server-side lock. A comment or local worktree lock is not sufficient:
# flock -w 900 "${VPS_DEPLOY_LOCK:-/var/lock/my-app-deploy.lock}" <remote-release-command>
#
# Project-specific steps:
# 1. Upload the exact-commit archive or pass the immutable image references from CI.
# 2. Acquire the server-side lock before changing releases, images or runtime.
# 3. Check free space on the release and Docker storage filesystems.
# 4. Prepare only the selected images and keep the previous image references for rollback.
# 5. After all selected images are ready, switch current and restart selected services.
# 6. Run migrations or data sync only when explicitly enabled.
# 7. Verify the release and its dependencies. Record df -h / and docker system df on the VPS.
```

## Сборка на VPS

Установи Buildx, совместимый с Docker на сервере. На PastLife с Ubuntu
`docker.io` подошёл пакет `docker-buildx`. Под замком деплоя проверь, что
Buildx доступен и встроенный сборщик использует драйвер `docker`. Перед сборкой
проверь свободное место на дисках с релизами и данными Docker. На PastLife
минимум составляет `VPS_MIN_BUILD_FREE_GIB=10`. Подбери его под размер сборки
конкретного проекта.

В удалённом скрипте для каждого выбранного сервиса задай его `image_repository`
и `build_context`, затем собери образ с тегом коммита.

```bash
builder_info="$(docker buildx inspect default --bootstrap)" || exit 1
grep -Eq '^Driver:[[:space:]]+docker[[:space:]]*$' <<<"$builder_info" || exit 1
docker buildx build --builder default --load \
  --tag "${image_repository}:${commit}" \
  --label "org.opencontainers.image.revision=${commit}" \
  "$build_context" || exit 1
```

Если сборщик недоступен, места мало или сборка завершилась ошибкой, останови
выкладку до переключения контейнеров.

## Готовый образ из CI

CI собирает образ, отправляет его в приватный реестр и передаёт деплою коммит,
сервис и digest. VPS скачивает образ по `repository@sha256:…` с доступом на
чтение. Для отката сохраняется предыдущий проверенный digest.

Это опциональный delivery-path, а не обязательная замена сборки на VPS. Не
добавляй registry, credentials или новый CI только ради соответствия шаблону.
Сначала докажи, что проекту подходит этот путь и что deploy проверяет digest,
паспорт запущенной поверхности и запуск предыдущего digest для отката.

## Deploy timing

Каждый обычный deploy, который загружает release, собирает образ или запускает
публичные проверки, печатает machine-readable строку с режимом и SHA:

```text
deploy-timing mode=frontend commit=0123456789ab upload_s=12 build_s=34 checks_s=18 total_s=71
```

Минимальный переносимый контракт:

* `upload_s` — доставка exact-commit archive или digest metadata до VPS;
* `build_s` — только сборка выбранных образов; для CI-image режима вместо неё
  допустимо `pull_s`, но название поля нельзя менять между сравниваемыми
  релизами;
* `checks_s` — время от начала post-switch проверок до последнего успешного
  health/passport/live check;
* `total_s` — wall-clock от получения deploy lock до успешного завершения;
* `mode` и полный или 12-символьный `commit` обязательны во всех строках.

`remote_s` можно печатать дополнительно, но это обычно inclusive-фаза со
сборкой, переключением и remote checks. Не складывай `remote_s` с `build_s` и
другими вложенными фазами как независимые величины.

До заявления об ускорении сохрани сопоставимый baseline: тот же mode, класс
изменения, состав archive/images, VPS, набор checks и близкое состояние кэша.
Рядом с timing запиши размер архива или digest, состояние cold/warm cache и
существенные условия хоста. Старый журнал без разбиения фаз годится только для
сравнения `total_s`, а не для вывода об ускорении upload/build/checks.

Повторная сборка одного SHA с прогретым кэшем измеряет cache reuse, а не
экономию полного release. Результат вроде `34 -> 1 с` нельзя выдавать за
ускорение end-to-end deploy без сопоставимых `upload_s`, `build_s`, `checks_s`
и `total_s` обычных релизов.

Пример локальной обвязки вокруг project-specific upload/remote/check phases:

```bash
deploy_started=$SECONDS

upload_started=$SECONDS
# upload exact-commit archive or immutable digest metadata
upload_seconds=$((SECONDS - upload_started))

# The remote release prints its own build_s for the selected mode and commit.
# Keep that value separate from an optional inclusive remote_s.

checks_started=$SECONDS
# health, per-surface passport and fresh live checks
checks_seconds=$((SECONDS - checks_started))

printf 'deploy-timing mode=%s commit=%s upload_s=%d build_s=%d checks_s=%d total_s=%d\n' \
  "$mode" "$commit" "$upload_seconds" "$build_seconds" "$checks_seconds" \
  "$((SECONDS - deploy_started))"
```

## Очистка Docker

Удаляй устаревшие образы из явного списка репозиториев проекта, сохраняя
образы всех контейнеров и проверенные версии для отката. Запускай уборку по
расписанию под тем же замком, что и деплой. Замеряй свободные байты до и после.

Для сборки на VPS отдельно задай цель размера кэша. На PastLife по ночам
работает `docker buildx prune --builder default --force --max-used-space 6gb`.
На VPS с несколькими проектами встроенный сборщик использует общий кэш.
Согласуй один бюджет и один запуск уборки под замком, общим для сборок на хосте.

## Acceptance Checklist

* `deploy.sh --help` lists modes.
* Invalid mode fails before upload.
* Production deploy from a feature branch fails before upload.
* Tracked dirty work fails before upload; classified non-runtime untracked owner files are excluded by the exact-commit artifact.
* Concurrent production deploys serialize through a server-side lock.
* Default deploy is `full`.
* `frontend` does not restart backend/workers/DB.
* `backend` does not rebuild/restart frontend.
* `data` does not build/restart Docker services.
* Отказ сборщика и нехватка места останавливают выкладку до переключения.
* Проверь сборку с пустым и прогретым кэшем, а также правку кода с прежними зависимостями. Измерь отдельно сборку, доставку и время до успешных проверок сайта.
* Запусти предыдущий образ отдельно и проверь, что штатная уборка его сохраняет.
* Health checks prove the touched surface is live.
* Deploy output records `mode`, `commit`, `upload_s`, `build_s` or stable
  `pull_s`, `checks_s` and `total_s`; any speed claim cites a comparable
  baseline and labels cold/warm cache state.
* Added runtime-assets are present in the exact commit and are fetched successfully from the live surface; a build alone or an `/assets/undefined` response is not acceptance.
* Independent frontend/backend surfaces expose and verify separate commit/build identities.
* For SPA/frontend, verify real asset delivery, for example `curl --compressed -D - https://example.com/assets/index.js?v=<commit> -o /dev/null`: expect compression for JS/CSS/JSON and no normal `Connection: close` mode.
