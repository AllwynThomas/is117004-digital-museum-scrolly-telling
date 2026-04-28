---
status: done
phase: 02
title: Presentation shell and slides
depends-on: [01]
---

# Phase 02 — Presentation Shell and Slides

## Objective

Turn the exhibit route into a real scrollytelling deck driven by parsed scenes rather than hand-authored page sections. This phase should establish the shell, the sticky scene container, and the limited set of scene layout variants needed for the initial museum experience.

## Current Codebase Notes

- The live exhibit is still assembled directly in [app/page.tsx](../../app/page.tsx) from the static data exported by [lib/exhibit-data.ts](../../lib/exhibit-data.ts).
- The root shell in [app/layout.tsx](../../app/layout.tsx) always mounts [components/site/site-header.tsx](../../components/site/site-header.tsx) and [components/site/site-footer.tsx](../../components/site/site-footer.tsx).
- The current header is hard-coded to the long-form section IDs `hero`, `how-it-works`, `benefits`, `safety`, `fuel-cycle`, `future-demand`, and `timeline`, so it will not match a scene-driven deck without adjustment in this phase.
- Phase 01 outputs already exist in [content/scenes/digital-museum.md](../../content/scenes/digital-museum.md) and [lib/scene-parser.ts](../../lib/scene-parser.ts).
- There is no presentation component surface yet; this phase must introduce it instead of adapting an existing presentation layer.
- The current browser suite in [tests/browser/accessibility.spec.ts](../../tests/browser/accessibility.spec.ts) and [tests/browser/content-and-responsive.spec.ts](../../tests/browser/content-and-responsive.spec.ts) is written against the long-form exhibit and will likely need updates where those assumptions conflict with the new deck structure.
- `framer-motion` is not currently installed in [package.json](../../package.json). If the implementation uses motion hooks for normalized scene progress, this phase must add that dependency explicitly.
- Playwright serves the built static `out/` directory via [playwright.config.ts](../../playwright.config.ts), so browser exit checks need a fresh `npm run build` before they run.

## Specs Covered

- [presentation-layout-shell.md](../specs/presentation-layout-shell.md)
- [sticky-slide-container.md](../specs/sticky-slide-container.md)
- [scene-layout-variants.md](../specs/scene-layout-variants.md)

## Objectives

### 1. Replace the hand-authored exhibit page with a presentation shell

- Introduce a presentation-specific page composition path for the current exhibit route.
- Feed the shell ordered scene nodes from Phase 01 rather than hard-coded page sections.
- Resolve the current route-level shell mismatch by either adapting or conditionally suppressing the existing long-form header/footer behavior for the scene-driven deck.
- Defer the dedicated progress UI itself to Phase 03; this phase only needs the shell-level composition that Phase 03 can build on.

**Runnable exit check:** run `npm run build` and confirm the exhibit route renders through the presentation shell without reintroducing a manually assembled long-form page.

### 2. Implement the sticky slide container and scene progress source

- Wrap each scene in a taller-than-viewport section with a sticky full-screen stage.
- Expose normalized scene progress for child presentation components.
- Preserve normal document scrolling and provide a readable mobile fallback where sticky behavior is disabled if necessary.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/presentation-shell.spec.ts --grep "sticky slide"` and confirm the browser test observes pinned scene behavior on desktop and readable non-sticky behavior on a narrow viewport.

### 3. Render the scoped scene layout variants from parsed metadata

- Support plain copy scenes, background-media scenes, split-media scenes, and reversed split-media scenes.
- Select variants from parsed scene metadata instead of ad hoc page conditionals.
- Keep copy readable over media through a stable content frame or overlay treatment.

**Runnable exit check:** run `npm run build && npm run test:browser -- tests/browser/presentation-shell.spec.ts --grep "scene variants"` and confirm each variant renders on the exhibit route with the correct media placement and readable copy.

## Files Created / Modified

- `app/page.tsx` — replace the current long-form exhibit assembly with the presentation shell entry point.
- `app/layout.tsx` and/or `components/site/site-header.tsx` — adapt or conditionally suppress the current long-form chrome if it conflicts with the deck structure.
- `components/presentation/presentation-shell.tsx` — route-level scene deck composition.
- `components/presentation/presentation-slide.tsx` — sticky scene wrapper and progress source.
- `components/presentation/scene-layout.tsx` or equivalent variant renderer — plain, background, split, and reversed split scene handling.
- `tests/browser/presentation-shell.spec.ts` — sticky-slide and scene-variant browser coverage for this phase.
- Existing browser specs under `tests/browser/` may need targeted updates if their long-form assumptions no longer match the exhibit route after this phase.

## Tests Required

- Browser: `tests/browser/presentation-shell.spec.ts` covers sticky slide behavior on desktop and readable fallback behavior on a narrow viewport.
- Browser: `tests/browser/presentation-shell.spec.ts` covers plain, background, split, and reversed split scene variants.
- Build gate: `npm run build` passes with the presentation shell replacing the old hand-authored exhibit assembly.
- Existing browser specs that target the exhibit route remain meaningful after the shell conversion or are updated within this phase to reflect the new deck structure.

## Exit Gate

- [x] `npm run build` passes with the presentation shell in place.
- [x] Desktop browser test for sticky slide behavior passes.
- [x] Browser test for the four scoped scene variants passes.

## Completion Notes

- Replaced the long-form exhibit assembly in `app/page.tsx` with a scene-driven presentation shell that reads `content/scenes/digital-museum.md` and parses it through `lib/scene-parser.ts`.
- Added `components/presentation/presentation-shell.tsx`, `components/presentation/presentation-slide.tsx`, and `components/presentation/scene-layout.tsx` to establish the route-level shell, sticky slide wrapper, normalized progress source, and the four scoped scene layout variants.
- Adapted `components/site/site-header.tsx` so the root presentation route uses a simple brand header instead of the old long-form section navigation.
- Added phase-specific unit and integration coverage under `tests/unit/presentation/` and the golden-path Playwright spec `tests/browser/presentation-shell.spec.ts`.
- Updated the inherited browser specs in `tests/browser/accessibility.spec.ts` and `tests/browser/content-and-responsive.spec.ts` so they remain meaningful after the route changed from a seven-section long-form exhibit to a four-scene presentation deck.
- `framer-motion` was not added in this phase; sticky behavior and normalized progress are implemented with CSS sticky positioning plus a lightweight scroll/resize progress calculation inside `PresentationSlide`.
