# Scene Layout Variants

**Purpose:** Define the limited set of presentation scene layouts that the initial scrollytelling system supports.

## What Done Looks Like

- The presentation system supports a plain copy scene, a background-media scene, a split-media scene, and a reversed split-media scene.
- Each scene type has a consistent visual grammar so the experience feels curated rather than improvised.
- Copy remains readable over media through a stable content frame or overlay treatment.
- Scene variants are selected from parsed scene metadata, not from ad hoc page-specific JSX branches.

## Constraints

- Limit the number of initial variants to the few needed for this exhibit.
- Reuse the same scene container and rendering rules across sections.
- Favor layout consistency over one-off visual flourishes.

## Non-Goals

- Arbitrary per-scene custom layouts.
- A full component gallery of future exhibit scene types.
- Specialized data-visualization compositions beyond the scoped variants.