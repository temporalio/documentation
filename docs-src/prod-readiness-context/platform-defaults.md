---
id: platform-defaults
title: Temporal Platform Defaults
sidebar_label: Platform Defaults
description: This page details many of the defaults coded into the Temporal Platform that can produce errors and warnings.
tags:
  - error
  - warn
  - limits
---

:::caution

For the latest information on the Temporal Cloud limits, see [Temporal Cloud limits sheet](/cloud/operating-envelope#default-limits).

:::

This page details many of the defaults coded into the Temporal Platform that can produce errors and warnings.
Errors are hard limits that fail when reached.
Warnings are soft limits that produce a warning log on the server side.

:::note

These limits apply specifically to each Workflow Execution and do not pertain to the entire Temporal Platform or individual Namespaces.

:::

- **Identifiers:** By default, the maximum length for identifiers (such as Workflow Id, Workflow Type, and Task Queue name) is 1000 characters.
  - This is configurable with the `limit.maxIDLength` dynamic config variable, set to 255 in [this SQL example](https://github.com/temporalio/docker-compose/blob/93d382ef9133e4cde8ce311de5153cd0cc9fbd0c/dynamicconfig/development-sql.yaml#L1-L2).
  - The character format is UTF-8.
- **gRPC:** gRPC has a limit of 4 MB for [each message received](https://github.com/grpc/grpc/blob/v1.36.2/include/grpc/impl/codegen/grpc_types.h#L466).
- **Event batch size:** The `DefaultTransactionSizeLimit` limit is [4 MB](https://github.com/temporalio/temporal/pull/1363).
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
- **Concurrent limit**
  - We fail the following action Commands on Temporal Cloud if the concurrent pending count exceeds 2,000:
    - `ScheduleActivityTask`
    - `SignalExternalWorkflowExecution`
    - `RequestCancelExternalWorkflowExecution`
    - `StartChildWorkflowExecution`
  - As of v1.21, the open source Temporal Cluster has a default limit of 2,000 pending Activities, Child Workflows, Signals, or Workflow cancellation requests, but you can override the limits in the dynamic configuration using these variables:
    - `limit.numPendingActivities.error`
    - `limit.numPendingSignals.error`
    - `limit.numPendingCancelRequests.error`
    - `limit.numPendingChildExecutions.error`
  - By default, [Batch jobs](/cli/batch) are limited to one job at a time.
- [Custom Search Attributes limits](/visibility/#custom-search-attributes-limits)

For details on dynamic configuration keys, see [Dynamic configuration reference](/references/dynamic-configuration).
