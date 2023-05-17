---
id: how-to-use-worker-versioning-in-go
title: How to use Worker Versioning in Go
sidebar_label: Using Worker Versioning
description: Learn how to version your Go workers by using build-ID based versioning
tags:
  - go
  - how-to
---

To make use of [Worker Versioning](/concepts/what-is-worker-versioning) in Go, you will need to
do the following:

1. Determine and assign a build ID to your built worker code, and opt in to versioning
2. Tell the task queue(s) your worker is listening on about that build ID, and whether or not it
   is compatible with an existing build ID

## Assigning a Build ID to your worker

Let's say you've chosen `deadbeef` as your build ID, which might be a short git commit hash (a
reasonable choice as build identifier). In order to assign it in your worker code, you'd assign
the following Worker Options:

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

That's all you need to do in your worker code. Importantly, if you start this worker, it won't
receive any tasks. That's because you need to tell the task queue about your worker's build ID
first.

## Telling the task queue about your worker's build ID

Now you can use the SDK (or the Temporal CLI) to tell the task queue about your worker's build ID.
You might want to do this as part of your CI deployment process. Using the Go SDK:

```go
// ...
err := client.UpdateWorkerBuildIdCompatibility(ctx, &client.UpdateWorkerBuildIdCompatibilityOptions{
   TaskQueue: "your_task_queue_name",
   Operation: &client.BuildIDOpAddNewIDInNewDefaultSet{
      BuildID: "deadbeef",
   },
})
```

This will add the `deadbeef` Build ID to the task queue as the sole version in a new version set
which will be the default for the queue. New workflows will be executed on workers with this ID,
and existing ones will continue to be processed by appropriately compatible workers.

If, instead, you wanted to add the Build ID to some existing compatible set, you can do this:

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

This would add `deadbeef` to the existing compatible set containing `some-existing-build-id`, and
would mark it as the new default ID for that set.

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

As well as promote an entire set to become the default set for the queue (thus new workflows will
start using that set's default):

```go
// ...
err := client.UpdateWorkerBuildIdCompatibility(ctx, &client.UpdateWorkerBuildIdCompatibilityOptions{
   TaskQueue: "your_task_queue_name",
   Operation: &client.BuildIDPromoteSet{
      BuildID: "some-existing-build-id",
   },
})
```

## Specifying what version Activities, Child Workflows, and Continue as New should use

Activities, Child Workflows, and Continue as New will all, by default, use same compatible version
set as the workflow that invoked them if they are also using the same task queue. If you instead
want them to run using the latest default version, these commands' options all have a
`UseLatestBuildId` boolean field which can be set true for this purpose. Refer to the
[conceptual documentation](/concepts/what-is-worker-versioning) for more information.

For example, if you wanted to use the latest default version for an Activity, you would do this
inside your workflow code:

```go
// ...
ao := workflow.ActivityOptions{
    UseLatestBuildId: true,	
    // ...other options
}
activityCtx := workflow.WithActivityOptions(ctx, ao)
var yourActivityResult YourActivityResultType
err := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
// ...
```
