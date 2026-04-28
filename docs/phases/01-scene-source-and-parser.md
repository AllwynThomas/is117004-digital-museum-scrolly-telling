---
status: pending
phase: 01
title: Scene source and parser
depends-on: []
---

# Phase 01 — Scene Source and Parser

## Objective

Establish the canonical scene authoring source and the pure parser contract that every later presentation phase depends on. This phase should end with a readable markdown scene file, a deterministic typed parser, and tests that prove the transformation rules.

## Specs Covered

- [scene-markdown-format.md](../specs/scene-markdown-format.md)
- [slide-parser-contract.md](../specs/slide-parser-contract.md)

## Objectives

### 1. Establish the scene markdown source format

- Create the single markdown source that will represent the exhibit as an ordered sequence of scenes.
- Encode the scoped directive set for this project: scene separators, background media, split media, and reversed split media.
- Keep the authored file readable as plain markdown without JSX or custom embedded logic.

**Runnable exit check:** run `rg --line-number "^---$|!\[(bg|split|split-reverse)"` against the chosen scene markdown file and confirm the expected separators and directives are present.

### 2. Implement a pure slide parser that returns typed scene nodes

- Add a parser that accepts raw markdown and returns ordered, typed scene nodes.
- Strip presentation directives from the renderable markdown body after parsing.
- Ignore empty chunks and keep parsing rules deterministic.

**Runnable exit check:** run `npm run test -- slide-parser` and confirm parser tests pass for empty input, single scene input, multi-scene input, and directive extraction.

### 3. Define the parser output contract used by later phases

- Lock the scene node shape so later phases can consume it without re-parsing raw markdown.
- Keep the parser free of route, file-system, or layout responsibilities.
- Ensure the project typechecks with the parser contract in place.

**Runnable exit check:** run `npm run typecheck` and confirm the scene node type is imported by downstream presentation code without type errors.

## Tests Required

- Unit: parser coverage for empty input, single-scene input, multi-scene input, and directive extraction.
- Integration: parser output type can be consumed by the first downstream presentation module without reshaping raw markdown.
- Build/type gate: `npm run typecheck` passes with the parser contract in place.

## Exit Gate

- [ ] The exhibit has one canonical markdown scene source.
- [ ] Parser unit tests pass.
- [ ] `npm run typecheck` passes.

## Completion Notes

<!-- Filled in after execution -->
