---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-typescript
title: How to add custom Search Attributes to Workflow Executions at start time in TypeScript
sidebar_label: Add custom Search Attributes to Workflow Executions at start time
description: Add custom Search Attributes to Workflow Executions at start time
tags:
  - developer-guide
  - typescript
  - client
---

Use [`WorkflowOptions.searchAttributes`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes).

<!--SNIPSTART typescript-search-attributes-client-->
[search-attributes/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/search-attributes/src/client.ts)
```ts
  const handle = await client.workflow.start(example, {
    taskQueue: 'search-attributes',
    workflowId: 'search-attributes-example-0',
    searchAttributes: {
      CustomIntField: [2],
      CustomKeywordField: ['keywordA', 'keywordB'],
      CustomBoolField: [true],
      CustomDatetimeField: [new Date()],
      CustomStringField: [
        'String field is for text. When queried, it will be tokenized for partial match. StringTypeField cannot be used in Order By',
      ],
    },
  });

  const { searchAttributes } = await handle.describe();
```
<!--SNIPEND-->

The type of `searchAttributes` is `Record<string, string[] | number[] | boolean[] | Date[]>`.
