---
id: patching
title: Patching TypeScript Workflows
sidebar_label: Patching (Migrating)
description: Any Workflow code change that affects the order in which commands are generated breaks this assumption. So we have to keep both the old and new code when migrating Workflows while they are still running.
---

## Alternatives

Before you explore our patching/versioning API, check if your needs can be addressed in other ways:

- [Version Task Queue](#version-task-queue)
- [Version Workflow Name](#version-workflow-name)

Both options mean that Workflows running `v1` code will never migrate to `v2` code: they will run `v1` code to completion.
If you would like to update Workflows running `v1` _while they are still running_, you [may need to "patch in" code](#do-i-need-to-patch).

### Version Task Queue

If we're currently running our v1 Workflow code on Workers that poll on `queue1`, we can run v2 Workflow code on Workers that poll on `queue2`:

1. Leave some Workers running your v1 `Workflow`, on the `queue1` Task Queue.
1. Change your `Workflow` code and spin up new Workers that are polling a `queue2` Task Queue.
1. Cut over your Clients to only call `Workflow` on `queue2` from now on.
1. Remove your v1 Workers when all the v1 Workflows have completed.

### Version Workflow Name

While versioning the Task Queue is usually easier, we can also create a new version of a Workflow by copying it and changing its name:

1. Copy `Workflow1`'s code to a `Workflow2` function and change what you need.
1. Register `Workflow2` in your Workers alongside `Workflow1`.
1. Cut over your Clients to only call `Workflow2` from now on.
1. Remove `Workflow1` code when none of them are running anymore.

## Do I need to Patch?

You may need to patch if:

- You want to change the remaining logic of a Workflow while it is still running
- If your new logic can result in a different execution path

This code does not need patching (i.e. since execution path does not change, you can update your Workflow and restart Workers straight away):

```ts
// from v1
export async function myWorkflow({ force }): Promise<void> {
  await sleep('1 days');
  console.log('force', force);
}

// to v2
export async function myWorkflow(payload): Promise<void> {
  let force = payload.force;

  setHandler(updatePayloadSignal, (newPayload) => {
    force = newPayload.force;
  });

  await sleep('1 days');
  console.log('force', force);
}
```

This is an example of how npm packages can break determinism:

```ts
// from v1
export async function myWorkflow() {
  await runActivity();
}

// to v2
import { something } from 'a-package-from-npm';

export async function myWorkflow() {
  if (something()) {
    await sleep('1 day');
  }
  await runActivity();
}
```

## Migrating Workflows in Patches

Workflow code has to be [deterministic](/typescript/determinism) by taking the same code path when replaying history events.
Any Workflow code change that affects the order in which commands are generated breaks this assumption.

So we have to keep both the old and new code when migrating Workflows while they are still running:

- When replaying, use the original code version that generated the ongoing event history.
- When executing a new code path, always execute the
  new code.

<details>
<summary>30 Min Video: Introduction to Versioning
</summary>

Because we design for potentially long-running Workflows at scale, versioning with Temporal works differently than with other Workflow systems.
We explain more in this optional 30 minute introduction:

import { ResponsivePlayer } from '../../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=kkP899WxgzY' />

</details>

## TypeScript SDK Patching API

In principle, the TypeScript SDK's patching mechanism works in a similar "feature-flag" fashion to the other SDK's, however, the "versioning" API has been updated to a notion of "patching in" code.
There are three steps to this reflecting three stages of migration:

- Running v1 code with v2 patched in concurrently
- Running v2 code with deprecation markers for v2 patches
- Running "just" v2 code.

This is best explained in sequence (click through to follow along using our SDK sample).

Given an initial Workflow version `v1`:

<!--SNIPSTART typescript-patching-1-->
<!--SNIPEND-->

We decide to update our code and run `activityB` instead.
This is our desired end state, `v2`.

<!--SNIPSTART typescript-patching-final-->
<!--SNIPEND-->

**Problem: We cannot directly deploy `v2` until we know for sure there are no more running Workflows created using `v1` code.**

Instead we must deploy `v2` (below) and use the [`patched`](https://typescript.temporal.io/api/namespaces/workflow#patched) function to check which version of the code should be executed.

Patching is a three step process:

1. Patch in new code with `patched` and run it alongside old code
2. Remove old code and `deprecatePatch`
3. When you are sure all old Workflows are done executing, remove `deprecatePatch`

### Step 1: Patch in new code

`patched` inserts a marker into the Workflow history.

![image](https://user-images.githubusercontent.com/6764957/139673361-35d61b38-ab94-401e-ae7b-feaa52eae8c6.png)

During replay, when a Worker picks up a history with that marker it will fail the Workflow task when running Workflow code that does not emit the same patch marker (in this case `my-change-id`); therefore it is safe to deploy code from `v2` in a "feature flag" alongside the original version (`v1`).

<!--SNIPSTART typescript-patching-2-->
<!--SNIPEND-->

### Step 2: Deprecate patch

Once we know that all Workflows started with `v1` code have completed we can [deprecate the patch](https://typescript.temporal.io/api/namespaces/workflow#deprecatepatch).
Deprecated patches bridge between `v1patch` and `v2` (the end result), they work similarly to regular patches by recording a marker in the Workflow history, this marker does not fail replay when Workflow code does not emit it.

If while we're deploying `v2deprecatedpatch` (below) there are still live Workers running `v1patch` code and those Workers pick up Workflow histories generated by `v2deprecatedpatch`, they will safely use the patched branch.

<!--SNIPSTART typescript-patching-3-->
<!--SNIPEND-->

### Step 3: Solely deploy new code

`v2` is safe to deploy once all `v1patch` or earlier Workflows are complete due to the assertion mentioned above.

## Upgrading Workflow dependencies

Upgrading Workflow dependencies (such as ones installed into `node_modules`) _might_ break determinism in unpredictable ways.
We recommended using a lock file (`package-lock.json` or `yarn.lock`) to fix Workflow dependency versions and gain control of when they're updated.
