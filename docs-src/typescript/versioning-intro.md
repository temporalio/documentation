---
id: versioning-intro
title: Introduction to versioning Workflow code in TypeScript
sidebar_label: Versioning
description: Use the TypeScript SDK's versioning features to update Workflow code.
tags:
  - typescript
  - workflow code
  - versioning
---

The Temporal Platform requires that Workflow code is [deterministic](/concepts/what-is-a-workflow-definition#deterministic-constraints).
Because of that requirement, the Temporal TypeScript SDK offers two dedicated versioning features.

- [Workflow Patching APIs](/typescript/patching)
- [Worker Build Ids](/typescript/how-to-use-worker-versioning-in-typescript)

### Alternatives

Before you explore dedicated versioning features, check whether your needs can be addressed in other ways:

- [Version Task Queue](#version-task-queue)
- [Version Workflow Name](#version-workflow-name)

Both options mean that Workflows running `v1` code will never migrate to `v2` code; they will run `v1` code to completion.
If you would like to update Workflows running `v1` _while they are still running,_ you [might need to "patch in" code](#do-i-need-to-patch).

#### Version Task Queue

If you're currently running v1 Workflow code on Workers that poll on `queue1`, you can run v2 Workflow code on Workers that poll on `queue2`:

1. Leave some Workers running your v1 `Workflow`, on the `queue1` Task Queue.
1. Change your `Workflow` code and spin up new Workers that are polling a `queue2` Task Queue.
1. Cut over your Clients to only call `Workflow` on `queue2` from now on.
1. Remove your v1 Workers when all the v1 Workflows have completed.

#### Version Workflow Name

Although versioning the Task Queue is usually easier, we can also create a new version of a Workflow by copying it and changing its name:

1. Copy the `Workflow1` code to a `Workflow2` function and change what you need.
1. Register `Workflow2` in your Workers alongside `Workflow1`.
1. Cut over your Clients to only call `Workflow2` from now on.
1. Remove `Workflow1` code when none of them are running anymore.
