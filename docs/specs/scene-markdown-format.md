# Scene Markdown Format

**Purpose:** Define the small markdown authoring format used to express scene boundaries and presentation directives.

## What Done Looks Like

- A single markdown source can describe a sequence of scenes using a teachable, low-ceremony format.
- Scene boundaries are explicit and stable, using a separator such as `---`.
- Presentation directives support the scoped layout needs for this phase: background media, split media, and reverse split media.
- The authored markdown remains readable as markdown even before it is parsed into scene objects.

## Constraints

- Keep the directive vocabulary intentionally small.
- Do not require JSX, MDX component calls, or arbitrary embedded logic for core scene authoring.
- The format should be usable by someone editing narrative content, not just implementation code.

## Non-Goals

- Rich authoring features for every future visualization type.
- Arbitrary layout directives.
- A generalized publishing format for the whole site.