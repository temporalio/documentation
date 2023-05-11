--
id: how-to-send-an-update-from-a-client-in-go
title: How to send an Update from a Temporal Client in Go
sidebar_label: Send Update from Client
description: Use the `UpdateWorkflow()` method on an instance of the Go SDK Temporal Client to send an Update to a Workflow Execution.
tags:

- go
- how-to

---

Use the `UpdateWorkflow()` method on an instance of the [Go SDK Temporal Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) to send an [Update](/concepts/what-is-an-update) to a [Workflow Execution](/workflows#workflow-execution).

Pass in both the [Workflow Id](/concepts/what-is-a-workflow-id) and [Run Id](/concepts/what-is-a-run-id) to uniquely identify the Workflow Execution.
If only the Workflow Id is supplied (provide an empty string as the Run Id param), the Workflow Execution that is Running receives the Signal.

```go
// ...
updateArg := MyUpdateArg {
  Txt: "Some important data",
}
updateHandle, err := temporalClient.UpdateWorkflow(context.Background(), "your-workflow-id", runID, "your-update-name", updateArg)
if err != nil {
	log.Fatalln("Error issuing update request", err)
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
