---
id: how-to-set-up-multi-cluster-replication
title: How to set up Multi-Cluster Replication
sidebar_label: Set up Multi-Cluster Replication
description: Multi-Cluster Replication can be enabled by setting the appropriate values in the `clusterMetadata` section of your configuration file.
tags:
  - how-to
  - cluster
---

The [Multi-Cluster Replication](/concepts/what-is-multi-cluster-replication) feature asynchronously replicates Workflow Execution Event Histories from active Clusters to other passive Clusters, and can be enabled by setting the appropriate values in the `clusterMetadata` section of your configuration file.

1. `enableGlobalNamespace` must be set to `true`.
2. `failoverVersionIncrement` has to be equal across connected Clusters.
3. `initialFailoverVersion` in each Cluster has to assign a different value.
   No equal value is allowed across connected Clusters.

After the above conditions are satisfied, you can start to configure a multi-cluster setup.

#### Set up Multi-Cluster Replication prior to v1.14

You can set this up with [`clusterMetadata` configuration](/references/configuration#clustermetadata); however, this is meant to be only a conceptual guide rather than a detailed tutorial.
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

#### Set up Multi-Cluster Replication in v1.14 and later

You still need to set up local cluster [`clusterMetadata` configuration](/references/configuration#clustermetadata)

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

Then you can use the `tctl admin` tool to add cluster connections. All operations should be executed in both Clusters.

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
