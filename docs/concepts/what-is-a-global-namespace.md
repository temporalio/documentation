---
id: what-is-a-global-namespace
title: What is a Global Namespace?
sidebar_label: Global Namespace
description: A Global Namespace is a Namespace that exists across Clusters when Multi-Cluster Replication is set up.
tags:
  - explanation
---

A Global Namespace is a [Namespace](/concepts/what-is-a-namespace) that exists across Clusters when [Multi-Cluster Replication](/concepts/what-is-multi-cluster-replication) is set up.

The Global Namespace feature enables Workflow Executions to progress through another Cluster in the event of a failover.

A Global Namespace may be replicated to any number of Clusters, but is active in only one Cluster at any given time.

For a failover to be successful, Worker Processes must be polling for Tasks for the Global Namespace on all Clusters.

Only the active Cluster dispatches [Tasks](/concepts/what-is-a-task).
Worker Processes on the standby Clusters are idle until a failover occurs and their Cluster becomes active.

Temporal Application API calls made to a non-active Cluster are rejected with a **NamespaceNotActiveError** which contains the name of the current active Cluster.
It is the responsibility of the Temporal Application to call the Cluster that is currently active.
