# UI change contract — showreel overlay control

- Change ID: `2026-10-02-showreel-overlay-control`
- Requested visible change: restore the card's even lower edge by placing the explicit showreel control on the photo, without obscuring the people in it.
- Surface: shared music-program block on `/` and `/novogodniy-korporativ/`.
- Exact target: `.music-program__showreel > .music-program__play`.
- Action: load the route, scroll to the image and inspect the control; press it to begin playback.
- Required CSS viewports: `1280x720` and `390x844`.
- Baseline visible signature: the labelled Play pill is a separate row below the photograph, making the left card taller than the adjacent option stack.
- Expected visible signature: the labelled Play pill is centered 16px above the lower image edge on a dark translucent glass background; card geometry is restored and the pill covers no face.
- Must remain unchanged: readable label and duration, click-to-play behavior, video URL, card copy and image crop.
- Attempt number for this exact target: `1`.
