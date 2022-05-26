---
id: what-is-a-retention-period
title: What is a Retention Period?
sidebar_label: Retention Period
description: A Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.
tags:
  - explanation
---

A Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.

- [How to set the Retention Period for the Namespace](/tctl/namespace/register/#--retention)

A Retention Period applies to a single [Namespace](/concepts/what-is-a-namespace) and is set when the Namespace is registered.

If the Retention Period isn't set, it defaults to 2 days.
The minimum Retention Period is 1 day.
The maximum Retention Period is 30 days.
Setting the Retention Period to 0 results in the error _A valid retention period is not set on request_.
