---
id: multi-cluster
title: Multi-cluster Replication
sidebar_label: Multi-cluster Replication
---

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

Temporal's Multi-cluster Replication feature is considered **experimental** and not subject to normal [versioning and support policy](/server/versions-and-dependencies).

</CustomWarning>

This guide introduces Temporal's Multi-cluster Replication capabilities.
You can set this up with `tctl admin cluster upsert-remote-cluster` command. A two-cluster-setup example can be found in below section [Cluster setup](#cluster-setup)

## Overview

Multi-cluster Replication is a feature which asynchronously replicates Workflow Executions from active clusters to other passive clusters, for backup and state reconstruction.
When necessary, for higher availability, Server administrators can failover to any of the clusters which have the backup.

## Version

A **version** is a concept in Multi-cluster Replication which describes the chronological order of events per Namespace.

With Multi-cluster Replication, all Namespace change events and Workflow Execution History events are replicated asynchronously for high throughput.
This means that data across clusters is **not** strongly consistent.
To guarantee that Namespace data and Workflow Execution data will achieve eventual consistency (especially when there is a data conflict during a failover), a **version** is introduced and attached to Namespaces.
All Workflow Execution History entries generated in a Namespace will also come with the version attached to that Namespace.

All participating clusters are pre-configured with a unique initial version, and a shared version increment:

- `initial version < shared version increment`

When performing failover for a Namespace from one Cluster to another Cluster, the version attached to the Namespace will be changed by the following rule:

- for all versions which follow `version % (shared version increment) == (active cluster's initial version)`, find the smallest version which has `version >= old version in namespace`

When there is a data conflict, a comparison will be made and Workflow Execution History entries with the highest version will be considered the source of truth.

When a cluster is trying to mutate a Workflow Execution History, the version will be checked.
A cluster can mutate a Workflow Execution History only if the following is true:

- The version in the Namespace belongs to this cluster, i.e.
  `(version in namespace) % (shared version increment) == (this cluster's initial version)`
- The version of this Workflow Execution History's last entry (event) is equal or less than the version in the Namespace, i.e.
  `(last event's version) <= (version in namespace)`

<details>
<summary>Namespace version change example
</summary>
  
Assuming the following scenario:

- Cluster A comes with initial version: 1
- Cluster B comes with initial version: 2
- Shared version increment: 10

T = 0: Namespace α is registered, with active Cluster set to Cluster A

```
namespace α's version is 1
all workflows events generated within this namespace, will come with version 1
```

T = 1: namespace β is registered, with active Cluster set to Cluster B

```
namespace β's version is 2
all workflows events generated within this namespace, will come with version 2
```

T = 2: Namespace α is updated to with active Cluster set to Cluster B

```
namespace α's version is 2
all workflows events generated within this namespace, will come with version 2
```

T = 3: Namespace β is updated to with active Cluster set to Cluster A

```
namespace β's version is 11
all workflows events generated within this namespace, will come with version 11
```

</details>

## Version history

Version history is a concept which provides a high level summary of version information in regards to Workflow Execution History.

Whenever there is a new Workflow Execution History entry generated, the version from Namespace will be attached.
The Workflow Executions's mutable state will keep track of all history entries (events) and the corresponding version.

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

T = 3: Namespace failover triggered, Namespace version is now 2
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

Since Temporal is AP, during failover (change of active Temporal Cluster Namespace), there can exist cases where more than one Cluster can modify a Workflow Execution, causing divergence of Workflow Execution History. Below shows how the version history will look like under such conditions.

<details>
<summary>Version history example (with data conflict)
</summary>
  
Below, shows version history of the same Workflow Execution in 2 different Clusters.

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

## Workflow Execution History conflict resolution

When a Workflow Execution History diverges, proper conflict resolution should be applied.

In Multi-cluster Replication, Workflow Execution History entries (events) are modeled as a tree, as shown in the second example in [Version History](#version-history).

Workflow Execution Histories that diverge will have more than one history branch.
Among all history branches, the history branch with the highest version is considered the `current branch` and the Workflow Execution's mutable state is a summary of the current branch.
Whenever there is a switch between Workflow Execution History branches, a complete rebuild of the Workflow Execution's mutable state will occur.

## Zombie Workflows

There is an existing contract that for any Namespace and Workflow Id combination, there can be at most one run (Namespace + Workflow Id + Run Id) open / executing.

Multi-cluster Replication aims to keep the Workflow Execution History as up-to-date as possible among all participating Clusters.

Due to the nature of Multi-cluster Replication (for example, Workflow Execution History events are replicated asynchronously) different Runs (same Namespace and Workflow Id) can arrive at the target Cluster at different times, sometimes out of order, as shown below:

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

Since Run 2 appears in Cluster B first, Run 1 cannot be replicated as "runnable" due to the rule `at most one Run open` (see above), thus the "zombie" Workflow Execution state is introduced.
A "zombie" state is one in which a Workflow Execution which cannot be actively mutated by a Cluster (assuming the corresponding Namespace is active in this Cluster). A zombie Workflow Execution can only be changed by a replication Task.

Run 1 will be replicated similar to Run 2, except when Run 1's execution will become a "zombie" before Run 1 reaches completion.

## Workflow Task processing

In the context of Multi-cluster Replication, a Workflow Execution's mutable state is an entity which tracks all pending tasks.
Prior to the introduction of Multi-cluster Replication, Workflow Execution History entries (events) are from a single branch, and the Temporal Server will only append new entries (events) to the Workflow Execution History.

After the introduction of Multi-cluster Replication, it is possible that a Workflow Execution can have multiple Workflow Execution History branches.
Tasks generated according to one history branch may become invalidated by switching history branches during conflict resolution.

Example:

T = 0: task A is generated according to Event Id: 4, version: 2

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

T = 1: conflict resolution happens, Workflow Execution's mutable state is rebuilt and history Event Id: 4, version: 3 is written down to persistence

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

At this time, due to the rebuild of a Workflow Execution's mutable state (conflict resolution), Task A is no longer relevant (Task A's corresponding Event belongs to non-current branch).
Task processing logic will verify both the Event Id and version of the Task against a corresponding Workflow Execution's mutable state, then discard task A.

## Cluster setup

As mentioned in the [Version](#version) section, make sure the cluster metadata is configured for multi-cluster setup:

1. Set enableGlobalNamespace to true.
2. FailoverVersionIncrement has to be equal across connected clusters.
3. InitialFailoverVersion in each cluster has to assign a different value. No equal value is allowed across connected clusters.

After the above conditions are satisfied, you can start to configure a multi-cluster setup.

### Setup multi-cluster prior to release v1.14

You can set this up with [`clusterMetadata` configuration](/server/configuration#clustermetadata), however this is only meant to be a conceptual guide rather than a detailed tutorial.
Please reach out to us if you need to set this up.

For example:

```yaml
# cluster A
clusterMetadata:
  enableGlobalNamespace: false
  failoverVersionIncrement: 100
  masterClusterName: "clusterA"
  currentClusterName: "clusterA"
  clusterInformation:
    clusterA:
      enabled: true
      initialFailoverVersion: 1
      rpcAddress: "127.0.0.1:7233"
    clusterB:
      enabled: true
      initialFailoverVersion: 2
      rpcAddress: "127.0.0.1:8233"

# cluster B
clusterMetadata:
  enableGlobalNamespace: false
  failoverVersionIncrement: 100
  masterClusterName: "clusterA"
  currentClusterName: "clusterB"
  clusterInformation:
    clusterA:
      enabled: true
      initialFailoverVersion: 1
      rpcAddress: "127.0.0.1:7233"
    clusterB:
      enabled: true
      initialFailoverVersion: 2
      rpcAddress: "127.0.0.1:8233"
```

### Setup multi-cluster in release v1.14+

You still need to set up local cluster [`clusterMetadata` configuration](/server/configuration#clustermetadata)

For example:

```yaml
# cluster A
clusterMetadata:
  enableGlobalNamespace: false
  failoverVersionIncrement: 100
  masterClusterName: "clusterA"
  currentClusterName: "clusterA"
  clusterInformation:
    clusterA:
      enabled: true
      initialFailoverVersion: 1
      rpcAddress: "127.0.0.1:7233"

# cluster B
clusterMetadata:
  enableGlobalNamespace: false
  failoverVersionIncrement: 100
  masterClusterName: "clusterB"
  currentClusterName: "clusterB"
  clusterInformation:
    clusterB:
      enabled: true
      initialFailoverVersion: 2
      rpcAddress: "127.0.0.1:8233"
```

Then you can use the `tctl admin` tool to add cluster connections. All operations should be executed in both clusters.

```shell
# Add cluster B connection into cluster A
tctl -address 127.0.0.1:7233 admin cluster upsert-remote-cluster --frontend_address "localhost:8233"
# Add cluster A connection into cluster B
tctl -address 127.0.0.1:8233 admin cluster upsert-remote-cluster --frontend_address "localhost:7233"

# Disable connections
tctl -address 127.0.0.1:7233 admin cluster upsert-remote-cluster --frontend_address "localhost:8233" --enable_connection false
tctl -address 127.0.0.1:8233 admin cluster upsert-remote-cluster --frontend_address "localhost:7233" --enable_connection false

# Delete connections
tctl -address 127.0.0.1:7233 admin cluster remove-remote-cluster --cluster "clusterB"
tctl -address 127.0.0.1:8233 admin cluster remove-remote-cluster --cluster "clusterA"
```
