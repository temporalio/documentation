---
id: what-is-worker-versioning
title: What is Worker Versioning?
sidebar_label: Worker Versioning
description: Worker Versioning allows you to more easily deploy changes to Workflow Definitions.
tags:
  - explanation
  - versioning
---

Worker Versioning is a feature which simplifies the process of deploying changes to [Workflow Definitions](/concepts/what-is-a-workflow-definition). It's recommended that you read that article before proceeding, as this feature is largely concerned with helping manage nondeterministic changes to those definitions.

This feature can help you manage such changes by providing a convenient way to ensure that [Workers](/concepts/what-is-a-worker) with different Workflow Definitions operating on the same [Task Queue](/concepts/what-is-a-task-queue) do not attempt to execute [Workflow Tasks](/concepts/what-is-a-workflow-task) that they will not be able to successfully process, according to a graph of versions associated with that Task Queue that you will define.

This is accomplished by assigning a Build ID of your choice to the set of code that constitutes a Worker, and specifying whether these versions are compatible or not with one another via changes to the aforementioned graph.

### When and what should you use Worker Versioning for?

The primary use case that this feature makes much simpler is the deployment of incompatible changes to short-lived workflows. On Task Queues making use of this feature, the workflow starter does not need to know that there are new versions being introduced. New [Workflow Executions](/concepts/what-is-a-workflow-execution) will run using the new code in the newly deployed workers, and old (but still open) workflows will only be processed by workers with an appropriate version. Old workers may be decommissioned once there are no longer any open workflows using their version.

For example if you have a workflow which never takes longer than a day to execute, a great strategy is to simply always assign a new Build ID to every new build of your worker and add it to the graph as the new default version. Because you know your workflow never takes more than a day to complete, you know that you'll never have to leave older workers running for more than a day once you've deployed the new version (assuming availability).

It's perfectly fine to do this with longer-lived workflows as well. You'll just need to be aware that you may need to keep multiple different versions of workers running while open workflows complete.

You can also use the feature to prevent a buggy codepath from being taken on currently open workflows. You can do this by adding a new
version to the graph, and specifying it as *compatible* with an existing version you would like to ensure no future Workflow Tasks execute on. Because the new version will process existing histories, it is subject to the normal [determinism constraints](/concepts/what-is-a-workflow-definition#non-deterministic-change), and you might need to use one of the [versioning apis](/concepts/what-is-a-workflow-definition#workflow-versioning).

### How to use Worker Versioning

To make use of this feature, you'll need to:

1. Define a Worker Build ID version graph for the Task Queue you are concerned with:
   You can use either `tctl` or your SDK of choice. TODO: Links
2. Enable the feature on your worker by specifying a Build ID:
   TODO: Links for each SDK's worker options

#### Defining the version graph

Whether you use `tctl` or an SDK, updating the version graph feels the same.

You'll specify the task queue you're targeting, the Build ID you're adding (or moving), whether or not it is to become the new default version, and some existing version it should be considered compatible with, if any.

The rest of this section will use updates to one Task Queue's graph as motivating examples.

A Task Queue starts its life in an unversioned state. Workers who have not opted into the feature will receive tasks as normal, and workers who have will fail to poll the queue, since they cannot receive tasks for workflows with no associated version.

:::note Versions don't need to be semver!
The versions in the following examples look like semver versions for clarity,
but they do not need to be. Versions can be any arbitrary string.
:::

Let's say we add a version `1.0` to the Task Queue as the new default. Our version "graph" now looks like this:

![1.0 Graph](/img/worker-versioning/graph-prog-1.svg)

All new Workflows started on the queue will have their first tasks assigned to version `1.0`. Workers with their Build ID set to `1.0` will receive these tasks.
If there are still Workflows running on the queue which do not have an assigned version, Workers without a version will take those tasks. So you'll want to make sure such workers are still operational if there were any open Workflows when you added the first version. If you happened to have deployed any Workers with a *different* version, those Workers will not receive any tasks.

Now we need to change the Workflow for some reason, so we add `2.0` to the graph as the new default:

![2.0 Graph](/img/worker-versioning/graph-prog-2.svg)

All new Workflows started on the queue will have their first tasks assigned to version `2.0`. Existing `1.0` Workflows will keep generating tasks targeting `1.0`. Each deployment of Workers will receive their respective tasks. This same concept carries forward for each new incompatible version.

Maybe we have a bug in `2.0`, and we want to make sure all open `2.0` workflows switch over to some new code as fast as possible. So we add `2.1` to the graph, marking it as compatible with `2.0`. Now our graph looks like this:

![2.1 Graph](/img/worker-versioning/graph-prog-2.1.svg)

All new Workflow Tasks which are generated for Workflows whose last Workflow Task completion was on version `2.0` will now be assigned to version `2.1`. Because we specified that `2.1` is compatible with `2.0`, it is assumed that workers with this version will be able to process these existing histories successfully.

We continue with our normal development cycle, adding a `3.0` version. Nothing new here:

![3 Graph](/img/worker-versioning/graph-prog-3.svg)

Now imagine that `3.0` doesn't have an explicit bug, but there's something about the business logic we find less than ideal. We are OK with existing `3.0` workflows running to completion, but we would like new workflows to go back to the old `2.x` branch. This operation is supported by performing an update targeting `2.1` and setting it as the current default, which will result in this graph:

![Reshuffled Graph](/img/worker-versioning/graph-prog-reshuffle.svg)

Now new workflows will start on `2.1`.

#### Permitted and forbidden operations on the graph

A request to change the graph can do one of the following:

1. Add a new version to the graph, as a default version
2. Add a new version to the graph, compatible with some existing version.
3. Add a new version to the graph, compatible with some existing version and as the new default.
4. Reorder an existing version (and it's whole compatible branch). We allow moving a node in the incompatible line
   to the front (along with its entire compatible branch), as long as you have targeted the most recent
   version in that compatible branch.

You can't delete versions. This is to help avoid a situation where workflows accidentally become stuck with
no means of making progress because the version they are associated with no longer exists.

Sometimes you might want to do this intentionally. If you *want* to make sure that all workflows currently
being processed by, say, `2.0` stop, even if you do not yet have a new version ready, you can add a new
version `2.1` to the graph marked as compatible with `2.0`. New tasks will target `2.1`, but since you
have not yet deployed any `2.1` workers, they will not make any progress.

