# Deploy handoff

## Контур

- source branch: `astro-migration`;
- static output: `dist/`;
- production branch: `gh-pages`;
- custom domain: `corp.timurgromov.ru`;
- public URL: `https://corp.timurgromov.ru/`.

В репозитории нет GitHub Actions workflow. Production-ветка имеет отдельную историю и содержит только результат статической сборки.

## Preflight

```bash
git status --short --branch
npm ci
npm run build
npm run verify:seasonal
git diff --check
```

До публикации source-изменения должны быть закоммичены и отправлены в `origin/astro-migration`.

## Публикация

1. Создать временный worktree ветки `gh-pages` от актуального `origin/gh-pages`.
2. Скопировать содержимое `dist/` в корень worktree с удалением файлов, которых больше нет в сборке.
3. Проверить наличие `CNAME`, главной страницы, сезонной страницы, privacy page и sitemap.
4. Закоммитить только статический output и отправить `gh-pages` в origin.
5. Удалить временный worktree штатной командой Git.

Нельзя переключать основной source checkout на `gh-pages` или смешивать статический output с source commit.

## Production verification

После обновления GitHub Pages проверить свежей загрузкой:

- `/` сохранил исходный H1 и два CTA;
- `/novogodniy-korporativ/` содержит сезонный H1, CTA и форму;
- `/portfolio/` и `/portfolio/novogodniy-korporativ/` содержат форматы, видео и отзывы без цен; логотип и сезонный анонс ведут внутри портфолио;
- `/privacy/` открывается;
- нет горизонтального overflow и console errors на согласованных ширинах;
- публичные CSS, JS, изображения и sitemap отвечают `200`.

Реальную форму не отправлять без отдельного разрешения: HTTP `201` означает создание рабочей CRM-заявки и может запустить уведомления.

После release 2026-10-15 дополнительно проверять `/consent/`, `/legal-consent.js`, `/legal-consent.css`, footer links и изначально пустой required-чекбокс в callback на обоих route. Production POST не использовать для QA.

## Deploy standard 1.0.0

Run `./scripts/deploy-pages.sh` from the exact pushed `astro-migration` commit. The entrypoint builds an exact Git archive, serializes publication with a local lock, publishes through an isolated `gh-pages` worktree and verifies `deploy-version.json` at the production domain. It records upload, build, checks and total durations. Runtime files must be tracked in the source commit. Rollback publishes the previous verified static commit from the gh-pages history after source/artifact review.

The static sync compares file contents so a new release passport is copied even when its size and timestamp match the checkout.
