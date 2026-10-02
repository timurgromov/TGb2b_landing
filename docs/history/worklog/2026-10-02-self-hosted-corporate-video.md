# 2026-10-02 — Corporate videos moved off Boomstream

## Outcome

- Downloaded the four existing corporate case MP4s from the previous Boomstream sources into a temporary local directory outside the repository.
- Created `/srv/tg26-media-backup/public/corporate-ground/` on Aeza `open-blue` (`#1847209`, `213.176.94.245`) and uploaded the four files.
- Verified every remote SHA-256 against the temporary source copy.
- Verified public `206 Partial Content` and `video/mp4` responses from the new HTTPS URLs.
- Replaced shared video data on both `/` and `/novogodniy-korporativ/`, removed the Boomstream SDK and dead iframe analytics code.

## Delivery facts

- Directory size after upload: `404M`.
- Free disk after upload: `23G` of `59G`.
- Runtime source commit: `54e8631`.
- Production commit: `4a718cf`.

## Access decision

Access is available in the locally authenticated Aeza panel, service `#1847209`; it is not evidence of a blocker merely because no SSH key or macOS Keychain entry exists. The password itself is never recorded. See `docs/corporate-media-host.md` for the safe operational path.
