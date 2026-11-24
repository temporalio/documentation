---
id: multi-cluster-replication-before-v1-14
title: Set up Multi-Cluster Replication before v1.14
sidebar_label: Multi-Cluster Replication before v1.14
description: Static configuration for Multi-Cluster Replication on Temporal Server versions before v1.14, where every Temporal Service lists all the others.
slug: /self-hosted-guide/multi-cluster-replication-before-v1-14
unlisted: true
tags:
  - Temporal Service
  - Self-hosting
---

This page covers Temporal Server versions before v1.14. For v1.14 and later, see
[How to set up Multi-Cluster Replication](/self-hosted-guide/multi-cluster-replication#set-up-multi-cluster-replication).

Before v1.14, you list every Temporal Service in the static configuration of each Temporal Service and set the same
`masterClusterName` everywhere. Registration with the CLI isn't available.

In this layout, `masterClusterName` is `clusterA` in both files, including clusterB's. Every Temporal Service lists every
other one, so they all agree on one primary. In v1.14 and later, each file lists only its own Temporal Service, so
`masterClusterName` differs.

```yaml
# clusterA
clusterMetadata:
  enableGlobalNamespace: true
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

# clusterB
clusterMetadata:
  enableGlobalNamespace: true
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
