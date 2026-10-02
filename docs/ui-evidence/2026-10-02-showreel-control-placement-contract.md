# UI change contract — showreel control placement

- Change ID: `2026-10-02-showreel-control-placement`
- Requested visible change: make the showreel action explicit without covering any part of the artists' photograph.
- Surface: shared music-program block on `/` and `/novogodniy-korporativ/`.
- Exact target: `.music-program__showreel`.
- Action: before playback, scroll to the image and inspect the available action; then press `Смотреть шоу-рил`.
- Required CSS viewports: `1280x720` and `390x844`.
- Baseline visible signature: a circular orange Play icon is centered over and covers a portion of the photograph.
- Expected visible signature: the full photograph remains unobstructed; directly below it sits a compact outlined pill with play icon, label `Смотреть шоу-рил` and duration `3:45`.
- Must remain unchanged: the photo crop, card layout, video URL, click-to-play behavior, native playback controls and shared use on both routes.
- Attempt number for this exact target: `1`.
