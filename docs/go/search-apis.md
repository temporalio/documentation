---
id: search-apis
title: Using Custom Searchable Attributes in Go
sidebar_label: Search Attributes
---

## Overview

Search Attributes enable complex and business-logic-focused search queries for Workflow Executions.
These are often queried through the Temporal Web UI, but you can also query from within your Workflow code.

Many [Search Attributes](/concepts/what-is-a-search-attribute) are added to Workflow Executions by default.
But these are necessarily focused on Temporal internal state tracking.

For more debugging and monitoring, you might want to add your own domain-specific Search Attributes, such as `customerId` or `numItems`, that can serve as useful search filters.

The [Go SDK Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) offers APIs for configuring Search Attributes.
There are also APIs on the SDK client for listing Workflows by status.
Go samples for Search Attributes can be found at [`temporalio/samples-go`](https://github.com/temporalio/samples-go/tree/master/searchattributes).

## Value types

Here are the [Search Attribute value types](/concepts/what-is-a-search-attribute/#types) and their corresponding types in Go:

- Keyword = string
- Int = int64
- Double = float64
- Bool = bool
- Datetime = time.Time
- Text = string

## Tagging Search Attributes at Workflow creation

You can provide key-value pairs as SearchAttributes in [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions).
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

## Upsert Search Attributes during Workflow Execution

In advanced cases, you may want to dynamically update these attributes as the Workflow progresses.
[UpsertSearchAttributes](https://pkg.go.dev/go.temporal.io/sdk/workflow#UpsertSearchAttributes) is used to add or update Search Attributes from within Workflow code.

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
    "CustomIntField": 2, // last update wins
    "CustomBoolField": true,
    "CustomKeywordField": "seattle",
}
```

## Removing Search Attributes

**There is no support for removing a field.**

However, to achieve a similar effect, set the field to some placeholder value.
For example, you could set `CustomKeywordField` to `impossibleVal`.
Then searching `CustomKeywordField != 'impossibleVal'` will match Workflows with `CustomKeywordField` not equal to `impossibleVal`, which includes Workflows without the `CustomKeywordField` set.

## Retrieving Search Attributes

Use the `SearchAttributes` property of `workflow.GetInfo` to get a specific Search Attribute:

```go
// Get search attributes that were provided when workflow was started.
info := workflow.GetInfo(ctx)
val := info.SearchAttributes.IndexedFields["CustomIntField"]
```

## Querying Search Attributes within a Workflow

You can programmatically retrieve attributes from a Workflow Execution with `GetSearchAttributes`, and log out all fields with `GetIndexedFields`:

```go
searchAttributes := workflowExecution.GetSearchAttributes()
var builder strings.Builder
for k, v := range searchAttributes.GetIndexedFields() {
    var currentVal interface{}
    err := converter.GetDefaultDataConverter().FromPayload(v, &currentVal)
    if err != nil {
        logger.Error(fmt.Sprintf("Get search attribute for key %s failed.", k), "Error", err)
        return err
    }
    builder.WriteString(fmt.Sprintf("%s=%v\n", k, currentVal))
}
```

## Testing Search Attributes

The Go SDK's test suite comes with corresponding methods for mocking and asserting these operations:

```go
func Test_Workflow(t *testing.T) {
	testSuite := &testsuite.WorkflowTestSuite{}
	env := testSuite.NewTestWorkflowEnvironment()
	env.RegisterActivity(ListExecutions)

	// mock search attributes on start
	_ = env.SetSearchAttributesOnStart(map[string]interface{}{"CustomIntField": 1})

	// mock upsert operations
	attributes := map[string]interface{}{
		"CustomIntField":      2, // update CustomIntField from 1 to 2, then insert other fields
		"CustomKeywordField":  "Update1",
		"CustomBoolField":     true,
		"CustomDoubleField":   3.14,
		"CustomDatetimeField": env.Now().UTC(),
		"CustomStringField":   "String field is for text. When query, it will be tokenized for partial match. StringTypeField cannot be used in Order By",
	}
	env.OnUpsertSearchAttributes(attributes).Return(nil).Once()

	attributes = map[string]interface{}{
		"CustomKeywordField": "Update2",
	}
	env.OnUpsertSearchAttributes(attributes).Return(nil).Once()

	// mock activity
	env.OnActivity(ListExecutions, mock.Anything, mock.Anything).Return([]*workflowpb.WorkflowExecutionInfo{{}}, nil).Once()

	env.ExecuteWorkflow(SearchAttributesWorkflow)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())
}
```

## Full Search Attributes example code

You can find full example Search Attributes sample code [in the Temporal `samples-go` repo](https://github.com/temporalio/samples-go/tree/master/searchattributes).
