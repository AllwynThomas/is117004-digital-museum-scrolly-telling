# Phases

Phased, actionable implementation plan for the scoped scrollytelling work defined in [../specs](../specs).

## How to use this

Tell me `implement phase 01`, `implement phase 02`, and so on, and I will:

1. Re-read the phase file and the spec files it covers.
2. Read the exact reference files needed from [../_references](../_references).
3. Apply the listed changes to this workspace.
4. Run the phase's exit checks.
5. Update [STATUS.md](./STATUS.md) and flip the phase front matter from `pending` to `done`.

## Phase Index

| # | Phase | Status |
|---|---|---|
| 01 | [Scene source and parser](./01-scene-source-and-parser.md) | ✅ done |
| 02 | [Presentation shell and slides](./02-presentation-shell-and-slides.md) | ⏳ pending |
| 03 | [Presentation navigation and progress](./03-presentation-navigation-and-progress.md) | ⏳ pending |
| 04 | [Accessibility and regression](./04-accessibility-and-regression.md) | ⏳ pending |

Current live tracker: [STATUS.md](./STATUS.md).

## Coverage Review

| Spec | Covered by phase(s) |
|---|---|
| [presentation-layout-shell.md](../specs/presentation-layout-shell.md) | [Phase 02](./02-presentation-shell-and-slides.md) |
| [sticky-slide-container.md](../specs/sticky-slide-container.md) | [Phase 02](./02-presentation-shell-and-slides.md) |
| [scene-markdown-format.md](../specs/scene-markdown-format.md) | [Phase 01](./01-scene-source-and-parser.md) |
| [slide-parser-contract.md](../specs/slide-parser-contract.md) | [Phase 01](./01-scene-source-and-parser.md) |
| [scene-layout-variants.md](../specs/scene-layout-variants.md) | [Phase 02](./02-presentation-shell-and-slides.md) |
| [presentation-navigation-core.md](../specs/presentation-navigation-core.md) | [Phase 03](./03-presentation-navigation-and-progress.md) |
| [presentation-progress-ui.md](../specs/presentation-progress-ui.md) | [Phase 03](./03-presentation-navigation-and-progress.md) |
| [presentation-accessibility.md](../specs/presentation-accessibility.md) | [Phase 04](./04-accessibility-and-regression.md) |

## Uncovered Specs

None. Every spec in [../specs](../specs) is assigned to at least one phase.

## Ground Rules

- Read the relevant reference files first. Port the pattern, then adapt it to this project.
- Keep the scope aligned to the defined spec set. Do not reopen deferred items such as a full content repository or data build pipeline unless a later spec adds them.
- Each phase should leave the project in a runnable state for its own slice, with its listed exit checks passing before the phase is marked done.
- Update both the phase file and [STATUS.md](./STATUS.md) when a phase starts or finishes so the plan stays trustworthy.
- If a phase grows beyond its stated objectives, split the work instead of silently absorbing the next phase.

## Planning Notes

- The phase boundaries follow implementation dependencies rather than reference-project file boundaries.
- Accessibility is intentionally a dedicated closeout phase so it remains visible, but each earlier phase still includes basic semantic and type/build checks.
- This plan borrows the reference process structure where it improves execution clarity, but keeps the documents lighter than the full reference workflow.