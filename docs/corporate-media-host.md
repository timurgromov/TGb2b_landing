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

The root password is available in the locally authenticated Aeza Personal Account, service page `https://my.aeza.net/services/1847209`: copy it with the password control there when a one-off SSH/SCP upload is required.

Do not treat the absence of an SSH key or a macOS Keychain record as lack of access. Do not store or print the password in this repository, documentation, shell history, environment files, or chat.

## Current corporate files

- `timur-on-stage.mp4`;
- `manner-of-communication.mp4`;
- `improvisation.mp4`;
- `guest-interaction.mp4`.

These files are delivery copies downloaded from the previous Boomstream URLs. They are not committed into the landing repository. Any new file must be uploaded outside the repository, checked with a public HTTPS range request, then referenced from the shared `videos` data so `/` and `/novogodniy-korporativ/` remain identical.

## Delivery-size exception

The current case videos are large delivery files (approximately `274M`, `94M`, `20M` and `17M`; `404M` together on disk). They begin only after an explicit user click and are served with byte ranges, so the page does not preload them. Keep them as the approved migration copies for now; before replacing or adding a new video, produce a 1080p/30fps delivery derivative and review its visual quality rather than uploading a camera master unchanged.
