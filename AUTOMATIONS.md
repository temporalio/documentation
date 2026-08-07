# Automations

Every automation in this repository, grouped by what triggers it. Use this to find out what already runs before adding
something new, and to know what to update when you change or rename a job.

When you add or rename an automation, update this file and the `workflows:` list in
[`notify-automation-failures.yml`](./.github/workflows/notify-automation-failures.yml). That list matches on a
workflow's `name:` value, so a rename silently unhooks its failure alert.

## Content generation

Automations that write content into the repository. Each one opens a pull request rather than committing to `main`.

| Automation              | Trigger                                 | Writes                                                        | Source                                                                                |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Snipsync                | Daily at 06:00 UTC, or on demand        | Code snippets throughout `docs/`                              | `snipsync.yml`, `snipsync.config.yaml`                                                |
| CLI command reference   | A published release in `temporalio/cli` | `docs/cli/command-reference/`                                 | `update-cli-docs.yml`, `bin/post-process-cli-docs.js`                                 |
| Custom role permissions | Mondays at 09:00 UTC, or on demand      | `docs/cloud/manage-access/_custom_role_permissions_table.mdx` | `update-custom-role-permissions.yml`, `bin/generate-custom-role-permissions-table.js` |
| SDK version chips       | Daily at 09:00 UTC, or on demand        | `src/data/sdk-versions.json`                                  | `update-sdk-versions.yml`, `bin/update-sdk-versions.js`                               |
| AI cookbook sync        | Every build, and on `yarn start`        | `ai-cookbook/`                                                | `bin/sync-ai-cookbook.js`, `bin/ensure-ai-cookbook.js`                                |

Notes:

- Snipsync reuses one branch, `snipsync/daily-update`, and updates the open pull request instead of stacking new ones.
  Sources are listed in `snipsync.config.yaml`. Edit the source repository named in the `<!--SNIPSTART-->` wrapper, not
  the page.
- The CLI reference is generated twice, once for `temporalio/cli` and once for `temporalio/cloud-cli` into a `cloud/`
  subdirectory. The two share option set names and collide in a single invocation. `index.mdx` landing pages are
  hand-maintained and restored after regeneration.
- The AI cookbook sync runs from the `prebuild` script, so it is part of the Vercel build rather than a workflow. It
  clones `temporalio/ai-cookbook` on every build.
- All four workflows authenticate as the `temporal-cicd` GitHub App. A token from that app reaches only this repository
  unless the step sets `owner` and `repositories`, and GitHub answers a request for an unreachable private repository
  with a 404 rather than a 403, so a scope mistake looks like a missing file.

## Pull request checks

| Check                      | Runs on                                              | Fails on findings | Source                                                          |
| -------------------------- | ---------------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| Docs Build Check           | Changes to docs, `src/`, `static/`, or build config  | Yes               | `build-check.yml`, `bin/parse-build-failure.js`                 |
| Check Redirects            | Every pull request                                   | Yes               | `check-redirects.yml`, `bin/check-redirects-for-moved-pages.js` |
| Check Metrics Reference    | Changes to `docs/references/sdk-metrics.mdx`         | Yes               | `check-metrics-reference.yml`, `bin/check-metrics-reference.js` |
| Environment config drift   | Changes to the client environment configuration page | Yes               | `env-config-drift.yml`, `bin/check-env-config-table.js`         |
| Mermaid CI                 | Changes under `docs/`                                | Yes               | `mermaid-ci.yml`, `scripts/lint-mermaid.mjs`                    |
| Vale CI                    | Changes under `docs/`                                | No                | `vale-ci.yml`, `.vale-ci.ini`                                   |
| Check Orphan Pages         | Changes to docs or `sidebars.js`                     | No                | `check-orphan-pages.yml`, `bin/check-orphan-pages.js`           |
| Check Metrics Against SDKs | Changes to the metrics page or its checker           | No                | `check-metrics-against-sdks.yml`                                |
| Docs Preview Links         | Every pull request                                   | No                | `docs-preview-links.yml`, `bin/generate-docs-preview-list.js`   |
| Visual Comparison          | Pull requests labeled `visual-comparison`            | No                | `visual-comparison.yml`                                         |
| Dependabot                 | Weekly, for npm and GitHub Actions                   | No                | `.github/dependabot.yml`                                        |

"Fails on findings" means the job turns red, not that merging is prevented. Branch protection on `main` requires only
the `Vercel` check, so every job in this table can be merged past.

Notes:

- Docs Build Check runs the same production build Vercel runs. Vercel reports only that a branch failed to deploy, so
  this job parses the build log and comments the specific page or link that needs fixing.
- Vale CI runs with `fail_on_error: false` and only the rules in `.vale-ci.ini`. Treat those rules as the bar, not the
  full style set. See [AGENTS.md](./AGENTS.md#commands).
- Check Orphan Pages never fails. Accepted exceptions belong in `bin/orphan-pages-baseline.json` with a note. See
  [UTILITIES.md](./UTILITIES.md#check-orphan-pages).
- Visual Comparison compares against baselines captured weekly by Screenshot Capture, and publishes its HTML report to a
  throwaway Vercel deployment linked from a pull request comment. See [UTILITIES.md](./UTILITIES.md#visual-comparison).
- Docs Preview Links reads the preview URL out of Vercel's own comment, then upserts a single comment listing the pages
  the pull request changes.

## Scheduled and event-driven

| Automation                     | Trigger                    | What it does                                                                |
| ------------------------------ | -------------------------- | --------------------------------------------------------------------------- |
| Snipsync                       | Daily, 06:00 UTC           | Syncs code snippets. See [Content generation](#content-generation).         |
| Update SDK Versions            | Daily, 09:00 UTC           | Refreshes the version chips shown on `/develop`.                            |
| Update Custom Role Permissions | Mondays, 09:00 UTC         | Regenerates the Cloud permissions table.                                    |
| Check Metrics Against SDKs     | Mondays, 10:00 UTC         | Compares the metrics reference with the SDK default branches.               |
| Environment config drift       | Mondays, 15:00 UTC         | Compares the environment variable table with five SDK and CLI repositories. |
| Screenshot Capture             | Sundays, 00:00 UTC         | Captures Playwright baselines for Visual Comparison.                        |
| Warm Build Cache               | Every push to `main`       | Rebuilds so dependency and build caches stay warm.                          |
| Delete Visual Tests Reports    | Branch deletion            | Removes that branch's reports from `gh-pages`.                              |
| Notify Automation Failures     | Another workflow completes | Posts failures to Slack. See [Failure alerting](#failure-alerting).         |

Check Metrics Against SDKs is advisory by design. The SDK default branches run ahead of released versions, so instead of
failing it opens a tracking issue, updates that issue while the drift lasts, and closes it once the page and the sources
agree. Record a deliberately undocumented metric in `bin/metrics-baseline.json`.

Warm Build Cache exists so a new pull request's first Docs Build Check isn't a cold install. GitHub falls back from the
current ref to the base branch to the default branch when restoring a cache, so pull request runs restore what merges to
`main` saved. Docs Build Check restores these caches but never saves them, because the OG image and rspack caches are
large and keyed per run.

## Failure alerting

`notify-automation-failures.yml` posts to Slack when a workflow that has nowhere else to report fails. Pull request
checks are deliberately excluded, since they already surface on the pull request.

Two things to know:

- The `workflows:` list matches each workflow's `name:` value, not its filename. Renaming a workflow silently stops
  matching it.
- Dependabot runs as a GitHub-managed workflow and cannot be listed, so its failures are not alerted.

## Build time

These run on every Vercel build rather than in GitHub Actions.

| Automation                    | What it does                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `plugins/markdown-pages`      | Emits a clean `.md` for every page, plus `llms.txt` and `llms-full.txt`. See [MARKDOWN_PIPELINE.md](./MARKDOWN_PIPELINE.md). |
| `plugins/og-image`            | Renders per-page Open Graph cards, cached by content hash                                                                    |
| `plugins/cookbook-index`      | Builds the AI cookbook index page and its card                                                                               |
| `plugins/cloud-region-counts` | Counts regions from the region reference pages                                                                               |
| `middleware.js`               | Serves the `.md` version of a page for `Accept: text/markdown`                                                               |
| `prebuild` / `postbuild`      | Syncs the AI cookbook, then verifies the preloaded font hash matches `vercel.json`                                           |

## Local

`.husky/pre-commit` is a shim that sources an untracked `.husky/pre-commit.local` if you create one. Nothing runs by
default.

## Not automated

These exist as scripts but nothing runs them. Treat a green pull request as saying nothing about them.

| Command                                                                      | Covers                                                                                                             |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `yarn test`                                                                  | Only 2 of 7 test files run in CI. The rest, including the Markdown pipeline snapshots in `tests/`, run nowhere.    |
| `yarn check-links`                                                           | Broken links and anchors across the built site                                                                     |
| `yarn validate:og-images`, `yarn check:og-budget`                            | Open Graph image validity and build budget                                                                         |
| `bin/generate-og-gallery.js`, `bin/plainify`, `scripts/audit-components.mjs` | Run by hand. Described in [READABILITY.md](./READABILITY.md) and [COMPONENT_REGISTRY.md](./COMPONENT_REGISTRY.md). |
