# Modal documentation draft

These pages are drafts on `docs/modal-serverless-workers`, based on `origin/main` at
`321065e8253fef37a32bedc04498c28da717e829`. Research was checked on November 20, 2026.

## Pages and scope

| Draft | Lambda model | Reader task |
| --- | --- | --- |
| `docs/encyclopedia/workers/serverless-workers/modal.mdx` | `aws-lambda.mdx` in the same folder | Understand invocation lifetime, container reuse, two scaling layers, shutdown, and version mapping. |
| `docs/develop/python/workers/serverless-workers/modal.mdx` | `aws-lambda.mdx` in the same folder | Write and configure the Python function and Worker. |
| `docs/production-deployment/worker-deployments/serverless-workers/modal.mdx` | `aws-lambda/index.mdx` in the same folder | Deploy the code, configure credentials, register compute, and verify automatic invocation. |
| `docs/troubleshooting/serverless-workers/modal.mdx` | `aws-lambda.mdx` in the same folder | Distinguish invocation, connection, routing, timeout, and container-capacity failures. |

All four pages build normally and appear beside their Lambda counterparts in sidebar navigation so reviewers can
read the full PR preview. Parent provider listings, release-stage constants, redirects, and shared components are
unchanged. Keep the PR as a draft and do not merge it until the publication blockers below clear.

## Publication blockers

- [Modal WCI provider PR #154](https://github.com/temporalio/temporal-auto-scaled-workers/pull/154) remains open.
  Confirm the merged implementation, released WCI and Server requirements, and Temporal Cloud rollout before publishing.
- Verify the workspace connection, version creation, and validation steps in the released Temporal Cloud UI. The draft
  follows the proposed UI in [cloud-ui PR #3545](https://github.com/temporalio/cloud-ui/pull/3545) and
  [UI PR #4079](https://github.com/temporalio/ui/pull/4079).
- Confirm supported Namespace locations, region selection, high availability, and self-hosted setup before adding
  those claims. Lambda's AWS-specific restrictions and IAM setup were not copied to Modal.
- Run the deployment and automatic-registration flow in an authorized environment. The previous smoke test validated
  a local integration build only. The staging Workflow start was rejected with HTTP 403; it did not validate Modal execution.
- Confirm numeric app-version pinning in a live deployment, including behavior after app redeployment.

The old local `/Users/lenny/workspace/modal-worker-smoke` example predates the release. Its package name, import,
development wheel, and source-build instructions are obsolete. The drafts use the released package instead and do not
change that separate project. Its one-container limit was a smoke-test choice, not a recommended scale-out default.

## Primary evidence

| Topic | Evidence |
| --- | --- |
| Published Python package | [PyPI 0.0.1](https://pypi.org/project/temporalio-modal-function-worker/0.0.1/), uploaded November 12, 2026. Python >=3.10; Temporal SDK >=1.34,<2; Modal SDK >=1,<2. |
| Released APIs and lifecycle | [Integration source at release commit 9d28a188](https://github.com/temporalio/worker-integrations/tree/9d28a1882c57bbc238295f26b3db39849eb4d8ce/python/modal_function_worker). Import `temporalio.worker_integrations.modal.function`; async `run_worker`; budget and defaults checked against the released wheel. |
| Modal provider invocation and credentials | [PR154 provider at head 49943ec3](https://github.com/temporalio/temporal-auto-scaled-workers/blob/49943ec34e6a29655d3a97d19ca35b1f60b8ab9c/wci/workflow/compute_provider/modal/function.go). Calls `Spawn` with no arguments; returns without waiting. OAuth mode selects an account-connected workspace; default server credential mode uses Modal SDK discovery. This is proposed implementation, not a release. |
| Temporal scaling | [No-sync scaler at the same PR head](https://github.com/temporalio/temporal-auto-scaled-workers/blob/49943ec34e6a29655d3a97d19ca35b1f60b8ab9c/wci/workflow/scaling_algorithm/no_sync_match.go). Match failures and periodic backlog checks can request one invocation per eligible action; cooldown and optional suppression apply. No active scale-in action. `max_worker_lifetime_ms` requests fresh capacity, not termination. |
| Automatic Task Queue registration | [Modal integration test](https://github.com/temporalio/temporal-auto-scaled-workers/blob/49943ec34e6a29655d3a97d19ca35b1f60b8ab9c/tests/integration/modal_test.go#L253) and [WCI registration path](https://github.com/temporalio/temporal-auto-scaled-workers/blob/49943ec34e6a29655d3a97d19ca35b1f60b8ab9c/wci/workflow/workflow.go#L535). Version creation requests a registration invocation before Workflow submission. |
| CLI configuration | [CLI PR1240](https://github.com/temporalio/cli/pull/1240), merged October 28, plus `docs/cli/command-reference/worker.mdx` on this branch. Use the tree commands; do not modify generated reference content. |
| Container scaling | [Modal autoscaling](https://modal.com/docs/guide/scale), including pool limits, warm containers, and idle scale-down. |
| Container reuse and function deadlines | [Modal lifecycle](https://modal.com/docs/guide/lifecycle-functions) and [timeouts](https://modal.com/docs/guide/timeouts). Do not copy Lambda's 15-minute ceiling or imply queue-empty invocation shutdown. |
| Deployments and numeric versions | [Modal deployments](https://modal.com/docs/guide/managing-deployments). Numeric Deployment History versions are distinct from deployment tags. |
| Secrets and environments | [Modal secrets](https://modal.com/docs/guide/secrets) and [environments](https://modal.com/docs/guide/environments). |

## Navigation and related pages before publication

Each page is listed beside its Lambda sibling in `sidebars.js`. Add Modal links and provider-specific behavior to
these parent pages after availability is confirmed:

- `docs/encyclopedia/workers/serverless-workers/index.mdx`: providers, lifecycle, autoscaling, and versioning links;
  recheck any same-cloud and high-availability statements before extending them to Modal.
- `docs/production-deployment/worker-deployments/serverless-workers/index.mdx`: supported providers and invocation model.
- `docs/develop/python/workers/serverless-workers/index.mdx`: supported providers and lifecycle wording.
- `docs/troubleshooting/serverless-workers/index.mdx`: provider triage link and invocation explanation.
- `docs/evaluate/features/serverless-workers/index.mdx`: provider coverage and feature stage, if appropriate at release.

Do not add other SDK pages without evidence of a corresponding integration. No existing page moves or public URL
changes are proposed, so no redirects are required. New slugs are explicit.

## Samples and validation

The Python guide uses Snipsync blocks generated from `python-sandbox/workers/modal_worker/` in the local
`docs/modal-serverless-worker` branch of `temporalio/documentation-sdk-code-examples`. Merge the companion
sample change before merging these docs so the source links and the regular Snipsync job can resolve the snippets
from `main`.

On November 23, the companion sample's pytest test passed against a local Temporal Service using the released
integration. A second Snipsync run against the local sample branch left the generated blocks unchanged.

Validation completed on November 20:

- CI-scoped Vale: all four pages passed with no results.
- Direct MDX compilation: all four pages passed. The initial `draft: true` frontmatter excluded the pages from
  production-mode PR previews. The pages now build normally and have sidebar entries for review.
- Internal routes and anchors: 26 links checked against repository pages, including draft-to-draft links; all resolved.
- Index-slug and orphan-page checks: passed.
- Extracted all three Python files from the SDK page. The published integration ran the Workflow and Activity against
  a temporary local Temporal Service and returned `Hello, World!` using a versioned Worker.
- Direct Pyright check of the extracted files with the published integration installed: no errors or warnings.
- Scoped repository Python checker: checked against Temporal SDK 1.36.1 and reported one missing-module finding for
  `temporalio.worker_integrations.modal.function`. Its dependency discovery did not supply the independently named
  `temporalio-modal-function-worker` distribution. The import succeeds in the installed environment, the direct type
  check passes, and the execution test uses that integration. No shared checker or baseline was changed for this draft.

Local validation cannot establish Cloud OAuth setup, remote image builds, provider availability, or autoscaling.
