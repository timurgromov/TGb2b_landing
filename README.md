# TGb2b landing

Статический Astro-сайт ведущего корпоративных мероприятий.

- production: `https://corp.timurgromov.ru/`;
- сезонная посадочная: `/novogodniy-korporativ/`;
- output: `dist/`;
- production branch: `gh-pages`;
- source branch: `astro-migration`.

## Локальная проверка

```bash
npm ci
npm run build
npm run verify:seasonal
npm run preview -- --port 4321
```

`verify:seasonal` проверяет собранные страницы, контракт отправки лида, sitemap и отсутствие регрессии ключевых элементов главной страницы.

## Публикация

Production публикуется из отдельной orphan-ветки `gh-pages`. Точная последовательность и проверки описаны в [`docs/DEPLOY_HANDOFF.md`](docs/DEPLOY_HANDOFF.md).

Корпоративные MP4 обслуживаются отдельным каталогом на общем media-host; доступ и безопасный порядок загрузки описаны в [`docs/corporate-media-host.md`](docs/corporate-media-host.md).

Секреты и runtime env для сборки не требуются. Реальная отправка формы создаёт заявку в рабочем контуре и не должна использоваться как автоматический smoke-тест.
