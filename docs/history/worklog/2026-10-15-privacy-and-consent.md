# Privacy and separate form consent — 2026-10-15

## Политика и отдельное согласие — 2026-10-15

- Surface: `corp.timurgromov.ru/` и `/novogodniy-korporativ/`. `/privacy/` описывает обработку; `/consent/` содержит отдельный текст согласия, версия `2026-10-15`. Старая ссылка `/privacy/#consent` ведёт к ссылке на отдельный документ.
- Baseline: объединённая фраза «Нажимая кнопку…», без отдельного чекбокса; корпоративный/юбилейный footer без документов.
- Candidate: изначально пустой required-чекбокс; ссылки на согласие и политику читаются отдельно. Без отметки submit блокируется, в том числе на форме с `novalidate` и при dispatch события submit. Повторное открытие формы требует нового согласия после её reset.
- Receipt: версия, URL документа и browser ISO timestamp добавляются в существующий `comment`/`details`, который EventBudjet сохраняет в заявке. Это клиентская отметка, не серверная аттестация личности и не отдельный неизменяемый журнал согласий. Backend-контракт не меняется.
- Никаких рекламных согласий и акцепта оферты в этом чекбоксе. Источники, цены, provider links, Метрика и цели остаются прежними.
- Проверка: 390×900 и 1440×900; пустая/отмеченная галочка, mock HTTP 500/201, версия и URL в POST, отсутствие overflow и uncaught runtime errors. Реальные заявки не отправляются.
- Границы: отдельный механизм opt-in аналитики/cookie ещё не внедрён. Подтверждение реквизитов/публичного адреса, уведомления РКН и оснований передачи сервисам остаются задачей владельца; документы не являются подтверждением полного соответствия 152-ФЗ.

## Release

Local validation passed: both builds, corporate seasonal contract, Jubilee pricing contract, Direct attribution contract; wedding contact gate and all 294 responsive cases. Focused isolated-browser QA passed 16 cases: four surfaces at 390x900 and 1440x900 with unchecked/default, custom-submit bypass prevention, checked receipt, mock HTTP 500 error and 201 success; four document routes at both widths, no page errors/overflow. External services were isolated in the functional fixture; no real leads sent. Live IAB observations: corporate callback desktop; New Year/Jubilee callback at 390x844; wedding callback at 1440x900. Baseline had no checkbox, candidate shows required empty checkbox before submit plus independent links. Production publication is pending.

Operator identity/email reused from existing public pages. Owner confirmation/postal address not received; no address invented. Analytical consent/notification review remains open, outside this form-policy release.
