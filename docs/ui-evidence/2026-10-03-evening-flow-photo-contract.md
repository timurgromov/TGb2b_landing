# Evening-flow photo contract

- Change ID: `2026-10-03-evening-flow-photo`
- Requested visible change: добавить современную фотографию Тимура в общий блок `Как проходит корпоратив` на `/` и `/novogodniy-korporativ/`.
- Canonical source: существующий `src/components/EveningFlow.astro` и его текущие классы; новый отдельный дизайн не создаётся.
- Exact target: `#evening-flow .evening-flow__media`, после пяти этапов и до существующего CTA.
- Baseline signature: блок заканчивается пятой карточкой и сразу переходит к CTA; иллюстрации внутри блока нет.
- Expected signature: после пяти карточек появляется одна широкая фотография с сохранённой композицией; CTA, тексты и порядок секций не меняются.
- Responsive contract: desktop использует ограниченную по высоте широкую композицию; mobile показывает исходное соотношение `3:2` без обрезки людей.
- Required routes: `/`, `/novogodniy-korporativ/`.
- Required viewports: `390x844`, `767x900`, `768x900`, `769x900`, `1179x900`, `1180x900`, `1181x900`, `1366x768`, `1440x900`, `1984x1046`.
- Preserved: hero, видео, карточки этапов, CTA, пакеты, формы, аналитика и публичные цены.
