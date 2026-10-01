# Shared corporate route parity contract

- Change ID: `2026-10-01-shared-route-parity`
- Requested visible change: основная и новогодняя корпоративные страницы используют одинаковый набор несезонных блоков; новогодними остаются только первый экран, сезонный промо-контекст, даты/CTA и форма.
- Exact targets: `/`, `/novogodniy-korporativ/`, `#benefits`, `#formats`.
- Baseline viewport: `1280x720`.
- Baseline root signature: `#benefits` присутствует, `#formats` отсутствует.
- Baseline seasonal signature: `#formats` присутствует, `#benefits` отсутствует; третий формат подписан как `Ведущий + DJ + звук + кавер-группа`.
- Expected root signature: последовательно присутствуют `#benefits` и `#formats`; CTA форматов открывает штатный контактный popup.
- Expected seasonal signature: последовательно присутствуют `#benefits` и `#formats`; CTA форматов ведёт к `#proverit-datu`.
- Expected shared copy: третий формат — `Ведущий + DJ + звук + музыкальное шоу`, состав — два вокалиста и саксофонист.
- Preserved: текущая тёмная визуальная система, сетка пакетов, hero обеих страниц, сезонный promo на `/`, разные workflow/финальные CTA, кейсы, письма, FAQ, формы, цены отсутствуют.
- Required viewports: `390x844` and `1280x720` on both routes.
- Required checks: no horizontal overflow, no blocking console errors, root package CTA opens its modal, seasonal package CTA reaches the seasonal form.
