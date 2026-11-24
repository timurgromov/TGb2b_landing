---
name: web-ui-verify
description: Verify or audit a website, landing page, form, app or Mini App in a browser on desktop and mobile. Use for UI changes, responsive issues and live interaction checks.
---

# Web UI Verify

Version: 1.1.1

Use this skill for an explicit live UI audit or after meaningful frontend changes.
For a landing-page audit about lost leads or conversion, also read
`marketing-launch` to trace traffic, CTA actions, forms and CRM delivery.

If the request changes an already visible element, especially a Hero, slider,
carousel, image/crop, animation or responsive geometry, also use
`ui-change-proof`. This skill proves that a screen works; `ui-change-proof`
proves that the specific requested delta is actually present.

## Evidence Standard

Source inspection, unit tests, typecheck, DOM queries and a successful build prove code-level facts. They do **not** prove that the interface is visible, correctly composed or usable.

A headless screenshot is supporting evidence only. UI acceptance requires observing the requested state in a live browser and, for an interactive flow, performing the relevant user action and seeing its result. Do not write “готово”, “выглядит хорошо” or “flow works” from source code, tests or a screenshot alone.

If a live browser, required account, input data or target environment is unavailable, report `Visual verification: not performed` with the specific blocker. Do not replace it with a claim of completion.

## Workflow

1. Before testing, write the verification target: exact URL, user state, action,
   expected visible result and required CSS viewports. If a user reports a
   viewport-specific defect, capture `window.innerWidth/innerHeight`; do not
   infer it from device model, fullscreen state or screenshot pixels.
2. Browser lifecycle v1.1 applies: this skill is only for a concrete UI
   verification, never desk-research, file/chat lookup or ordinary web reading.
   Reuse the already open Codex in-app browser first. Start a separate Chrome,
   Chromium or Playwright browser only when that exact UI verification cannot be
   performed there; state why, do not use the user's Chrome profile and run
   exactly one bounded session.
3. Start the existing dev server only when the target needs it; do not invent a
   new server flow if scripts already exist. Open the exact local or production
   URL in the Codex in-app browser. Refresh or reopen it after the last change
   so the observed page is the current build.
4. For responsive work, use Playwright CLI `resize` to sweep the exact reported
   viewport, core anchors, affected breakpoint `-1/0/+1` probes and interval
   representatives. Observe key/failing sizes in the live browser. Then perform
   the primary user action and observe the resulting state. Check at least:
   - desktop viewport;
   - mobile viewport;
   - console errors;
   - first screen and primary flow;
   - forms/buttons/links;
   - loading, empty, error, success states when relevant;
   - text overflow in buttons/cards/nav;
   - important images/video/assets render.
5. Capture screenshots when layout changed or when verification is visual, but use them only as evidence of the browser observation.
6. Fix obvious issues within the agreed edit scope and repeat the affected user
   action and browser checks after the final edit. Record issues during an audit.
7. Immediately stop every browser/Playwright process, temporary dev server and
   QA container created for this verification, including when a check fails.
   Before the final response, check that none remain. Never close the user's
   normal Chrome session.

## Visible-change claims

Record both the baseline and candidate observation. For sliders, select the
exact slide by a stable identifier or deterministic test control. Capture a
request-specific signature such as active index, image `src`, visible label,
bounding box, computed `object-position`/transform or another rendered fact.

Do not accept these as proof that the requested change happened:

- a changed source line or asset import;
- a successful build;
- a screenshot of an unspecified/random slider frame;
- a DOM node that exists but is hidden or not active;
- the same before/after signature;
- a browser page that was not freshly loaded from the candidate.

After any further UI edit, previous visible-change evidence is stale.

When a change appears correct at one size but not another, first compare actual
`window.innerWidth/innerHeight`, active breakpoint and rendered signature. Do
not count a newly discovered viewport as another failed attempt at the original
viewport, and do not continue changing crop/spacing values blindly.

## Final Evidence Record

For every UI change, state in the final response:

- `Visual verification: passed` or `not performed`;
- URL and user state checked;
- viewports checked;
- exact action performed and the visible result observed;
- console-error result;
- what remains unverified and why.
- for a requested delta: exact target, baseline signature and observed candidate
  signature.

Do not substitute vague wording such as “проверил интерфейс”. A claim without URL/state/action/observation is not a completed UI verification.

## Domain Defaults

- SaaS/admin tools: dense, calm, scan-friendly, workflow-first.
- Landing pages/funnels: identify the real product, place, person or work shown
  in the first viewport. At the tested desktop and mobile heights, verify that
  the primary action fits and remains usable after the hero image, poster or
  video loads. Check overlap with sticky UI and verify where the action leads.
  Record the actual viewport, rendered media and CTA state for each page variant.
- Apps/tools/games: first screen should be usable experience, not a marketing page.
- Telegram Mini Apps: mobile-first, safe-area aware, fast first interaction.

## Acceptance

- No blocking console errors.
- Mobile and desktop are both usable.
- Primary CTA/flow works.
- No obvious text overlap or broken media.
- Final response contains the full evidence record above.
