# UI change contract

- Change ID: `2026-10-02-video-copy-removal`
- Requested visible change: remove all invented per-video headings and descriptions; retain only the shared `Тимур в работе` heading and the four playable videos.
- Surface: `/` and `/novogodniy-korporativ/`
- User state / fixture: public landing, video block before any playback.
- Exact target: `#cases .video-case__copy`
- Action to reveal target: load the public route and scroll to `#cases`.
- Reported CSS viewport: no owner-specific viewport supplied.
- Affected breakpoints: shared video grid desktop and mobile.
- Baseline visible signature: four `.video-case__copy` blocks are visible below the posters; the first reads `Ведущий на сцене` and its description.
- Expected visible signature: `#cases` contains the shared eyebrow, `Тимур в работе`, four video posters and play controls, with zero `.video-case__copy` blocks.
- Must remain unchanged: four video URLs, posters, play controls, shared order and the rest of both routes.
- Required viewports: desktop and mobile.
- Attempt number for this exact target: `1`
- Owner reference/selected variant after attempt 2: not applicable.

Acceptance: the current served candidate is proven, no per-video editorial copy is visible on either route, and each video remains playable.
