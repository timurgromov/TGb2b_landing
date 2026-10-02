# UI change contract — centred showreel action and playback state

- Change ID: `2026-10-02-showreel-centered-playback`
- Requested visible change: centre the showreel action in the image and ensure it does not overlay native video controls after activation.
- Surface: shared music-program block on `/` and `/novogodniy-korporativ/`.
- Exact target: `.music-program__play` and `.music-program__media`.
- Action: open the poster, press `Смотреть шоу-рил`, pause with native controls, then end/reset the video.
- Required CSS viewports: `1280x720` and `390x844`.
- Baseline visible signature: the labelled pill stays over the video after it begins, and the action is positioned at the lower image edge.
- Expected visible signature: the labelled pill is centered in the poster; the explicit click hides it while native video controls are visible; ordinary pause keeps the custom pill hidden; the poster and custom action return at video end.
- Must remain unchanged: image crop, text, native controls, video URL, shared route parity and no horizontal overflow.
- Attempt number for this exact target: `1`.
