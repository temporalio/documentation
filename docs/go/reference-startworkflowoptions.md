---
id: startworkflowoptions-reference
title: Go StartWorkflowOptions reference
sidebar_label: Workflow Options reference
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - developer-guide
  - options
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, and pass the instance to the `ExecuteWorkflow` call.

The following fields are available:

| Field                                                                                   | Required | Type                                                                                            |
| --------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| [`ID`](#id)                                                                             | No       | `string`                                                                                        |
| [`TaskQueue`](#taskqueue)                                                               | **Yes**  | `string`                                                                                        |
| [`WorkflowExecutionTimeout`](#workflowexecutiontimeout)                                 | No       | `time.Duration`                                                                                 |
| [`WorkflowRunTimeout`](#workflowruntimeout)                                             | No       | `time.Duration`                                                                                 |
| [`WorkflowTaskTimeout`](#workflowtasktimeout)                                           | No       | `time.Duration`                                                                                 |
| [`WorkflowIDReusePolicy`](#workflowidreusepolicy)                                       | No       | [`WorkflowIdReusePolicy`](https://pkg.go.dev/go.temporal.io/api/enums/v1#WorkflowIdReusePolicy) |
| [`WorkflowExecutionErrorWhenAlreadyStarted`](#workflowexecutionerrorwhenalreadystarted) | No       | `bool`                                                                                          |
| [`RetryPolicy`](#retrypolicy)                                                           | No       | [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy)                     |
| [`CronSchedule`](#cronschedule)                                                         | No       | `string`                                                                                        |
| [`Memo`](#memo)                                                                         | No       | `map[string]interface{}`                                                                        |
| [`SearchAttributes`](#searchattributes)                                                 | No       | `map[string]interface{}`                                                                        |

### `ID`

import WorkflowId from './how-to-set-a-workflow-id-in-go.md'

<WorkflowId/>

### `TaskQueue`

import TaskQueue from './how-to-set-a-workflow-task-queue-in-go.md'

<TaskQueue/>

### `WorkflowExecutionTimeout`

import WFETimeout from './how-to-set-a-workflow-execution-timeout-in-go.md'

<WFETimeout/>

### `WorkflowRunTimeout`

import WFRTimeout from './how-to-set-a-workflow-run-timeout-in-go.md'

<WFRTimeout/>

### `WorkflowTaskTimeout`

import WFTTimeout from './how-to-set-a-workflow-task-timeout-in-go.md'

<WFTTimeout/>

### `WorkflowIDReusePolicy`

- Type: [`WorkflowIdReusePolicy`](https://pkg.go.dev/go.temporal.io/api/enums/v1#WorkflowIdReusePolicy)
- Default: `enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE`

Set a value from the `go.temporal.io/api/enums/v1` package.

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowIdReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

### `WorkflowExecutionErrorWhenAlreadyStarted`

- Type: `bool`
- Default: `false`

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowExecutionErrorWhenAlreadyStarted: false,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

### `RetryPolicy`

import RetryPolicy from './how-to-set-a-workflow-retry-policy-in-go.md'

<RetryPolicy/>

### `CronSchedule`

- Type: `string`
- Default: None

```go
workflowOptions := client.StartWorkflowOptions{
  CronSchedule: "15 8 * * *",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

[Sample](https://github.com/temporalio/samples-go/tree/master/cron)

### `Memo`

- Type: `map[string]interface{}`
- Default: Empty

```go
workflowOptions := client.StartWorkflowOptions{
  Memo: map[string]interface{}{
    "description": "Test search attributes workflow",
  },
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

### `SearchAttributes`

**How to set Workflow Execution Search Attributes in Go**

- Type: `map[string]interface{}`
- Default: Empty.

These are the corresponding [Search Attribute value types](/concepts/what-is-a-search-attribute/#types) in Go:

- Keyword = string
- Int = int64
- Double = float64
- Bool = bool
- Datetime = time.Time
- Text = string

```go
searchAttributes := map[string]interface{}{
  "CustomIntField": 1,
  "MiscData": "yellow",
}
workflowOptions := client.StartWorkflowOptions{
  SearchAttributes: searchAttributes,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
