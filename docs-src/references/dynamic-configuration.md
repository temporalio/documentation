---
id: dynamic-configuration
title: Dynamic configuration reference
description: Dynamic condifiguration key values can be set to override the default values in a Cluster configuration.
sidebar_label: Dynamic configuration
tags:
  - reference
---

Temporal Cluster provides [dynamic configuration](/concepts/what-is-cluster-configuration#dynamic-configuration) keys that you can update and apply to a running Cluster without restarting your services.

The dynamic configuration keys are set with default values when you create your Cluster configuration.
You can override these values as you test your Cluster setup for optimal performance according to your workload requirements.

For the complete list of dynamic configuration keys, see <https://github.com/temporalio/temporal/blob/master/common/dynamicconfig/constants.go>.
Ensure that you check server releases notes for any changes to these keys and values.

To check the default values set for a dynamic configuration key, check the following links:

- [Frontend Service](https://github.com/temporalio/temporal/blob/5783e781504d8ffac59f9848b830868f3139b980/service/frontend/service.go#L176)
- [History Service](https://github.com/temporalio/temporal/blob/5783e781504d8ffac59f9848b830868f3139b980/service/history/configs/config.go#L309)
- [Matching Service](https://github.com/temporalio/temporal/blob/5783e781504d8ffac59f9848b830868f3139b980/service/matching/config.go#L125)
- [Worker Service](https://github.com/temporalio/temporal/blob/5783e781504d8ffac59f9848b830868f3139b980/service/worker/service.go#L193)

Note that setting dynamic configuration is optional.
Change these values only if you need to override the default values to achieve better performance on your Temporal Cluster.
Also, ensure that you test your changes before setting these in production.

To override the default dynamic configuration values, specify your custom values and constraints for the dynamic configuration keys that you want to change in a YAML configuration file.

- Each dyanmic configuration key can have zero or more values.
- Each value can have zero or more constraints.
- There are only three types of constraints that you can define:
  - `namespace`: `string`
  - `taskQueueName`: `string`
  - `taskType`: `int` (`1`:`Workflow`, `2`:`Activity`) A value is selected and returned if all its has exactly the same constraints as the ones specified in query filters (including the number of constraints).

Use the following format in your dynamic configuration file.

```yaml
testGetBoolPropertyKey:
  - value: false
  - value: true
    constraints:
      namespace: "your-namespace"
  - value: false
    constraints:
      namespace: "your-other-namespace"
testGetDurationPropertyKey:
  - value: "1m"
    constraints:
      namespace: "your-namespace"
      taskQueueName: "longIdleTimeTaskqueue"
testGetFloat64PropertyKey:
  - value: 12.0
    constraints:
      namespace: "your-namespace"
testGetMapPropertyKey:
  - value:
      key1: 1
      key2: "value 2"
      key3:
        - false
        - key4: true
          key5: 2.0
```

For example to override the default maximum queries per second made to the Persistence database from the Frontend Service, add the following to your dynamic configuration file.

```yaml
#...
frontend.persistenceMaxQPS:
  - value: 3000 # The default value for this key on the Frontend Service is 2000.
    constraints: {}
#...
```

You can also set the maximum queries that can be made from a Namespace on the Frontend with the `frontend.PersistenceNamespaceMaxQPS` key.

```yaml
#...
frontend.PersistenceNamespaceMaxQPS:
  - value: 3500 # The default value for this key on the Frontend Service is 2000.
    constraints:
      namespace: "your-namespace"
#...
```

For examples on how dynamic configuration is set, see:

- [docker-compose](https://github.com/temporalio/docker-compose/tree/main/dynamicconfig)
- [samples-server](https://github.com/temporalio/samples-server/blob/main/tls/config/dynamicconfig/development.yaml)

## Commonly used dynamic configuration keys

The following table lists commonly used dynamic configuration keys that can be used for rate limiting requests to the Temporal Cluster.

Note that the dynamic configuration key setting is optional. If you choose to update these values for your Temporal Cluster, ensure that you are provisioning enough resources to handle the loads.

### Service-level RPS limits

The Rate Per Second (RPS) dynamic configuration keys set the rate at which requests can be made to each service in your Cluster.

When scaling your services, tune the RPS to test your workload and set acceptable provisioning benchmarks. Exceeding these limits will result in `ResourceExhaustedError`.

| Dynamic configuration key              | Type | Description                                                                                                                                                                                                                      | Default value |
| -------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Frontend                               |      |                                                                                                                                                                                                                                  |               |
| `frontend.rps`                         | Int  | Rate limit per second. This value applies to each Frontend service host.                                                                                                                                                         | 2400          |
| `frontend.namespaceRPS`                | Int  | Rate limit per second applied at each Namespace level.                                                                                                                                                                           | 2400          |
| `frontend.globalNamespaceRPS`          | Int  | Namespace rate limit per second applied globally on the entire cluster. The limit is evenly distributed among available Frontend service instances. If this is set, it overrides the per-instance limit (frontend.namespaceRPS). | 0             |
| `internal-frontend.globalNamespaceRPS` | Int  | Namespace rate limit per second across all internal-frontends.                                                                                                                                                                   | 0             |
| History                                |      |                                                                                                                                                                                                                                  |               |
| `history.rps`                          | Int  | Request rate per second for each history host.                                                                                                                                                                                   | 3000          |
| `history.archiveRequestRPS`            | Int  | Rate limit on the number of archive request per second.                                                                                                                                                                          | 300           |
| Matching                               |      |                                                                                                                                                                                                                                  |               |
| `matching.rps`                         | Int  | Request rate per second for each matching host                                                                                                                                                                                   | 1200          |

### QPS limits for Persistence database

The Queries Per Second (QPS) dynamic configuration keys set the maximum number of queries a service can make per second to the Persistence store.

Persistence rate limits are evaluated synchronously. Adjust these keys according to your database capacity and workload.
If the number of queries made to the Persistence database is more than what the dynamic configuration value set, you will see latencies and timeouts on your tasks.

| Dynamic configuration key                 | Type | Description                                                                                                                                                                                                                      | Default value           |
| ----------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Frontend                                  |      |                                                                                                                                                                                                                                  |                         |
| `frontend.persistenceMaxQPS`              | Int  | Maximum queries per second that the Frontend service host can query the Persistence store database.                                                                                                                              | 2000 queries per second |
| `frontend.persistenceNamespaceMaxQPS`     | Int  | Maximum queries per second that each Namespace on Frontend service host can query the Persistence store database. <br /> If the value set for this config is less or equal to 0, the value set for  PersistenceMaxQS will apply. | 0                       |
| History                                   |      |                                                                                                                                                                                                                                  |                         |
| `history.persistenceMaxQPS`               | Int  | Maximum queries per second that the History host can query the Persistence store database.                                                                                                                                       | 9000                    |
| `history.persistenceNamespaceMaxQPS`      | Int  | Maximum queries per second that each Namespace on History host can query the Persistence store database. <br /> If the value set for this config is less or equal to 0, the value set for  PersistenceMaxQS will apply.          | 0                       |
| Matching                                  |      |                                                                                                                                                                                                                                  |                         |
| `matching.persistenceMaxQPS`              | Int  | Maximum queries per second that the Matching service host can query the Persistence store database.                                                                                                                              | 9000                    |
| `matching.persistenceNamespaceMaxQPS`     | Int  | Maximum queries per second that the Matching host can query the Persistence store database for each Namespace. <br /> If the value set for this config is less or equal to 0, the value set for  PersistenceMaxQS will apply.    | 0                       |
| Worker                                    |      |                                                                                                                                                                                                                                  |                         |
| `worker.persistenceMaxQPS`                | Int  | Maximum queries per second that the Worker service host can query the Persistence store database.                                                                                                                                | 100                     |
| `worker.persistenceNamespaceMaxQPS`       | Int  | Maximum queries per second that the Worker host can query the Persistence store database for each Namespace. <br /> If the value set for this config is less or equal to 0, the value set for  PersistenceMaxQS will apply.      | 0                       |
| Visibility                                |      |                                                                                                                                                                                                                                  |                         |
| `system.visibilityPersistenceMaxReadQPS`  | Int  | Maximum queries per second that Visibility database be queried for read operations.                                                                                                                                              | 9000                    |
| `system.visibilityPersistenceMaxWriteQPS` | Int  | Maximum queries per second that Visibility database be queried for write operations.                                                                                                                                             | 9000                    |

#### Activity and Workflow default policy setting

You can define default values for Activity and Workflow [Retry Policies](/concepts/what-is-a-retry-policy) at the Cluster level with the following dyanmic configuration keys.
Th, the default values will apply. Also, setting custom retry polici

| Dynamic configuration key            | Type                          | Description                                                                                                                   | Default value                                                                      |
| ------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `history.defaultActivityRetryPolicy` | Map (key-value pair elements) | Out-of-the-box server configuration for an activity retry policy when it is not explicitly set for the Activity in your code. | [Default values for retry Policy](/retry-policies#default-values-for-retry-policy) |
| `history.defaultWorkflowRetryPolicy` | Map (key-value pair elements) | Out-of-box Retry Policy for unset fields where the user has set an explicit `RetryPolicy`, but not specified all the fields   | [Default values for retry Policy](/retry-policies#default-values-for-retry-policy) |

### Size limit settings

The Persistence database in the Cluster has default size limits set for optimal performance. The dynamic configuration keys relating to some of these are listed below.

The default values on these keys have been set based on extensive testing. While these values can be changed, ensure that you are provisioning enough database resources to handle the changed values.

| Dynamic configuration key               | Type | Description                                                                                                                                                                                                                                | Default value             |
| --------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `limit.maxIDLength`                     | Int  | Length limit for various IDs, including: `Namespace`, `TaskQueue`, `WorkflowID`, `ActivityID`, `TimerID`, `WorkflowType`, `ActivityType`, `SignalName`, `MarkerName`, `ErrorReason`/`FailureReason`/`CancelCause`, `Identity`, `RequestID` | 1000                      |
| `system.transactionSizeLimit`           | Int  | Largest allowed transaction size to the Persistence database.                                                                                                                                                                              | 4 MB (`4 * 1024 * 1024`)  |
| `limit.blobSize.warn`                   | Int  | Limit, in MBs, for BLOBs size in an event when a warning is thrown in the server logs.                                                                                                                                                     | 512 KB (`512 * 1024`)     |
| `limit.blobSize.error`                  | Int  | Limit, in MBs, for BLOBs size in an event when an error occurs in the transaction.                                                                                                                                                         | 2 MB (`2 * 1024 * 1024`)  |
| `limit.historySize.warn`                | Int  | Limit, in MBs, at which a warning is thrown for the Workflow Execution Event History size.                                                                                                                                                 | 10 MB (`50*1024*1024`)    |
| `limit.historySize.error`               | Int  | Limit, in MBs, at which an error occurs in the Workflow Execution for exceeding allowed size.                                                                                                                                              | 50 MB (`50*1024*1024`)    |
| `limit.historyCount.warn`               | Int  | Limit, in count, at which a warning is thrown for the Workflow Execution Event History size.                                                                                                                                               | 10,240 events (`10*1024`) |
| `limit.historyCount.error`              | Int  | Limit, in count, at which an error occurs in the Workflow Execution for exceeding allowed number of Events.                                                                                                                                | 51200 events (`50*1024`)  |
| `limit.numPendingActivities.error`      | Int  | Maximum number of pending Activities that a Workflow Execution can have before the `ScheduleActivityTask` fails with an error.                                                                                                             | 50000                     |
| `limit.numPendingSignals.error`         | Int  | Maximum number of pending Signals that a Workflow Execution can have before the `SignalExternalWorkflowExecution` commands from this Workflow fail with an error.                                                                          | 50000                     |
| `limit.numPendingCancelRequests.error`  | Int  | Maximum number of pending requests to cancel other Workflows that a Workflow Execution can have before the `RequestCancelExternalWorkflowExecution` commands fail with an error.                                                           | 50000                     |
| `limit.numPendingChildExecutions.error` | Int  | Maximum number of pending Child Workflows that a Workflow Execution can have before the `StartChildWorkflowExecution` commands fail with an error.                                                                                         | 50000                     |
