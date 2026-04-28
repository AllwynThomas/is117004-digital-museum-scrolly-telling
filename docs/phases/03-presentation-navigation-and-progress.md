---
status: done
phase: 03
title: Presentation navigation and progress
depends-on: [02]
---

# Phase 03 — Presentation Navigation and Progress

## Objective

Add the shared navigation model that makes the deck feel guided instead of merely scrollable. This phase should end with one source of truth for active-scene state and a lightweight progress UI that consumes that state rather than recomputing it.

## Current Codebase Notes

- The root exhibit route in [app/page.tsx](../../app/page.tsx) already reads [content/scenes/digital-museum.md](../../content/scenes/digital-museum.md), parses it with [lib/scene-parser.ts](../../lib/scene-parser.ts), and renders [components/presentation/presentation-shell.tsx](../../components/presentation/presentation-shell.tsx).
- [components/presentation/presentation-shell.tsx](../../components/presentation/presentation-shell.tsx) is now the client-side presentation state owner. It maps parsed scenes to [components/presentation/presentation-slide.tsx](../../components/presentation/presentation-slide.tsx) and [components/presentation/scene-layout.tsx](../../components/presentation/scene-layout.tsx), synchronizes active-scene state from scroll position, and delegates scene jumps through the shared navigation core.
- [components/presentation/presentation-slide.tsx](../../components/presentation/presentation-slide.tsx) already exposes per-slide normalized progress and stamps each slide with stable anchors and metadata: `id="scene-N"`, `data-scene-index`, and `data-presentation-slide`. Those attributes should become the canonical jump targets instead of introducing a second scene identity scheme.
- The simple brand-only root header behavior already lives in [components/site/site-header.tsx](../../components/site/site-header.tsx). Phase 03 should keep the site header simple on `/` and attach the new progress UI to the presentation surface rather than reviving the old long-form header navigation.
- Phase 02 browser coverage still exists in [tests/browser/presentation-shell.spec.ts](../../tests/browser/presentation-shell.spec.ts), and Phase 03 adds dedicated navigation and progress coverage in [tests/browser/presentation-navigation.spec.ts](../../tests/browser/presentation-navigation.spec.ts) rather than overloading the shell golden path.
- The presentation unit test surface under [tests/unit/presentation](../../tests/unit/presentation) now covers the shared navigation core, shell navigation state, progress UI, and the seams between those pieces.
- The required tooling is already installed in [package.json](../../package.json): `react`, `next`, `vitest`, and `@playwright/test` are available. No extra dependency is required to start this phase.
- `framer-motion` is not installed in [package.json](../../package.json). That is acceptable here because the specs call for normal browser scrolling; scene jumps should use native scrolling APIs and respect reduced motion without adding a motion library.
- Playwright serves the built static `out/` directory via [playwright.config.ts](../../playwright.config.ts), so each browser exit check for this phase needs a fresh `npm run build` first.

## Specs Covered

- [presentation-navigation-core.md](../specs/presentation-navigation-core.md)
- [presentation-progress-ui.md](../specs/presentation-progress-ui.md)

## Objectives

### 1. Implement a shared presentation navigation core

- Add one shared navigation layer that can identify the active scene and jump to a requested scene index.
- Define first, last, next, and previous scene behavior in one place.
- Ensure programmatic scene jumps land on the existing `section#scene-N` anchors inside the intended sticky scene interval.
- Respect reduced-motion preferences when navigation triggers a scene jump.

**Runnable exit check:** run `npm run test -- tests/unit/presentation/presentation-navigation.test.ts` and confirm unit tests pass for active-scene detection, clamping, next/previous behavior, and jump-target calculation.

### 2. Keep navigation state synchronized with scroll position

- Connect the navigation core to the rendered scene list so active scene state updates as the reader scrolls.
- Avoid duplicating scene position logic inside individual controls.
- Preserve normal browser scrolling and derive active-scene state from one shared measurement layer.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "active scene sync"` and confirm the active scene indicator changes as the page scrolls through the exhibit.

### 3. Add the lightweight progress UI on top of the shared navigation core

- Render a persistent but minimal progress UI that communicates position in the exhibit.
- Allow the reader to jump to scenes from the progress UI.
- Keep the UI usable on small screens without dominating the viewport.
- Mount the progress UI inside the presentation component surface rather than the global site header.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "presentation progress"` and confirm the progress UI shows the active scene and supports scene jumps via click or tap.

## Files Created / Modified

- `components/presentation/presentation-shell.tsx` — integrate the navigation layer with the rendered scene list.
- `components/presentation/presentation-slide.tsx` — expose or consume the canonical scene anchors and any slide-level hooks the shared navigation layer needs.
- `components/presentation/presentation-navigation.ts` or equivalent — shared active-scene detection, clamping, next/previous helpers, and jump-target calculation.
- `components/presentation/presentation-progress.tsx` or equivalent — minimal progress UI that consumes the shared navigation state.
- `tests/unit/presentation/presentation-navigation.test.ts` — unit coverage for active-scene detection, clamping, next/previous behavior, reduced-motion-aware jump options, and jump-target calculation.
- `tests/browser/presentation-navigation.spec.ts` — browser coverage for active-scene synchronization and progress-driven scene jumps.

## Tests Required

- Unit: `tests/unit/presentation/presentation-navigation.test.ts` covers active-scene detection, clamping, next/previous behavior, reduced-motion-aware jump options, and jump-target calculation in the shared navigation core.
- Browser: `tests/browser/presentation-navigation.spec.ts` covers active-scene synchronization during scrolling.
- Browser: `tests/browser/presentation-navigation.spec.ts` covers progress UI rendering, active-scene indication, and scene jumping through the shared navigation layer.
- Build gate: `npm run build` passes before each browser exit check because Playwright serves the generated `out/` directory.

## Exit Gate

- [x] Navigation unit tests pass.
- [x] Browser test for active scene synchronization passes.
- [x] Browser test for progress UI rendering and scene jumping passes.

## Completion Notes

- Added [components/presentation/presentation-navigation.ts](../../components/presentation/presentation-navigation.ts) as the shared navigation core for canonical `scene-N` anchors, active-scene detection, clamping, next/previous behavior, jump-target calculation, reduced-motion-aware scroll options, and DOM scene discovery.
- Updated [components/presentation/presentation-shell.tsx](../../components/presentation/presentation-shell.tsx) to become the client-side owner of active-scene state, synchronize that state from the rendered slide list on scroll and resize, expose `data-active-scene` metadata, and route programmatic jumps through the shared navigation core.
- Updated [components/presentation/presentation-slide.tsx](../../components/presentation/presentation-slide.tsx) so each slide reflects shared active-scene state without recomputing it locally.
- Added [components/presentation/presentation-progress.tsx](../../components/presentation/presentation-progress.tsx) as the lightweight persistent progress UI. It consumes shared navigation state, stays usable on small screens, and triggers scene jumps without reviving the old global header navigation.
- Added unit and integration coverage in [tests/unit/presentation/presentation-navigation.test.ts](../../tests/unit/presentation/presentation-navigation.test.ts), [tests/unit/presentation/presentation-navigation-slide.integration.test.tsx](../../tests/unit/presentation/presentation-navigation-slide.integration.test.tsx), [tests/unit/presentation/presentation-shell-navigation.integration.test.tsx](../../tests/unit/presentation/presentation-shell-navigation.integration.test.tsx), [tests/unit/presentation/presentation-progress.test.tsx](../../tests/unit/presentation/presentation-progress.test.tsx), and [tests/unit/presentation/presentation-shell-progress.integration.test.tsx](../../tests/unit/presentation/presentation-shell-progress.integration.test.tsx).
- Added the golden-path browser flow in [tests/browser/presentation-navigation.spec.ts](../../tests/browser/presentation-navigation.spec.ts) for active-scene synchronization and progress-driven scene jumps.
- Exit checks passed with `npm run test -- tests/unit/presentation/presentation-navigation.test.ts`, `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "active scene sync"`, and `npm run build && npm run test:browser -- tests/browser/presentation-navigation.spec.ts --grep "presentation progress"`. The full route-level browser regression slice also passed after implementation.
