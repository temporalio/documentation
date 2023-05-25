---
id: how-to-send-an-update-from-a-client-in-go
title: How to send an Update from a Temporal Client in Go
sidebar_label: Send Update from Client
description: Use the `UpdateWorkflow()` method on an instance of the Go SDK Temporal Client to send an Update to a Workflow Execution.
tags:
  - go
  - how-to
---

When an Update is sent successfully from the Temporal Client, it is dispatched to a Worker where it is accepted or rejected through a validation process.
A rejected Update does not result in an Event being written to the Event History.
An accepted Update results in a `WorkflowExecutionUpdateAccepted` Event.
The accepted Update is then executed on the Worker and, upon completion, causes a `WorkflowExecutionUpdateCompleted` Event to be written to the Event History.

Use the `UpdateWorkflow()` method on an instance of the [Go SDK Temporal Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) to send an [Update](/concepts/what-is-an-update) to a [Workflow Execution](/workflows#workflow-execution).

Pass in both the [Workflow Id](/concepts/what-is-a-workflow-id) and [Run Id](/concepts/what-is-a-run-id) to uniquely identify the Workflow Execution.
If only the Workflow Id is supplied (provide an empty string as the Run Id param), the Workflow Execution that is running receives the Signal.

```go
// ...
updateArg := MyUpdateArg {
  Txt: "Some important data",
}
updateHandle, err := temporalClient.UpdateWorkflow(context.Background(), "your-workflow-id", runID, "your-update-name", updateArg)
if err != nil {
	log.Fatalln("Error issuing Update request", err)
	return
}
var updateResult myUpdateResult
err = updateHandle.Get(ctx, &updateResult)
if err != nil {
    log.Fatalln("Update encountered an error", err)
    return
}
log.Println("Update succeeded", updateResult)
// ...
```
