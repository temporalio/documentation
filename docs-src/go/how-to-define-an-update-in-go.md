---
id: how-to-define-an-update-in-go
title: How to define an Update in Go
sidebar_label: Define Update
description: Define an Update by giving it a name to identify it.
tags:
  - go-sdk
  - how-to-doc-type
---

In Go, you define an Update type, also known as an Update name, as a `string` value.
You must ensure the arguments and result are [serializable](/concepts/what-is-a-data-converter).
When sending and receiving the Update, use the Update name as an identifier.
The name does not link to the data type(s) sent with the Update.
Ensure that every Workflow listening to the same Update name can handle the same Update arguments.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/yourupdate/your_updatable_workflow_dacx.go">View source code</a>

```go
// YourUpdateName holds a string value used to correlate Updates.
const YourUpdateName = "your_update_name"
// ...
func YourUpdatableWorkflow(ctx workflow.Context, param WFParam) (WFResult, error) {
// ...
	err := workflow.SetUpdateHandler(ctx, YourUpdateName, func(ctx workflow.Context, arg YourUpdateArg) (YourUpdateResult, error) {
// ...
	}
// ...
}
```
