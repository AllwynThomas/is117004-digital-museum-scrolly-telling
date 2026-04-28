# Presentation Layout Shell

**Purpose:** Define the page-level presentation shell that turns the exhibit into an ordered sequence of scrollytelling scenes.

## What Done Looks Like

- The exhibit renders through a presentation-specific layout instead of a single hand-authored long page.
- The layout receives an ordered list of scene nodes and renders them in a consistent full-screen sequence.
- Shared presentation chrome, such as progress UI and end-of-sequence footer behavior, is mounted once at the layout level rather than inside individual scenes.
- The layout remains compatible with the current single-exhibit route and does not require a multi-page content system.

## Constraints

- Keep the initial scope to one exhibit experience, not a generalized site-wide layout router.
- The shell should compose typed scene data and child components; it should not own raw content parsing logic.
- The shell should preserve semantic page structure with a single main landmark.

## Non-Goals

- Multi-page layout selection from frontmatter.
- Full CMS-style content management.
- Data build pipelines or source audit tooling.