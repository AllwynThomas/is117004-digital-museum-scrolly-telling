# Presentation Navigation Core

**Purpose:** Define the shared navigation logic that identifies the active scene and moves the reader through the presentation sequence.

## What Done Looks Like

- One shared navigation layer can answer which scene is active and can jump to a requested scene index.
- Next, previous, first, and last scene behaviors are derived from the same navigation core rather than duplicated in UI components.
- Programmatic scene jumps land in a sensible position within the sticky scene interval.
- Navigation state stays in sync with scroll position.

## Constraints

- Keep navigation logic independent from any one control surface.
- Use normal browser scrolling rather than a custom scroll container.
- Support reduced-motion behavior when movement is triggered programmatically.

## Non-Goals

- A command palette.
- Advanced shortcut systems.
- Separate navigation rules for different presentation widgets.