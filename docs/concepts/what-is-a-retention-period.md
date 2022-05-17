---
id: what-is-a-retention-period
title: What is a Retention Period?
sidebar_label: Retention Period
description: A Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.
tags:
  - explanation
---

A Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.

Retention Periods are per [Namespace](/docs/concepts/what-is-a-namespace) and is set when the Namespace is registered.

If the retention period isn't set, it defaults to 2 days.
The minimum retention period is 1 day.
The maximum retention period is 30 days.
Setting the retention period to 0 results in the error _A valid retention period is not set on request_.
