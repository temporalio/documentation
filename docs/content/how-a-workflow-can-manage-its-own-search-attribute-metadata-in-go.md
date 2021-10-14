---
id: how-a-workflow-can-manage-its-own-search-attribute-metadata-in-go
title: How to get Search Attribute metadata of a Workflow Execution in Go
description: TODO
tags:
  - go
  - filtered-lists
---

A Workflow Definition in Go can have code that does the following:

- Get the current value of a specific Search Attribute of the Workflow Execution.
- Get all of the current Search Attribute keys and values of the Workflow Execution.
- Add new Search Attribute keys and values to the Workflow Execution.
- Change a current Seartch Attribute value of the Workflow Execution.

Search Attribute metadata can also be set in the [call to spawn a Workflow Execution](/docs/content/how-to-set-startworkflowoptions-in-go/#searchattributes).

### Get the value of a speciifc Search Attribute

Use the [`GetInfo`](https://pkg.go.dev/go.temporal.io/sdk/workflow#GetInfo) method from the `go.temporal.io/sdk/workflow` package to get an instance of [`Info`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Info).

The instance of `Info` has a `SearchAttributes` field which contains a single field called `IndexedFields` which is of the `map[string]*[Payload](https://pkg.go.dev/go.temporal.io/api/common/v1#Payload)` type.

Specify the Search Attribute key while accessing the map to get the Payload.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  info := workflow.GetInfo(ctx)
  payload := info.SearchAttributes.IndexedFields["CustomIntField"]
  // ...
}

```
