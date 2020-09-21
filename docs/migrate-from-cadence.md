---
id: migrate-from-cadence
title: How to migrate to Temporal from Cadence
sidebar_label: Migrate from Cadence
---

In 2019 the visionaries behind Cadence, the popular open sourced "workflow as code" platform, left Uber and founded Temporal Technologies Inc. Under the umbrella of the new company they forked Cadence and continued the evolution of the platform and the Temporal brand. To that effect, several major changes were made to Temporal that improved the platform and which now set it apart from Cadence. Since a major goal of the company is to enable global adoption of the Temporal platform, users will be much happier with its flexibility, feature set, and dependencies over that of its Cadence predecessor. This guide is meant to help those existing Cadence users migrate to Temporal and reap the benefits.

## Changes since the fork

For those of you looking for a simple list of technical changes since the fork from Cadence the [v0.28.0 changelog](/blog/temporal-v0.28.0-changelog) is a great place to start. Otherwise, we will do our best to provide context and practical implications in this guide.


### Protobuf/gRCPC replaces Thrift/TChannel

One of the first things Temporal did was covert all Thrift structures to [Protocol Buffers](https://developers.google.com/protocol-buffers) and move to [gRPC](https://grpc.io/) for all interprocess communication. This change affects a number of things that users want to be aware of:

1. Any system that ties into the server [API](https://github.com/temporalio/api) will now deal with Protobuf Buffers and use the `go.temporal.io/api` import path.
2. All communication over the wire can now be encrypted via [TLS](/docs/configure-temporal-server/#tls). Though, it is important to note that as of writing this, support for TLS in `tctl` and `temporal- web` is still in-progress.
3. All Thrift errors have been converted to custom service errors backed by standard [gRPC error codes](https://pkg.go.dev/google.golang.org/grpc/codes) and all errors are serialized using the Protobuf `Failure` type. Additionally errors can now be chained together and passed across different SDKs in different languages.
4. All payloads (Workflow input, Activity input, etc...) sent to Temporal now have headers and data fields.
5. The standard [gRPC health service](https://github.com/grpc/grpc/blob/master/doc/health-checking.md) is used for health checks.
6. Standard Protobuf types are used for [time](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#timestamp) and         [duration](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Duration).

The change to Protobuf and gRPC also means that there is no upgrade path for the server. To use Temporal, you must do a [fresh install](/docs/install-temporal-server).

### SDK refactor

To get started using the Temporal SDKs visit their respective repositories to install them. Then add their import paths to your project:

- [Go SDK](https://github.com/temporalio/go-sdk)
- [Java SDK](https://github.com/temporalio/java-sdk)

The Temporal team decided that several refactors to the SDKs would help to improve the developer experience. So you will need to update your Workflow, Activity, and Worker code to ensure that the changes are propagated throughout your project. Here is what has changed:

1. Object entities were renamed to better represent what they do.
    - `Decision` was renamed to `Command`.
    - `DecisionTask` was renamed to `WorkflowTask`.
    - `Decider` was renamed `Workflow`.
    - `Domain` was renamed to `Namespace`.
    - `NamespaceStatus` was renamed to `NamespaceState`.
    - `TaskList` was renamed to `TaskQueue`.
    - `ArchivalStatus` was renamed to `ArchivalState`.
2. Workflow timeouts are now optional and attempt counters start at 1. Additionally there are now three timeouts available to Workflow executions, two of which have been renamed:
    - `ExecutionStartToCloseTimeout` was renamed to `WorkflowRunTimeout`.
    - `WorkflowExecutionTimeout` is new. It limits the total Workflow execution time including retries and continue-as-new. It also enables you to limit the total time of a cron job. The default is value is 10 years and `WorkflowRunTimeout` defaults to the value this timeout.
     - `DecisionTaskStartToCloseTimeout` was renamed to `WorkflowTaskTimeout`. The default value is 10 seconds.
3. `ExpirationInterval` has been removed from the Workflow `RetryPolicy`. Instead, `WorkflowExecutionTimeout` is used to stop retries for Workflows.
4. Activities now have default `RetryOptions`.
    - `initialInterval` defaults to 1 second.
    - `maximumInterval` defaults to 100 \* initialInterval.
    - `backoffCoefficient` defaults to 2.
    - To disable Activity retries, configure Activities with `RetryOptions` that set `maximumAttempts` to 1.
    - To stop retries use the `ScheduleToClose` timeout option.

### CLI improvements

The Temporal team also added new admin commands to the CLI:

- List namespaces: `./tctl admin namespace list`
- Describe Shard: `./tctl admin shard describe --shard_id ...`
- List Tasks: `./tctl admin shard list_tasks`.
- Describe Task: `./tctl admin shard describe_task --task_type [timer, replication, transfer] ...`
- List Cluster memberships: `./tctl admin membership list_db`
- List Ringpop members: `./tctl admin membership list_gossip`
- List Replication DLQ Tasks: `./tctl admin kafka list_dlq`

### Helm charts

And lastly, migrating to Temporal means you can also [deploy the Temporal server to a Kubernetes Cluster](https://github.com/temporalio/helm-charts).
