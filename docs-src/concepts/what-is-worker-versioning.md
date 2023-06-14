---
id: what-is-worker-versioning
title: What is Worker Versioning?
sidebar_label: Worker Versioning
description: Worker Versioning ensures that Workers, operating on the same Task Queue, with differing Workflow and Activity Definitions do not process Workflow Tasks and Activity Tasks beyond their capability.
tags:
  - terms
  - concepts
  - worker-versioning
---

Worker Versioning enhances the management of changes to [Workflow](/workflows#workflow-definition) and [Activity Definitions](/activities#activity-definition), focusing on controlling nondeterministic alterations. It ensures that Workers, operating on the same [Task Queue](#task-queue), with differing Workflow and Activity Definitions do not process [Workflow Tasks](/concepts/what-is-a-workflow-task) and [Activity Tasks](#activity-task-execution) beyond their capability.

The mechanism achieves this through the use of compatible Version Sets and Build IDs. Define the Version Sets, indicating the compatible variations of [Workflow Definitions](/workflows/#workflow-definition). The Build ID, a free-form string, are assigned to the code defining a Worker.
The Temporal Server uses this Build ID to determine the versions of a Workflow Definition the Worker can process.

The compatibility of different Build IDs is defined by updating the Version Sets associated with the Task Queue, as stored by the Temporal Server. This setup guarantees Workers only process Tasks within their capacity, according to the Task Queue's Version Sets.

### When to use Worker Versioning

The main use of this feature is the deployment of incompatible changes to short-lived Workflows. It allows for new Workflow Executions to run using the newly deployed Workers, and old Workflow Executions are processed only by Workers with an appropriate version. Old Workers can be decommissioned after the [Archival](/concepts/what-is-archival) of any open Workflows using their version.

### Activity Versioning

This feature enables you to make incompatible changes to Activity Definitions in conjunction with incompatible changes to Workflow Definitions that use those Activities.
This functionality works because any Activity that a Workflow schedules on the same Task Queue only gets dispatched to Workers compatible with the Workflow that scheduled it.
If you want to change an Activity Definition's type signature while creating a new incompatible Build ID for a Worker, you can do so without worrying about the Activity failing to execute on some other Worker with an incompatible definition.

### Child Workflows Versioning

The same principle described by Activities, applies to [Child Workflows](/workflows#child-workflow).

### Continue-As-New Versioning

By default, a versioned Task Queue's [Continue-As-New](/workflows#continue-as-new) function starts the continued Workflow on the same compatible set as the original Workflow.

If you Continue-As-New onto a different Task Queue, the system doesn't assign any particular version. You also have the option to specify that the continued Workflow should start using the Task Queue's latest default version.

## How to use Worker Versioning

Use either the `temporal` CLI or your choice of SDK to enable Worker Versioning, and follow these steps

1. Define Worker Build ID Version Sets for the Task Queue.
2. Enable the feature on your Worker by specifying a Build ID.

The following sections describe how to use Worker Versioning.

#### Define Worker Build ID Version Sets for the Task Queue

Specify the Task Queue, you're targeting, the Build ID you're adding or promoting, and any existing Versions it should consider being compatible with.

The rest of this section uses updates to one Task Queue's Version Sets as examples.

By default, both Task Queues and Workers are in an unversioned state.
[Unversioned Worker](#unversioned-workers) can poll unversioned Task Queues and receive tasks. To use this feature, both the Task Queue and the Worker have to have Build IDs associated with them.

If you run a Worker using versioning against a Task Queue that isn't set to use versioning, or is missing that Worker's Build ID, it won't
get any Tasks.
Likewise, a unversioned Worker polling a Task Queue with versioning won't work either.

:::tip

Public facing Workflows on a versioned Task Queue shouldn't change their signature as it contradicts the purpose of Workflow-launching Clients remaining unaware of changes in the Workflow Definition. If you need to change a Workflow's signature, use a different Workflow Type or a completely new Task Queue.

:::

##### Add a new Build ID to the Task Queue

First, add a version `1.0` to the Task Queue as the new default.
Your Version Sets now look like this:

| set 1 (default) |
| --------------- |
| 1.0 (default)   |

All new Workflows started on the Task Queue have their first tasks assigned to version `1.0`.
Workers with their Build ID set to `1.0` receive these Tasks.

:::note Versions don't need to follow semver or any other semantic versioning scheme!

The versions in the following examples look like semver versions for clarity, but they don't need to be.
Versions can be any arbitrary string.

:::

If Workflows that don't have an assigned version are still running on the Task Queue, Workers
without a version, take those tasks. So ensure that such Workers are still operational if any
Workflows were open when you added the first version. If you deployed any Workers with a _different_
version, those Workers receive no Tasks.

Now, imagine you need change the Workflow for some reason.

##### Add a new incompatible Build ID to the Task Queue

Add `2.0` to the sets as the new default:

| set 1         | set 2 (default) |
| ------------- | --------------- |
| 1.0 (default) | 2.0 (default)   |

All new Workflows started on the Task Queue have their first tasks assigned to version `2.0`.
Existing `1.0` Workflows keep generating tasks targeting `1.0`.
Each deployment of Workers receives their respective Tasks.
This same concept carries forward for each new incompatible version.

Maybe you have a bug in `2.0`, and you want to make sure all open `2.0` Workflows switch to some new
code as fast as possible. So, you'll add `2.1` to the sets, marking it as compatible with `2.0`. Now your
sets look like this:

| set 1         | set 2 (default) |
| ------------- | --------------- |
| 1.0 (default) | 2.0             |
|               | 2.1 (default)   |

All new Workflow Tasks that are generated for Workflows whose last Workflow Task completion was on
version `2.0` are now assigned to version `2.1`. Because you specified that `2.1` is compatible with
`2.0`, Temporal Server assumes that Workers with this version can process the existing Event
Histories successfully.

Continue with your normal development cycle, adding a `3.0` version.

##### Promote a Build ID to the Task Queue's default

Nothing new here:

| set 1         | set 2         | set 3 (default) |
| ------------- | ------------- | --------------- |
| 1.0 (default) | 2.0           | 3.0 (default)   |
|               | 2.1 (default) |                 |

Now imagine that version `3.0` doesn't have an explicit bug, but something about the business logic
is less than ideal. You are okay with existing `3.0` Workflows running to completion, but you want new
Workflows to use the old `2.x` branch. This operation is supported by performing an update targeting
`2.1` (or `2.0`) and setting it's set as the current default, which results in these sets:

| set 1         | set 3         | set 2 (default) |
| ------------- | ------------- | --------------- |
| 1.0 (default) | 3.0 (default) | 2.0             |
|               |               | 2.1 (default)   |

Now new Workflows start on `2.1`.

#### Permitted and forbidden operations on Version Sets

A request to change the sets can do one of the following:

- Add a version to the sets as new the default version in a new overall-default compatible set.
- Add a version to an existing set that's compatible with an existing version.
  - Optionally making it the default for that set
  - Optionally making that set the overall-default set.
- Promote a version within an existing set to become the default for that set.
- Promote a set to become the overall-default set.

You can't explicitly delete versions. This helps you avoid the situation in which Workflows
accidentally become stuck with no means of making progress because the version they're associated
with no longer exists.

However, sometimes you might want to do this intentionally. If you _want_ to make sure that all
Workflows currently being processed by, say, `2.0` stop (even if you don't yet have a new version
ready) you can add a new version `2.1` to the sets marked as compatible with `2.0`. New tasks will
target `2.1`, but since you haven't deployed any `2.1` Workers, they won't make any
progress.

#### Worker Sets constraints

The sets have a maximum size limit, which defaults to 1000 Build IDs across all sets. This limit is
configurable on Temporal Server via the `limit.versionBuildIdLimitPerQueue` [dynamic config property](https://github.com/temporalio/temporal/blob/master/common/dynamicconfig/constants.go).
Operations to add new Build IDs to the sets will fail if the limit would be exceeded.

There is also a limit on the number of sets, which defaults to 10. This limit is configurable via
the `limit.versionCompatibleSetLimitPerQueue` dynamic config property.

In practice, these limits should rarely be a concern because a version is no longer needed after no
open Workflows are using that version, and a background process will delete IDs and sets which are
no longer needed.

There is also a limit on the size of each Build ID or version string, which defaults to 255
characters. This limit is configurable on the server via the `limit.workerBuildIdSize` dynamic
config property.

### Build ID reachability

Eventually, you'll want to know if you can retire the old Worker versions. Temporal provides functionality
to help you determine if a version is still in by open or closed Workflows. You can use the
`temporal` CLI to do this with the following command:

```command
temporal task-queue get-build-id-reachability
```

The command tells if the Build ID in question is unreachable, only reachable by closed Workflows, or reachable by open and new Workflows on a per-Task-Queue basis.
For example, this "2.0" Build ID is shown here by the CLI to be reachable by both new Workflows and
some existing Workflows:

```command
temporal task-queue get-build-id-reachability --build-id "2.0"
```

```output
BuildId                         TaskQueue                                   Reachability
    2.0  build-id-versioning-dc0068f6-0426-428f-b0b2-703a7e409a97  [NewWorkflows
                                                                   ExistingWorkflows]
```

For more information, see the [CLI documentation](/cli/) or help output.

You can also use this API `GetWorkerTaskReachability` directly from within language SDKs.

### Unversioned Workers

Unversioned Workers refer to Workers operating on a Task Queue before versioning capabilities were added to that Task Queue.
They don't have any specific version or Build IDs associated with them, hence they're in the _compatible set zero_, or unversioned state.
