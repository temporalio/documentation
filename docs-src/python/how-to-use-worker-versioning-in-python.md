---
id: how-to-use-worker-versioning-in-python
title: How to use Worker Versioning in Python
sidebar_label: Worker Versioning
description: Version your Python Workers by using build ID-based versioning
tags:
  - python
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

To use [Worker Versioning](/workers#worker-versioning) in Python, you need to do the following:

1. Determine and assign a Build ID to your built Worker code, and opt in to versioning.
2. Tell the Task Queue your Worker is listening on that Build ID, and whether it's compatible with an existing Build ID.

### Assign a Build ID to your Worker

Let's say you've chosen `deadbeef` as your Build ID, which might be a short git commit hash (a reasonable choice as Build ID).
To assign it in your Worker code, assign at least the following Worker Options:

```python
# ...
worker = Worker(
  task_queue="your_task_queue_name",
  build_id="deadbeef",
  use_worker_versioning=True,
  # ... register workflows & activities, etc
)
# ...
```

That's all you need to do in your Worker code.
Importantly, if you start this Worker, it won't receive any tasks yet.
That's because you need to tell the Task Queue about your Worker's Build ID first.

### Tell the Task Queue about your Worker's Build ID

Now you can use the SDK (or the Temporal CLI) to tell the Task Queue about your Worker's Build ID.
You might want to do this as part of your CI deployment process.

```python
# ...
await client.update_worker_build_id_compatibility(
    "your_task_queue_name", BuildIdOpAddNewDefault("deadbeef")
)
```

This code adds the `deadbeef` Build ID to the Task Queue as the sole version in a new version set, which becomes the default for the queue.
New Workflows execute on Workers with this Build ID, and existing ones will continue to process by appropriately compatible Workers.

If, instead, you want to add the Build ID to an existing compatible set, you can do this:

```python
# ...
await client.update_worker_build_id_compatibility(
    "your_task_queue_name", BuildIdOpAddNewCompatible("deadbeef", "some-existing-build-id")
)
```

This code adds `deadbeef` to the existing compatible set containing `some-existing-build-id` and marks it as the new default Build ID for that set.

You can also promote an existing Build ID in a set to be the default for that set:

```python
# ...
await client.update_worker_build_id_compatibility(
    "your_task_queue_name", BuildIdOpPromoteBuildIdWithinSet("deadbeef")
)
```

You can also promote an entire set to become the default set for the queue. New Workflows will start using that set's default build.

```python
# ...
await client.update_worker_build_id_compatibility(
    "your_task_queue_name", BuildIdOpPromoteSetByBuildId("deadbeef")
)
```

### Specify versions for Commands

By default, Activities, Child Workflows, and Continue-as-New use the same compatible version set as
the Workflow that invoked them if they're also using the same Task Queue.

If you want to override this behavior, you can specify your intent via the `versioning_intent`
argument available on the methods you use to invoke these Commands.

For more information refer to the [conceptual documentation](/workers#worker-versioning).

For example, if you want to use the latest default version for an Activity, you can call it like so:

```python
# ...
await workflow.execute_activity(
    say_hello,
    "hi",
    versioning_intent=VersioningIntent.DEFAULT,
    start_to_close_timeout=timedelta(seconds=5),
)
# ...
```
