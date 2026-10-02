# UI change contract — showreel Play pulse

- Change ID: `2026-10-02-showreel-play-pulse`
- Surface: shared `MusicProgram` showreel control on `/` and `/novogodniy-korporativ/`.
- Requested visible change: the centred orange circular Play button should use the same soft repeating pulse as the primary video Play buttons already on the site.
- Exact target: `.music-program__play`.
- Action: open the music-program poster before playback and observe the control.
- Required CSS viewports: `1280x720` and `390x844`.
- Expected visible signature: the button remains 62px, centred in the image with `Смотреть шоу-рил · 3:45` at the lower-left; it now has the existing `pulse` animation and is hidden with the overlay during playback.
- Must remain unchanged: photo crop, caption placement, shared component parity, video source, native playback controls and no horizontal overflow.
- Attempt number for this exact target: `1`.
