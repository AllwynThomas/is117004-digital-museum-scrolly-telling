# Presentation Accessibility

**Purpose:** Define the accessibility floor for the scrollytelling presentation so the new interaction model remains readable and navigable.

## What Done Looks Like

- The presentation preserves semantic landmarks, headings, and reading order.
- Reduced-motion users can experience the full narrative without essential meaning being hidden behind animation.
- Keyboard users can navigate the page and any presentation controls without traps or skipped content.
- Scene changes and progress cues remain understandable without requiring pointer-only interactions.

## Constraints

- Accessibility requirements apply to the presentation shell, scene container, and navigation UI together.
- Motion effects are ornamental; core content must remain visible and readable without them.
- The experience should continue to degrade gracefully to a readable document flow.

## Non-Goals

- Experimental scroll effects that depend on motion to communicate content.
- Hidden content that appears only after animation thresholds.
- Accessibility exceptions for presentation-only screens.