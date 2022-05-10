---
id: search-attributes
title: Default and Custom Search Attributes in TypeScript Workflows
sidebar_label: Search Attributes
description: Search Attributes enable eventually-consistent, business-logic-focused search and filter queries for Workflow Executions. Most Search APIs are not yet available in the TypeScript SDK beta.
---

<!-- prettier-ignore -->
import * as WhatsSearchAttr from '../concepts/what-is-a-search-attribute.md'
import * as WhatIsATemporalCronJob from '../concepts/what-is-a-temporal-cron-job.md'

:::caution This is an experimental API

Most Search APIs are not yet available in the TypeScript SDK beta.

:::

## Overview

The typical method of retrieving a Workflow Execution is by its Workflow ID.
However, it can be useful to retrieve a range of Workflow Executions based on other properties, whether Temporal-defined or custom-defined by you.

Search Attributes enable eventually-consistent, business-logic-focused search and filter queries for Workflow Executions.
For example, you could query for all Workflow Executions that have failed within a certain time range and run a batch operation to start new ones (you cannot "restart" a failed execution).

Search Attributes are often queried via the Web UI, but you can also Query from within your Workflow code (as we show below).

<details>
<summary>What is a Search Attribute?
</summary>

<WhatsSearchAttr.default />

</details>

- <preview page={WhatsSearchAttr}>Default Search Attributes</preview> are added to Workflow Executions without any requirement for Elasticsearch.
  They are necessarily focused on Temporal internal state tracking, such as `StartTime`, `ExecutionStatus`, and `ExecutionDuration`.
- You might want to add your own domain-specific **Custom** Search Attributes (such as `customerId` or `numItems`) that can serve as useful search filters. Custom Search Attributes require the addition of Elasticsearch to your Temporal Cluster, which comes default with Temporal Cloud. Temporal's [default Auto-Setup](/blog/auto-setup/#temporal-server-setup) also provisions some generic attributes (such as `CustomKeywordField` and `CustomIntField`) for convenience.

## Tagging Search Attributes at workflow creation

You can provide key-value pairs as searchAttributes in [StartWorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes).
In TypeScript, SearchAttributes are represented as `Record<string, string | number | boolean>`.

- The value provided in the map must match what is registered in the dynamic config.
- The type of value should be a primitive (e.g. string, number, boolean), for dates use `Date.toISOString()`.

This can be useful for tagging executions with useful attributes you may want to search up later. For example:

<!--SNIPSTART typescript-search-attributes-at-creation-->
[search-attributes/src/client.ts](https://github.com/temporalio/samples-typescript/blob/master/search-attributes/src/client.ts)
```ts
  const result = await client.execute(example, {
    taskQueue: 'search-attributes',
    workflowId: 'search-attributes-example-0',
    searchAttributes: {
      CustomIntField: 2, // update CustomIntField from 1 to 2, then insert other fields
      CustomKeywordField: 'Update1',
      CustomBoolField: true,
      CustomDoubleField: 3.14,
      CustomDatetimeField: new Date().toISOString(),
      CustomStringField:
        'String field is for text. When query, it will be tokenized for partial match. StringTypeField cannot be used in Order By',
    },
  });
```
<!--SNIPEND-->

## Future: Upsert Search Attributes during workflow execution

In advanced cases, you may want to dynamically update these attributes as the Workflow progresses.
Temporal has an `UpsertSearchAttributes` capability, but it is not yet supported in the TypeScript SDK.

## Removing Search Attributes

**There is no support for removing a field.**

However, to achieve a similar effect, set the field to some placeholder value.
For example, you could set `CustomKeywordField` to `impossibleVal`.
Then searching `CustomKeywordField != 'impossibleVal'` will match Workflows with `CustomKeywordField` not equal to `impossibleVal`, which includes Workflows without the `CustomKeywordField` set.

## Future: Retrieving Search Attributes

Temporal supports using the `SearchAttributes` property of `workflow.GetInfo` to get a specific Search Attribute, however, this is not yet supported in the TypeScript SDK.

## Future: Querying Search Attributes within a workflow

You can programmatically retrieve attributes from a Workflow Execution with `GetSearchAttributes`, and log out all fields with `GetIndexedFields` in Temporal, however, this is not yet supported in the TypeScript SDK.

## Future: Testing Search Attributes

Testing is not yet supported in the TypeScript SDK.
