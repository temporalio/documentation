---
id: how-to-develop-a-workflow-definition-in-go
title: How to develop a Workflow Definition in Go
sidebar_label: Workflow Definition
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
tags:
  - developer-guide
  - go
---

In the Temporal Go SDK programming model, a [Workflow Definition](/concepts/what-is-a-workflow-definition) is an exportable function.

<!--SNIPSTART go-samples-yourapp-your-workflow-definition {"selectedLines": ["59-62"]} -->

[yourapp/your_workflow_definition.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/your_workflow_definition.go)

```go
// ...
// YourSimpleWorkflowDefintiion is the most basic Workflow Defintion.
func YourSimpleWorkflowDefinition(ctx workflow.Context) error {
	return nil
}
```

<!--SNIPEND-->

In Go, by default, the Workflow Type name is the same as the function name.
