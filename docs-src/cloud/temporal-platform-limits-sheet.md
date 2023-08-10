---
slug: temporal-platform-limits-sheet
title: What are the Temporal Platform limits?
sidebar_label: Upgrade policy
description: Basic upgrade policy for customers of Temporal Cloud
tags:
  - error
  - warn
  - limits
---

:::note

These limits apply to the [Temporal Platform](/temporal).

For Temporal Cloud users, some limits can be increased by [submitting a support ticket](/cloud/support).

Such limits include dynamic configuration variables, such as `limit.maxIDLength` and `limit.maxWorkflowExecutionTimeout`.

:::

Running into limits can cause unexpected failures.
Knowing the limits of Temporal can prevent that.

This page details many of the errors and warnings coded into the Temporal Platform.
Errors are hard limits that fail when reached.

<!-- Warnings are soft limits that produce a warning log on the server side.

Warnings go to server logs so users can't see them.

Ideally there should be a way to export them as metrics or something, but there is nothing right now. -->

<!-- truncate -->

:::caution

These limits apply specifically to each Workflow Execution and do not pertain to the entire Temporal Platform or individual Namespaces.

:::

- **Identifiers**: By default, the maximum length for identifiers (such as Workflow Id, Workflow Type, and Task Queue name) is 1000 characters.
  - This is configurable with the `limit.maxIDLength` dynamic config variable, set to 255 in [this SQL example](https://github.com/temporalio/docker-compose/blob/93d382ef9133e4cde8ce311de5153cd0cc9fbd0c/dynamicconfig/development-sql.yaml#L1-L2).
  - The character format is UTF-8.
- **gRPC**: gRPC has a limit of 4 MB for [each message received](https://github.com/grpc/grpc/blob/v1.36.2/include/grpc/impl/codegen/grpc_types.h#L466).
- **Event batch size**: The `DefaultTransactionSizeLimit` limit is [4 MB](https://github.com/temporalio/temporal/pull/1363).
  This is the largest transaction size allowed for the persistence of Event Histories.
- **Blob size limit** for Payloads (including Workflow context and each Workflow and Activity argument and return value; _[source](https://github.com/temporalio/temporal/blob/v1.7.0/service/frontend/service.go#L133-L134)_):
  - Temporal warns at 256 KB: [Blob size exceeds limit.](https://github.com/temporalio/temporal/blob/fee1c43823699e90b330680a8efeb9d8dbee8cf3/common/util.go#L568)
  - Temporal errors at 2 MB: `ErrBlobSizeExceedsLimit: Blob data size exceeds limit.`
  - This is configurable with [BlobSizeLimitError and BlobSizeLimitWarn](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L378-L379), if you know what you are doing.
- **History total size limit** (leading to a terminated Workflow Execution):
  - Temporal warns at 10 MB: `history size exceeds warn limit`.
  - Temporal errors at 50 MB: [history size exceeds error limit](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/workflowExecutionContext.go#L1204).
  - This is configurable with [HistorySizeLimitError and HistorySizeLimitWarn](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L380-L381), if you know what you are doing.
- **History total count limit** (leading to a terminated Workflow Execution):
  - Temporal warns after 10,240 Events: `history size exceeds warn limit`.
  - Temporal errors after 51,200 Events: [history size exceeds error limit](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/workflowExecutionContext.go#L1204).
  - This is configurable with [HistoryCountLimitError and HistoryCountLimitWarn](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L382-L383), if you know what you are doing.
- **Concurrent Action limit**
  - We fail the following action Commands on Temporal Cloud if the concurrent running count exceeds 2,000:
    - `ScheduleActivityTask`
    - `SignalExternalWorkflowExecution`
    - `RequestCancelExternalWorkflowExecution`
    - `StartChildWorkflowExecution`
  - As of v1.21, the open source Temporal Cluster has a default limit of 2,000 pending Activities, Child Workflows, Signals, or Workflow cancellation requests, but you can override the limits in the dynamic configuration using these variables:
    - `limit.numPendingActivities.error`
    - `limit.numPendingSignals.error`
    - `limit.numPendingCancelRequests.error`
    - `limit.numPendingChildExecutions.error`
- [Custom Search Attributes limits](/visibility/#custom-search-attributes-limits)

For details on dynamic configuration keys, see [Dynamic configuration reference](/references/dynamic-configuration).

## What are the default limits for Temporal Cloud?

The Temporal Cloud service sets default limits for the following aspects:

- **Account level**
  - Users: 100
  - Namespaces: 10
  - Prometheus endpoint Retention Period: 1 month
- **Namespace level**
  - Actions per second: 200 (with spikes to 400)
  - Certificates: 32-KB payload or 16 certificates, whichever is smaller
  - Concurrent Task pollers: 2,000 (configurable; maximum of 100,000)
  - Custom Search Attributes (maximum per type)
    - bool: 20
    - double: 20
    - datetime: 20
    - int: 20
    - keyword: 20
    - text: 5
  - Retention Period: 30 days (configurable; range of 1—90 days)
  - Number of Signals received per Workflow Execution: 10,000
- **List Filters**
  - The **ORDER BY** operator isn't supported in List Filters in Temporal Cloud.
    This means that you can't apply custom ordering of Workflows with Cloud Visibility features.
    Lists of Workflows are still ordered by a default ordering rule.
    Be aware that this rule might change.

Some of the Temporal Cloud limits mentioned above can be increased by [submitting a support ticket](/cloud/support#support-ticket).
The default values are intended to guard against unintentional resource usage.
