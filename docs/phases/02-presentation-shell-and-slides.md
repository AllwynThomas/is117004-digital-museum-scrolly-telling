---
status: pending
phase: 02
title: Presentation shell and slides
depends-on: [01]
---

# Phase 02 — Presentation Shell and Slides

## Objective

Turn the exhibit route into a real scrollytelling deck driven by parsed scenes rather than hand-authored page sections. This phase should establish the shell, the sticky scene container, and the limited set of scene layout variants needed for the initial museum experience.

## Specs Covered

- [presentation-layout-shell.md](../specs/presentation-layout-shell.md)
- [sticky-slide-container.md](../specs/sticky-slide-container.md)
- [scene-layout-variants.md](../specs/scene-layout-variants.md)

## Objectives

### 1. Replace the hand-authored exhibit page with a presentation shell

- Introduce a presentation-specific page composition path for the current exhibit route.
- Feed the shell ordered scene nodes from Phase 01 rather than hard-coded page sections.
- Mount shared presentation chrome at the shell level instead of inside scene content.

**Runnable exit check:** run `npm run build` and confirm the exhibit route renders through the presentation shell without reintroducing a manually assembled long-form page.

### 2. Implement the sticky slide container and scene progress source

- Wrap each scene in a taller-than-viewport section with a sticky full-screen stage.
- Expose normalized scene progress for child presentation components.
- Preserve normal document scrolling and provide a readable mobile fallback where sticky behavior is disabled if necessary.

**Runnable exit check:** run `npm run test:browser -- --grep "sticky slide"` and confirm the browser test observes pinned scene behavior on desktop and readable non-sticky behavior on a narrow viewport.

### 3. Render the scoped scene layout variants from parsed metadata

- Support plain copy scenes, background-media scenes, split-media scenes, and reversed split-media scenes.
- Select variants from parsed scene metadata instead of ad hoc page conditionals.
- Keep copy readable over media through a stable content frame or overlay treatment.

**Runnable exit check:** run `npm run test:browser -- --grep "scene variants"` and confirm each variant renders on the exhibit route with the correct media placement and readable copy.

## Tests Required

- Browser: sticky slide behavior on desktop and readable fallback behavior on a narrow viewport.
- Browser: rendering coverage for plain, background, split, and reversed split scene variants.
- Build gate: `npm run build` passes with the presentation shell replacing the old hand-authored exhibit assembly.

## Exit Gate

- [ ] `npm run build` passes with the presentation shell in place.
- [ ] Desktop browser test for sticky slide behavior passes.
- [ ] Browser test for the four scoped scene variants passes.

## Completion Notes

<!-- Filled in after execution -->
