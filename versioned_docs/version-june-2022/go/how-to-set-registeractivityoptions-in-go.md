---
id: how-to-set-registeractivityoptions-in-go
title: How to set RegisterActivityOptions in Go
sidebar_label: RegisterActivityOptions
description: Create an instance of `RegisterOptions` from the `go.temporal.io/sdk/activity` package and pass it to the `RegisterActivityWithOptions` call when registering the Activity Type with the Worker.
tags:
  - developer-guide
---

Create an instance of [`RegisterOptions`](https://pkg.go.dev/go.temporal.io/sdk/activity#RegisterOptions) from the `go.temporal.io/sdk/activity` package and pass it to the [`RegisterActivityWithOptions`](https://pkg.go.dev/go.temporal.io/sdk/worker#ActivityRegistry) call when registering the Activity Type with the Worker.

Options for registering an Activity

| Field                                                             | Required | Type     |
| ----------------------------------------------------------------- | -------- | -------- |
| [`Name`](#name)                                                   | No       | `string` |
| [`DisableAlreadyRegisteredCheck`](#disablealreadyregisteredcheck) | No       | `bool`   |
| [`SkipInvalidStructFunctions`](#skipinvalidstructfunctions)       | No       | `bool`   |

### `Name`

import CustomizeActivityType from './how-to-customize-activity-type-in-go.md'

<CustomizeActivityType/>

### `DisableAlreadyRegisteredCheck`

Disables the check to see if the Activity has already been registered.

- Type: `bool`
- Default: `false`

```go
// ...
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := activity.RegisterOptions{
  DisableAlreadyRegisteredCheck: false,
  // ...
}
w.RegisterActivityWithOptions(a.YourActivityDefinition, registerOptions)
// ...
```

### `SkipInvalidStructFunctions`

When registering a struct that has Activities, skip functions that are not valid.
If false, registration panics.

- Type: `bool`
- Default: `false`

```go
// ...
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := activity.RegisterOptions{
  SkipInvalidStructFunctions: false,
  // ...
}
w.RegisterActivityWithOptions(a.YourActivityDefinition, registerOptions)
// ...
```
