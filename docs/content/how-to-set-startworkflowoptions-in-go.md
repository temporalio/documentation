---
id: how-to-set-startworkflowoptions-in-go
title: How to set StartWorkflowOptions in Go
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - developer-guide
  - options
---

import RelatedReadList, {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as WhatIsASearchAttribute from './what-is-a-search-attribute.md'

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, and pass the instance to the `ExecuteWorkflow` call.

The following fields are available:

| Field                                                                            | Required | Type                                                                                            | Example                                         |
| -------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`ID`](/docs/content/what-is-a-workflow-id)                                      | No       | `string`                                                                                        | [👀](#id)                                       |
| [`TaskQueue`](/docs/content/what-is-a-task-queue)                                | **Yes**  | `string`                                                                                        | [👀](#taskqueue)                                |
| [`WorkflowExecutionTimeout`](/docs/content/what-is-a-workflow-execution-timeout) | No       | `time.Duration`                                                                                 | [👀](#workflowexecutiontimeout)                 |
| [`WorkflowRunTimeout`](/docs/content/what-is-a-workflow-run-timeout)             | No       | `time.Duration`                                                                                 | [👀](#workflowruntimeout)                       |
| [`WorkflowTaskTimeout`](/docs/content/what-is-a-workflow-task-timeout)           | No       | `time.Duration`                                                                                 | [👀](#workflowtasktimeout)                      |
| [`WorkflowIDReusePolicy`](/docs/content/what-is-a-workflow-id-reuse-policy)      | No       | [`WorkflowIdReusePolicy`](https://pkg.go.dev/go.temporal.io/api/enums/v1#WorkflowIdReusePolicy) | [👀](#workflowidreusepolicy)                    |
| `WorkflowExecutionErrorWhenAlreadyStarted`                                       | No       | `bool`                                                                                          | [👀](#workflowexecutionerrorwhenalreadystarted) |
| [`RetryPolicy`](/docs/content/what-is-a-retry-policy)                            | No       | [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/temporal#RetryPolicy)             | [👀](#retrypolicy)                              |
| [`CronSchedule`](/docs/content/what-is-a-temporal-cron-job)                      | No       | `string`                                                                                        | [👀](#cronschedule)                             |
| [`Memo`](/docs/content/what-is-a-memo)                                           | No       | `map[string]interface{}`                                                                        | [👀](#memo)                                     |
| [SearchAttributes](/docs/content/what-is-a-search-attribute)                     | No       | `map[string]interface{}`                                                                        | [👀](#searchattributes)                         |

### `ID`

```go
workflowOptions := client.StartWorkflowOptions{
  ID: "Your-Custom-Workflow-Id",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<!-- prettier-ignore -->
import * as WWID from './what-is-a-workflow-id.md'

<RelatedReadContainer>
  <RelatedReadItem page={WWID} />
</RelatedReadContainer>

### `TaskQueue`

```go
workflowOptions := client.StartWorkflowOptions{
  TaskQueue: "your-task-queue",
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadList
readlist={[
["What is a Task Queue?","/docs/content/what-is-a-task-queue","explanation"],
]}
/>

### `WorkflowExecutionTimeout`

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowExecutionTimeout: time.Hour * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadList
readlist={[
["What is a Workflow Execution Timeout?","/docs/content/what-is-a-workflow-execution-timeout","explanation"],
]}
/>

### `WorkflowRunTimeout`

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowRunTimeout: time.Hour * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadList
readlist={[
["What is a Workflow Run Timeout?","/docs/content/what-is-a-workflow-run-timeout","explanation"],
]}
/>

### `WorkflowTaskTimeout`

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

<RelatedReadList
readlist={[
["What is a Workflow Task Timeout?","/docs/content/what-is-a-workflow-task-timeout","explanation"],
]}
/>

### `WorkflowIDReusePolicy`

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

<RelatedReadList
readlist={[
["What is a Workflow Id Reuse Policy?","/docs/content/what-is-a-workflow-id-reuse-policy","explanation"],
]}
/>

### `WorkflowExecutionErrorWhenAlreadyStarted`

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

Create an instance of a [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/temporal#RetryPolicy) from the `go.temporal.io/sdk/temporal` package and provide it as the value to the `RetryPolicy` field of the instance of `StartWorkflowOptions`.

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
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadList
readlist={[
["What is a Retry Policy?","/docs/content/what-is-a-retry-policy","explanation"],
]}
/>

### `CronSchedule`

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

<RelatedReadList
readlist={[
["What is a Temporal Cron Job?","/docs/content/what-is-a-temporal-cron-job","explanation"],
]}
/>

### `Memo`

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

<RelatedReadList
readlist={[
["What is a Memo?","/docs/content/what-is-a-memo","explanation"],
]}
/>

### `SearchAttributes`

Search Attribute types are defined in the Elasticsearch Index Schema.
These are the corresponding Search Attribute value types in Go:

- Keyword = string
- Int = int64
- Double = float64
- Bool = bool
- Datetime = time.Time
- String = string

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsASearchAttribute} />
</RelatedReadContainer>
