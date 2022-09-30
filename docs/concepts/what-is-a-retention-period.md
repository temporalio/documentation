---
id: what-is-a-retention-period
title: What is a Retention Period?
sidebar_label: Retention Period
description: A Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.
tags:
  - term
  - explanation
---

A Retention Period is the amount of time, in days, that a Workflow Execution Event History remains in the Cluster's persistence store.

- [How to set the Retention Period for the Namespace](/tctl/namespace/register/#--retention)
- [How to set the Retention Period for the Namespace using SDK](/application-development/features/#namespaces)

A Retention Period applies to a single [Namespace](/concepts/what-is-a-namespace) and is set when the Namespace is registered.

The Temporal Cluster triggers a Timer task at the end of the Retention Period that cleans up the associated Workflow Execution Event History on that Namespace.

On Temporal Cluster version 1.18 and later, Namespaces can use any Retention Period as needed. Ensure that your Persistence store has enough capacity for the storage.
The maximum retention period on Temporal Cluster versions 1.17 and before is 30 days.

If you don't set the Retention Period value when using the [`tctl register`](/tctl/namespace/register/#--retention) command, it defaults to 3 days.
If you don't set the Retention Period value when using the [`RegisterNamespaceRequest](/application-development/features/#namespaces) API, it returns an error.
The minimum Retention Period is 1 day.
Setting the Retention Period to 0 results in the error _A valid retention period is not set on request_.
