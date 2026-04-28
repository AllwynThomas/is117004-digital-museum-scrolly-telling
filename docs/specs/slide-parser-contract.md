# Slide Parser Contract

**Purpose:** Define the parser that converts scene markdown into typed scene nodes for the presentation layer.

## What Done Looks Like

- The parser accepts raw markdown and returns an ordered collection of typed scene nodes.
- Each node contains clean markdown content plus any parsed presentation metadata needed by the renderer.
- Empty chunks are ignored, and presentation directives are removed from the rendered markdown body after parsing.
- The parser handles the scoped directive set predictably and yields a stable data shape for downstream components.

## Constraints

- Keep the parser as a pure transformation layer with no file-system or routing responsibilities.
- Favor deterministic parsing rules over fuzzy heuristics.
- The parser contract should be narrow enough to unit test thoroughly.

## Non-Goals

- Content repository concerns.
- Runtime content fetching.
- Broad schema validation for a future multi-page content system.