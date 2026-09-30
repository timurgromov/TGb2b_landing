# UI change contract

- Change ID: `2026-10-01-restore-subtitle-and-packages`
- Requested visible change: вернуть согласованный подзаголовок первого экрана и исходную адаптивную сетку пакетов, случайно задетую при переработке блока кейсов.
- Surface: `/novogodniy-korporativ/`.
- User state / fixture: публичная страница без авторизации; формы не отправляются.
- Exact target: `#hero-subtitle`, `.service-formats__grid`, `.service-format`.
- Action to reveal target: открыть первый экран и перейти к `#formats`.
- Reported CSS viewport: `1280x720` CSS px.
- Affected breakpoints: `768`, `1180`; проверить `767/768/769` и `1179/1180/1181`.
- Baseline visible signature: подзаголовок заменён без согласования; на live при `1280x720` контейнер пакетов имеет `display:block`, а три карточки стоят вертикально по `1118px`.
- Expected visible signature: исходный согласованный подзаголовок; пакеты имеют три колонки с `16px` gap на desktop, `2+1` на tablet и одну колонку на mobile.
- Must remain unchanged: состав и тексты трёх пакетов, текущий блок благодарностей, CTA, форма, палитра, типографика и соседние секции.
- Required viewports: `390x844`, `767x844`, `768x1024`, `769x1024`, `974x1024`, `1024x768`, `1179x900`, `1180x900`, `1181x900`, `1280x720`, `1366x768`, `1440x900`, `1984x1046`.
- Attempt number for this exact target: `1`.
- Owner reference/selected variant after attempt 2: не требуется; это точное восстановление ранее согласованного состояния.

Acceptance: старый подзаголовок восстановлен дословно, адаптивная сетка пакетов совпадает с состоянием до регрессии, горизонтального overflow нет, блок благодарностей не изменён.
