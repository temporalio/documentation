---
id: how-to-set-search-attributes-from-the-client-in-typescript
title: How to set Search Attributes from the Client in TypeScript
sidebar_label: Use Search Attributes from the Client
description: Use Search Attributes from the Client
tags:
  - developer-guide
  - sdk
  - typescript
---

We can set [`WorkflowOptions.searchAttributes`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes) during `client.start()` or `client.execute()` and read with [`handle.describe()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#describe):

<!--SNIPSTART typescript-search-attributes-client -->
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
