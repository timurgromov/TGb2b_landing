# UI change contract

- Change ID: `2026-10-08-seasonal-compact-price-calculator`
- Requested visible change: после ввода даты посетитель сразу видит все три цены и понимает, что расчёт обновился; длинный третий пакет не должен вытеснять цены и CTA ниже экрана.
- Surface: только `/novogodniy-korporativ/`; обычный корпоративный `/` и юбилей не изменяются.
- User state: публичная страница, дата `2026-12-25`.
- Exact target: `#formats`, единая панель `[data-seasonal-pricing]`, три `[data-pricing-package]`, допчас и `[data-pricing-check-date]`.
- Action to reveal target: выбрать 25 декабря 2026 года в native date input.
- Baseline visible signature: на `390x844` цены расположены в трёх длинных карточках на Y `744 / 1109 / 1675`, CTA на Y `2055`; на `1440x900` цены начинаются около Y `948`, ниже viewport; на `1180x820` третий пакет переносится во второй ряд.
- Expected visible signature: дата, все три компактные цены и понятный CTA находятся в одной визуальной панели; длинные составы открываются отдельным `details`; полная матрица остаётся отдельным `details`.
- Must remain unchanged: утверждённые цены и диапазоны, составы пакетов, подробный блок живой музыки, форма и HTTP `201` success gate, обычный корпоративный маршрут, юбилей, CRM и Метрика.
- Required viewports: `320x844`, `390x844`, `768x1024`, `769x900`, `1023x768`, `1024x768`, `1025x768`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`.
- Breakpoint contract: компактные строки до `1024px`; три ценовые колонки с `1025px`; detailed package grid continues to use the shared site breakpoints.
- Attempt number for this exact target: `1`.
- Owner approval: сообщение от 8 октября 2026 года — сделать более изящный и максимально удобный просмотр всех вариантов после ввода даты.

Acceptance: после выбора даты три цены заметно обновляются в той же панели, CTA работает, длинные составы раскрываются по запросу, матрица сохраняется, overflow и console errors отсутствуют на всей viewport-матрице.
