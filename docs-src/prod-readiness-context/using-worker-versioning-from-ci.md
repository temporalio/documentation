---
id: using-worker-versioning-from-ci
title: How to deploy Workers with Worker Versioning from CI
description: Learn how to safely roll out changes to your worker code using a CI system
sidebar_label: Deploying Versioned Workers from CI
tags:
  - guide-context
  - production-readiness
---

This guide outlines an approach to building and deploying worker code that can help you safely make changes to your
Workflow, Activity, and other Worker code and roll it out with confidence. It assumes general familiarity with
the concepts of the [Worker Versioning](/concepts/what-is-worker-versioning) feature, so make sure you've read that
section first.

We will assume you are using some kind of CI/CD system to build and deploy your code. This might be Github Actions, for
example, or any other similar system.

Overall, the process proceeds as follows:

- Make changes to your worker code
- Specify whether those changes are expected to be compatible or not with some existing Build ID (for example, in your commit message)
- Verify those changes using any existing tests or processes you already have
- When you want to release the new changes to a target environment, trigger the remaining steps in your CI system. This
  could be on merges to main, or when a tag is created, or any other trigger you choose.
- Determine a Build ID for the to-be-released change(s) (alternatively this may be done when making the change)
- If the changes are expected to be compatible with some existing Build ID, download and replay histories to verify
  if this assertion is true or not.
- Deploy the new workers
- Tell the Task Queue about the new Build ID (and whether it is expected to be compatible with an existing one)
- On some separate cadence, retire no-longer-needed workers

Each step in detail:

## Changing your worker code & specifying compatibility

Make whatever changes you need to make to your worker code. The safest thing to do most of the time is to assume that
your changes are *not* compatible with some existing Build ID. However, if you are making a hotfix to some existing 
workflow code (ex, by using the [Workflow Versioning apis](/concepts/workflows#workflow-versioning)) - you will want
to explicitly state that you expect this change to be compatible with an existing Build ID.

Exactly how you do this is up to you, but a simple option is to include a line in your commit message that you
can parse later, like so:
```text
expected-compatible-build-id: some-build-id
```

For more information on what is considered a compatible change or not, see our information on 
[Workflow Determinism](/concepts/workflows#deterministic-constraints).

## Releasing the change(s)

When you are ready to release your changes, you will want to trigger the following steps in your CI system. You might
do this on every commit, or on a batch of commits. The process is the same with one exception - it likely does not
make sense to batch any commits that claim to be compatible with an existing Build ID together, unless those IDs are
also mutually compatible. To avoid this complexity, we recommend releasing such hotfix commits independently.

### Determine a Build ID

You might have developers do this as they make the change, in which case they can simply hardcode the Build ID in the
Worker Options. Alternatively, a good option is to use the git commit hash as the Build ID. If you use this approach,
you'll want to load the commit hash from a file, to avoid a chicken-egg situation.

For example, in typescript:
```typescript
import { readFile } from 'node:fs/promises';
// Your CI system must write this file as part of the build/deployment process
const buildId = await fs.readFile('build-id.txt', 'utf-8');
const worker = await Worker.create({
  taskQueue: 'your_task_queue_name',
  buildId: buildId,
  useVersioning: true,
  // ...
});
```

### Verify compatibility if needed

If the commit to be released is claiming it's compatible with some existing Build ID, you will want to verify that.
If you went with the commit-message based approach above, you can parse the commit message to determine that Build ID.
Otherwise, it should be passed in by some other means to this step.

To verify compatibility, you will want to download and replay some histories from your target environment. You can
do this using our [Workflow Replay](/concepts/workflows#replays) functionality. You'll want to make sure you download
sufficiently representative sample of histories to be confident that the change is compatible. This ideally includes
some completed workflows as well as some open workflows, if there are any.

A concrete example using TypeScript:

```typescript
const targetTaskQueue = process.env.TASK_QUEUE;
const startingAfter = process.env.STARTING_AFTER; // Or pass in as arguments on the command line, etc.
const executions = client.workflow.list({
  // You may also consider running more than one query to ensure you get some closed and some open workflows
  query: `TaskQueue=${targetTaskQueue} and StartTime > "${startingAfter}"`,
});
const histories = executions.intoHistories();
const results = Worker.runReplayHistories(
  {
    workflowsPath: require.resolve('./your/workflows'),
  },
  histories,
);
for await (const result of results) {
  if (result.error) {
    console.error('Replay failed', result);
    // Fail your CI job here!
  }
}
```

This verification should be running using an instance of a Worker with the newly changed code.

### Deploy the new workers

This part is up to you - deploy your workers however you normally do.

### Tell the Task Queue about the new Build ID

Once the workers are up and running, you'll want to tell the Task Queue about the new Build ID. You can actually
perform this step earlier if you desire too.

You can use the Temporal CLI (or your language SDK) to tell the Task Queue about the new Build ID of your just-deployed
workers.

Using the CLI (for a new incompatible Build ID):
```bash
temporal task-queue update-build-ids add-new-default --task-queue "your-task-queue" --build-id "the-new-id"
```

Alternatively, if you verified the new ID is compatible with some existing one:
```bash
temporal task-queue update-build-ids add-new-compatible --task-queue "your-task-queue" --build-id "the-new-id" --existing-compatible-build-id "some-existing-id"
```

Now your workers will start receiving tasks!

### Retiring no-longer-needed workers

Eventually, you'll want to decommission workers that are no longer needed. You can determine if a worker can no longer
be reached by using the Temporal CLI (or your language SDK) to ask about the reachability of one or more Build IDs.

For example, here we can see that the Build ID `1.0` is completely unreachable, and thus can be retired.
```bash
λ  ./temporal task-queue get-build-id-reachability --task-queue "your-task-queue" --build-id "1.0" --build-id "2.0"
  BuildId  TaskQueue   Reachability
      2.0  hi-q       [NewWorkflows]
      1.0  hi-q       []
```

You can run this command on a schedule, and when you see that a Build ID is no longer reachable, you can safely retire
the workers that were assigned that Build ID.
