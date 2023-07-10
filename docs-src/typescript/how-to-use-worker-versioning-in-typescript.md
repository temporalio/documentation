---
id: how-to-use-worker-versioning-in-typescript
title: How to use Worker Versioning in TypeScript
sidebar_label: Worker Versioning
description: Version your TypeScript Workers by using build ID-based versioning
tags:
  - typescript
  - how-to
---

To use [Worker Versioning](/workers#worker-versioning) in TypeScript, you need to do the following:

1. Determine and assign a Build ID to your built Worker code, and opt in to versioning.
2. Tell the Task Queue your Worker is listening on about that Build ID, and whether its compatible with an existing Build ID.

### Assign a Build ID to your Worker

Let's say you've chosen `deadbeef` as your Build ID, which might be a short git commit hash (a reasonable choice as Build ID).
To assign it in your Worker code, assign the following Worker Options:

```typescript
// ...
const worker = await Worker.create({
  taskQueue: 'your_task_queue_name',
  buildId: 'deadbeef',
  useVersioning: true,
  // ...
});
// ...
```

That's all you need to do in your Worker code.
Importantly, if you start this Worker, it won't receive any tasks.
That's because you need to tell the Task Queue about your Worker's Build ID first.

### Tell the Task Queue about your Worker's Build ID

Now you can use the SDK (or the Temporal CLI) to tell the Task Queue about your Worker's Build ID.
You might want to do this as part of your CI deployment process.

```typescript
// ...
await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  operation: 'addNewIdInNewDefaultSet',
  buildId: 'deadbeef',
});
```

This code adds the `deadbeef` Build ID to the Task Queue as the sole version in a new version set, which becomes the default for the queue.
New Workflows execute on Workers with this Build ID, and existing ones will continue to process by appropriately compatible Workers.

If, instead, you want to add the Build ID to an existing compatible set, you can do this:

```typescript
// ...
await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  operation: 'addNewCompatibleVersion',
  buildId: 'deadbeef',
  existingCompatibleBuildId: 'some-existing-build-id',
});
```

This code adds `deadbeef` to the existing compatible set containing `some-existing-build-id` and marks it as the new default Build ID for that set.

You can promote an existing Build ID in a set to be the default for that set:

```typescript
// ...
await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  operation: 'promoteBuildIdWithinSet',
  buildId: 'deadbeef',
});
```

You can promote an entire set to become the default set for the queue. New Workflows will start using that set's default build.

```typescript
// ...
await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  operation: 'promoteSetByBuildId',
  buildId: 'deadbeef',
});
```

You can merge two sets into one, preserving the primary set's default Build ID as the default
for the merged set.

```typescript
// ...
await client.taskQueue.updateBuildIdCompatibility('your_task_queue_name', {
  operation: 'mergeSets',
  primaryBuildId: 'deadbeef',
  secondaryBuildId: 'some-existing-build-id',
});
```

### Specify versions for Commands

By default, Activities, Child Workflows, and Continue-as-New use the same compatible version set as
the Workflow that invoked them if they're also using the same Task Queue.

If you want to override this behavior, you can specify your intent via the `versioningIntent`
field available on options object for each of these commands.

<!-- For more information refer to the [conceptual documentation](/concepts/what-is-worker-versioning). -->

For example, if you want to use the latest default version for an Activity, you can proxy it like
so:

```typescript
// ...
const { echo } = proxyActivities<typeof activities>({
  startToCloseTimeout: '20s',
  versioningIntent: 'DEFAULT',
});
// ...
```
