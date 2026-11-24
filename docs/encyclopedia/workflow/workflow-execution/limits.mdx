---
id: limits
title: Workflow Execution limits
sidebar_label: Limits
description: The Workflow Execution's Event History is limited to 51,200 Events or 50 MB and will warn you after 10,240 Events or 10 MB.
slug: /workflow-execution/limits
tags:
  - Concepts
  - Workflows
---

This page discusses [Workflow Execution limits](#workflow-execution-limits), [Workflow Execution Callback limits](#workflow-execution-callback-limits), and [Nexus Operation limits](#workflow-execution-nexus-operation-limits).

## Limits {/* #workflow-execution-limits */}

There is no limit to the number of concurrent Workflow Executions, albeit you must abide by the Workflow Execution's Event History limit.

:::caution

As a precautionary measure, the Workflow Execution's Event History is limited to [51,200 Events](https://github.com/temporalio/temporal/blob/48dc5a95949ea0e555ce0f48e0031b54633fc703/common/dynamicconfig/constants.go#L441) or [50 MB](https://github.com/temporalio/temporal/blob/48dc5a95949ea0e555ce0f48e0031b54633fc703/common/dynamicconfig/constants.go#L425) and will warn you after 10,240 Events or 10 MB.

:::

There is also a limit to the number of certain types of incomplete operations.

Each in-progress Activity generates a metadata entry in the Workflow Execution's mutable state.
Too many entries in a single Workflow Execution's mutable state causes unstable persistence.
To protect the system, Temporal enforces a maximum number of incomplete Activities, Child Workflows, Signals, or Cancellation requests per Workflow Execution (by default, 2,000 for each type of operation).
Once the limit is reached for a type of operation, if the Workflow Execution attempts to start another operation of that type (by producing a `ScheduleActivityTask`, `StartChildWorkflowExecution`, `SignalExternalWorkflowExecution`, or `RequestCancelExternalWorkflowExecution` Command), it will be unable to (the Workflow Task Execution will fail and get retried).

These limits are set with the following [dynamic configuration keys](https://github.com/temporalio/temporal/blob/main/service/history/configs/config.go):

- `NumPendingActivitiesLimit`
- `NumPendingChildExecutionsLimit`
- `NumPendingSignalsLimit`
- `NumPendingCancelRequestsLimit`

## Workflow Execution Callback limits {/* #workflow-execution-callback-limits */}

There is a limit to the total number of Workflow Callbacks that may be attached to a single Workflow Execution.
Attaching [multiple Nexus callers to a handler Workflow](/nexus/operations#attaching-multiple-nexus-callers) may exceed this limit.

Set this limit with the [MaxCallbacksPerWorkflow](https://github.com/temporalio/temporal/blob/48dc5a95949ea0e555ce0f48e0031b54633fc703/common/dynamicconfig/constants.go#L1082) dynamic configuration key.

## Workflow Execution Nexus Operation Limits {/* #workflow-execution-nexus-operation-limits */}

There is a limit to the maximum number of Nexus Operations in a Workflow before Continue-As-New is required.
Each in-progress Nexus Operation generates a metadata entry in the Workflow Execution's mutable state.
Too many entries in a single Workflow Execution's mutable state causes unstable persistence.
To protect the system, Temporal enforces a maximum number of incomplete Nexus Operation requests per Workflow Execution (by default, 30 Nexus Operations).
Once the limit is reached for a type of operation, if the Workflow Execution attempts to start another Nexus operation (by producing a ScheduleNexusOperation), it will be unable to do so (the Workflow Task Execution will fail and get retried).

These limits are set with the following [dynamic configuration keys](https://github.com/temporalio/temporal/blob/48dc5a95949ea0e555ce0f48e0031b54633fc703/components/nexusoperations/config.go#L36):

- MaxConcurrentOperations
