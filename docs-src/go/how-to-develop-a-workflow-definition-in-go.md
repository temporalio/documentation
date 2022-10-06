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

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

In Go, by default, the Workflow Type name is the same as the function name.
