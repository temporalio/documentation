---
id: how-to-develop-a-workflow-definition-in-go
title: How to develop a Workflow Definition in Go
sidebar_label: Workflow Definition
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
---

In the Temporal Go SDK programming model, a [Workflow Definition](/concepts/what-is-a-workflow-definition) is an exportable function.
Below is an example of a basic Workflow Definition.

# <<<<<<< HEAD<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/sessions/yourapp/your_workflow_definition_dacx.go">View source code</a>

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/yourapp/your_workflow_definition_dacx.go">View source code</a>
>>>>>>> main

```go
package yourapp

import (
	"time"

	"go.temporal.io/sdk/workflow"
)
// ...

// YourSimpleWorkflowDefintiion is the most basic Workflow Defintion.
func YourSimpleWorkflowDefinition(ctx workflow.Context) error {
	// ...
	return nil
}
```
