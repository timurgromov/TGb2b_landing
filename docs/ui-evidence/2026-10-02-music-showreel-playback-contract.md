# UI change contract

- Change ID: `2026-10-02-music-showreel-playback`
- Requested visible change: replace the static photo-only media area in the shared live-music package block with the same photo as a poster and a visible play control that starts the uploaded showreel in that area.
- Surface: `/` and `/novogodniy-korporativ/`.
- User state / fixture: public landing at `#music-program`, before starting playback.
- Exact target: `.music-program__media`.
- Action to reveal target: load the route, scroll to the music-program block and press the play control over the photo.
- Required CSS viewports: `1280x720` and `390x844`.
- Baseline visible signature: the block has a static photo and no visible play control or playable showreel.
- Expected visible signature: the photo retains its current crop as a poster with a visible orange play control; pressing it replaces the poster with the self-hosted showreel and browser video controls.
- Must remain unchanged: current copy, package cards, photo derivative, shared block placement and route-specific CTA behavior.
- Attempt number for this exact target: `1`.

Acceptance: both routes use the shared component; the video begins only after the explicit click, with no automatic download before that action.
