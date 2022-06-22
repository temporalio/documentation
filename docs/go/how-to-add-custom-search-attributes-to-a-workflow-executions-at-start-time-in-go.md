---
id: how-to-add-custom-search-attributes-to-a-workflow-executions-at-start-time-in-go
title: How to add custom Search Attributes to Workflow Executions at start time in Go
sidebar_label: Add custom Search Attributes to Workflow Executions at start time
description: Add custom Search Attributes to Workflow Executions at start time
tags:
  - developer-guide
  - go
  - client
---

You can provide key-value pairs as Search Attributes in [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions).
In Go, Search Attributes are represented as `map[string]interface{}`.
The value provided in the map must be the same type that was added to a Cluster.

This can be useful for tagging executions with useful attributes you may want to search up later. For example:

```go
func (c *Client) CallMyWorkflow(ctx context.Context, workflowID string, payload map[string]interface{}) error {
    // ...
    searchAttributes := map[string]interface{}{
        "CustomerId": payload["customer"],
        "MiscData": payload["miscData"]
    }
    options := client.StartWorkflowOptions{
        ID:                 workflowID,
        TaskQueue:          app.MyTaskQueue,
        SearchAttributes:   searchAttributes
    }
    we, err := c.Client.ExecuteWorkflow(ctx, options, app.MyWorkflow, payload)
    // ...
}
```
