# docs-guide-test — session handoff

A read-back summary of the session that built this skill, so a later session can pick up without re-deriving
anything. This file is notes, not part of the skill's runtime; ignore it when packaging.

## Goal

Automate end-to-end testing of the tutorials in the Guides section of docs.temporal.io (`docs/guides/*.mdx`). Many
guides show their code inline, step by step, and expect the reader to assemble and run it. The skill rebuilds that
project from the code blocks, runs it against a **local** Temporal server, and asserts the outcome the guide claims —
so a guide that has silently stopped working gets caught.

## Decisions locked in this session

- **Test depth:** full end-to-end execution (start server + worker + driver, assert real output), not just compile/type-check.
- **Environment:** local only. No Temporal Cloud. The harness never calls external services.
- **Missing prerequisites:** auto-install via Homebrew (`temporal`, `uv`). The user opted into this.
- **Cloud/external guides:** skipped for now (recorded with a reason), not run.
- **Pilot-first:** proved the whole harness on one self-contained guide, then broadened.
- **Pilot switched early:** the originally-chosen `rate-limit-downstream-apis` turned out to call live SendGrid/OpenAI/
  Stripe APIs with real keys and had no reference repo, so it can't go green locally. Pilot moved to
  `entity-pattern-loyalty-points` (self-contained).

## How the harness works

- **Per-guide manifest** in `manifests/<guide-id>.json` is the whole contract; the scripts are generic. Schema and
  rules: `references/authoring-manifests.md`.
- `scripts/extract_guide.py` reconstructs source files from the guide's fenced code blocks. Modes: `comment-header`
  (first line is `# filename.py`) and `prose-filename` (file named in surrounding prose, e.g. "Create a file named
  `models.py`:"). First block per filename wins, which skips optional/variant snippets shown later.
- `scripts/run_guide_test.py` orchestrates: ensure prereqs → extract → optional `setup` commands (e.g. register Search
  Attributes, create a Namespace) → start fresh `temporal server start-dev` on 7233 (aborts if 7233 busy) → run worker
  (background) → run driver (captured) → assert `stdout_contains` + exit code → tear down → report. Exit 0 = all pass.
- **Python only today.** Runs go through `uv` with a pinned Python (`"python": "3.12"` in the manifest) to dodge
  missing-wheel problems on the machine's Python 3.14.

Run one guide:

```bash
python .claude/skills/docs-guide-test/scripts/run_guide_test.py <guide-id>
```

## Current state (committed)

- Branch **`add-docs-guide-test-skill`**, commit **`933308f5c`** ("Add docs-guide-test skill (WIP)…"), 15 files.
  Branched off `main` to keep it separate from the `rate-limits-revised` docs work. **Not pushed, no PR.** Marked WIP.
- Files: `SKILL.md`, `scripts/{extract_guide,run_guide_test}.py`, `references/authoring-manifests.md`, and 11 manifests
  (one per guide).

### Coverage (all 11 guides have a manifest)

| Guide | State |
|-------|-------|
| `entity-pattern-loyalty-points` | **RUN — green** (pilot) |
| `celery-to-standalone-activity` | **RUN — green** |
| `durable-gaming-sessions` | **RUN — fails (confirmed guide bug, see below)** |
| `reliable-document-approvals` | **RUN — fails (confirmed guide bug, see below)** |
| `durable-agent-on-agentcore` | SKIP — Cloud + AWS (AgentCore) |
| `rate-limit-downstream-apis` | SKIP — live third-party APIs |
| `recover-without-restart` | SKIP — TypeScript (harness is Python-only) |
| `temporary-rate-limit-increases` | SKIP — Go + Temporal Cloud |
| `route-specialized-workloads` | SKIP — GPU/infra-bound, not internally consistent |
| `lock-shared-resources` | SKIP — no runnable inline starter (builds a library; code lives in an external repo) |
| `worker-execution-affinity` | SKIP — no starter/Worker inline |

## Harness validated both ways

- **Green:** the pilot passes with four exact behavioral assertions.
- **Red (negative control):** mutating the pilot's batch points `100 → 50` made only the final-state assertion flip to
  FAIL, exit code 1, with diagnostics showing the actual wrong value. So a green pass is meaningful — the harness
  catches a real code regression, not a rubber stamp.

## Two confirmed guide bugs (verified by running + reading the code)

Both are **real bugs in the guide code**, not over-strict assertions. The assertions encode the behavior each guide
claims; the code can't reach it.

1. **`durable-gaming-sessions` — `str`-enum payload doesn't round-trip.**
   `class MoveType(str, enum.Enum)` is used directly as a dataclass field (`move_type: MoveType`, guide line ~270) and
   passed into an Activity. Temporal's default JSON data converter does not reconstruct a `str`-mixin enum inside a
   dataclass — `"attack"` deserializes as a **list of characters** — so `move.move_type.value` (line ~401) raises
   `AttributeError: 'list' object has no attribute 'value'`. The combat Activity fails every retry; score/room/action
   count never update; driver exits 1. Reproduced on `temporalio` 1.7.0–1.34.0 (not a version regression).
   **Fix (in the guide):** use `enum.StrEnum` (Py 3.11+), plain `str` fields, or the Pydantic data converter. Affects
   every `str, enum.Enum` the guide serializes (`MoveType`, `PlayerStatus`).

2. **`reliable-document-approvals` — lost-signal race.**
   The starter sends the approve Signal immediately, so it arrives while `run()` is still awaiting the early
   store/request Activities. The handler sets `_pending_decision`, but `_wait_for_decision` then does
   `self._pending_decision = None` (guide line ~671) *before* its `wait_condition`, discarding the decision. Worker log
   proves the order: "Decision received via Signal" lands ~11 ms **before** "Approval process started." The Workflow
   waits out the full SLA and `handle.result()` never returns, so the driver times out.
   **Fix (in the guide):** don't clear a decision that already arrived (capture before resetting, or drop the reset at
   line ~671). A second latent `ApprovalStatus` `str`-enum bug (same class as #1) sits right behind it.

> Why the pilot didn't hit the enum bug: `entity-pattern-loyalty-points` stores `tier: str = LoyaltyTier.BRONZE.value`
> — the plain string value, not the enum object. Gaming and approvals store the enum *itself* as the field type.
> **A plausible docs-wide follow-up:** sweep `docs/` for guides that put a `class X(str, enum.Enum)` directly in a
> dataclass that crosses a Workflow/Activity boundary — they likely share this bug.

## Update (2026-11-06): static checks added

Added a static-analysis phase that runs over the reconstructed source before execution, to catch defects a green
end-to-end run can't. Prompted by review comments on PR #5461 (the Entity Pattern revision): an unused `import asyncio`,
and failure paths that fail the Workflow uncaught (a `wait_condition` timeout; an exhausted bounded Activity retry).

- New `scripts/static_checks.py` (pure stdlib `ast`, no deps, no server). Four checks: `unused_imports`,
  `unhandled_failures` (the two Temporal smells above), `undefined_names` (project-wide completeness — a name defined in
  none of the extracted files; backs off on `import *`), and `nondeterminism` (wall-clock/randomness/I/O inside a
  `@workflow.defn` class, scoped so Activities are left alone). Pattern lists are meant to grow.
- Validated on the real pre-revision entity-pattern guide: the checks independently reproduced the human findings from
  PR #5461 (unused `asyncio`/`asdict`/`PointsEvent`, the uncaught `wait_condition` timeout, both uncaught bounded-retry
  Activity calls) with no undefined-name or non-determinism false positives on the correct code.
- Wired into `run_guide_test.py` as step 1b (right after extraction). Prints a `STATIC CHECKS` section.
- **Advisory by default** — findings print but don't change the exit code; a manifest sets `checks.fail_on_findings:
  true` to enforce. Per-check on/off and `checks.exclude` supported. Config documented in `authoring-manifests.md`.
- Verified against a crafted sample (all three findings fire; a clean file with `import asyncio` used and
  `wait_condition` wrapped in `try/except asyncio.TimeoutError` yields none) and across all config modes.
- Runtime fault injection was considered and deferred (would need per-guide scenarios); static heuristics chosen as the
  generic baseline.
- Scope note: unused *definitions* like the PR's unused `PointsEvent` dataclass are dead-code detection, not unused
  imports — deliberately left out as a separate, noisier check for later.

## Update (2026-11-06): concat-header is now the default

Code Sandwich is the structure all guides are moving to, so `concat-header` is now the default extraction mode (in
`extract_guide.py` argparse and the `run_guide_test.py` manifest fallback). Guides not yet republished in Code Sandwich
form pin an explicit mode:

- `entity-pattern-loyalty-points` — dropped its explicit mode; rides the default (concat output is identical to
  comment-header for the current single-block file, and PASSES).
- `celery-to-standalone-activity` — pinned `comment-header`: concat would append its `(updated)`/`(excerpt)` variant
  blocks (header-less) into the files. Still PASSES.
- `durable-gaming-sessions` — pinned `comment-header`: under concat a dedented snippet is appended to `starter.py` and
  it no longer compiles. Still red for the known str-enum bug, not a new failure.
- `reliable-document-approvals` — keeps `prose-filename` (names files in prose, not headers).

Each pin's `_notes` says to drop it once the published guide is rewritten in Code Sandwich form.

## Open next steps (none done yet)

- Decide whether to **fix the two guide bugs** (gaming str-enum; approvals lost-signal race) and in how many PRs. The
  user was asked and had not answered when this summary was written.
- Possibly **push / open a PR** for the skill branch.
- Future harness work: a **TypeScript runner** (unblocks `recover-without-restart`) and a **mock layer** for
  external-API guides (unblocks `rate-limit-downstream-apis`).
- **Done (2026-11-06): concat-header extraction mode.** `extract_guide.py` now has a `concat-header` mode that assigns
  header-less continuation blocks to the most recent `# name.ext` header, so Code Sandwich guides (the structure
  `docs-guide-revision` produces) reconstruct correctly. Verified against PR #5461's rewrite of the loyalty guide: with
  `comment-header` the files came out as import-only stubs and the worker failed on ImportError; with `concat-header`
  the project rebuilt fully (workflows.py back to 338 lines), compiled, ran green on all four assertions, **and the
  static checks reported zero findings** — the PR fixed every unused-import and unhandled-failure item the live page
  still has. (Live vs PR is a clean before/after for the checks.)
- The sibling session that broadened coverage:
  `local_38bdf467-1a5a-45d0-abc5-cf1285ddfc76` ("Add manifests for other self-contained guides"), idle.
