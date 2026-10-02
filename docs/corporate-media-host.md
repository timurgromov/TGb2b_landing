# Corporate media host

## Active delivery

- Provider: Aeza;
- service: `#1847209`, `open-blue`;
- IP: `213.176.94.245`;
- SSH user: `root`;
- public media base: `https://media.213-176-94-245.sslip.io`;
- corporate directory: `/srv/tg26-media-backup/public/corporate-ground/`;
- public corporate URL shape: `https://media.213-176-94-245.sslip.io/corporate-ground/<file>.mp4`.

The directory is a subdirectory of the existing `tg26-media-backup` static media container. It is separate from the wedding media files but is served by the same HTTPS host and supports byte-range playback.

## Access rule

The canonical local access handoff for this exact VPS is `../PastLife AI/.local/AEZA_DEPLOY_SECRETS.md` relative to workspace `1. Проекты WibeCoding`. It holds the active root password for `213.176.94.245`; consume it programmatically only for the required SSH/SCP command and never print, commit, paste or copy its value into repository files, shell history or chat.

Do not start from the Aeza browser account or declare an access blocker merely because no matching SSH key is visible. `~/.ssh/tg26_media_vps_ed25519` belongs to another historical host and is not valid for `open-blue`.

## Current corporate files

- `timur-on-stage.mp4`;
- `manner-of-communication.mp4`;
- `improvisation.mp4`;
- `guest-interaction.mp4`.

These files are delivery copies downloaded from the previous Boomstream URLs. They are not committed into the landing repository. Any new file must be uploaded outside the repository, checked with a public HTTPS range request, then referenced from the shared `videos` data so `/` and `/novogodniy-korporativ/` remain identical.

The live-music package also uses `live-music-showreel.mp4` from this directory. It is a 720p/25fps H.264/AAC delivery derivative of the owner-supplied source; the source itself is not published or committed. The 3:45 click-to-play showreel is a documented delivery-size exception at about 38 MiB: it has `faststart`, byte-range support and no transfer until the visitor presses Play over the existing poster.

## Delivery-size exception

The current case videos are large delivery files (approximately `274M`, `94M`, `20M` and `17M`; `404M` together on disk). They begin only after an explicit user click and are served with byte ranges, so the page does not preload them. Keep them as the approved migration copies for now; before replacing or adding a new video, produce a 1080p/30fps delivery derivative and review its visual quality rather than uploading a camera master unchanged.
