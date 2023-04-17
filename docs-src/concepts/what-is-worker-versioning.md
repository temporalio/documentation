---
id: what-is-worker-versioning
title: What is Worker Versioning?
sidebar_label: Worker Versioning
description: Worker Versioning allows you to more easily deploy changes to Workflow Definitions.
tags:
  - explanation
  - versioning
---

Worker Versioning simplifies the process of deploying changes to [WorkflowDefinitions](/workflows/#workflow-definition). We recommend that you read about Workflow Definitions
before proceeding, because Workflow Versioning is largely concerned with helping to manage
nondeterministic changes to those definitions.

This feature can help you manage nondeterministic changes by providing a convenient way to ensure
that [Workers](/workers) with different Workflow & Activity Definitions operating on the same [TaskQueue](/tasks/#task-queue) do not attempt to process [Workflow Tasks](/tasks/#workflow-task) and
[Activity Tasks](/tasks/#actvitiy-task) that they can't successfully process, according to sets of
versions associated with that Task Queue that you define.

You accomplish this goal by assigning a build identifier (a free-form string) to the code that
defines a Worker, and specifying which build identifiers are compatible with each other by updating
the version sets.

### When and for what should you use Worker Versioning?

The primary use case for this feature is the deployment of incompatible changes to short-lived
[Workflows](/workers). On Task Queues using this feature, the Workflow starter does not need to know
when new versions are introduced. New [Workflow Executions](/workflows#workflow-execution) run using
the new code in the newly deployed Workers, and old Workflow Executions are processed only by
Workers with an appropriate version. Old workers can be decommissioned after the archival of any
open workflows using their version, or if you do not care about querying closed workflows, once
there are no longer any open workflows at that version.

For example, if you have a Workflow that never takes longer than a day to execute, a great strategy
is to always assign a new build identifier to every new build of your Worker and add it to the
version sets as the new overall default. Because you know that your Workflow never takes more than a
day to complete, you know that you'll never have to leave older Workers running for more than a day
after you deploy the new version (assuming availability). You don't need to worry about removing old
versions from the sets. Leaving them there is harmless.

You can use this technique with longer-lived Workflows as well. Just be aware that you might need to
keep multiple versions of Workers running while open Workflows complete.

You can also use the feature to prevent a buggy codepath from being taken on currently open
Workflows. You can do this by adding a new version to an existing set and specifying it as
_compatible_ with an existing version on which no future Workflow Tasks should execute. Because the
new version processes existing [Event Histories](/workflows/#event-history), it is subject to the
normal [deterministic constraints](/workflows/#deterministic-constraints), and you might need to use
one of the [versioning APIs](/workflows/#workflow-versioning).

The feature also permits you to make incompatible changes to Activity Definitions in conjunction
with incompatible changes to Workflow Definitions that use those Activities. This works because any
Activity scheduled by a Workfow on the same Task Queue will, by default, only be dispatched to
Workers that have a compatible build ID with the Workflow that scheduled it. Thus, if you wish
to change the type signature of an Activity Definition while creating a new incompatible build ID
for a Worker, you can do so without concern that the Activity will fail to execute on some other
Worker with an incompatible definition. The same principle applies to Child Workflows.

Note that if you schedule an Activity or a Child Workflow on _different_ Task Queue from the one
the Workflow is running on, they will be not be assigned any particular version.

Continue-as-new from a Workflow on a versioned Task Queue will, by default, start the continued
Workflow on the same compatible set as the original Workflow. Continuing-as-new onto a different
task queue will not assign any particular version.

### How to use Worker Versioning

To use this feature, follow these steps:

1. Define Worker build-identifier version sets for the Task Queue.
   You can use either the `temporal` CLI or your choice of SDK.
   **_TODO: Links_**
2. Enable the feature on your Worker by specifying a build identifier.
   **_TODO: Links for each SDK's Worker options_**

#### Defining the version sets

Whether you use `temporal` [cli](/cli/) or an SDK, updating the version sets feels the same. You
specify the Task Queue that you're targeting, the build identifier that you're adding (or
promoting), whether it becomes the new default version, and any existing versions it should be
considered compatible with.

The rest of this section uses updates to one Task Queue's version sets as examples.

A Task Queue starts its life in an unversioned state. Workers who have not opted into the feature
receive Tasks as usual. Workers who have opted in don't poll the Task Queue because they can't
receive Tasks for Workflows that have no associated version.

:::note Versions don't need to be semver!

The versions in the following examples look like semver versions for clarity, but they don't need to
be. Versions can be any arbitrary string.

:::

In the below examples, `(d)` means that set or version is the default.

First, we add a version `1.0` to the Task Queue as the new default.
Our version sets now look like this:

| set 1 (d) |
| --------- |
| 1.0 (d)   |

All new Workflows started on the Task Queue have their first Tasks assigned to version `1.0`.
Workers with their build identifier set to `1.0` receive these Tasks.

If Workflows that don't have an assigned version are still running on the Task Queue, Workers
without a version take those tasks. So ensure that such Workers are still operational if any
Workflows were open when you added the first version. If you deployed any Workers with a _different_
version, those Workers receive no Tasks.

Now we need to change the Workflow for some reason, so we add `2.0` to the sets as the new default:

| set 1   | set 2 (d) |
| ------- | --------- |
| 1.0 (d) | 2.0 (d)   |

All new Workflows started on the Task Queue have their first Tasks assigned to version `2.0`.
Existing `1.0` Workflows keep generating Tasks targeting `1.0`.
Each deployment of Workers receive their respective Tasks.
This same concept carries forward for each new incompatible version.

Maybe we have a bug in `2.0`, and we want to make sure all open `2.0` Workflows switch to some new
code as fast as possible. So we add `2.1` to the sets, marking it as compatible with `2.0`. Now our
sets look like this:

| set 1   | set 2 (d) |
| ------- | --------- |
| 1.0 (d) | 2.0       |
|         | 2.1 (d)   |

All new Workflow Tasks that are generated for Workflows whose last Workflow Task completion was on
version `2.0` are now assigned to version `2.1`. Because we specified that `2.1` is compatible with
`2.0`, Temporal Server assumes that Workers with this version can process the existing Event
Histories successfully.

We continue with our normal development cycle, adding a `3.0` version.
Nothing new here:

| set 1   | set 2   | set 3 (d) |
| ------- | ------- | --------- |
| 1.0 (d) | 2.0     | 3.0 (d)   |
|         | 2.1 (d) |           |

Now imagine that version `3.0` doesn't have an explicit bug, but something about the business logic
is less than ideal. We are OK with existing `3.0` Workflows running to completion, but we want new
Workflows to use the old `2.x` branch. This operation is supported by performing an update targeting
`2.1` (or `2.0`) and setting it's set as the current default, which results in these sets:

| set 1   | set 3   | set 2 (d) |
| ------- | ------- | --------- |
| 1.0 (d) | 3.0 (d) | 2.0       |
|         |         | 2.1 (d)   |

Now new workflows start on `2.1`.

#### Permitted and forbidden operations on version sets

A request to change the sets can do one of the following:

- Add a version to the sets as new the default version in a new overall-default compatible set.
- Add a version to an existing set that is compatible with an existing version.
  - Optionally making it the default for that set
  - Optionally making that set the overall-default set.
- Promote a version within an existing set to become the default for that set.
- Promote a set to become the overall-default set.

You can't explicitly delete versions. This helps you avoid the situation in which Workflows
accidentally become stuck with no means of making progress because the version they are associated
with no longer exists.

However, sometimes you might want to do this intentionally. If you _want_ to make sure that all
Workflows currently being processed by, say, `2.0` stop (even if you don't yet have a new version
ready) you can add a new version `2.1` to the sets marked as compatible with `2.0`. New tasks will
target `2.1`, but since you have not yet deployed any `2.1` workers, they will not make any
progress.

#### Set constraints

The sets have a maximum size limit, which defaults to 1000 build ids across all sets. This limit is
configurable on Temporal Server via the `limit.versionBuildIDsPerQueue` dynamic config property.
Operations to add new Build IDs to the sets will fail if the limit would be exceeded.

There is also a limit on the number of sets, which defaults to 10. This limit is configurable via
the `limit.versionCompatibleSetsPerQueue` dynamic config property.

In practice these limits should rarely be a concern, because a version is no longer needed after no
open Workflows are using that version, and a background process will delete IDs and sets which are
no longer needed.

There is also a limit on the size of each Build ID / version string, which defaults to 1000 bytes.
This limit is configurable on the server via the `limit.workerBuildIdSize` dynamic config property.
