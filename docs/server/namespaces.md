---
id: namespaces
title: Temporal Server Namespaces
sidebar_label: Namespaces
---

## What is a Namespace?

import Content from '../concepts/what-is-a-namespace.md'

<Content />

## Querying Namespaces by CLI

Some useful operations with [tctl](/docs/tctl):

- `tctl namespace list`: List all namespaces.
- `tctl --namespace my-namespace-name namespace register`: Register a new namespace named "my-namespace-name"
- `tctl --namespace my-namespace-name namespace describe`: View "my-namespace-name" details

## Assigning Namespaces on Clients

You set namespaces when you create a client in any of the SDKs (necessary whenever creating workers or starters). If not specified, this defaults to the `default` namespace.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="go"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'TypeScript', value: 'ts'},
]
}>

<TabItem value="go">

```go
	c, err := client.NewClient(client.Options{
		Namespace: "my-namespace-name",
	})
```

</TabItem>
<TabItem value="java">

```java
 WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
 // https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowClientOptions.Builder.html
 WorkflowOptions clientOptions = WorkflowClientOptions.newBuilder()
    .setNamespace('my-namespace-name');
 WorkflowClient workflowClient =  WorkflowClient.newInstance(service, clientOptions);
```

</TabItem>
<TabItem value="ts">

```java
  const connection = new Connection();
  // https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions
  const client = new WorkflowClient(connection.service, {
    namespace: 'my-namespace-name'
  });
```

</TabItem>
</Tabs>

## Global Namespaces

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

This feature is related to Temporal's experimental Multi-cluster Replication feature which is considered **experimental** and not subject to normal [versioning and support policy](/docs/server/versions-and-dependencies).

</CustomWarning>

The Temporal Global Namespace feature provides clients with the capability to continue their Workflow execution from another cluster in the event of a datacenter failover.

Although you can configure a Global Namespace to be replicated to any number of
clusters, it is only considered active in a single cluster.

### Global Namespaces Architecture

Temporal has introduced a new top level entity, Global Namespaces, which provides support for replication of Workflow
execution across clusters (aka [Multi-Cluster Replication](/docs/server/multi-cluster)).
Client applications need to run workers polling on Activity/Workflow tasks on all clusters.
Temporal will only dispatch tasks on the current active cluster; workers on the standby cluster will sit idle
until the Global Namespace is failed over.

Because Temporal is a service that provides highly consistent semantics, we only allow external events like
**StartWorkflowExecution**, **SignalWorkflowExecution**, etc. on an active cluster. Global Namespaces relies on light-weight
transactions (paxos) on the local cluster (Local_Quorum) to update the Workflow execution state and create replication
tasks which are applied asynchronously to replicate state across clusters. If an application makes these API calls on a
cluster where Global Namespace is in standby mode, Temporal will reject those calls with **NamespaceNotActiveError**, which
contains the name of the current active cluster. It is the responsibility of the application to forward the external
event to the cluster that is currently active.

### Global Namespaces Config

| Config              | Description                                                                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IsGlobal            | This config is used to distinguish namespaces local to the cluster from the global namespace. It controls the creation of replication tasks on updates allowing the state to be replicated across clusters. This is a read-only setting that can only be set when the namespace is provisioned.       |
| Clusters            | A list of clusters where the namespace can fail over to, including the current active cluster. This is also a read-only setting that can only be set when the namespace is provisioned. A re-replication feature on the roadmap will allow updating this config to add/remove clusters in the future. |
| Active Cluster Name | Name of the current active cluster for the Global Namespace. This config is updated each time the Global Namespace is failed over to another cluster.                                                                                                                                                 |
| Failover Version    | Unique failover version which also represents the current active cluster for Global Namespace. Temporal allows failover to be triggered from any cluster, so failover version is designed in a way to not allow conflicts if failover is mistakenly triggered simultaneously on two clusters.         |

### Conflict Resolution

Unlike local namespaces which provide at-most-once semantics for Activity execution, Global Namespaces can only support at-least-once
semantics. [Temporal Multi-cluster Replication](/docs/server/multi-cluster) relies on asynchronous replication of events across clusters, so in the event of a failover
it is possible that Activity gets dispatched again on the new active cluster due to a replication task lag. This also
means that whenever Workflow execution is updated after a failover by the new cluster, any previous replication tasks
for that execution cannot be applied. This results in loss of some progress made by the Workflow execution in the
previous active cluster. During such conflict resolution, Temporal re-injects any external events like Signals to the
new history before discarding replication tasks. Even though some progress could rollback during failovers, Temporal
provides the guarantee that Workflows won’t get stuck and will continue to make forward progress.

## Automatic Forwarding on Namespaces

Temporal supports automatic forwarding of Start, Signal, and Query requests to the active Cluster.
This feature must be enabled through a dynamic conflict flag for the given Namespace.

Once enabled, Tasks are sent to the Parent Task Queue partition that matches that Namespace, if it exists.

### Visibility API

All Visibility APIs are allowed on both active and standby clusters. This enables
[Temporal Web](https://github.com/temporalio/temporal-web) to work seamlessly for Global Namespaces as all visibility records for
Workflow executions can be queried from any cluster the namespace is replicated to. Applications making API calls directly
to the Temporal Visibility API will continue to work even if a Global Namespace is in standby mode. However, they might see
a lag due to replication delay when querying the Workflow execution state from a standby cluster.

### CLI

The Temporal CLI can also be used to query the namespace config or perform failovers. Here are some useful commands.

#### Query Global Namespace

The following command can be used to describe Global Namespace metadata:

```bash
$ tctl --ns temporal-canary-xdc n desc
Name: temporal-canary-xdc
Description: temporal canary cross dc testing namespace
OwnerEmail: temporal-dev@temporal.io
NamespaceData:
Status: REGISTERED
RetentionInDays: 7
EmitMetrics: true
ActiveClusterName: dc1
Clusters: dc1, dc2
```

#### Failover Global Namespace

The following command can be used to failover Global Namespace _my-namespace-global_ to the _dc2_ cluster:

```bash
$ tctl --ns my-namespace-global n up --ac dc2
```

### Global Namespaces FAQ

#### What happens to outstanding Activities after failover?

Temporal does not forward Activity completions across clusters. Any outstanding Activity will eventually timeout based
on the configuration. Your application should have retry logic in place so that the Activity gets retried and dispatched
again to a worker after the failover to the new DC. Handling this is pretty much the same as Activity timeout caused by
a worker restart even without Global Namespaces.

#### What happens when a start or signal API call is made to a standby cluster?

Temporal will reject the call and return **NamespaceNotActiveError**. It is the responsibility of the application to forward
the failed call to the active cluster based on information provided in the error.

#### What is the recommended pattern to send external events to an active cluster?

The recommendation at this point is to publish events to a Kafka topic if they can be generated in any cluster.
Then, have a consumer that consumes from the aggregated Kafka topic in the same cluster and sends them to Temporal. Both the
Kafka consumer and Global Namespace need to be failed over together.
