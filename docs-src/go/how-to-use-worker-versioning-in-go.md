---
id: how-to-use-worker-versioning-in-go
title: How to use Worker Versioning in Go
sidebar_label: Worker Versioning
description: Version your Go Workers by using build ID–based versioning
tags:
  - go sdk
  - developer-guide-doc-type
  - how-to-doc-type
  - workflows
  - versioning
  - determinism
---

To use Worker Versioning in Go, you need to do the following:

1. Determine and assign a Build ID to your built Worker code, and opt in to versioning.
2. Tell the Task Queue your Worker is listening on about that Build ID, and whether its compatible with an existing Build ID.

### Assign a Build ID to your Worker

Let's say you've chosen `deadbeef` as your Build ID, which might be a short git commit hash (a reasonable choice as Build ID).
To assign it in your Worker code, you assign the following Worker Options:

```go
// ...
workerOptions := worker.Options{
   BuildID: "deadbeef",
   UseBuildIDForVersioning: true,
// ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

That's all you need to do in your Worker code.
Importantly, if you start this Worker, it won't receive any tasks.
That's because you need to tell the Task Queue about your Worker's Build ID first.

### Tell the Task Queue about your Worker's Build ID

Now you can use the SDK (or the Temporal CLI) to tell the Task Queue about your Worker's Build ID.
You might want to do this as part of your CI deployment process.

```go
// ...
err := client.UpdateWorkerBuildIdCompatibility(ctx, &client.UpdateWorkerBuildIdCompatibilityOptions{
   TaskQueue: "your_task_queue_name",
   Operation: &client.BuildIDOpAddNewIDInNewDefaultSet{
      BuildID: "deadbeef",
   },
})
```

This code adds the `deadbeef` Build ID to the Task Queue as the sole version in a new version set, which becomes the default for the queue.
New Workflows execute on Workers with this Build ID, and existing ones will continue to process by appropriately compatible Workers.

If, instead, you want to add the Build ID to an existing compatible set, you can do this:

```go
// ...
err := client.UpdateWorkerBuildIdCompatibility(ctx, &client.UpdateWorkerBuildIdCompatibilityOptions{
   TaskQueue: "your_task_queue_name",
   Operation: &client.BuildIDOpAddNewCompatibleVersion{
      BuildID:                   "deadbeef",
      ExistingCompatibleBuildId: "some-existing-build-id",
   },
})
```

This code adds `deadbeef` to the existing compatible set containing `some-existing-build-id` and marks it as the new default Build ID for that set.

You can also promote an existing Build ID in a set to be the default for that set:

```go
// ...
err := client.UpdateWorkerBuildIdCompatibility(ctx, &client.UpdateWorkerBuildIdCompatibilityOptions{
   TaskQueue: "your_task_queue_name",
   Operation: &client.BuildIDPromoteIDWithinSet{
      BuildID: "some-existing-build-id",
   },
})
```

You can also promote an entire set to become the default set for the queue. New Workflows will start using that set's default.

```go
// ...
err := client.UpdateWorkerBuildIdCompatibility(ctx, &client.UpdateWorkerBuildIdCompatibilityOptions{
   TaskQueue: "your_task_queue_name",
   Operation: &client.BuildIDPromoteSet{
      BuildID: "some-existing-build-id",
   },
})
```

### Specify versions for Commands

By default, Activities, Child Workflows, and Continue-as-New use the same compatible version set as the Workflow that invoked them if they're also using the same Task Queue.

If you want to override this behavior, you can specify your intent via the `VersioningIntent` field on the appropriate options struct.

<!-- For more information refer to the [conceptual documentation](/concepts/what-is-worker-versioning). -->

For example, if you want to use the latest default version for an Activity, do the following inside your Workflow code:

```go
// ...
ao := workflow.ActivityOptions{
    VersioningIntent: VersioningIntentDefault,
    // ...other options
}
activityCtx := workflow.WithActivityOptions(ctx, ao)
var yourActivityResult YourActivityResultType
err := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
// ...
```

#### Specifying versions for Continue-As-New

When using the Continue-As-New, use the `WithWorkflowVersioningIntent` context modifier.

The function `WithWorkflowVersioningIntent` sets the `VersioningIntentDefault` before constructing a `ContinueAsNewError` with `NewContinueAsNewError`:

```go
ctx = workflow.WithWorkflowVersioningIntent(ctx, temporal.VersioningIntentDefault)
err := workflow.NewContinueAsNewError(ctx, "WorkflowName")
```

If you're migrating Workflows between incompatible Worker Build IDs and you want your continued Workflows to start using the Task Queue's latest default version, utilize the `WithWorkflowVersioningIntent` as shown above before calling `NewContinueAsNewError`.
