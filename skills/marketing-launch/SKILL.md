---
name: marketing-launch
description: Audit landing-page conversion and diagnose lost leads across traffic, CTA, form and CRM. Also use for launches, offers, acquisition, UTM, Mini Apps and MVP validation.
---

# Marketing Launch

Version: 1.1.1

Use this skill when the project needs demand validation, not only code.

## Workflow

1. Define the audience, problem, offer, primary CTA, and success metric.
2. Create or update `MARKETING.md`:
   - audience;
   - value proposition;
   - offer/pricing if relevant;
   - channels;
   - first creatives/content;
   - UTM/creative_id plan;
   - P0 launch metrics.
3. Connect marketing assumptions to product docs:
   - `PROJECT_SPEC.md`;
   - `TASKS.md`;
   - `UX.md` for funnel copy and states.
4. For a landing/funnel, define first-viewport promise, CTA, trust signals, and post-CTA flow.
5. For test launches, keep the plan measurable and small.

## Existing landing-page conversion audit

1. Use the existing marketing brief and reports. For each page variant, name
   the audience, traffic source when known, primary action and business outcome.
2. Follow the flow on desktop and mobile with `web-ui-verify`. Check that the
   first screen matches the incoming promise, proof answers the main objection
   near the CTA, and the CTA explains the next step. Check each form field for
   its purpose, effort and error recovery. Record what happens after submit or
   after handing off to another channel.
3. Compare landing visits, CTA actions, form starts, confirmed submissions and
   received CRM leads using the same date range and segment when available.
   Check source attribution separately from lead delivery. Label missing or
   incompatible measurements and hypotheses so they cannot read as observed loss.
4. Rank the smallest changes by evidence, likely business impact and effort.
   For each priority name an observable acceptance check. Use baseline and
   qualified leads to judge impact, and defer A/B tests with insufficient traffic.
   For an audit-only request, return findings within the requested scope.

## Acceptance

- `MARKETING.md` exists or is updated.
- The primary offer and CTA are clear.
- Launch metrics are named.
- Tracking basics are specified.
- Product/tasks/UX docs reflect the marketing decision.
