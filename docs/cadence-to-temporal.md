---
id: cadence-to-temporal
title: Cadence to Temporal migration highlights
sidebar_label: Migrate from Cadence
---

This page highlights the key differences between Cadence and Temporal that you will need to account for when migrating.

There is no direct upgrade path from Cadence to Temporal.
The Temporal Server requires a fresh install, and we recommend choosing one of the [latest releases](https://github.com/temporalio/temporal/releases).

The [v0.28 changelog blog post](/blog/temporal-v0.28.0-changelog) details many of the core changes that occurred prior to Temporal's v1.0.0 release.

## Key differences

1. **Cadence uses Thrift/TChannel | Temporal uses [Protobuf](https://developers.google.com/protocol-buffers)/[gRPC](https://grpc.io/)**

When using Temporal, this means the following things:

- Communication over can be encrypted via [TLS](/server/configuration/#tls).
- Custom service errors backed by standard [gRPC error codes](https://pkg.go.dev/google.golang.org/grpc/codes).
- Errors are serialized using the Protobuf type `Failure` and they be chained together and passed across different SDKs in different languages.
- All payloads (Workflow input, Activity input, etc...) sent to Temporal now have headers and data fields.
- Standard [gRPC health service](https://github.com/grpc/grpc/blob/master/doc/health-checking.md) is used for health checks.
- Standard Protobuf types are used for [time](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#timestamp) and [duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration).
- The persistence layer uses Protobuf blobs for much of the data stored in both MySQL and Cassandra. Cadence used Thrift blobs for in MySQL data.

2. **Entities names are different**:

| Cadence         | Temporal       |
| --------------- | -------------- |
| Decision        | Command        |
| DecisionTask    | WorkflowTask   |
| Decider         | Workflow       |
| Domain          | Namespace      |
| NamespaceStatus | NamespaceState |
| TaskList        | TaskQueue      |
| ArchivalStatus  | ArchivalState  |

3. **Workflow timeout are different in Temporal**

- Workflow timeouts are optional.
- Attempt counters start at 1.
- Workflow Executions have 3 timeouts available:
  - `WorkflowRunTimeout`.
  - `WorkflowExecutionTimeout`.
  - `WorkflowTaskTimeout`.

4. **Workflow retries are different in Temporal**

- In Temporal, `WorkflowExecutionTimeout` is used, instead of `ExpirationInterval` (which has been completely removed from Temporal), to stop retries for Workflows.
- Attempt counters start at 1.

5. **Activity retries are different in Temporal**

- Temporal includes default `RetryOptions` for Activities.
  - `initialInterval` = 1 second.
  - `maximumInterval` = 100 \* initialInterval.
  - `backoffCoefficient` = 2.
- To disable Activity retries, configure Activities with `RetryOptions` that set `maximumAttempts` to 1.
- `ScheduleToClose` is used to stop retries for Activities.

6. **[Temporal dependencies](/server/versions-and-dependencies) are different**

- Uber YARPC library is not used by Temporal.
- Temporal no longer needs to use Kafka.
- Temporal uses Prometheus by default in Docker images instead of statsd.

7. **Temporal Server configuration files are different**

- Cadence Server configuration files are largely incompatible with the Temporal Server.
