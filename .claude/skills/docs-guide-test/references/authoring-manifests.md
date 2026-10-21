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
| `extract.mode` | no | `"comment-header"` (default): a block whose first line is `# name.ext` is a complete file. `"prose-filename"`: the filename comes from the prose just above the block (see [Extraction notes](#extraction-notes)). |
| `extract.exclude` | no | Filenames to leave out of the run even though they carry a header (e.g. a determinism-replay helper that needs a saved history). |
| `setup` | no | Shell-style commands run once after the server is ready and before the worker, for state the guide expects to exist but a fresh `temporal server start-dev` does not create: custom Search Attributes, extra Namespaces. A failing step fails the run (see [Setup steps](#setup-steps)). |
| `worker` | yes | Command that starts the worker, relative to the reconstructed source dir. `python <file>` runs under the provisioned venv. |
| `driver` | yes | Command that drives the scenario (the guide's "starter"). Its captured output is what assertions check. |
| `startup_wait_seconds` | no | Seconds to let the worker register before the driver runs (default 4). |
| `driver_timeout_seconds` | no | Hard cap on the driver (default 120). |
| `assert.stdout_contains` | yes | Exact substrings the driver's output must contain. Pick lines that prove the behavior ran. |
| `assert.driver_exit_zero` | no | Require the driver to exit 0 (default true). |
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

`comment-header` mode keys on the `# filename.py` header these guides already use, and takes the **first** block per
filename. That is deliberate: guides often show a complete file once, then later show a one-line variant ("add
`versioning_behavior=...`") in a block with no filename header. The header rule runs the real file and ignores the
variant. If a guide genuinely builds one file across several headed blocks, this mode won't concatenate them yet — note
it in `_notes` and extend the extractor rather than hand-editing extracted files.

`prose-filename` mode is for guides that name each file in the prose above the block ("Create a file named
`models.py`:") instead of in a first-line comment. It takes the nearest backtick-quoted `name.ext` within a few
non-empty lines above the fence, and keeps the same first-block-wins and `exclude` behavior. Use it only when a guide
follows that convention end to end; `comment-header` is more precise when the guide uses in-block headers, so it stays
the default. `reliable-document-approvals` uses `prose-filename`.

## Runnable manifests that currently fail

A runnable manifest whose guide is genuinely broken should stay runnable and go red — that red is the finding the skill
exists to surface, and the assertions still encode the intended green state for when the guide is fixed. Don't convert
such a guide to a `skip` (that's for external/cloud guides that *can't* run locally) and don't weaken its assertions to
make it pass. Record the root cause in `_notes`. Two self-contained guides are in this state today:
`durable-gaming-sessions` and `reliable-document-approvals`, both from a `class X(str, enum.Enum)` field that does not
round-trip through Temporal's default JSON converter (it deserializes as a list of the string's characters);
`reliable-document-approvals` also loses the approval Signal in a `_wait_for_decision` reset.
