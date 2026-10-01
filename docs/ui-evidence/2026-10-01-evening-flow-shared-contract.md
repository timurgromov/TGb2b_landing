# Shared evening-flow block contract

- Change ID: `2026-10-01-evening-flow-shared`
- Requested visible change: добавить на обе корпоративные страницы отдельный блок `Как проходит корпоратив`, который описывает опыт гостей и не дублирует сервисный блок `Порядок работы`.
- Exact targets: `/`, `/novogodniy-korporativ/`, `#evening-flow`, immediately after `#cases` and before `#benefits`.
- Baseline signature: на обеих страницах после видео сразу начинается блок преимуществ; `#evening-flow` отсутствует.
- Expected desktop signature: пять карточек в композиции `3 + 2`, общий заголовок, пояснение и CTA.
- Expected tablet signature: две колонки, последняя карточка занимает полный ряд.
- Expected mobile signature: пять карточек в одну колонку и полноширинный CTA без горизонтального overflow.
- Shared copy: сбор гостей, официальная часть, основная программа, музыка и танцы, финал вечера.
- Route context: на `/` CTA открывает существующую контактную форму; на `/novogodniy-korporativ/` CTA ведёт к `#proverit-datu`.
- Preserved: оба hero, видео, преимущества, пакеты, доказательства, `Порядок работы`, галерея, письма, FAQ, формы и отсутствие публичных цен.
- Required viewports: `390x844`, `768x1024`, `1180x820`, `1366x768`, `1440x900`, `1984x1046`; boundary probes `768/769` and `1180/1181`.
- Required checks: обе страницы, порядок секций, CTA, отсутствие горизонтального overflow и blocking console errors.
