# 2026-10-07 — Event Calculator на двух корпоративных маршрутах

Основной Telegram CTA в общей панели и на странице контактов ведёт в текущий
бот. Источник включает `corporate` или `new_year` и placement. Скрипт
получает `ClientID` счётчика `104468814` или `yclid`, запрашивает
атрибуционный токен EventBudjet и сохраняет исходный deep link как fallback.
Личный Telegram не показывается в панели. Формы и правило
успеха только после HTTP 201 не изменены.

Метрика API подтвердила goal `order_confirmed` ID `670525250`. Временная цель
`telegram_personal_click` ID `670526622` удалена API, повторный список
активных целей её не содержит. Локально прошли `npm run build`
и `npm run verify:seasonal`. Production и живой Telegram click-through
добавляются после выпуска.
