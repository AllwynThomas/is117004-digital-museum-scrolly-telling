---
status: done
phase: 01
title: Scene source and parser
depends-on: []
---

# Phase 01 — Scene Source and Parser

## Objective

Establish the canonical scene authoring source and the pure parser contract that every later presentation phase depends on. This phase should end with a readable markdown scene file, a deterministic typed parser, and tests that prove the transformation rules.

## Current Codebase Notes

- The live exhibit is still assembled directly in [app/page.tsx](../../app/page.tsx) from the static data exported by [lib/exhibit-data.ts](../../lib/exhibit-data.ts).
- The `lib/` directory exists, but there is no scene parser or markdown scene source yet.
- The test harness already exists through [vitest.config.ts](../../vitest.config.ts) and [tests/setup.ts](../../tests/setup.ts), and the current Vitest include pattern supports new files under `tests/unit/**/*.test.ts`.
- There is no `content/` directory yet, so this phase must create the canonical scene source instead of assuming an existing content pipeline.
- No new package install is required to complete the scoped work in this phase. `typescript`, `vitest`, `jsdom`, `@testing-library/react`, and `@testing-library/jest-dom` are already present in [package.json](../../package.json).

## Specs Covered

- [scene-markdown-format.md](../specs/scene-markdown-format.md)
- [slide-parser-contract.md](../specs/slide-parser-contract.md)

## Objectives

### 1. Establish the scene markdown source format

- Create the single markdown source at `content/scenes/digital-museum.md` to represent the exhibit as an ordered sequence of scenes.
- Encode the scoped directive set for this project: scene separators, background media, split media, and reversed split media.
- Keep the authored file readable as plain markdown without JSX or custom embedded logic.

**Runnable exit check:** run `grep -nE '^---$|!\[(bg|split|split-reverse)' content/scenes/digital-museum.md` and confirm the expected separators and directives are present.

### 2. Implement a pure slide parser that returns typed scene nodes

- Add a parser in `lib/scene-parser.ts` that accepts raw markdown and returns ordered, typed scene nodes.
- Strip presentation directives from the renderable markdown body after parsing.
- Ignore empty chunks and keep parsing rules deterministic.

**Runnable exit check:** run `npm run test -- tests/unit/scene-parser.test.ts` and confirm parser tests pass for empty input, single scene input, multi-scene input, and directive extraction.

### 3. Define the parser output contract used by later phases

- Lock the scene node shape so later phases can consume it without re-parsing raw markdown.
- Keep the parser free of route, file-system, or layout responsibilities.
- Export the parser API and scene node type from `lib/scene-parser.ts` so later phases can consume them without introducing route wiring yet.

**Runnable exit check:** run `npm run typecheck` and confirm the parser module and its exported scene node type compile cleanly without adding route-level integration in this phase.

## Files Created / Modified

- `content/scenes/digital-museum.md` — canonical scene authoring source for the exhibit.
- `lib/scene-parser.ts` — pure parser plus exported scene node contract.
- `tests/unit/scene-parser.test.ts` — unit coverage for scene splitting and directive extraction.
- No changes to `app/page.tsx` or route wiring in this phase; route integration begins in Phase 02.

## Tests Required

- Unit: `tests/unit/scene-parser.test.ts` covers empty input, single-scene input, multi-scene input, and directive extraction.
- Contract/type gate: `npm run typecheck` passes with the exported parser API and scene node type in place.
- No browser or route-level integration tests belong in this phase because the presentation shell does not exist yet.

## Exit Gate

- [x] The exhibit has one canonical markdown scene source.
- [x] Parser unit tests pass.
- [x] `npm run typecheck` passes.

## Completion Notes

- Created `content/scenes/digital-museum.md` as the canonical scene authoring source with `bg`, `split`, and `split-reverse` directives represented.
- Added `lib/scene-parser.ts` with the exported `parseSceneMarkdown` function and `SceneNode` type.
- Added `tests/unit/scene-parser.test.ts` covering positive, negative, and edge cases plus a real-file seam against the canonical scene source.
- During execution, the project-wide `npm run typecheck` gate failed on archived files under `docs/_references/`; with explicit approval, `tsconfig.json` was updated to exclude `docs/_references/**` so the gate now matches the actual project boundary.
- No route wiring or browser tests were added in this phase; those remain deferred to later phases by design.
