---
id: go-signals
title: Signals
---

**Signals** provide a mechanism to send data directly to a running Workflow. Previously, you had
two options for passing data to the Workflow implementation:

* Via start parameters
* As return values from Activities

With start parameters, we could only pass in values before Workflow execution began.

Return values from Activities allowed us to pass information to a running Workflow, but this
approach comes with its own complications. One major drawback is reliance on polling. This means
that the data needs to be stored in a third-party location until it's ready to be picked up by
the Activity. Further, the lifecycle of this Activity requires management, and the Activity
requires manual restart if it fails before acquiring the data.

**Signals**, on the other hand, provide a fully asynchronous and durable mechanism for providing data to
a running Workflow. When a signal is received for a running Workflow, Temporal persists the event
and the payload in the Workflow history. The Workflow can then process the signal at any time
afterwards without the risk of losing the information. The Workflow also has the option to stop
execution by blocking on a **signal channel**.

```go
var signalVal string
signalChan := workflow.GetSignalChannel(ctx, signalName)

s := workflow.NewSelector(ctx)
s.AddReceive(signalChan, func(c workflow.Channel, more bool) {
    c.Receive(ctx, &signalVal)
    workflow.GetLogger(ctx).Info("Received signal!", zap.String("signal", signalName), zap.String("value", signalVal))
})
s.Select(ctx)

if len(signalVal) > 0 && signalVal != "SOME_VALUE" {
    return errors.New("signalVal")
}
```

In the example above, the Workflow code uses **workflow.GetSignalChannel** to open a
**workflow.Channel** for the named signal. We then use a [**workflow.Selector**](https://docs.temporal.io/docs/go-selectors) to wait on this
channel and process the payload received with the signal.

## SignalWithStart

You may not know if a Workflow is running and can accept a signal. The
[client.SignalWithStartWorkflow](https://pkg.go.dev/go.temporal.io/sdk/client#Client) API
allows you to send a signal to the current Workflow instance if one exists or to create a new
run and then send the signal. `SignalWithStartWorkflow` therefore doesn't take a run Id as a
parameter.
