---
id: how-to-handle-a-signal-in-go
title: How to handle a Signal in Go
sidebar_label: Handle Signal
description: Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.
tags:
  - go sdk
  - how-to-doc-type
  - signals
  - signals-feature
  - developer-guide-doc-type
---

Use the `GetSignalChannel()` API from the `go.temporal.io/sdk/workflow` package to get the Signal Channel.

A common use-case is to block a Workflow while waiting for a Signal, like in the following snippet:

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

Alternatively, you might want the Workflow to proceed and still be capable of handling external Signals.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
   var signal MySignal
   signalChan := workflow.GetSignalChannel(ctx, "your-signal-name")
 	workflow.Go(ctx, func(ctx workflow.Context) {
 		for {
 			selector := workflow.NewSelector(ctx)
 			selector.AddReceive(signalChan, func(c workflow.ReceiveChannel, more bool) {
 				c.Receive(ctx, &mySignal)
 			})
 			selector.Select(ctx)
 		}
 	})
   // submit activity one
   // signal can be received while activity one is pending

 }
```

In the example above, the Workflow code uses `workflow.GetSignalChannel` to open a `workflow.Channel` for the Signal type (identified by the Signal name).

Before completing the Workflow or using [Continue-As-New](/go/continue-as-new), make sure to do an asynchronous drain on the Signal channel.
Otherwise, the Signals will be lost.
