---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-go
title: How to upsert custom Search Attributes to Workflow during Execution
sidebar_label: How to upsert custom Search Attributes to Workflow during Execution
tags:
  - developer-guide
  - go
---

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
