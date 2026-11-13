# Authoring a guide manifest

A manifest is the entire per-guide contract. `scripts/run_guide_test.py` is generic; everything specific to one guide
lives in `manifests/<guide-id>.json`, where `<guide-id>` matches the guide's file stem under `docs/guides/`.

## Decide the kind of guide first

Not every guide can run cleanly on a local machine. Classify it before writing a runnable manifest:

- **Self-contained** — code needs only a Temporal server and the SDK. Activities log or compute; they do not call live
  third-party services. These are the guides this skill runs. (Pilot: `entity-pattern-loyalty-points`.)
- **External-dependency** — Activities call real APIs (SendGrid, OpenAI, Stripe, a database you don't have). These
  can't go green locally without credentials or a mock layer. Write a `skip` manifest until a mock layer exists.
- **Cloud / environment-bound** — requires Temporal Cloud, a cloud account, or special infrastructure. Out of scope;
  write a `skip` manifest.

A `skip` manifest records the decision so the guide isn't silently untested:

```json
{
  "guide": "docs/guides/rate-limit-downstream-apis.mdx",
  "skip": "Activities call live SendGrid/OpenAI/Stripe APIs; needs a mock layer before it can run locally."
}
```

## Fields for a runnable manifest

| Field | Required | Meaning |
|-------|----------|---------|
| `guide` | yes | Repo-relative path to the `.mdx`. |
| `language` | yes | Fenced-block language to extract and run. Only `python` is supported today. |
| `python` | python | Python version `uv` provisions for the run (e.g. `"3.12"`). Keep it within the guide's stated minimum and a version the SDK ships wheels for. |
| `pip` | python | Dependencies to install, as pip requirement strings. Mirror the guide's prerequisites (e.g. `["temporalio>=1.7.0"]`). |
| `extract.mode` | no | `"concat-header"` (default): a `# name.ext` header starts a file and following header-less blocks append to it (Code Sandwich guides). `"comment-header"`: a block whose first line is `# name.ext` is one complete file, header-less blocks ignored (guides not yet converted). `"prose-filename"`: the filename comes from the prose just above the block. See [Extraction notes](#extraction-notes). |
| `extract.exclude` | no | Filenames to leave out of the run even though they carry a header (e.g. a determinism-replay helper that needs a saved history). |
| `setup` | no | Shell-style commands run once after the server is ready and before the worker, for state the guide expects to exist but a fresh `temporal server start-dev` does not create: custom Search Attributes, extra Namespaces. A failing step fails the run (see [Setup steps](#setup-steps)). |
| `worker` | yes | Command that starts the worker, relative to the reconstructed source dir. `python <file>` runs under the provisioned venv. |
| `driver` | yes | Command that drives the scenario (the guide's "starter"). Its captured output is what assertions check. |
| `startup_wait_seconds` | no | Seconds to let the worker register before the driver runs (default 4). |
| `driver_timeout_seconds` | no | Hard cap on the driver (default 120). |
| `assert.stdout_contains` | yes | Exact substrings the driver's output must contain. Pick lines that prove the behavior ran. |
| `assert.driver_exit_zero` | no | Require the driver to exit 0 (default true). |
| `checks.unused_imports` | no | Static check: imports the code never uses. Default on; set `false` to skip (see [Static checks](#static-checks)). |
| `checks.unhandled_failures` | no | Static check: unhandled failure paths. Default on; set `false` to skip. |
| `checks.undefined_names` | no | Static check: names defined nowhere in the reconstructed project. Default on; set `false` to skip. |
| `checks.nondeterminism` | no | Static check: wall-clock/randomness/I/O in Workflow code. Default on; set `false` to skip. |
| `checks.fail_on_findings` | no | Make static findings fail the run (default false — findings are advisory). |
| `checks.exclude` | no | Filenames the static checks skip (e.g. a deliberately-minimal snippet). |
| `_notes` | no | Free text: where the expected numbers come from, caveats, why anything is excluded. |

## Writing good assertions

The test is only as good as its assertions. "It didn't crash" is weak — a guide can run to completion while computing
the wrong thing. Instead, work out the end state the driver *should* produce from the guide's own logic, and assert the
exact output lines that encode it.

For the loyalty pilot, the driver sends `+500` then `+750` (balance and lifetime become 1250, tier crosses into Silver
at 1000), redeems `200` (balance 1050), then sends `10 × +100` (balance 2050, lifetime 2250, still Silver below the
5000 Gold threshold). Each of those transitions has a printed line, and all four are asserted — so a change that broke
accrual, tiering, redemption, or the batch path would fail a specific assertion and point at the culprit.

Prefer a few meaningful lines over many trivial ones. If the guide's driver doesn't print enough to assert on, that is
itself worth noting to the guide's author; don't weaken the test to match thin output.

## Static checks

The end-to-end run catches a guide whose happy path broke. It cannot catch defects that leave the happy path green: an
import the code never uses, or a failure path that never runs because nothing failed. Both are things human reviewers
have flagged on real guide PRs (an unused `import asyncio`; a `wait_condition` timeout and an exhausted Activity retry
that each fail the Workflow uncaught). So after reconstructing the project, the harness also runs
`scripts/static_checks.py` over the extracted source — pure `ast` parsing, no server, no execution — and prints a
`STATIC CHECKS` section.

Four checks run, all on by default:

- **`unused_imports`** — an imported name the file never references. Handles `import a.b` / `as` aliases / `from m import
  x`, treats `__all__` entries as used, and skips `from __future__` and star-imported files. Blind spot: a name used only
  inside a *string* annotation reads as unused, so a purely type-checking import can be a false positive.
- **`unhandled_failures`** — two Temporal-specific smells: a `workflow.wait_condition(..., timeout=...)` with no enclosing
  `try`/`except` for `asyncio.TimeoutError`, and an `execute_activity*` call with no surrounding `try`/`except` when the
  file builds a `RetryPolicy(maximum_attempts=...)` (a bounded policy is what makes an exhausted retry terminal). The list
  of patterns is meant to grow.
- **`undefined_names`** — a name loaded but defined nowhere in the *whole* reconstructed project (resolved across every
  extracted file at once, since guides split code over worker/workflow/activities files that import each other). This is
  the completeness check: a flagged name is usually a block the guide forgot to show or a rename it half-applied. It
  flattens all scopes into one defined-set to keep false positives near zero, and backs off entirely if any file has a
  `from m import *`. Blind spot: a name defined in one function but used undefined in another won't be caught (a
  deliberate bias toward precision).
- **`nondeterminism`** — wall-clock reads (`datetime.now`, `time.time`), randomness (`random.*`, `uuid.uuid4`,
  `secrets.*`), or I/O (`requests`/`httpx`/`urllib`/`socket`, bare `open`/`input`) called **inside a class decorated
  `@workflow.defn`**, where they break replay; the finding names the `workflow.*` equivalent. Scoped to Workflow classes,
  so Activities and plain helpers — which may read the clock or do I/O — are left alone. Only module-qualified calls and
  bare `open`/`input` are matched; a `from random import randint` style import is a known blind spot.

These are **heuristics reported for a human to judge, not proof of a bug**, so they are **advisory by default**: findings
print but do not change the exit code, and a working guide stays green. A manifest that wants them enforced sets
`checks.fail_on_findings: true`. Turn a check off with `"unused_imports": false` (or `"unhandled_failures": false`), and
exempt specific files with `checks.exclude`:

```json
"checks": {
  "unused_imports": true,
  "unhandled_failures": true,
  "undefined_names": true,
  "nondeterminism": true,
  "fail_on_findings": false,
  "exclude": ["minimal_snippet.py"]
}
```

Omit `checks` entirely and both run advisory. A real finding is a note for the guide's author, the same as a failed
assertion — don't silence it with `exclude` to make a page look clean; `exclude` is for a file where the check genuinely
doesn't apply.

## Setup steps

Some guides depend on server state they tell the reader to create by hand before running the Worker: custom Search
Attributes (`durable-gaming-sessions` registers `PlayerStatus`/`CurrentRoom`/`PlayerLevel`), or a non-default Namespace
(`reliable-document-approvals` connects to a `document-approval` Namespace). A fresh `temporal server start-dev` has
none of these, so `start_workflow`, `upsert_search_attributes`, or the Worker's connect would fail. List those commands
in `setup`; the harness runs each one after the server is ready and before the worker:

```json
"setup": [
  "temporal operator namespace create document-approval",
  "temporal operator search-attribute create --namespace document-approval --name ApprovalStatus --type Keyword"
]
```

Each entry is split with `shlex` and run with a 60-second cap. A non-zero exit fails the whole run, because the guide's
code depends on the step. Keep steps to real setup the guide documents — don't use them to patch around a guide bug.

## Extraction notes

`concat-header` is the default (described last, below); the other two modes are opt-in, set with `extract.mode`.

`comment-header` mode keys on the `# filename.py` header and takes the **first** block per filename, ignoring any
header-less blocks. Use it for a guide not yet rewritten in Code Sandwich form: such a guide often shows a complete file
once, then later a header-less variant ("add `versioning_behavior=...`"), and first-block-wins runs the real file while
ignoring the variant — whereas the default `concat-header` would append that variant and corrupt the file.
`celery-to-standalone-activity` and `durable-gaming-sessions` pin `comment-header` for exactly this reason (see their
`_notes`); drop the pin when the published guide moves to Code Sandwich.

`prose-filename` mode is for guides that name each file in the prose above the block ("Create a file named
`models.py`:") instead of in a first-line comment. It takes the nearest backtick-quoted `name.ext` within a few
non-empty lines above the fence, and keeps the same first-block-wins and `exclude` behavior. Use it only when a guide
follows that convention end to end; `comment-header` is more precise when the guide uses in-block headers, so it stays
the default. `reliable-document-approvals` uses `prose-filename`.

`concat-header` mode is the **default**, for guides written with the **Code Sandwich** technique (the structure the
`docs-guide-revision` skill produces): one file is introduced by a `# name.ext` header block holding just the imports,
then built up across many header-less blocks interleaved with prose. Here a header *starts or switches* the current file and every following
header-less block in the target language is appended to it, so the file is concatenated rather than taken from its first
block. It relies on the guide presenting each file's blocks contiguously and at the right indentation — method blocks
shown indented under their class, not dedented to column 0 — so a block that pastes a method at column 0 reconstructs a
module-level function and breaks the file. An excluded file's continuation blocks are skipped along with its header.
After a `concat-header` run, spot-check the reconstruction (`--keep`, or extract on its own) before trusting a red
result: a failure can mean the blocks don't assemble that way, not that the code is broken.

## Runnable manifests that currently fail

A runnable manifest whose guide is genuinely broken should stay runnable and go red — that red is the finding the skill
exists to surface, and the assertions still encode the intended green state for when the guide is fixed. Don't convert
such a guide to a `skip` (that's for external/cloud guides that *can't* run locally) and don't weaken its assertions to
make it pass. Record the root cause in `_notes`. Two self-contained guides are in this state today:
`durable-gaming-sessions` and `reliable-document-approvals`, both from a `class X(str, enum.Enum)` field that does not
round-trip through Temporal's default JSON converter (it deserializes as a list of the string's characters);
`reliable-document-approvals` also loses the approval Signal in a `_wait_for_decision` reset.
