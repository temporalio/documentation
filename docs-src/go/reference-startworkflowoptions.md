---
id: startworkflowoptions-reference
title: Go StartWorkflowOptions reference
sidebar_label: Workflow Options reference
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - developer-guide-doc-type
  - workflow options
  - go sdk
  - workflow execution
  - workflows
  - reference-doc-type
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

#### ID

Although it is not required, we recommend providing your own [Workflow Id](/concepts/what-is-a-workflow-id) that maps to a business process or business entity identifier, such as an order identifier or customer identifier.

Create an instance of [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `ID` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `string`
- Default: System generated UUID

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  ID: "Your-Custom-Workflow-Id",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

#### TaskQueue

Create an instance of [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `TaskQueue` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `string`
- Default: None; this is a required field to be set by the developer

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  TaskQueue: "your-task-queue",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

#### WorkflowExecutionTimeout

Create an instance of [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `WorkflowExecutionTimeout` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `time.Duration`
- Default: Unlimited

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  WorkflowExecutionTimeout: time.Hours * 24 * 365 * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

#### WorkflowRunTimeout

Create an instance of [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `WorkflowRunTimeout` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `time.Duration`
- Default: Same as [`WorkflowExecutionTimeout`](#workflowexecutiontimeout)

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowRunTimeout: time.Hours * 24 * 365 * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

#### WorkflowTaskTimeout

Create an instance of [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `WorkflowTaskTimeout` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `time.Duration`
- Default: `time.Seconds * 10`

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowTaskTimeout: time.Second * 10,
  //...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

#### WorkflowIDReusePolicy

- Type: [WorkflowIdReusePolicy](https://pkg.go.dev/go.temporal.io/api/enums/v1#WorkflowIdReusePolicy)
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

#### WorkflowExecutionErrorWhenAlreadyStarted

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

#### RetryPolicy

Create an instance of a [RetryPolicy](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy) from the `go.temporal.io/sdk/temporal` package and provide it as the value to the `RetryPolicy` field of the instance of `StartWorkflowOptions`.

- Type: [RetryPolicy](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy)
- Default: None

```go
retrypolicy := &temporal.RetryPolicy{
  InitialInterval:    time.Second,
  BackoffCoefficient: 2.0,
  MaximumInterval:    time.Second * 100,
}
workflowOptions := client.StartWorkflowOptions{
  RetryPolicy: retrypolicy,
  // ...
}
workflowRun, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

#### CronSchedule

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

#### Memo

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

#### SearchAttributes

**How to set Workflow Execution Search Attributes in Go**

- Type: `map[string]interface{}`
- Default: Empty.

These are the corresponding [Search Attribute value types](/concepts/what-is-a-search-attribute#supported-types) in Go:

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
