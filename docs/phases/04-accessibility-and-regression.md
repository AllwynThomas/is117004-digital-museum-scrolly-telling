---
status: pending
phase: 04
title: Accessibility and regression
depends-on: [03]
---

# Phase 04 — Accessibility and Regression

## Objective

Prove that the scrollytelling system remains readable, navigable, and shippable after the interaction model changes. This phase closes the scoped work by validating semantics, reduced-motion behavior, keyboard access, and the full project verification suite.

## Specs Covered

- [presentation-accessibility.md](../specs/presentation-accessibility.md)

## Objectives

### 1. Preserve semantic structure and reading order in the presentation experience

- Verify the presentation shell, slide container, and progress UI preserve landmarks, headings, and readable document order.
- Ensure the scrollytelling treatment does not hide core narrative content behind structural wrappers.
- Keep the presentation understandable as a document, not only as an animation.

**Runnable exit check:** run `npm run test:browser -- --grep "presentation semantics"` and confirm tests for landmarks, heading order, and readable content flow pass.

### 2. Guarantee reduced-motion-safe presentation behavior

- Ensure motion effects are ornamental and that content remains fully visible without animation.
- Make programmatic navigation respect reduced-motion preferences.
- Confirm reduced-motion users can complete the exhibit without losing meaning.

**Runnable exit check:** run `npm run test:browser -- --grep "reduced motion"` and confirm the exhibit remains readable, progress still works, and scene jumps do not rely on motion.

### 3. Guarantee keyboard access to the presentation and progress controls

- Ensure keyboard users can move through the page and operate any presentation controls without traps.
- Keep progress cues and scene navigation understandable without pointer-only interactions.
- Validate focus behavior across desktop and narrow layouts.

**Runnable exit check:** run `npm run test:browser -- --grep "keyboard presentation"` and confirm keyboard-only navigation through the exhibit and progress UI passes.

### 4. Close the scoped work with a full regression pass

- Run the full project checks against the implemented scrollytelling system.
- Confirm the spec-defined scene source, parser, shell, slide behavior, navigation, progress, and accessibility layers all coexist cleanly.
- Leave the project in a releasable state for this scoped feature set.

**Runnable exit check:** run `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:browser` and confirm all commands pass.

## Tests Required

- Browser: semantics coverage for landmarks, heading order, and readable content flow.
- Browser: reduced-motion-safe rendering and movement behavior.
- Browser: keyboard navigation through the exhibit and progress controls.
- Full regression: `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:browser`.

## Exit Gate

- [ ] Browser test for semantics passes.
- [ ] Browser test for reduced motion passes.
- [ ] Browser test for keyboard presentation behavior passes.
- [ ] Full project command suite passes.

## Completion Notes

<!-- Filled in after execution -->
