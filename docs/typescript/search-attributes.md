---
id: search-attributes
title: Custom Search Attributes in TypeScript Workflows
sidebar_label: Search Attributes
description: Search attributes enable complex and business-logic-focused search queries for Workflow Executions. Most Search APIs are not yet available in the TypeScript SDK beta.
---

<!-- prettier-ignore -->
import * as WhatsSearchAttr from '../content/what-is-a-search-attribute.md'
import * as WhatIsATemporalCronJob from '../content/what-is-a-temporal-cron-job.md'

## Overview

Search Attributes enable complex and business-logic-focused search queries for Workflow Executions.
Most Search APIs are not yet available in the TypeScript SDK beta.
These are often queried via the Web UI, but you can also query from within your workflow code (as we show below).

There are many <preview page={WhatsSearchAttr}>Search Attributes</preview> that are added to Workflow Executions by default.
But these are necessarily focused on Temporal internal state tracking.

For more debugging and monitoring, you may wish add your own domain specific Search Attributes (e.g. `customerId` or `numItems`) that may serve as useful search filters.

<details>
<summary>What is a Search Attribute?
</summary>

<WhatsSearchAttr.default />

</details>

## Tagging Search Attributes at workflow creation

You can provide key-value pairs as searchAttributes in [StartWorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes).
In TypeScript, SearchAttributes are represented as `Record<string, string | number | boolean>`.

- The value provided in the map must match what is registered in the dynamic config.
- The type of value should be a primitive (e.g. string, number, boolean), for dates use `Date.toISOString()`.

This can be useful for tagging executions with useful attributes you may want to search up later. For example:

<!--SNIPSTART typescript-search-attributes-at-creation-->
<!--SNIPEND-->

## Future: Upsert Search Attributes during workflow execution

In advanced cases, you may want to dynamically update these attributes as the workflow progresses.
Temporal has an `UpsertSearchAttributes` capability but it is not yet supported in the TypeScript SDK.

## Removing Search Attributes

**There is no support for removing a field.**

However, to achieve a similar effect, set the field to some placeholder value.
For example, you could set `CustomKeywordField` to `impossibleVal`.
Then searching `CustomKeywordField != 'impossibleVal'` will match Workflows with `CustomKeywordField` not equal to `impossibleVal`, which includes Workflows without the `CustomKeywordField` set.

## Future: Retrieving Search Attributes

Temporal supports using the `SearchAttributes` property of `workflow.GetInfo` to get a specific Search Attribute, however, this is not yet supported in the TypeScript SDK.

## Future: Querying Search Attributes within a workflow

You can programmatically retrieve attributes from a workflow execution with `GetSearchAttributes`, and log out all fields with `GetIndexedFields` in Temporal, however, this is not yet supported in the TypeScript SDK.

## Future: Testing Search Attributes

Testing is not yet supported in the TypeScript SDK.
