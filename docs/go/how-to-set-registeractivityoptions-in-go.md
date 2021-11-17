---
id: how-to-set-registeractivityoptions-in-go
title: How to set RegisterActivityOptions in Go
sidebar_label: RegisterActivityOptions
description: TODO
tags:
  - developer-guide
---

Create an instance of a [`RegisterOptions`](https://pkg.go.dev/go.temporal.io/sdk/activity#RegisterOptions) from the `go.temporal.io/sdk/activity` package and pass it to the [`RegisterActivityWithOptions`](https://pkg.go.dev/go.temporal.io/sdk/worker#ActivityRegistry) call when registering the Activity with the Worker.

Options for registering an activity

| Field | Required | Type |
| ----- | -------- | ---- |
| [`Name`](#name) | No | `string` |
| [`DisableAlreadyRegisteredCheck`](#disablealreadyregisteredcheck) | No | `bool` |
| [`SkipInvalidStructFunctions`](#skipinvalidstructfunctions) | No | `bool` |

### `Name`

- Type: `string`
- Default:

Sets the activity name (if other than function name needs to be set)

```go
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := activity.RegisterOptions{
  Name: "CoolActivityTypeName",
}
w.RegisterActivityWithOptions(a.YourActivityDefinition, registerOptions)
```

### `DisableAlreadyRegisteredCheck`

- Type: `bool`
- Default:

Sets if already registered check should be disabled | bool |

### `SkipInvalidStructFunctions`

- Type: `bool`
- Default:

Sets to panic or skip when registering struct with activities and are not valid | bool |

```go
```
