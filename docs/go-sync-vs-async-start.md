---
id: go-sync-vs-async-start
title: Sync vs async Workflow start
sidebar_label: Sync vs async Workflow start
---

Workflows can be started both synchronously and asynchronously.

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or stops.

In Go, the only difference between a synchronous start and an asynchronous start is whether you use the Workflow Execution entity to get the result of the Workflow from the same process in which you started it.

<!--SNIPSTART hello-world-project-template-go-start-workflow-->
[start/main.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/start/main.go)
```go
package main

import (
	"context"
	"fmt"
	"log"

	"go.temporal.io/sdk/client"

	"hello-world-project-template-go/app"
)

func main() {
	// Create the client object just once per process
	c, err := client.NewClient(client.Options{})
	if err != nil {
		log.Fatalln("unable to create Temporal client", err)
	}
	defer c.Close()
	options := client.StartWorkflowOptions{
		ID:        "greeting-workflow",
		TaskQueue: app.GreetingTaskQueue,
	}
	name := "World"
	we, err := c.ExecuteWorkflow(context.Background(), options, app.GreetingWorkflow, name)
	if err != nil {
		log.Fatalln("unable to complete Workflow", err)
	}
	var greeting string
	err = we.Get(context.Background(), &greeting)
	if err != nil {
		log.Fatalln("unable to get Workflow result", err)
	}
	printResults(greeting, we.GetID(), we.GetRunID())
}

func printResults(greeting string, workflowID, runID string) {
	fmt.Printf("\nWorkflowID: %s RunID: %s\n", workflowID, runID)
	fmt.Printf("\n%s\n\n", greeting)
}
```
<!--SNIPEND-->

## Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller without waiting for a result. This is the most common way to start Workflows in a live environment.

To start a Workflow asynchronously in Go just call `ExecuteWorkflow()` on the client and don't wait for the result in the same process.

<!--SNIPSTART money-transfer-project-template-go-start-workflow-->
[start/main.go](https://github.com/temporalio/money-transfer-project-template-go/blob/master/start/main.go)
```go
func main() {
	// Create the client object just once per process
	c, err := client.NewClient(client.Options{})
	if err != nil {
		log.Fatalln("unable to create Temporal client", err)
	}
	defer c.Close()
	options := client.StartWorkflowOptions{
		ID:        "transfer-money-workflow",
		TaskQueue: app.TransferMoneyTaskQueue,
	}
	transferDetails := app.TransferDetails{
		Amount:      54.99,
		FromAccount: "001-001",
		ToAccount:   "002-002",
		ReferenceID: uuid.New().String(),
	}
	we, err := c.ExecuteWorkflow(context.Background(), options, app.TransferMoney, transferDetails)
	if err != nil {
		log.Fatalln("error starting TransferMoney workflow", err)
	}
	printResults(transferDetails, we.GetID(), we.GetRunID())
}
```
<!--SNIPEND-->

If you need to wait for the completion of a Workflow after an asynchronous start, make a blocking call to the Workflow instance. If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion. The following example shows how to do this from a different process than the one that started the Workflow. All this caller needs is a `WorkflowId`.

```go
we = client.GetWorkflow(workflowID)
var result string
we.Get(ctx, result)
```
