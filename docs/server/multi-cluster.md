---
id: multi-cluster
title: Multi-cluster Replication
sidebar_label: Multi-cluster Replication
---

import CustomWarning from "../shared/CustomWarning.js"

<CustomWarning>

Temporal's Multi-cluster Replication feature is considered **experimental** and not subject to normal [versioning and support policy](/docs/server/versions-and-dependencies).

</CustomWarning>

This guide introduces Temporal's Multi-cluster Replication capabilities.
You can set this up with [`clusterMetadata` configuration](/docs/server/configuration#clustermetadata), however this is only meant to be a conceptual guide rather than a detailed tutorial.
Please reach out to us if you need to set this up.

## Overview

Multi-cluster Replication is a feature which asynchronously replicates workflows from active cluster to other passive clusters, for backup & state reconstruction.
When necessary, the customer can failover to any of the clusters which have the backup for high availability.

In terms of the CAP theorem, Multi-cluster Replication adds high availability to Temporal's strongly consistent system.

## Version

A **version** is a concept in Multi-cluster Replication which describes the chronological order of events (per customer namespace).

In Multi-cluster Replication, all namespace change events & workflow history events are replicated asynchronously for high throughput.
This means that data across clusters are **not** strongly consistent.
To guarantee that namespace data & workflow data will achieve eventual consistency (especially when there is data conflict during a failover), a **version** is introduced and attached to customers' namespaces.
All workflow history events generated in a namespace will also come with the version in that namespace.

All participating clusters are pre-configured with a unique initial version, and a shared version increment:

- `initial version < shared version increment`

When performing failover for one namespace from one cluster to another cluster, the version attached to the namespace will be changed by the following rule:

- for all versions which follow `version % (shared version increment) == (active cluster's initial version)`, find the smallest version which has `version >= old version in namespace`

When there is a data conflict, comparison will be made and workflow history events with the highest version will win.

When a cluster is trying to mutate a workflow, version will be checked. A cluster can mutate a workflow if and only if

- version in the namespace belongs to this cluster, i.e.
  `(version in namespace) % (shared version increment) == (this cluster's initial version)`
- the version of this workflow's last event is equal or less then version in namespace, i.e.
  `(last event's version) <= (version in namespace)`

<details>
<summary>Namespace version change example
</summary>
  
Assume this scenario:

- Cluster A comes with initial version: 1
- Cluster B comes with initial version: 2
- Shared version increment: 10

T = 0: namespace α is registered, with active Cluster set to Cluster A

```
namespace α's version is 1
all workflows events generated within this namespace, will come with version 1
```

T = 1: namespace β is registered, with active Cluster set to Cluster B

```
namespace β's version is 2
all workflows events generated within this namespace, will come with version 2
```

T = 2: namespace α is updated to with active Cluster set to Cluster B

```
namespace α's version is 2
all workflows events generated within this namespace, will come with version 2
```

T = 3: namespace β is updated to with active Cluster set to Cluster A

```
namespace β's version is 11
all workflows events generated within this namespace, will come with version 11
```

</details>

## Version History

Version history is a concept which provides high level summary about version information of workflow history.

Whenever there is a new workflow history event generated, the version from namespace will be attached. Workflow mutable state will keep track of all history events & corresponding version.

<details>
<summary>Version history example (without data conflict)
</summary>
  
* Cluster A comes with initial version: 1
* Cluster B comes with initial version: 2
* Shared version increment: 10

T = 0: adding event with event ID == 1 & version == 1

View in both Cluster A & B

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 1               | 1       |
| -------- | ------------- | --------------- | ------- |
```

T = 1: adding event with event ID == 2 & version == 1

View in both Cluster A & B

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 2               | 1       |
| 2        | 1             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

T = 2: adding event with event ID == 3 & version == 1

View in both Cluster A & B

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 3               | 1       |
| 2        | 1             |                 |         |
| 3        | 1             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

T = 3: namespace failover triggered, namespace version is now 2
adding event with event ID == 4 & version == 2

View in both Cluster A & B

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 3               | 1       |
| 2        | 1             | 4               | 2       |
| 3        | 1             |                 |         |
| 4        | 2             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

T = 4: adding event with event ID == 5 & version == 2

View in both Cluster A & B

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 3               | 1       |
| 2        | 1             | 5               | 2       |
| 3        | 1             |                 |         |
| 4        | 2             |                 |         |
| 5        | 2             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

</details>

Since Temporal is AP, during failover (change of active Temporal of a namespace), there exist cases where more than one Cluster can modify a workflow, causing divergence of workflow history. Below shows how version history will look like under such conditions.

<details>
<summary>Version history example (with data conflict)
</summary>
  
Below will show version history of the same workflow in 2 different Clusters.

- Cluster A comes with initial version: 1
- Cluster B comes with initial version: 2
- Cluster C comes with initial version: 3
- Shared version increment: 10

T = 0:

View in both Cluster B & C

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 2               | 1       |
| 2        | 1             | 3               | 2       |
| 3        | 2             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

T = 1: adding event with event ID == 4 & version == 2 in Cluster B

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 2               | 1       |
| 2        | 1             | 4               | 2       |
| 3        | 2             |                 |         |
| 4        | 2             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

T = 1: namespace failover to Cluster C, adding event with event ID == 4 & version == 3 in Cluster C

```
| -------- | ------------- | --------------- | ------- |
| Events                   | Version History           |
| -------- | ------------- | --------------- | ------- |
| Event ID | Event Version | Event ID        | Version |
| -------- | ------------- | --------------- | ------- |
| 1        | 1             | 2               | 1       |
| 2        | 1             | 3               | 2       |
| 3        | 2             | 4               | 3       |
| 4        | 3             |                 |         |
| -------- | ------------- | --------------- | ------- |
```

T = 2: replication task from Cluster C arrives in Cluster B

Note: below are a tree structures

```
                | -------- | ------------- |
                | Events                   |
                | -------- | ------------- |
                | Event ID | Event Version |
                | -------- | ------------- |
                | 1        | 1             |
                | 2        | 1             |
                | 3        | 2             |
                | -------- | ------------- |
                           |
           | ------------- | ------------ |
           |                              |
| -------- | ------------- |   | -------- | ------------- |
| Event ID | Event Version |   | Event ID | Event Version |
| -------- | ------------- |   | -------- | ------------- |
| 4        | 2             |   | 4        | 3             |
| -------- | ------------- |   | -------- | ------------- |

          | --------------- | ------- |
          | Version History           |
          | --------------- | ------- |
          | Event ID        | Version |
          | --------------- | ------- |
          | 2               | 1       |
          | 3               | 2       |
          | --------------- | ------- |
                            |
                  | ------- | ------------------- |
                  |                               |
| --------------- | ------- |   | --------------- | ------- |
| Event ID        | Version |   | Event ID        | Version |
| --------------- | ------- |   | --------------- | ------- |
| 4               | 2       |   | 4               | 3       |
| --------------- | ------- |   | --------------- | ------- |
```

T = 2: replication task from Cluster B arrives in Cluster C, same as above

</details>

## Workflow History Conflict Resolution

When a workflow encounters divergence of workflow history, proper conflict resolution should be applied.

In Multi-cluster Replication, workflow history events are modeled as a tree, as shown in the second example in [### Version History].

Workflows which encounters divergence will have more than one history branches.
Among all history branches, the history branch with the highest version is considered as the `current branch` and workflow mutable state is a summary of the current branch.
Whenever there is a switch between workflow history branches, a complete rebuild of workflow mutable state will occur.

## Zombie Workflows

There is an existing contract that for any namespace & workflow ID combination, there can be at most one run (namespace & workflow ID & run ID) open / running.

Multi-cluster Replication aims to keep the workflow state as up-to-date as possible among all participating Clusters.

Due to the nature of Multi-cluster Replication, i.e. workflow history events are replicated asynchronously, different run (same namespace & workflow ID) can arrive at target Cluster at different times, sometimes out of order, as shown below:

```
| ------------- |          | ------------- |          | ------------- |
|   Cluster A   |          | Network Layer |          |   Cluster B   |
| ------------- |          | ------------- |          | ------------- |
        |                          |                          |
        | Run 1 Replication Events |                          |
        | -----------------------> |                          |
        |                          |                          |
        | Run 2 Replication Events |                          |
        | -----------------------> |                          |
        |                          |                          |
        |                          |                          |
        |                          |                          |
        |                          | Run 2 Replication Events |
        |                          | -----------------------> |
        |                          |                          |
        |                          | Run 1 Replication Events |
        |                          | -----------------------> |
        |                          |                          |
| ------------- |          | ------------- |          | ------------- |
|   Cluster A   |          | Network Layer |          |   Cluster B   |
| ------------- |          | ------------- |          | ------------- |
```

Since run 2 appears in Cluster B first, run 1 cannot be replicated as runnable due to rule `at most one run open` (see above), thus, `zombie` workflow state is introduced. Zombie state indicates a workflow which cannot be actively mutated by a Cluster (assuming corresponding namespace is active in this Cluster). A zombie workflow can only be changed by replication task.

Run 1 will be replicated similar to run 2, except run 1's workflow state will be zombie before run 1 reaches completion.

## Workflow Task Processing

In the context of Multi-cluster Replication, workflow mutable state is an entity which tracks all pending tasks.
Prior to the introduction of Multi-cluster Replication, workflow history events are from a single branch, and Temporal server will only append new events to workflow history.

After the introduction of Multi-cluster Replication, it is possible that a workflow can have multiple workflow history branches.
Tasks generated according to one history branch maybe invalidated by history branch switching during conflict resolution.

Example:

T = 0: task A is generated according to event ID: 4, version: 2

```
| -------- | ------------- |
| Events                   |
| -------- | ------------- |
| Event ID | Event Version |
| -------- | ------------- |
| 1        | 1             |
| 2        | 1             |
| 3        | 2             |
| -------- | ------------- |
           |
           |
| -------- | ------------- |
| Event ID | Event Version |
| -------- | ------------- |
| 4        | 2             | <-- task A belongs to this event
| -------- | ------------- |
```

T = 1: conflict resolution happens, workflow mutable state is rebuilt and history event ID: 4, version: 3 is written down to persistence

```
                | -------- | ------------- |
                | Events                   |
                | -------- | ------------- |
                | Event ID | Event Version |
                | -------- | ------------- |
                | 1        | 1             |
                | 2        | 1             |
                | 3        | 2             |
                | -------- | ------------- |
                           |
           | ------------- | -------------------------------------------- |
           |                                                              |
| -------- | ------------- |                                   | -------- | ------------- |
| Event ID | Event Version |                                   | Event ID | Event Version |
| -------- | ------------- |                                   | -------- | ------------- |
| 4        | 2             | <-- task A belongs to this event  | 4        | 3             | <-- current branch / mutable state
| -------- | ------------- |                                   | -------- | ------------- |
```

T = 2: task A is loaded.

At this time, due to the rebuilt of workflow mutable state (conflict resolution), task A is no longer relevant (task A's corresponding event belongs to non-current branch). Task processing logic will verify both the event ID and version of the task against corresponding workflow mutable state, then discard task A.
