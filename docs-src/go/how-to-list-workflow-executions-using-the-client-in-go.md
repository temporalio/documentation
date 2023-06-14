---
id: how-to-list-workflow-executions-using-the-client-in-go
title: How to list Workflow Executions using the Client in Go
sidebar_label: List Workflow Executions using the Client
description: List Workflow Executions using the Client
tags:
  - developer-guide
  - go
  - client
---

There are several functions for listing Workflow Executions using the [Client]() in Go.
Workflow Executions are returned based on a given [Query]() or request filter.

To list all Workflows, use [`ListWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/client#Client.ListWorkflow) on the Temporal Client.

```go

```

To return a list of archived Workflows only, use `ListArchivedWorkflow()` on the Client.

```go

```

To return a list of closed Workflows, use `ListClosedWorkflow()` on the Temporal Client.

```go

```

To only view a list of currently open Workflows, use `ListOpenWorkflows()` on the Temporal Client.

```go

```