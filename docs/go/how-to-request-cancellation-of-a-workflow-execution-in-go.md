---
id: how-to-request-cancellation-of-a-workflow-execution-in-go
title: How to request Cancellation of a Workflow Execution in Go
description: Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.
tags:
  - developer-guide
  - go
---

Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.

<!--SNIPSTART samples-go-cancellation-cancel-workflow-execution-trigger-->
<!--SNIPEND-->

#### How to clean up after a Workflow is cancelled

Workflow Definitions can be written to handle execution cancellation requests with Go's `defer` and the `workflow.NewDisconnectedContext` API.
In the Workflow Definition below, there is a special Activity that handles clean up should the execution be cancelled.

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
<!--SNIPEND-->
