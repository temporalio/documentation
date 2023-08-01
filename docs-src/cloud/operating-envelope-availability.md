---
id: operating-envelope-availability
title: What is Temporal Cloud's SLA on Availability?
sidebar_label: Availability
description: Temporal Cloud provides 99.9% availability of the cloud service and a 99.9% guarantee against service errors.
tags:
  - temporal cloud
  - operations
  - explanation
---

The Temporal Cloud service level agreement (SLA) promises 99.9% availability of the cloud service and a 99.9% guarantee against service errors.

To calculate the service-error rate, we capture all requests that arrive in a region during a five-minute interval and record the number of gRPC service errors that occurred.
For each region, we calculate the service-error rate as `1 - (count of errors / count of requests)`.
Rates are averaged per month and reset quarterly.

Errors that are recorded against the SLA are service errors, such as the `UNAVAILABLE` [gRPC status code](https://grpc.github.io/grpc/core/md_doc_statuscodes.html).

Errors that aren't counted against the SLA include the following:

- ClientVersionNotSupported
- InvalidArgument
- NamespaceAlreadyExists
- NamespaceInvalidState
- NamespaceNotActive
- NamespaceNotFound
- NotFound
- PermissionDenied
- QueryFailed
- RetryReplication
- ShardOwnershipLost
- StickyWorkerUnavailable
- TaskAlreadyStarted
- Throttling (resources exhausted; triggers retry)
- WorkflowExecutionAlreadyStarted
- WorkflowNotReady

Our internal alerting system is based on our service level objectives (SLO) for all errors, not just errors that count against the SLA.
When we receive an alert that an SLO is not being met, we page our on-call engineers, which often means that issues are resolved before they become noticeable.

Internally, our components are distributed across a minimum of three availability zones per region.

For current system status and information about recent incidents, see [Temporal Status](https://status.temporal.io/).
