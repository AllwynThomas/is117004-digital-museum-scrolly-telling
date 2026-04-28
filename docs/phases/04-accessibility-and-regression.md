---
status: done
phase: 04
title: Accessibility and regression
depends-on: [03]
---

# Phase 04 — Accessibility and Regression

## Objective

Prove that the scrollytelling system remains readable, navigable, and shippable after the interaction model changes. This phase closes the scoped work by validating semantics, reduced-motion behavior, keyboard access, and the full project verification suite.

## Current Codebase Notes

- The presentation route already renders through [app/page.tsx](../../app/page.tsx) into [components/presentation/presentation-shell.tsx](../../components/presentation/presentation-shell.tsx), which now owns active-scene state and mounts [components/presentation/presentation-progress.tsx](../../components/presentation/presentation-progress.tsx) inside the presentation surface.
- Semantic landmarks and baseline accessibility checks already exist in [tests/browser/accessibility.spec.ts](../../tests/browser/accessibility.spec.ts), including axe coverage, image alt checks, landmark presence, `aria-labelledby` checks on presentation sections, and the skip-to-content link.
- Presentation-specific browser coverage now exists in [tests/browser/presentation-shell.spec.ts](../../tests/browser/presentation-shell.spec.ts) and [tests/browser/presentation-navigation.spec.ts](../../tests/browser/presentation-navigation.spec.ts), including reduced-motion and keyboard-only accessibility flows for the progress UI.
- The reduced-motion branch currently lives in [components/presentation/presentation-navigation.ts](../../components/presentation/presentation-navigation.ts) via `getSceneScrollOptions`, and [components/presentation/presentation-shell.tsx](../../components/presentation/presentation-shell.tsx) uses that helper before calling `scrollIntoView`.
- The presentation progress UI in [components/presentation/presentation-progress.tsx](../../components/presentation/presentation-progress.tsx) already exposes real buttons with accessible names and `aria-current="step"`, so keyboard-access testing should target that component surface rather than the legacy site header.
- Playwright serves the built static `out/` directory via [playwright.config.ts](../../playwright.config.ts), so every browser exit check for this phase needs a fresh `npm run build` first.
- The required tooling is already installed in [package.json](../../package.json): `eslint`, `typescript`, `vitest`, `@playwright/test`, and `@axe-core/playwright` are all available. No new dependency is required to start this phase.
- [eslint.config.mjs](../../eslint.config.mjs) now ignores `docs/_references/**`, so the lint gate measures the live project rather than archived reference code. The current lint run is clean, and the full regression command suite passes.

## Specs Covered

- [presentation-accessibility.md](../specs/presentation-accessibility.md)

## Objectives

### 1. Preserve semantic structure and reading order in the presentation experience

- Verify the presentation shell, slide container, and progress UI preserve landmarks, headings, and readable document order.
- Ensure the scrollytelling treatment does not hide core narrative content behind structural wrappers.
- Keep the presentation understandable as a document, not only as an animation.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/accessibility.spec.ts --grep "presentation semantics"` and confirm tests for landmarks, heading order, and readable content flow pass.

### 2. Guarantee reduced-motion-safe presentation behavior

- Ensure motion effects are ornamental and that content remains fully visible without animation.
- Make programmatic navigation respect reduced-motion preferences.
- Confirm reduced-motion users can complete the exhibit without losing meaning.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "reduced motion"` and confirm the exhibit remains readable, progress still works, and scene jumps do not rely on motion.

### 3. Guarantee keyboard access to the presentation and progress controls

- Ensure keyboard users can move through the page and operate any presentation controls without traps.
- Keep progress cues and scene navigation understandable without pointer-only interactions.
- Validate focus behavior across desktop and narrow layouts.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "keyboard presentation"` and confirm keyboard-only navigation through the exhibit and progress UI passes.

### 4. Close the scoped work with a full regression pass

- Run the full project checks against the implemented scrollytelling system.
- Confirm the spec-defined scene source, parser, shell, slide behavior, navigation, progress, and accessibility layers all coexist cleanly.
- Leave the project in a releasable state for this scoped feature set.

**Runnable exit check:** run `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:browser` and confirm all commands pass after ESLint is scoped away from the archived `docs/_references/**` folders or those reference-folder lint errors are explicitly addressed.

## Files Created / Modified

- `tests/browser/accessibility.spec.ts` — presentation semantics coverage, including readable document flow and progress UI semantics where needed.
- `tests/browser/presentation-navigation.spec.ts` — reduced-motion and keyboard-only presentation flows for the shared navigation core and progress UI.
- `components/presentation/presentation-shell.tsx` — only if semantic wiring, focus flow, or reduced-motion behavior needs a targeted accessibility adjustment.
- `components/presentation/presentation-progress.tsx` — only if keyboard or progress semantics require a targeted accessibility adjustment.
- `eslint.config.mjs` — updated in this phase so the full regression lint gate measures the live project instead of archived reference code.

## Tests Required

- Browser: `tests/browser/accessibility.spec.ts` covers presentation semantics for landmarks, heading order, readable content flow, and progress UI semantics where needed.
- Browser: `tests/browser/presentation-navigation.spec.ts` covers reduced-motion-safe rendering and movement behavior.
- Browser: `tests/browser/presentation-navigation.spec.ts` covers keyboard navigation through the exhibit and progress controls.
- Full regression: `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:browser`, with the lint gate first scoped to the live project files rather than archived reference folders.

## Exit Gate

- [x] Browser test for semantics passes.
- [x] Browser test for reduced motion passes.
- [x] Browser test for keyboard presentation behavior passes.
- [x] Full project command suite passes.

## Completion Notes

- Updated [components/presentation/presentation-shell.tsx](../../components/presentation/presentation-shell.tsx) so the fixed progress UI stays visually persistent but is rendered after the scene sections in document order, preserving readable narrative flow for semantic and assistive-technology consumption.
- Expanded [tests/browser/accessibility.spec.ts](../../tests/browser/accessibility.spec.ts) with a dedicated presentation-semantics flow that verifies the main landmark, heading order, readable scene order, and the progress UI's non-disruptive placement in the document.
- Expanded [tests/browser/presentation-navigation.spec.ts](../../tests/browser/presentation-navigation.spec.ts) with reduced-motion and keyboard-only flows that verify the exhibit remains readable with `prefers-reduced-motion: reduce`, progress-driven jumps still work without animation dependence, and keyboard users can reach and operate the progress controls without traps.
- Expanded unit and seam coverage in [tests/unit/presentation/presentation-shell-progress.integration.test.tsx](../../tests/unit/presentation/presentation-shell-progress.integration.test.tsx), [tests/unit/presentation/presentation-progress.test.tsx](../../tests/unit/presentation/presentation-progress.test.tsx), and corrected the typed fixture in [tests/unit/presentation/presentation-navigation.test.ts](../../tests/unit/presentation/presentation-navigation.test.ts) so the full regression gate remains type-safe.
- Updated [eslint.config.mjs](../../eslint.config.mjs) to ignore archived files under `docs/_references/**`, which makes the lint gate measure the live project instead of failing on reference-only code that is not part of the shipped app.
- Exit checks passed with `npm run build && npm run test:browser -- tests/browser/accessibility.spec.ts --grep "presentation semantics"`, `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "reduced motion"`, `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "keyboard presentation"`, and `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:browser`.
