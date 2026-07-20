---
name: telegram-surface-verify
description: "Use when building, changing, testing, or reviewing any Telegram- or MAX-facing surface that must be verified inside a real authenticated messenger session: bots, channels, groups, inline keyboards, deep links, Telegram Web flows, MAX Web flows, Mini Apps, WebApps, onboarding flows, public CTA paths, or support/admin chat flows."
---

# Telegram Surface Verify

Use this skill when Telegram or MAX is part of the real user journey. Do not treat code changes, mocked screenshots, or guessed bot behavior as sufficient verification.

## Workflow

1. Identify the messenger surface before testing:
   - Telegram or MAX bot chat;
   - Telegram or MAX channel;
   - group/community flow;
   - deep link;
   - Telegram Mini App / WebApp;
   - MAX mini app / web flow;
   - landing-to-messenger CTA;
   - support/admin operational flow.
2. Open a live messenger surface in a real authenticated session:
   - prefer Telegram Web or MAX Web in the in-app browser or Chrome when an existing logged-in session is available;
   - use desktop app control only when browser verification is insufficient;
   - if Telegram or MAX is not authenticated or access is missing, stop and report that verification is blocked until the user grants access.
3. Reproduce the actual flow:
   - open the exact chat/channel/link;
   - click the real buttons or inline keyboard items;
   - verify redirects, menus, bot replies, app launch, and return states;
   - for Mini Apps/WebApps, confirm the app opens inside the messenger container and not only in a standalone browser tab.
4. Validate behavior on the live surface:
   - correct chat/channel opens;
   - correct message, reply, menu, or state appears;
   - buttons lead to the intended target;
   - text is not cut off;
   - primary CTA path works end to end;
   - obvious UX breakage is fixed and retested.
5. If the messenger surface is visual or layout-sensitive, capture screenshots as evidence.
6. If the Telegram or MAX flow launches a web UI, also use `web-ui-verify` and, when layout is fragile, `frontend-responsive-layout-audit`.

## Hard Rules

- Do not say "verified", "done", or "works" unless Telegram or MAX was opened live and the real flow was exercised.
- Do not replace live messenger verification with code inspection alone.
- Do not rely only on headless screenshots when the interaction itself matters.
- Do not publish channel posts, send broad user-facing messages, or trigger risky operational actions unless the user explicitly asked for that action.
- If one messenger surface is broken on mobile-like flow but looks fine on desktop, keep iterating; do not mark it complete.

## Messenger-Specific Checks

- Telegram bot flow: `/start`, menu, inline buttons, reply timing, fallback/error message.
- Telegram channel flow: public CTA, pinned links, post links, join/open transitions, obvious copy issues.
- MAX bot flow: open target bot, launch bot action, verify reply/menu/button behavior, confirm that business/support flow is real rather than guessed.
- MAX channel flow: public CTA, channel open transition, browser/open-in-app behavior, obvious copy issues, correct channel target.
- Deep links: correct target opens, parameters survive, wrong chat/channel is not opened.
- Mini App / WebApp: opens from Telegram or MAX, correct entry state, auth/session state looks real, primary flow is usable.
- Marketing flow: landing CTA -> Telegram or MAX -> target conversation/channel/app works without confusion.

## Acceptance

- Live Telegram or MAX session was actually opened.
- Real buttons/links were clicked where relevant.
- Core messenger flow was exercised end to end.
- Any blocking mismatch between expected and real Telegram/MAX behavior is reported explicitly.
- Final response includes:
  - which Telegram or MAX surface was checked;
  - how it was opened;
  - what actions were performed;
  - what was confirmed;
  - what remains unverified or blocked.
