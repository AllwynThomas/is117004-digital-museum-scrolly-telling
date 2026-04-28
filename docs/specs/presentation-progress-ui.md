# Presentation Progress UI

**Purpose:** Define the lightweight progress interface that shows readers where they are in the scene sequence and lets them jump between scenes.

## What Done Looks Like

- A persistent but lightweight UI indicates current progress through the exhibit scenes.
- The active scene indicator updates as the user scrolls.
- Readers can use the progress UI to jump directly to a scene through the shared navigation core.
- The UI reinforces that the exhibit is a guided sequence, not just a long article.

## Constraints

- Keep the first version visually minimal and secondary to the exhibit content.
- The UI must remain usable on smaller screens without dominating the viewport.
- The component should consume shared navigation state rather than compute scene position itself.

## Non-Goals

- A dense control panel.
- Secondary presentation controls unrelated to scene progress.
- Feature parity with the full reference-site presentation toolset.