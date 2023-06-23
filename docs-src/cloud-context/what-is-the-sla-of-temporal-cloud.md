---
id: what-is-the-sla-of-temporal-cloud
title: What is the SLA of Temporal Cloud?
sidebar_label: SLA
description: Temporal Cloud SLA
tags:
  - guide-context
---

Temporal Cloud provides 99.99% availability and 99.9% guarantee against service errors.

Our 99.9% guarantee against service errors is measured by capturing all requests coming in during a 5-minute interval and calculating how many errors occurred during that interval. It is then averaged per month and reset on a quarterly basis. It is calculated on a per-region basis as: `1 - (count of errors received / count of requests in the region)`.

Errors recorded against the 99.9% guarantee are service failures: for example, the `Unavailable` [gRPC status code](https://grpc.github.io/grpc/core/md_doc_statuscodes.html).

Errors not counted against the SLA include:

- `ClientVersionNotSupported`
- `ShardOwnershipLost`
- `InvalidArgument`
- `NamespaceAlreadyExists`
- `NamespaceNotActive`
- `NamespaceNotFound`
- `NamespaceInvalidState`
- `NotFound`
- `PermissionDenied`
- `QueryFailed`
- `RetryReplication`
- `StickyWorkerUnavailable`
- `TaskAlreadyStarted`
- `Throttling` (resources exhausted - triggers retry)
- `WorkflowExecutionAlreadyStarted`
- `WorkflowNotReady`

Our internal alerting is based on our own SLO for all errors, not just errors counting against the SLA. On-call engineers are paged when we receive alerts because of SLOs not being met, which often means that issues are resolved before they become noticeable.

Internally, our components are distributed across a minimum of 3 availability zones per region.

Recent incidents can be found at [status.temporal.io](https://status.temporal.io/).
