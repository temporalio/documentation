---
id: how-to-use-worker-versioning-in-java
title: How to use Worker Versioning in Java
sidebar_label: Worker Versioning
description: Version your Java Workers by using build ID-based versioning
tags:
  - java
  - how-to
---

:::caution

Worker Versioning is currently in Private Preview, and backwards-incompatible changes are coming to the Worker Versioning APIs. For now, you need to provide dynamic configuration parameters to your Cluster to enable Worker Versioning:

```
temporal server start-dev \
   --dynamic-config-value frontend.workerVersioningDataAPIs=true \
   --dynamic-config-value frontend.workerVersioningWorkflowAPIs=true \
   --dynamic-config-value worker.buildIdScavengerEnabled=true
```

:::

To use Worker Versioning in Java, you need to do the following:

1. Determine and assign a Build ID to your built Worker code, and opt in to versioning.
2. Tell the Task Queue your Worker is listening on about that Build ID, and whether its compatible with an existing Build ID.

### Assign a Build ID to your Worker

Let's say you've chosen `deadbeef` as your Build ID, which might be a short git commit hash (a reasonable choice as Build ID).
To assign it in your Worker code, assign the following Worker Options:

```java
// ...
WorkerOptions workerOptions = WorkerOptions.newBuilder()
    .setBuildId("deadbeef")
    .setUseBuildIdForVersioning(true)
    // ...
    .build();
Worker w = workerFactory.newWorker("your_task_queue_name", workerOptions);
// ...
```

That's all you need to do in your Worker code.
Importantly, if you start this Worker, it won't receive any tasks.
That's because you need to tell the Task Queue about your Worker's Build ID first.

### Tell the Task Queue about your Worker's Build ID

Now you can use the SDK (or the Temporal CLI) to tell the Task Queue about your Worker's Build ID.
You might want to do this as part of your CI deployment process.

```java
// ...
workflowClient.updateWorkerBuildIdCompatability(
    "your_task_queue_name", BuildIdOperation.newIdInNewDefaultSet("deadbeef"));
```

This code adds the `deadbeef` Build ID to the Task Queue as the sole version in a new version set, which becomes the default for the queue.
New Workflows execute on Workers with this Build ID, and existing ones will continue to process by appropriately compatible Workers.

If, instead, you want to add the Build ID to an existing compatible set, you can do this:

```java
// ...
workflowClient.updateWorkerBuildIdCompatability(
    "your_task_queue_name", BuildIdOperation.newCompatibleVersion("deadbeef", "some-existing-build-id"));
```

This code adds `deadbeef` to the existing compatible set containing `some-existing-build-id` and marks it as the new default Build ID for that set.

You can also promote an existing Build ID in a set to be the default for that set:

```java
// ...
workflowClient.updateWorkerBuildIdCompatability(
    "your_task_queue_name", BuildIdOperation.promoteBuildIdWithinSet("deadbeef"));
```

You can also promote an entire set to become the default set for the queue. New Workflows will start using that set's default.

```java
// ...
workflowClient.updateWorkerBuildIdCompatability(
    "your_task_queue_name", BuildIdOperation.promoteSetByBuildId("deadbeef"));
```

### Specify versions for Commands

By default, Activities, Child Workflows, and Continue-as-New use the same compatible version set as the Workflow that invoked them if they're also using the same Task Queue.

If you want to override this behavior, you can specify your intent via the `setVersioningIntent` method on the `ActivityOptions`, `ChildWorkflowOptions`, or `ContinueAsNewOptions` objects.

<!-- For more information refer to the [conceptual documentation](/concepts/what-is-worker-versioning). -->

For example, if you want to use the latest default version for an Activity, you can define your Activity Options like this:

```java
// ...
private final MyActivity activity =
    Workflow.newActivityStub(
        MyActivity.class,
        ActivityOptions.newBuilder()
          .setScheduleToCloseTimeout(Duration.ofSeconds(10))
          .setVersioningIntent(VersioningIntent.VERSIONING_INTENT_DEFAULT)
          // ...other options
          .build()
    );
// ...
```
