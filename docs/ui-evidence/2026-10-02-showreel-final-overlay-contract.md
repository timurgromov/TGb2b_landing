# UI change contract — final showreel overlay

- Change ID: `2026-10-02-showreel-final-overlay`
- Surface: the shared `MusicProgram` component on `/` and `/novogodniy-korporativ/`.
- Requested visible change: restore a simple orange circular Play control in the centre of the artists' photo; put `Смотреть шоу-рил · 3:45` in the lower-left corner of that photo; remove the visible heading `Состав третьего пакета`.
- Exact target: `.music-program__showreel`, `.music-program__play`, `.music-program__showreel-caption`.
- Action: inspect the poster, then press the circular Play control.
- Required CSS viewports: `1280x720` and `390x844`.
- Expected before-playback signature: an orange circle is centred in the photo, the small duration caption is 14px from its lower-left edge, and no `Состав третьего пакета` heading is visible.
- Expected after-playback signature: the custom circle and caption disappear; the same media frame contains one native video element with its native controls.
- Must remain unchanged: photo crop, media URL, two-route parity, click-to-play behaviour and native controls.
- Attempt number for this exact target: `1`.
