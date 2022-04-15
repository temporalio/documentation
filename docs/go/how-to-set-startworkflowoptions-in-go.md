---
id: how-to-set-startworkflowoptions-in-go
title: How to set StartWorkflowOptions in Go
sidebar_label: StartWorkflowOptions
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - developer-guide
  - options
---

import {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as WhatIsAWorkflowId from '../concepts/what-is-a-workflow-id.md'
import * as WhatIsATaskQueue from '../concepts/what-is-a-task-queue.md'
import * as WhatIsAWorkflowExecutionTimeout from '../concepts/what-is-a-workflow-execution-timeout.md'
import * as WhatIsAWorkflowRunTimeout from '../concepts/what-is-a-workflow-run-timeout.md'
import * as WhatIsAWorkflowTaskTimeout from '../concepts/what-is-a-workflow-task-timeout.md'
import * as WhatIsAWorkflowIdReusePolicy from '../concepts/what-is-a-workflow-id-reuse-policy.md'
import * as WhatIsARetryPolicy from '../concepts/what-is-a-retry-policy.md'
import * as WhatIsATemporalCronJob from '../concepts/what-is-a-temporal-cron-job.md'
import * as WhatIsAMemo from '../concepts/what-is-a-memo.md'
import * as WhatIsASearchAttribute from '../concepts/what-is-a-search-attribute.md'
import * as HowToAddACustomSearchAttributeToAClusterUsingTctl from '../tctl/how-to-add-a-custom-search-attribute-to-a-cluster-using-tctl.md'

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

- Type: `string`
- Default: System generated UUID

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsAWorkflowId} />
</RelatedReadContainer>

### `TaskQueue`

- Type: `string`
- Default: None, this is a required field to be set by the developer

```go
workflowOptions := client.StartWorkflowOptions{
  TaskQueue: "your-task-queue",
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsATaskQueue} />
</RelatedReadContainer>

### `WorkflowExecutionTimeout`

- Type: `time.Duration`
- Default: Unlimited

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowExecutionTimeout: time.Hours * 24 * 365 * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsAWorkflowExecutionTimeout} />
</RelatedReadContainer>

### `WorkflowRunTimeout`

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsAWorkflowRunTimeout} />
</RelatedReadContainer>

### `WorkflowTaskTimeout`

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsAWorkflowTaskTimeout} />
</RelatedReadContainer>

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsAWorkflowIdReusePolicy} />
</RelatedReadContainer>

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

Create an instance of a [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy) from the `go.temporal.io/sdk/temporal` package and provide it as the value to the `RetryPolicy` field of the instance of `StartWorkflowOptions`.

- Type: [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy)
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
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsARetryPolicy} />
</RelatedReadContainer>

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsATemporalCronJob} />
</RelatedReadContainer>

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsAMemo} />
</RelatedReadContainer>

### `SearchAttributes`

- Type: `map[string]interface{}`
- Default: Empty.

These are the corresponding [Search Attribute value types](/docs/concepts/what-is-a-search-attribute#types) in Go:

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

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsASearchAttribute} />
  <RelatedReadItem page={HowToAddACustomSearchAttributeToAClusterUsingTctl} />
</RelatedReadContainer>
