---
id: how-to-set-registeractivityoptions-in-go
title: How to set RegisterActivityOptions in Go
sidebar_label: RegisterActivityOptions
description: Create an instance of `RegisterOptions` from the `go.temporal.io/sdk/activity` package and pass it to the `RegisterActivityWithOptions` call when registering the Activity Type with the Worker.
tags:
  - developer-guide
---

Create an instance of [`RegisterOptions`](https://pkg.go.dev/go.temporal.io/sdk/activity#RegisterOptions) from the `go.temporal.io/sdk/activity` package and pass it to the [`RegisterActivityWithOptions`](https://pkg.go.dev/go.temporal.io/sdk/worker#ActivityRegistry) call when registering the Activity Type with the Worker.

`RegisterActivityWithOptions` registers the Activity function or struct pointer with options.

Options for registering an activity

| Field                                                             | Required | Type     |
| ----------------------------------------------------------------- | -------- | -------- |
| [`Name`](#name)                                                   | No       | `string` |
| [`DisableAlreadyRegisteredCheck`](#disablealreadyregisteredcheck) | No       | `bool`   |
| [`SkipInvalidStructFunctions`](#skipinvalidstructfunctions)       | No       | `bool`   |

### `Name`

Sets the Activity Type name.

- Type: `string`
- Default: function name

```go
// ...
workerEntity := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := activity.RegisterOptions{
  Name: "CoolActivityTypeName",
  // ...
}
workerEntity.RegisterActivityWithOptions(a.YourActivityDefinition, registerOptions)
// ...
```

When registering the struct that implements Activity function methods, the name is added as a prefix to the Activity struct's method name.

```go
workerEntity.RegisterActivityWithOptions(&ActivityStruct{ ... }, RegisterActivityOptions{Name: "YourPrefix_"})
```

To override the specific name of each of the Activity struct's methods, register the methods one by one:

```go
activities := &Activities{ ... }
workerEntity.RegisterActivityWithOptions(activities.SampleActivity1, RegisterActivityOptions{Name: "Sample1"})
workerEntity.RegisterActivityWithOptions(activities.SampleActivity2, RegisterActivityOptions{Name: "Sample2"})
```

### `DisableAlreadyRegisteredCheck`

Disables the check to see if the Activity has already been registered.

This has been known to be useful for integration tests.

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
