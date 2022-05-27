---
id: how-to-customize-activity-type-in-go
title: How to customize Activity Type in Go
sidebar_label: Customize Activity Type
description: To customize the Workflow Type set the `Name` parameter with `RegisterOptions` when registering your Workflow with a Worker.
tags:
  - developer-guide
  - go
---

To customize the Activity Type, set the `Name` parameter with `RegisterOptions` when registering your Activity with a Worker.

- Type: `string`
- Default: function name

```go
// ...
w := worker.New(temporalClient, "your_task_queue_name", worker.Options{})
registerOptions := activity.RegisterOptions{
  Name: "CoolActivityTypeName",
  // ...
}
w.RegisterActivityWithOptions(a.YourActivityDefinition, registerOptions)
// ...
```
