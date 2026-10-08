# UI change contract

- Change ID: `2026-10-08-seasonal-single-date-control`.
- Surface: `/novogodniy-korporativ/`, `#formats`; ordinary corporate and Jubilee are outside this price change.
- Baseline observed in the live browser: a wide native date input precedes the cards; three small calendar buttons repeat the action in the cards; a fourth `Выбрать дату` action sits below the cards. The native input overflows at the owner's mobile width.
- User job: identify the December starting price, select one date, compare the three prices, and optionally proceed to the existing availability form.
- Expected visible delta: one orange, text-labelled `Выбрать дату` action above all cards; no exposed native input or per-card calendars; on selection each card displays `25 декабря, пятница` above its price and the top action becomes `Изменить дату`.
- Initial state: `Сейчас показана минимальная цена декабря`, 5-hour programme, one shared extension quote, three minimum prices with `от`.
- Price boundary: 25 December shows `220 000 / 250 000 / от 400 000 ₽` and `25 000 ₽` extension; 31 December keeps `от` for all three prices and shows `35 000 ₽` extension.
- Preserved: 14-row matrix, native date picker, date sync into the detailed form, contents disclosures, CRM quote comment, and HTTP `201` success gate.
- Viewports: `320x844`, `390x844`, `768x1024`, `769x900`, `1024x768`, `1025x768`, `1440x900`.
- Acceptance: action and text stay within the viewport; no page overflow; date action opens the native picker; selected date changes all three prices and the form date; no console errors. No real form submission.
