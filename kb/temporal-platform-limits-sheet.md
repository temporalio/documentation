---
slug: temporal-platform-limits-sheet
title: Temporal Platform limits sheet
tags:
  - error
  - warn
  - limits
date: 2022-06-07T00:00:00Z
---

Running into limits can cause unexpected failures.
Knowing Temporal's limits can prevent that.

This page details many of the hard and soft limits that are coded into the Temporal Platform.
Hard limits will fail with an error; soft limits will produce a warning log on the server side.

<!-- truncate -->

- **gRPC**: gRPC has a limit of 4 MB for [each message received](https://github.com/grpc/grpc/blob/v1.36.2/include/grpc/impl/codegen/grpc_types.h#L466).
- **Event batch size**: The `DefaultTransactionSizeLimit` limit is [4 MB](https://github.com/temporalio/temporal/pull/1363).
  This is the largest transaction size we allow for Event Histories to be persisted.
- **Blob size limit** for incoming payloads and results (including Workflow context; _[source](https://github.com/temporalio/temporal/blob/v1.7.0/service/frontend/service.go#L133-L134)_):
  - We warn at 512 KB: [`Blob size exceeds limit.`](https://github.com/temporalio/temporal/blob/fee1c43823699e90b330680a8efeb9d8dbee8cf3/common/util.go#L568)
  - We error at 2 MB: `ErrBlobSizeExceedsLimit: Blob data size exceeds limit.`
  - This is configurable with [`BlobSizeLimitError` and `BlobSizeLimitWarn`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L378-L379), if you know what you are doing.
- **History total size limit** (leading to a terminated Workflow Execution):
  - We warn at 10 MB: `history size exceeds warn limit.`
  - We error at 50 MB: [`history size exceeds error limit.`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/workflowExecutionContext.go#L1204)
  - This is configurable with [`HistorySizeLimitError` and `HistorySizeLimitWarn`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L380-L381), if you know what you are doing.
- **History total count limit** (leading to a terminated Workflow Execution):
  - We warn at 10,000 Events: `history size exceeds warn limit.`
  - We error at 50,000 Events: [`history size exceeds error limit.`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/workflowExecutionContext.go#L1204)
  - This is configurable with [`HistoryCountLimitError` and `HistoryCountLimitWarn`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L382-L383), if you know what you are doing.
- **Concurrent Action limit**
  - We fail the following action Commands on Cloud if the concurrent running count exceeds 2,000:
    - `ScheduleActivityTask`
    - `SignalExternalWorkflowExecution`
    - `RequestCancelExternalWorkflowExecution`
    - `StartChildWorkflowExecution`
      OSS does not have a default limit, but you can use dynamic configuration can set a limit.
- [Search Attributes maximums](/visibility/#search-attributes-maximums)
