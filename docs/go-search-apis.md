---
id: go-search-apis
title: Using Search APIs in Go
sidebar_label: Search APIs
---

## Overview

The [Go SDK Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) offers APIs for searching for and listing Workflows.

## Search attributes

You can provide key-value pairs as SearchAttributes in [StartWorkflowOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions).

SearchAttributes are `map[string]interface{}` where the keys need to be 'allowlisted' so that Temporal knows the attribute key name and value type.
The value provided in the map must be the same type as registered.

### Value types

Here are the search attribute value types and their corresponding types in Go:

- Keyword = string
- Int = int64
- Double = float64
- Bool = bool
- Datetime = time.Time
- String = string

### Upsert search attributes

[UpsertSearchAttributes](https://pkg.go.dev/go.temporal.io/sdk/workflow#UpsertSearchAttributes) is used to add or update search attributes from within the Workflow code.

Go samples for search attributes can be found at [github.com/temporalio/temporal-go-samples](https://github.com/temporalio/temporal-go-samples/tree/master/searchattributes).

UpsertSearchAttributes will merge attributes to the existing map in the Workflow.
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

After the second call to UpsertSearchAttributes, the map will contain:

```go
map[string]interface{}{
    "CustomIntField": 2,
    "CustomBoolField": true,
    "CustomKeywordField": "seattle",
}
```

There is no support for removing a field.
To achieve a similar effect, set the field to a sentinel value.
For example, to remove “CustomKeywordField”, update it to “impossibleVal”.
Then searching `CustomKeywordField != ‘impossibleVal’` will match Workflows with CustomKeywordField not equal to "impossibleVal", which **includes** Workflows without the CustomKeywordField set.

Use `workflow.GetInfo` to get current search attributes.
