---
id: how-to-set-registerworkflowoptions-in-go
title: How to set RegisterWorkflowOptions in Go
sidebar_label: RegisterWorkflowOptions
description: Create an instance of `RegisterOptions` from the `go.temporal.io/sdk/workflow` package and pass it to the `RegisterWorkflowWithOptions` call when registering the Workflow Type with the Worker
tags:
  - developer-guide
  - go
---

Create an instance of [`RegisterOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#RegisterOptions) from the `go.temporal.io/sdk/workflow` package and pass it to the [`RegisterWorkflowWithOptions`](https://pkg.go.dev/go.temporal.io/sdk/worker#WorkflowRegistry) call when registering the Workflow Type with the Worker.

- Used to set options for registering a Workflow

| Field                                                             | Required | Type     |
| ----------------------------------------------------------------- | -------- | -------- |
| [`Name`](#name)                                                   | No       | `string` |
| [`DisableAlreadyRegisteredCheck`](#disablealreadyregisteredcheck) | No       | `bool`   |

## `Name`

Sets the name of the Workflow Type.

- Type: `string`
- Default: function name

```go
// ...
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := workflow.RegisterOptions{
  Name: "CoolWorkflowTypeName",
  // ...
}
w.RegisterWorkflowWithOptions(YourWorkflowDefinition, registerOptions)
// ...
```

### `DisableAlreadyRegisteredCheck`

Disables the check to see if the Workflow Type has already been registered.

- Type: `bool`
- Default: `false`

```go
// ...
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := workflow.RegisterOptions{
  DisableAlreadyRegisteredCheck: `false`,
  // ...
}
w.RegisterWorkflowWithOptions(YourWorkflowDefinition, registerOptions)
// ...
```
