---
id: search-apis
title: Using Custom Searchable Attributes in Go
sidebar_label: Search Attributes
---

## Overview

Search attributes enable complex and business-logic-focused search queries for Workflow Executions via the CLI and Web UI.
The [Go SDK Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) offers APIs for configuring search attributes.
There are also APIs on the SDK client for listing Workflows by status.
Searching for and listing Workflows is helpful for debugging and visualizing Workflow Executions.

There are many [search attributes](/docs/server/workflow-search/#search-attributes) that are added to Workflow Executions by default.
But these are necessarily focused on Temporal internal state tracking.

For more debugging and monitoring, you may wish add your own domain specific search attributes (e.g. `customerId` or `numItems`) that may serve as useful search filters.

## Value types

Here are the search attribute value types and their corresponding types in Go:

- Keyword = string
- Int = int64
- Double = float64
- Bool = bool
- Datetime = time.Time
- String = string

## Tagging search attributes at workflow creation

You can provide key-value pairs as SearchAttributes in [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions).
In Go, SearchAttributes are represented as `map[string]interface{}`.
The value provided in the map must be the same type that is registered in the dynamic config.

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

## Upsert search attributes during workflow execution

In advanced cases, you may want to dynamically update these attributes as the workflow progresses.
[UpsertSearchAttributes](https://pkg.go.dev/go.temporal.io/sdk/workflow#UpsertSearchAttributes) is used to add or update search attributes from within Workflow code.

Go samples for search attributes can be found at [github.com/temporalio/samples-go](https://github.com/temporalio/samples-go/tree/master/searchattributes).

`UpsertSearchAttributes` will merge attributes to the existing map in the Workflow.
Consider this example Workflow code:

```go
func MyWorkflow(ctx workflow.Context, input string) error {

    attr1 := map[string]interface{}{
        "CustomIntField": 1,
        "CustomBoolField": true,
    }
    workflow.UpsertSearchAttributes(ctx, attr1)

    attr2 := map[string]interface{}{
        "CustomIntField": 2,
        "CustomKeywordField": "seattle",
    }
    workflow.UpsertSearchAttributes(ctx, attr2)
}
```

After the second call to `UpsertSearchAttributes`, the map will contain:

```go
map[string]interface{}{
    "CustomIntField": 2,
    "CustomBoolField": true,
    "CustomKeywordField": "seattle",
}
```

## Removing search attributes

There is no support for removing a field.
But, to achieve a similar effect, set the field to some placeholder value.
For example, you could set `CustomKeywordField` to `impossibleVal`.
Then searching `CustomKeywordField != 'impossibleVal'` will match Workflows with `CustomKeywordField` not equal to `impossibleVal`, which includes Workflows without the `CustomKeywordField` set.

## Retrieving search attributes

Use `workflow.GetInfo` to get current search attributes.

## Learn more

You can find sample search attribute sample code [in our `samples-go` repo](https://github.com/temporalio/samples-go/tree/master/searchattributes).
