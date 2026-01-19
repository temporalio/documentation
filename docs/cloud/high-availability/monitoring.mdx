---
id: monitoring
title: Monitoring High Availability
sidebar_label: Monitoring
slug: /cloud/high-availability/monitoring
description: How to track the health and performance of your High Availability Namespaces.
tags:
  - Temporal Cloud
  - Production
  - High Availability
keywords:
  - availability
  - explanation
  - failover
  - high-availability
  - logs
  - metrics
  - monitoring
  - namespaces
  - replication
  - temporal-cloud
---

import { ToolTipTerm } from '@site/src/components';

Temporal Cloud offers several ways for you to track the health and performance of your
[High Availability](/cloud/high-availability) namespaces.

## Replication status

You can monitor your replica status with the Temporal Cloud UI. If the replica is unhealthy, Temporal Cloud disables the
“Trigger a failover” option to prevent failing over to an unhealthy replica. An unhealthy replica might be due to:

- **Data synchronization issues:** The replica fails to remain in sync with the primary due to network or performance
  problems.
- **Replication lag:** The replica falls behind the primary, causing it to be out of sync.
- **Network issues:** Loss of communication between the replica and the primary causes problems.
- **Failed health checks:** If the replica fails health checks, it’s marked as unhealthy.

These issues prevent the replica from being used during a failover, ensuring system stability and consistency.

## Replication lag metric

Temporal Cloud’s High Availability features use asynchronous replication between the primary and the replica. Workflow
updates in the primary, along with associated History Events, are transmitted to the replica. Replication lag refers to
the transmission delay of Workflow updates and history events from the primary to the replica.

:::tip

Temporal Cloud strives to maintain a <ToolTipTerm term="P95" /> replication lag of less than 1 minute. In this context,
P95 means 95% of updates are processed faster than this limit.

:::

A forced failover, when there is significant replication lag, increases the likelihood of rolling back Workflow
progress. Always check the replication lag metrics before initiating a failover.

Temporal Cloud emits three replication lag-specific
[metrics](/cloud/metrics/reference#replication-lag). The following samples demonstrate how you can
use these metrics to monitor and explore replication lag:

**P99 replication lag histogram**:

```
histogram_quantile(0.99, sum(rate(temporal_cloud_v0_replication_lag_bucket[$__rate_interval])) by (temporal_namespace, le))
```

**Average replication lag**:

```
sum(rate(temporal_cloud_v0_replication_lag_sum[$__rate_interval])) by (temporal_namespace)
/
sum(rate(temporal_cloud_v0_replication_lag_count[$__rate_interval])) by (temporal_namespace)
```

When a Namespace is using a replica, you may notice that the Action count in `temporal_cloud_v0_total_action_count` is
2x what it was before adding a replica. This happens because Actions are replicated; they occur on both the primary and
the replica.

## Failover audit log

When Temporal triggers failovers, the [audit log](/cloud/audit-logs) will update with details.

Look for `"operation": "FailoverNamespace"` in the logs.
