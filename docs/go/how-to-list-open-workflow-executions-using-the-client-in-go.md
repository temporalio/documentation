---
id: how-to-list-open-workflow-executions-using-the-client-in-go
title: How to list open Workflow Executions using the Client in Go
sidebar_label: List open Workflow Executions using the Client
description: List open Workflow Executions using the Client
tags:
  - developer-guide
  - go
  - client
---

- Type: `map[string]interface{}`
- Default: Empty.

These are the corresponding [Search Attribute value types](/concepts/what-is-a-search-attribute/#types) in Go:

- Keyword = string
- Int = int64
- Double = float64
- Bool = bool
- Datetime = time.Time
- Text = string

The following code starts a Workflow Execution with a Search Attribute of `CustomIntField` and `MiscData`.

```go
searchAttributes := map[string]interface{}{
  "CustomIntField": 1,
  "MiscData": "yellow",
}
workflowOptions := client.StartWorkflowOptions{
  SearchAttributes: searchAttributes,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
