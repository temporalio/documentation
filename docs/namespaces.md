---
id: namespaces
title: Namespaces
---

The Temporal Global Namespace feature provides clients with the capability to continue their workflow execution from another
cluster in the event of a datacenter failover. Although you can configure a Global Namespace to be replicated to any number of
clusters, it is only considered active in a single cluster.

## Global Namespaces Architecture
Temporal has introduced a new top level entity, Global Namespaces, which provides support for replication of workflow
execution across clusters. Client applications need to run workers polling on Activity/Decision tasks on all clusters.
Temporal will only dispatch tasks on the current active cluster; workers on the standby cluster will sit idle
until the Global Namespace is failed over.

Because Temporal is a service that provides highly consistent semantics, we only allow external events like
**StartWorkflowExecution**, **SignalWorkflowExecution**, etc. on an active cluster. Global Namespaces relies on light-weight
transactions (paxos) on the local cluster (Local_Quorum) to update the workflow execution state and create replication
tasks which are applied asynchronously to replicate state across clusters. If an application makes these API calls on a
cluster where Global Namespace is in standby mode, Temporal will reject those calls with **NamespaceNotActiveError**, which
contains the name of the current active cluster. It is the responsibility of the application to forward the external
event to the cluster that is currently active.

## New config for Global Namespaces

### IsGlobal
This config is used to distinguish namespaces local to the cluster from the global namespace. It controls the creation of
replication tasks on updates allowing the state to be replicated across clusters. This is a read-only setting that can
only be set when the namespace is provisioned.

### Clusters
A list of clusters where the namespace can fail over to, including the current active cluster.
This is also a read-only setting that can only be set when the namespace is provisioned. A re-replication feature on the
roadmap will allow updating this config to add/remove clusters in the future.

### Active Cluster Name
Name of the current active cluster for the Global Namespace. This config is updated each time the Global Namespace is failed over to
another cluster.

### Failover Version
Unique failover version which also represents the current active cluster for Global Namespace. Temporal allows failover to
be triggered from any cluster, so failover version is designed in a way to not allow conflicts if failover is mistakenly
triggered simultaneously on two clusters.

## Conflict Resolution
Unlike local namespaces which provide at-most-once semantics for activity execution, Global Namespaces can only support at-least-once
semantics. Temporal XDC relies on asynchronous replication of events across clusters, so in the event of a failover
it is possible that activity gets dispatched again on the new active cluster due to a replication task lag. This also
means that whenever workflow execution is updated after a failover by the new cluster, any previous replication tasks
for that execution cannot be applied. This results in loss of some progress made by the workflow execution in the
previous active cluster. During such conflict resolution, Temporal re-injects any external events like Signals to the
new history before discarding replication tasks. Even though some progress could rollback during failovers, Temporal
provides the guarantee that workflows won’t get stuck and will continue to make forward progress.

## Visibility API
All Visibility APIs are allowed on both active and standby clusters. This enables
[Temporal Web](https://github.com/temporalio/temporal-web) to work seamlessly for Global Namespaces as all visibility records for
workflow executions can be queried from any cluster the namespace is replicated to. Applications making API calls directly
to the Temporal Visibility API will continue to work even if a Global Namespace is in standby mode. However, they might see
a lag due to replication delay when querying the workflow execution state from a standby cluster.

## CLI
The Temporal CLI can also be used to query the namespace config or perform failovers. Here are some useful commands.

### Query Global Namespace
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

### Failover Global Namespace
The following command can be used to failover Global Namespace *my-namespace-global* to the *dc2* cluster:

```bash
$ tctl --ns my-namespace-global n up --ac dc2
```

## FAQ

### What happens to outstanding activities after failover?
Temporal does not forward activity completions across clusters. Any outstanding activity will eventually timeout based
on the configuration. Your application should have retry logic in place so that the activity gets retried and dispatched
again to a worker after the failover to the new DC. Handling this is pretty much the same as activity timeout caused by
a worker restart even without Global Namespaces.

### What happens when a start or signal API call is made to a standby cluster?
Temporal will reject the call and return **NamespaceNotActiveError**. It is the responsibility of the application to forward
the failed call to active cluster based on information provided in the error.

### What is the recommended pattern to send external events to an active cluster?
The recommendation at this point is to publish events to a Kafka topic if they can be generated in any DC.
Then, have a consumer that consumes from the aggregated Kafka topic in the same DC and sends them to Temporal. Both the
Kafka consumer and Global Namespace need to be failed over together.
