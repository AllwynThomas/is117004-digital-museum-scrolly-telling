---
status: pending
phase: 03
title: Presentation navigation and progress
depends-on: [02]
---

# Phase 03 — Presentation Navigation and Progress

## Objective

Add the shared navigation model that makes the deck feel guided instead of merely scrollable. This phase should end with one source of truth for active-scene state and a lightweight progress UI that consumes that state rather than recomputing it.

## Specs Covered

- [presentation-navigation-core.md](../specs/presentation-navigation-core.md)
- [presentation-progress-ui.md](../specs/presentation-progress-ui.md)

## Objectives

### 1. Implement a shared presentation navigation core

- Add one shared navigation layer that can identify the active scene and jump to a requested scene index.
- Define first, last, next, and previous scene behavior in one place.
- Ensure programmatic scene jumps land inside the intended sticky scene interval.

**Runnable exit check:** run `npm run test -- presentation-nav` and confirm unit tests pass for active-scene detection, clamping, and jump target calculation.

### 2. Keep navigation state synchronized with scroll position

- Connect the navigation core to the rendered scene list so active scene state updates as the reader scrolls.
- Avoid duplicating scene position logic inside individual controls.
- Preserve normal browser scrolling.

**Runnable exit check:** run `npm run test:browser -- --grep "active scene sync"` and confirm the active scene indicator changes as the page scrolls through the exhibit.

### 3. Add the lightweight progress UI on top of the shared navigation core

- Render a persistent but minimal progress UI that communicates position in the exhibit.
- Allow the reader to jump to scenes from the progress UI.
- Keep the UI usable on small screens without dominating the viewport.

**Runnable exit check:** run `npm run test:browser -- --grep "presentation progress"` and confirm the progress UI shows the active scene and supports scene jumps via click or tap.

## Tests Required

- Unit: active-scene detection, clamping, and jump-target calculation in the shared navigation core.
- Browser: active-scene synchronization during scrolling.
- Browser: progress UI rendering and scene jumping through the shared navigation layer.

## Exit Gate

- [ ] Navigation unit tests pass.
- [ ] Browser test for active scene synchronization passes.
- [ ] Browser test for progress UI rendering and scene jumping passes.

## Completion Notes

<!-- Filled in after execution -->
