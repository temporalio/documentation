---
id: how-to-handle-a-cancellation-request-in-a-workflow-in-go
title: How to handle a Cancellation Request in a Workflow in Go
sidebar_label: Handling a Cancellation Request - Workflows
description: TODO
tags:
  - go
  - developer-guide
---

### How to clean up after a Workflow is cancelled

Workflow Definitions can be written to handle execution cancellation requests with Go's `defer` and the `workflow.NewDisconnectedContext` API.
In the Workflow Definition below, there is a special Activity that handles clean up should the execution be cancelled.

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
<!--SNIPEND-->


- [What is a Cancellation Request](/docs/content/what-is-a-cancellation-request)
