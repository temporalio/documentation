---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-go
title: How to add custom Search Attributes to Workflow Executions at start time in Go
sidebar_label: Add custom Search Attributes to Workflow Executions at start time
description: Add custom Search Attributes to Workflow Executions at start time
tags:
  - developer-guide
  - go
  - client
---

Provide key-value pairs in [`StartWorkflowOptions.SearchAttributes`](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions).

Search Attributes are represented as `map[string]interface{}`.
The values in the map must correspond to the [Search Attribute's value type](/concepts/what-is-a-search-attribute/#types):

- Keyword = `string`
- Int = `int64`
- Double = `float64`
- Bool = `bool`
- Datetime = `time.Time`
- Text = `string`

If you had custom Search Attributes `CustomerId` of type Keyword and `MiscData` of type Text, you would provide `string` values:

```go
func (c *Client) CallMyWorkflow(ctx context.Context, workflowID string, payload map[string]interface{}) error {
    // ...
    searchAttributes := map[string]interface{}{
        "CustomerId": payload["customer"],
        "MiscData": payload["miscData"]
    }
    options := client.StartWorkflowOptions{
        SearchAttributes:   searchAttributes
        // ...
    }
    we, err := c.Client.ExecuteWorkflow(ctx, options, app.MyWorkflow, payload)
    // ...
}
```
