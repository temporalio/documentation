---
id: how-to-handle-a-signal-in-go
title: How to handle a Signal in Go
sidebar_label: Handle Signal
description: Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.
tags:
  - go
  - how-to
---

Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  // ...
  var signal MySignal
  signalChan := workflow.GetSignalChannel(ctx, "your-signal-name")
  signalChan.Receive(ctx, &signal)
  if len(signal.Message) > 0 && signal.Message != "SOME_VALUE" {
      return errors.New("signal")
  }
  // ...
}
```

In the example above, the Workflow code uses `workflow.GetSignalChannel` to open a `workflow.Channel` for the Signal type (identified by the Signal name).

Before completing the Workflow or using [Continue-As-New](/application-development/features#continue-as-new), make sure to do an asynchronous drain on the Signal channel.
Otherwise, the Signals will be lost.
