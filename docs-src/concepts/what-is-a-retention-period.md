---
id: what-is-a-retention-period
title: What is a Retention Period?
sidebar_label: Retention Period
description: A Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.
tags:
  - term
  - explanation
---

Retention Period is the duration for which the Temporal Cluster stores data associated with closed Workflow Executions on a Namespace in the Persistence store.

- [How to set the Retention Period for a Namespace](/tctl-v1/namespace#register)
- [How to set the Retention Period for a Namespace using an SDK](/application-development/features/#namespaces)

A Retention Period applies to all closed Workflow Executions within a [Namespace](/concepts/what-is-a-namespace) and is set when the Namespace is registered.

The Temporal Cluster triggers a Timer task at the end of the Retention Period that cleans up the data associated with the closed Workflow Execution on that Namespace.
mutable
The minimum Retention Period is 1 day.
On Temporal Cluster version 1.18 and later, the maximum Retention Period value for Namespaces can be set to anything over the minimum requirement of 1 day. Ensure that your Persistence store has enough capacity for the storage.
On Temporal Cluster versions 1.17 and earlier, the maximum Retention Period you can set is 30 days.
Setting the Retention Period to 0 results in the error _A valid retention period is not set on request_.

If you don't set the Retention Period value when using the [`tctl namespace register`](/tctl-v1/namespace#register) command, it defaults to 3 days.
If you don't set the Retention Period value when using the [`RegisterNamespaceRequest`](/application-development/features/#namespaces) API, it returns an error.
