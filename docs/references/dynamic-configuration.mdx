---
id: dynamic-configuration
title: Temporal Service dynamic configuration reference
sidebar_label: Dynamic configuration
description: Dynamic configuration keys for a self-hosted Temporal Service, with file format, Namespace and Task Queue constraints, and default rate and size limits.
toc_max_heading_level: 4
tags:
  - Reference
---

:::info

The information on this page is relevant to open source [Temporal Service deployments](/temporal-service).

For settings that require a restart, see the [Temporal Service configuration reference](/references/service-configuration).

:::

[Dynamic configuration](/temporal-service/configuration#dynamic-configuration) keys change the behavior of a running Temporal Service without a restart.
Every key has a default value.
You override a default by setting the key in a dynamic configuration YAML file.
The Temporal Service checks the file for changes at the `pollInterval` set in the [`dynamicConfigClient`](/references/service-configuration#dynamicconfigclient) section of its static configuration.

Keys and their defaults are defined in [constants.go](https://github.com/temporalio/temporal/blob/main/common/dynamicconfig/constants.go) in the Temporal Server repository.
Some keys are defined next to the component they configure, such as the Nexus keys under `components/` and `chasm/lib/`.
Keys can be added, renamed, or removed between releases, so check the [Temporal Server release notes](https://github.com/temporalio/temporal/releases) before you upgrade.

Setting dynamic configuration is optional.
Override a default only when your workload needs it, and test the change before you apply it in production.

## Format

A dynamic configuration file maps each key to a list of values.
Each value can have `constraints` that limit where it applies.
A value without constraints applies across the Temporal Service.

```yaml
testGetBoolPropertyKey:
  - value: false
  - value: true
    constraints:
      namespace: 'your-namespace'
  - value: false
    constraints:
      namespace: 'your-other-namespace'
testGetDurationPropertyKey:
  - value: '1m'
    constraints:
      namespace: 'your-namespace'
      taskQueueName: 'longIdleTimeTaskqueue'
testGetFloat64PropertyKey:
  - value: 12.0
    constraints:
      namespace: 'your-namespace'
testGetMapPropertyKey:
  - value:
      key1: 1
      key2: 'value 2'
      key3:
        - false
        - key4: true
          key5: 2.0
```

For a complete file, see the [dynamic configuration sample](https://github.com/temporalio/samples-server/blob/main/tls/config/dynamicconfig/development.yaml) in the `samples-server` repository.

### Constraints

Each key supports a fixed set of constraints, depending on the level it can be set at.
Most keys in this reference are global, per Namespace, or per Task Queue.

When more than one value matches a request, the Temporal Service uses the value with the most specific matching constraints.
The order of the values in the file doesn't affect which one applies.

#### Global values

To set one value for the whole Temporal Service, leave out `constraints`:

```yaml
frontend.globalNamespaceRPS: # Per-Namespace RPC rate limit, applied across the Temporal Service.
  - value: 5000
```

#### Namespace values

For keys that support Namespace constraints, set a value for each Namespace with `namespace`.
A value with empty constraints (`{}`) applies to every other Namespace.

```yaml
frontend.persistenceNamespaceMaxQPS: # Per-Namespace limit on queries the Frontend Service sends to the Persistence store.
  - constraints: {} # Applies to all other Namespaces. The default is 0.
    value: 2000
  - constraints: { namespace: 'namespace1' }
    value: 4000
  - constraints: { namespace: 'namespace2' }
    value: 1000
```

#### Task Queue values

For keys that support Task Queue constraints, set `taskQueueName` and, optionally, `taskType` in addition to `namespace`.
Supported `taskType` values are `Workflow` and `Activity`.
Without `taskType`, the value applies to every Task type on the Task Queue.

For example, to handle a high rate of Workflow and Activity Tasks on a Task Queue, increase its number of partitions.
The default is 4.
Set the read and write partition keys to the same values.

```yaml
matching.numTaskqueueReadPartitions:
  - constraints: { namespace: 'namespace1', taskQueueName: 'tq' } # Applies to the "tq" Task Queue for all Task types.
    value: 8
  - constraints: { namespace: 'namespace1', taskQueueName: 'other-tq', taskType: 'Activity' } # Applies to Activity Tasks on "other-tq" only.
    value: 20
  - constraints: { namespace: 'namespace2' } # Applies to all Task Queues in "namespace2".
    value: 10
  - constraints: {} # Applies to all other Task Queues in all Namespaces.
    value: 16
matching.numTaskqueueWritePartitions:
  - constraints: { namespace: 'namespace1', taskQueueName: 'tq' }
    value: 8
  - constraints: { namespace: 'namespace1', taskQueueName: 'other-tq', taskType: 'Activity' }
    value: 20
  - constraints: { namespace: 'namespace2' }
    value: 10
  - constraints: {}
    value: 16
```

## Commonly used dynamic configuration keys

The following sections list the keys most often changed to tune rate limits, size limits, and defaults.
Default values are from Temporal Server v1.32.0.

If you raise a limit, provision enough compute and database capacity to handle the extra load.

### Service-level RPS limits

The requests per second (RPS) keys limit the rate at which each service accepts requests.
Requests over a limit fail with a `ResourceExhausted` error.

Tune these limits while you load test your workload, and use the results to set provisioning benchmarks.

| Dynamic configuration key              | Type | Description                                                                                                                                                                                                                                                        | Default value |
| -------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Frontend                               |      |                                                                                                                                                                                                                                                                    |               |
| `frontend.rps`                         | Int  | Requests per second accepted by each Frontend Service host.                                                                                                                                                                                                        | 2400          |
| `frontend.namespaceRPS`                | Int  | Requests per second accepted for each Namespace by each Frontend Service host.                                                                                                                                                                                     | 2400          |
| `frontend.namespaceCount`              | Int  | Concurrent long-running requests, such as long polls and Queries, allowed for each Namespace on each Frontend Service host. The limit applies to each API method separately. Despite its name, this key doesn't limit the number of Namespaces. Setting it to `0` fails all long-running requests. | 1200          |
| `frontend.globalNamespaceRPS`          | Int  | Requests per second accepted for each Namespace across the Temporal Service. The limit is divided evenly among Frontend Service hosts. When set, it overrides `frontend.namespaceRPS`.                                                                             | 0             |
| `internal-frontend.globalNamespaceRPS` | Int  | Requests per second accepted for each Namespace across all Internal Frontend Service hosts.                                                                                                                                                                       | 0             |
| History                                |      |                                                                                                                                                                                                                                                                    |               |
| `history.rps`                          | Int  | Requests per second accepted by each History Service host.                                                                                                                                                                                                         | 3000          |
| Matching                               |      |                                                                                                                                                                                                                                                                    |               |
| `matching.rps`                         | Int  | Requests per second accepted by each Matching Service host.                                                                                                                                                                                                        | 1200          |
| `matching.numTaskqueueReadPartitions`  | Int  | Number of read partitions for a Task Queue. Set it with `matching.numTaskqueueWritePartitions`.                                                                                                                                                                   | 4             |
| `matching.numTaskqueueWritePartitions` | Int  | Number of write partitions for a Task Queue. Set it with `matching.numTaskqueueReadPartitions`.                                                                                                                                                                   | 4             |

### QPS limits for Persistence store

The queries per second (QPS) keys limit how many queries each service sends to the Persistence store.

The Temporal Service applies these limits synchronously.
When a service reaches its limit, Task processing slows down and requests can time out.
Set these limits based on your database capacity and workload.

| Dynamic configuration key                 | Type | Description                                                                                                                                                       | Default value |
| ----------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Frontend                                  |      |                                                                                                                                                                   |               |
| `frontend.persistenceMaxQPS`              | Int  | Queries per second each Frontend Service host can send to the Persistence store.                                                                                  | 2000          |
| `frontend.persistenceNamespaceMaxQPS`     | Int  | Queries per second each Frontend Service host can send to the Persistence store for each Namespace. When `0` or less, `frontend.persistenceMaxQPS` applies.        | 0             |
| History                                   |      |                                                                                                                                                                   |               |
| `history.persistenceMaxQPS`               | Int  | Queries per second each History Service host can send to the Persistence store.                                                                                   | 9000          |
| `history.persistenceNamespaceMaxQPS`      | Int  | Queries per second each History Service host can send to the Persistence store for each Namespace. When `0` or less, `history.persistenceMaxQPS` applies.          | 0             |
| Matching                                  |      |                                                                                                                                                                   |               |
| `matching.persistenceMaxQPS`              | Int  | Queries per second each Matching Service host can send to the Persistence store.                                                                                  | 3000          |
| `matching.persistenceNamespaceMaxQPS`     | Int  | Queries per second each Matching Service host can send to the Persistence store for each Namespace. When `0` or less, `matching.persistenceMaxQPS` applies.        | 0             |
| Worker                                    |      |                                                                                                                                                                   |               |
| `worker.persistenceMaxQPS`                | Int  | Queries per second each Worker Service host can send to the Persistence store.                                                                                    | 500           |
| `worker.persistenceNamespaceMaxQPS`       | Int  | Queries per second each Worker Service host can send to the Persistence store for each Namespace. When `0` or less, `worker.persistenceMaxQPS` applies.            | 0             |
| Visibility                                |      |                                                                                                                                                                   |               |
| `system.visibilityPersistenceMaxReadQPS`  | Int  | Read queries per second each host can send to the Visibility store.                                                                                               | 9000          |
| `system.visibilityPersistenceMaxWriteQPS` | Int  | Write queries per second each host can send to the Visibility store.                                                                                              | 9000          |

### Activity and Workflow default policy setting

These keys set Service-level defaults for Activity and Workflow [Retry Policies](/encyclopedia/retry-policies).

| Dynamic configuration key            | Type | Description                                                                                                                                                         | Default value                                                                                   |
| ------------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `history.defaultActivityRetryPolicy` | Map  | Retry Policy for Activities. Applies when the Activity has no Retry Policy, and fills in any field left unset in an explicit Retry Policy.                           | [Default values for Retry Policy](/encyclopedia/retry-policies#default-values-for-retry-policy) |
| `history.defaultWorkflowRetryPolicy` | Map  | Values for fields left unset in an explicit Workflow Retry Policy. Workflows without a Retry Policy don't retry.                                                     | [Default values for Retry Policy](/encyclopedia/retry-policies#default-values-for-retry-policy) |

### Size limit settings

These keys set size and count limits that protect the Persistence store.
If you raise them, provision enough database capacity for the larger values.

For all platform limits, see [Temporal Platform limits](/self-hosted-guide/defaults).

| Dynamic configuration key               | Type | Description                                                                                                                                                                                                                           | Default value            |
| --------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `limit.maxIDLength`                     | Int  | Maximum length of identifiers and names, including Namespace, Task Queue, Workflow ID, Activity ID, Timer ID, Workflow Type, Activity Type, Signal name, Marker name, failure reason, Identity, and Request ID.                        | 1000                     |
| `limit.blobSize.warn`                   | Int  | Payload size, in bytes, in a single Event at which the Temporal Service logs a warning.                                                                                                                                              | 512 KB (512 × 1024)      |
| `limit.blobSize.error`                  | Int  | Maximum payload size, in bytes, in a single Event. Requests over the limit fail.                                                                                                                                                     | 2 MB (2 × 1024 × 1024)   |
| `limit.historySize.warn`                | Int  | Event History size, in bytes, at which the Temporal Service logs a warning.                                                                                                                                                         | 10 MB (10 × 1024 × 1024) |
| `limit.historySize.error`               | Int  | Maximum Event History size, in bytes. The Temporal Service terminates a Workflow Execution that exceeds it.                                                                                                                         | 50 MB (50 × 1024 × 1024) |
| `limit.historyCount.warn`               | Int  | Number of Events in an Event History at which the Temporal Service logs a warning.                                                                                                                                                  | 10,240 Events            |
| `limit.historyCount.error`              | Int  | Maximum number of Events in an Event History. The Temporal Service terminates a Workflow Execution that exceeds it.                                                                                                                 | 51,200 Events            |
| `limit.numPendingActivities.error`      | Int  | Maximum number of pending Activities a Workflow Execution can have. Further `ScheduleActivityTask` Commands fail.                                                                                                                   | 2000                     |
| `limit.numPendingSignals.error`         | Int  | Maximum number of pending Signals a Workflow Execution can send to other Workflow Executions. Further `SignalExternalWorkflowExecution` Commands fail.                                                                              | 2000                     |
| `history.maximumSignalsPerExecution`    | Int  | Maximum number of Signals a Workflow Execution can receive. Further Signals fail with an `InvalidArgument` error.                                                                                                                   | 10000                    |
| `limit.numPendingCancelRequests.error`  | Int  | Maximum number of pending requests a Workflow Execution can have to cancel other Workflow Executions. Further `RequestCancelExternalWorkflowExecution` Commands fail.                                                               | 2000                     |
| `limit.numPendingChildExecutions.error` | Int  | Maximum number of pending Child Workflows a Workflow Execution can have. Further `StartChildWorkflowExecution` Commands fail.                                                                                                       | 2000                     |
| `frontend.visibilityMaxPageSize`        | Int  | Maximum number of Workflow Executions that `ListWorkflowExecutions` returns in one page.                                                                                                                                            | 1000                     |

For how these limits apply to Commands, see the [Commands reference](/references/commands).

### Secondary visibility settings

These keys control [Dual Visibility](/dual-visibility), which writes Visibility data to a secondary store.
Use Dual Visibility to migrate to a new Visibility store or to keep a backup store.
You can set both keys per Namespace.

| Dynamic configuration key                  | Type    | Description                                                                                                                                                                                                                                                                       | Default value |
| ------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `system.enableReadFromSecondaryVisibility` | Boolean | Reads Visibility data from the secondary Visibility store.                                                                                                                                                                                                                       | `false`       |
| `system.secondaryVisibilityWritingMode`    | String  | Which Visibility stores receive writes. Allowed values:<br />`off`: Primary Visibility store only.<br />`on`: Secondary Visibility store only. The primary store stops receiving writes.<br />`dual`: Both primary and secondary Visibility stores.                          | `off`         |

### Server version check settings

The Temporal Service periodically reports its version and the versions of connected SDKs to check for newer releases.
The Temporal Web UI uses the result to show a banner when a new version is available.

To turn off the check, set this key to `false`, or set the `TEMPORAL_VERSION_CHECK_DISABLED` environment variable to any value, such as `1`.

| Dynamic configuration key           | Type    | Description                                     | Default value                                                     |
| ----------------------------------- | ------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| `frontend.enableServerVersionCheck` | Boolean | Turns the periodic server version check on or off. | `true`, or `false` when `TEMPORAL_VERSION_CHECK_DISABLED` is set |

### Nexus settings

These keys configure [Temporal Nexus](/nexus) on a self-hosted Temporal Service.
Several were added, renamed, or removed in recent releases, so check the version notes in each row.

Temporal Server v1.31.0 and later sends callbacks for Worker targets to the system callback URL, `temporal://system`, and needs no callback configuration.
Set `component.nexusoperations.callback.endpoint.template` and the allowed callback addresses only on earlier versions, or to use the experimental external endpoint target feature.

For how the Nexus components work, see the [Nexus architecture document](https://github.com/temporalio/temporal/blob/main/docs/architecture/nexus.md) in the Temporal Server repository.

| Dynamic configuration key                              | Type    | Description                                                                                                                                                                                                                         | Default value                          |
| ------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `component.nexusoperations.callback.endpoint.template` | String  | Go template for the callback URL the Temporal Service includes in Nexus Operation requests. The template can use `{{.NamespaceName}}` and `{{.NamespaceID}}`.                                                                       | `unset`                                |
| `callback.allowedAddresses`                            | List    | Callback URL patterns the Temporal Service accepts, set per Namespace. Each entry has a `Pattern` (`host:port`, supports `*` wildcards) and an optional `AllowInsecure` Boolean that permits HTTP. `temporal://system` is always allowed. v1.32.0 and later. | No rules                               |
| `component.callbacks.allowedAddresses`                 | List    | Name of `callback.allowedAddresses` before v1.32.0.                                                                                                                                                                                 | No rules                               |
| `component.nexusoperations.useSystemCallbackURL`       | Boolean | Sends callbacks for Worker targets to `temporal://system` instead of a URL built from the callback template. v1.30.x and v1.31.x only. Removed in v1.32.0.                                                                         | `true` on v1.31.x, `false` on v1.30.x |
| `system.enableNexus`                                   | Boolean | Turns Nexus on or off. Changes require a restart. Removed in v1.31.0, where Nexus is always on.                                                                                                                                   | `true` (v1.27.0 to v1.30.x)            |
