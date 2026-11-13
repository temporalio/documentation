---
name: docs-guide-test
description: Run a Temporal guide (a docs.temporal.io/guides tutorial under docs/guides/) end to end against a local Temporal dev server, to verify its code still works. Reconstructs the runnable project from the guide's inline code blocks, stands up `temporal server start-dev`, runs the worker and driver, and asserts the outcome the guide claims. Use for requests like "test the loyalty-points guide", "does the entity-pattern tutorial still run", "verify the guides build and run", "check that this guide's code works end to end", or when an SDK or CLI release might have broken a tutorial and you need to run it to find out. Each guide is described by a manifest in manifests/; add a manifest to cover a new guide.
argument-hint: "<guide name, path, or manifest>"
---

# Test a Temporal guide end to end

Many guides under `docs/guides/` are tutorials whose code is shown inline, step by step. Readers are expected to
assemble those snippets into a working project and run it. This skill does exactly that, automatically: it rebuilds the
project from the guide's code blocks, runs it against a local Temporal server, and checks that it produces the result
the guide promises. The point is to catch a guide that has silently stopped working — an SDK rename, a changed default,
a snippet that no longer assembles — before a reader hits it.

## What this skill covers today

It runs **self-contained guides**: guides whose code needs only a Temporal server and the SDK, with no live
third-party APIs. The pilot is `entity-pattern-loyalty-points` (Python); `celery-to-standalone-activity` is another
green one. Guides that call real external services (SendGrid, OpenAI, Stripe, and the like) can't go green locally
without credentials or a mock layer, and guides that require Temporal Cloud or a specific cloud environment are out of
scope. A manifest marks those explicitly rather than letting them fail noisily — see
[references/authoring-manifests.md](references/authoring-manifests.md). Every candidate guide under `docs/guides/` has a
manifest today (runnable or `skip`), so each is either tested or has a recorded reason it isn't.

A runnable manifest can legitimately come back red: when a self-contained guide's own code is broken, the harness
catches it, and that red is the finding. `durable-gaming-sessions` and `reliable-document-approvals` are in that state
now — both self-contained, both currently failing against the current SDK. The cause is in each manifest's `_notes` and
in [references/authoring-manifests.md](references/authoring-manifests.md).

Everything runs locally. The harness never sends data to an external service and never touches Temporal Cloud.

## How a test is described: the manifest

Each guide gets one manifest in `manifests/<guide-id>.json`. The manifest is the whole contract — the scripts are
generic, and all per-guide knowledge lives in the manifest. A manifest says which guide to read, which language and
dependencies it needs, how to start the worker and the driver program, and what the run's output must contain to count
as a pass.

The pilot manifest is [manifests/entity-pattern-loyalty-points.json](manifests/entity-pattern-loyalty-points.json).
Read it alongside this file; it's the clearest explanation of the schema. The full field reference and the rules for
writing a manifest for a new guide are in [references/authoring-manifests.md](references/authoring-manifests.md).

## Running a test

Use the orchestrator script. Point it at a manifest (or a guide id, which resolves to `manifests/<id>.json`):

```bash
python .claude/skills/docs-guide-test/scripts/run_guide_test.py entity-pattern-loyalty-points
```

The script, in order:

1. **Checks prerequisites.** It needs the Temporal CLI (`temporal`) and `uv`. Missing ones are installed with
   Homebrew when the machine allows it, because the user opted into auto-install. `uv` runs the guide's code on a
   pinned Python version from the manifest, which keeps the test off whatever Python happens to be the system default
   and avoids missing-wheel surprises on brand-new Python releases.
2. **Reconstructs the project.** It extracts the guide's code blocks into a scratch directory. The default rule is
   Code Sandwich: a fenced `python` block whose first line is a `# filename.py` comment starts a file, and the
   header-less blocks that follow are appended to it — the structure the guides are being rewritten into. A guide not
   yet converted pins `extract.mode: comment-header` in its manifest (first complete block per file, header-less
   variants ignored), or `prose-filename`. See [references/authoring-manifests.md](references/authoring-manifests.md).
3. **Runs static checks over the reconstructed source.** Before anything executes, it parses the extracted files and
   reports four classes of defect a passing run can't catch: imports the code never uses; unhandled failure paths (a
   `wait_condition` timeout or an exhausted Activity retry that would fail the Workflow uncaught); names used but defined
   nowhere in the project (a block the guide forgot to show, or a rename); and non-determinism in Workflow code
   (wall-clock, randomness, or I/O that breaks replay). These are heuristics, printed as advisory findings by default —
   they don't turn a working guide red unless a manifest sets `checks.fail_on_findings`. See
   [references/authoring-manifests.md](references/authoring-manifests.md).
4. **Starts a fresh local server.** It runs `temporal server start-dev`, which keeps state in memory, so every run
   starts clean and Workflow Ids never collide across runs. If port 7233 is already in use, the script stops and asks
   you to shut down the other server rather than silently reusing an unknown one.
5. **Runs the worker, then the driver.** The worker starts in the background; the driver (the guide's starter program)
   runs to completion with its output captured.
6. **Checks the assertions.** Each string the manifest expects in the output is checked against what the driver
   printed. All present means pass.
7. **Tears everything down** and prints a report. On failure it dumps the driver output and the tails of the worker and
   server logs so you can see what broke. Exit code is 0 on pass, 1 on any failure (a static finding only counts when
   `checks.fail_on_findings` is set).

Pass `--keep` to leave the scratch directory and servers up for inspection, and `--verbose` to stream the logs.

## Adding a new guide

1. Read the guide and decide whether it's self-contained. If it calls external APIs or needs Cloud, write a manifest
   with the matching `skip` reason instead of a runnable one — that records the decision and keeps the guide out of the
   "silently untested" pile.
2. For a self-contained guide, work out the end state its driver program produces, and pick a few exact output lines
   that prove the important behavior ran (not just "it didn't crash"). Those become the assertions.
3. Write `manifests/<guide-id>.json` following [references/authoring-manifests.md](references/authoring-manifests.md).
4. Run it, and iterate on the assertions until a genuine pass is a genuine pass.

## When a test fails

A failure is a finding about the guide, not necessarily a bug in the harness. Common causes, roughly in order:

- The guide's code genuinely broke (an SDK rename, a changed signature). This is the case the skill exists to catch —
  report it with the failing output.
- The guide's snippets no longer assemble into the files the manifest expects (a renamed file, a block that lost its
  `# filename` header). Fix the guide or the manifest's extraction rule, and note which.
- A prerequisite version in the manifest drifted from what the guide now requires. Reconcile the two.

Before reporting a guide as broken, read the captured output to confirm the failure is the guide's and not a stale
assertion in the manifest.
