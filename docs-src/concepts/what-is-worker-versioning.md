---
id: what-is-worker-versioning
title: What is Worker Versioning?
sidebar_label: Worker Versioning
description: Worker Versioning allows you to more easily deploy changes to Workflow Definitions.
tags:
  - explanation
  - versioning
---

Worker Versioning simplifies the process of deploying changes to [Workflow Definitions](/workflows/#workflow-definition).
We recommend that you read about Workflow Definitions before proceeding, because Workflow Versioning is largely concerned with helping to manage nondeterministic changes to those definitions.

This feature can help you manage nondeterministic changes by providing a convenient way to ensure that [Workers](/workers) with different Workflow Definitions operating on the same [Task Queue](/tasks/#task-queue) do not attempt to process [Workflow Tasks](/tasks/#workflow-task) that they can't successfully process, according to a graph of versions associated with that Task Queue that you define.

You accomplish this goal by assigning a build identifier (a free-form string) to the code that defines a Worker, and specifying which build identifiers are compatible with each other by updating the version graph.

### When and for what should you use Worker Versioning?

The primary use case for this feature is the deployment of incompatible changes to short-lived [Workflows](/workers).
On Task Queues using this feature, the Workflow starter does not need to know when new versions are introduced.
New [Workflow Executions](/workflows#workflow-execution) run using the new code in the newly deployed Workers, and old (but still open) Workflow Executions are processed only by Workers with an appropriate version.
Old workers can be decommissioned after the completion of any open workflows using their version.

For example, if you have a Workflow that never takes longer than a day to execute, a great strategy is to always assign a new build identifier to every new build of your Worker and add it to the graph as the new default version.
Because you know that your Workflow never takes more than a day to complete, you know that you'll never have to leave older Workers running for more than a day after you deploy the new version (assuming availability).
You don't need to worry about removing old versions from the graph.
Leaving them there is harmless—in fact, removing versions is not permitted.

You can use this technique with longer-lived Workflows as well.
Just be aware that you might need to keep multiple versions of Workers running while open Workflows complete.

You can also use the feature to prevent a buggy codepath from being taken on currently open Workflows.
You can do this by adding a new version to the graph and specifying it as _compatible_ with an existing version on which no future Workflow Tasks should execute.
Because the new version processes existing [Event Histories](/workflows/#event-history), it is subject to the normal [deterministic constraints](/workflows/#deterministic-constraints), and you might need to use one of the [versioning APIs](/workflows/#workflow-versioning).

### How to use Worker Versioning

To use this feature, follow these steps:

1. Define a Worker build-identifier version graph for the Task Queue.
   You can use either `tctl` or your choice of SDK.
   **_TODO: Links_**
2. Enable the feature on your Worker by specifying a build identifier.
   **_TODO: Links for each SDK's Worker options_**

#### Defining the version graph

Whether you use `tctl` or an SDK, updating the version graph feels the same.
You specify the Task Queue that you're targeting, the build identifier that you're adding (or moving), whether it becomes the new default version, and any existing versions it should be considered compatible with.

The rest of this section uses updates to one Task Queue's graph as examples.

A Task Queue starts its life in an unversioned state.
Workers who have not opted into the feature receive Tasks as usual.
Workers who have opted in don't poll the Task Queue because they can't receive Tasks for Workflows that have no associated version.

:::note Versions don't need to be semver!

The versions in the following examples look like semver versions for clarity, but they don't need to be.
Versions can be any arbitrary string.

:::

First, we add a version `1.0` to the Task Queue as the new default.
Our version "graph" now looks like this:

![1.0 Graph](/img/worker-versioning/graph-prog-1.svg)

All new Workflows started on the Task Queue have their first Tasks assigned to version `1.0`.
Workers with their build identifier set to `1.0` receive these Tasks.

If Workflows that don't have an assigned version are still running on the Task Queue, Workers without a version take those tasks.
So ensure that such Workers are still operational if any Workflows were open when you added the first version.
If you deployed any Workers with a _different_ version, those Workers receive no Tasks.

Now we need to change the Workflow for some reason, so we add `2.0` to the graph as the new default:

![2.0 Graph](/img/worker-versioning/graph-prog-2.svg)

All new Workflows started on the Task Queue have their first Tasks assigned to version `2.0`.
Existing `1.0` Workflows keep generating Tasks targeting `1.0`.
Each deployment of Workers receive their respective Tasks.
This same concept carries forward for each new incompatible version.

Maybe we have a bug in `2.0`, and we want to make sure all open `2.0` Workflows switch to some new code as fast as possible.
So we add `2.1` to the graph, marking it as compatible with `2.0`. Now our graph looks like this:

![2.1 Graph](/img/worker-versioning/graph-prog-2.1.svg)

All new Workflow Tasks that are generated for Workflows whose last Workflow Task completion was on version `2.0` are now assigned to version `2.1`.
Because we specified that `2.1` is compatible with `2.0`, Temporal Server assumes that Workers with this version can process the existing Event Histories successfully.

We continue with our normal development cycle, adding a `3.0` version.
Nothing new here:

![3 Graph](/img/worker-versioning/graph-prog-3.svg)

Now imagine that version `3.0` doesn't have an explicit bug, but something about the business logic is less than ideal.
We are OK with existing `3.0` Workflows running to completion, but we want new Workflows to use the old `2.x` branch.
This operation is supported by performing an update targeting `2.1` and setting it as the current default, which results in this graph:

![Reshuffled Graph](/img/worker-versioning/graph-prog-reshuffle.svg)

Now new workflows start on `2.1`.

#### Permitted and forbidden operations on the graph

A request to change the graph can do one of the following:

- Add a version to the graph as a default version.
- Add a version to the graph that is compatible with an existing version.
- Add a version to the graph that is compatible with an existing version and as the new default.
- Reorder an existing version (and its entire compatible branch).
  We allow moving a node in the incompatible line to the front (along with its entire compatible branch), as long as you target the most recent version in that compatible branch.

You can't delete versions.
This helps you avoid the situation in which Workflows accidentally become stuck with no means of making progress because the version they are associated with no longer exists.

However, sometimes you might want to do this intentionally.
If you _want_ to make sure that all Workflows currently being processed by, say, `2.0` stop, even if you don't yet have a new version ready, you can add a new version `2.1` to the graph marked as compatible with `2.0`.
New tasks will target `2.1`, but since you have not yet deployed any `2.1` workers, they will not make any progress.

#### Graph constraints

The graph has a maximum size limit, which defaults to 1000 versions.
This limit is configurable on Temporal Server via the `limit.versionGraphNodeSize` dynamic config property. 
When this limit is exceeded, the oldest nodes in the graph are dropped to make room for new ones.
In practice this should never be an issue, because a version is no longer needed after no open Workflows are using that version.

There is also a limit on the size of each Build ID / version string, which defaults to 1000 characters. This limit is configurable on the server via the `limit.workerBuildIdSize` dynamic config property.
