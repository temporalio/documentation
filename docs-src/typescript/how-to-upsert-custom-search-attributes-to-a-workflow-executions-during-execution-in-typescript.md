---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-typescript
title: How to upsert custom Search Attributes to Workflow during Execution in TypeScript
sidebar_label: How to upsert custom Search Attributes to Workflow during Execution
tags:
  - developer-guide
  - typescript
---

Inside a Workflow, we can read from [`WorkflowInfo.searchAttributes`](https://typescript.temporal.io/api/interfaces/workflow.WorkflowInfo#searchattributes) and call [`upsertSearchAttributes`](https://typescript.temporal.io/api/namespaces/workflow#upsertsearchattributes):

<!--SNIPSTART typescript-search-attributes-workflow -->
[search-attributes/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/search-attributes/src/workflows.ts)
```ts
export async function example(): Promise<SearchAttributes> {
  const customInt = (workflowInfo().searchAttributes.CustomIntField?.[0] as number) || 0;
  upsertSearchAttributes({
    // overwrite the existing CustomIntField: [2]
    CustomIntField: [customInt + 1],

    // delete the existing CustomBoolField: [true]
    CustomBoolField: [],

    // add a new value
    CustomDoubleField: [3.14],
  });
  return workflowInfo().searchAttributes;
}
```
<!--SNIPEND-->
