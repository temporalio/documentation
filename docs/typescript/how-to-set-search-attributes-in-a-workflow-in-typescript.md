---
id: how-to-set-search-attributes-in-a-workflow-in-typescript
title: How to set Search Attributes in a Workflow in TypeScript
sidebar_label: Use Search Attributes in a Workflow
description: Use Search Attributes in a Workflow
tags:
  - developer-guide
  - sdk
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
