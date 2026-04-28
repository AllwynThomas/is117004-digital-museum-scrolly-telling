# Sticky Slide Container

**Purpose:** Define the per-scene container that creates the pinned, full-screen scrollytelling behavior.

## What Done Looks Like

- Each scene renders inside a wrapper taller than the viewport, with a sticky stage that stays pinned while the scene resolves.
- The sticky stage fills the viewport and gives each scene a clear entry, focus, and exit interval.
- The container exposes a normalized notion of scene progress that downstream presentation components can consume.
- Scene behavior is consistent across the entire exhibit instead of being tuned independently per section.

## Constraints

- The container must work with normal document scrolling and must not hijack the browser scroll model.
- The scene contract should be simple enough to support copy-only scenes and media-heavy scenes with the same wrapper.
- Reduced-motion users must still be able to read every scene without relying on animated transitions.

## Non-Goals

- A large animation library.
- Per-scene bespoke timing systems.
- Complex cinematic transitions between scenes.