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
- `/privacy/` открывается;
- нет горизонтального overflow и console errors на согласованных ширинах;
- публичные CSS, JS, изображения и sitemap отвечают `200`.

Реальную форму не отправлять без отдельного разрешения: HTTP `201` означает создание рабочей CRM-заявки и может запустить уведомления.
