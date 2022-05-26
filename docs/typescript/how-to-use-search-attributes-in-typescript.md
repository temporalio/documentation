---
id: how-to-use-search-attributes-in-typescript
title: How to use Search Attributes in TypeScript
sidebar_label: Use Search Attributes
description: Use Search Attributes
tags:
  - developer-guide
  - sdk
  - typescript
---

#### Client

We can set [`WorkflowOptions.searchAttributes`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes) during `client.start()` or `client.execute()` and read with [`handle.describe()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#describe):

<!--SNIPSTART typescript-search-attributes-client -->
<!--SNIPEND-->

The type of `searchAttributes` is `Record<string, string[] | number[] | boolean[] | Date[]>`.

#### Workflow

Inside a Workflow, we can read from [`WorkflowInfo.searchAttributes`](https://typescript.temporal.io/api/interfaces/workflow.WorkflowInfo#searchattributes) and call [`upsertSearchAttributes`](https://typescript.temporal.io/api/namespaces/workflow#upsertsearchattributes):

<!--SNIPSTART typescript-search-attributes-workflow -->
<!--SNIPEND-->

#### Listing

For now, we can call [`client.service.listWorkflowExecutions()`](https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.WorkflowService-1#listworkflowexecutions). A friendlier `client.listWorkflows()` function that does Payload decoding is planned.

```ts
const { executions, nextPageToken } =
  await client.service.listWorkflowExecutions({
    namespace: 'default',
    ...(input || {}),
  });
const decodedWorkflows = executions.map(
  ({
    execution,
    type,
    startTime,
    closeTime,
    status,
    historyLength,
    parentNamespaceId,
    parentExecution,
    executionTime,
    memo: memoRaw,
    searchAttributes: searchAttributesRaw,
    // autoResetPoints,
    taskQueue,
    stateTransitionCount,
  }) => {
    let memo: Record<string, unknown> | undefined | null = null;
    let searchAttributes: Record<string, unknown> | undefined | null = null;

    try {
      memo = mapFromPayloads(defaultConverter, memoRaw?.fields);
      searchAttributes = mapFromPayloads(
        searchAttributeConverter,
        searchAttributesRaw?.indexedFields
      );
    } catch (e) {
      // unable to convert with default converter
    }

    return {
      id: execution!.workflowId,
      runId: execution!.runId,
      type: type!.name,
      status: status!,
      taskQueue: taskQueue!,
      historyLength: historyLength!.toInt(),
      startTime: tsToDate(startTime!),
      executionTime: tsToDate(executionTime!),
      closeTime: optionalTsToDate(closeTime),
      parentExecution,
      parentNamespace: parentNamespaceId || null, // convert empty string to null
      memo: memo && Object.keys(memo!).length === 0 ? null : memo, // convert empty object to null
      searchAttributes,
      stateTransitionCount: stateTransitionCount!.toInt(),
    } as unknown as Workflow;
  }
);
```
