---
id: sync-vs-async-start
title: Sync vs async Workflow start
sidebar_label: Sync vs async Workflow start
---

Workflows can be started both synchronously and asynchronously.

## Synchronous start

A Synchronous start initiates a Workflow and then waits for its completion. The started Workflow will not rely on the invocation process and will continue executing even if the waiting process crashes or stops.

In Go, the only difference between a synchronous start and an asynchronous start is whether you use the Workflow Execution entity to get the result of the Workflow from the same process in which you started it.

<!--SNIPSTART hello-world-project-template-go-start-workflow-->
<!--SNIPEND-->

## Asynchronous start

An asynchronous start initiates a Workflow execution and immediately returns to the caller without waiting for a result. This is the most common way to start Workflows in a live environment.

To start a Workflow asynchronously in Go just call `ExecuteWorkflow()` on the client and don't wait for the result in the same process.

<!--SNIPSTART money-transfer-project-template-go-start-workflow-->
<!--SNIPEND-->

If you need to wait for the completion of a Workflow after an asynchronous start, make a blocking call to the Workflow instance. If `WorkflowOptions.WorkflowIdReusePolicy` is not set to `AllowDuplicate`, then instead of throwing `DuplicateWorkflowException`, it reconnects to an existing Workflow and waits for its completion. The following example shows how to do this from a different process than the one that started the Workflow. All this caller needs is a `WorkflowId`.

```go
we = client.GetWorkflow(workflowID)
var result string
we.Get(ctx, result)
```
