---
id: how-to-remove-search-attributes-from-a-workflow-in-typescript
title: How to remove Search Attributes from a Workflow in TypeScript
sidebar_label: Remove Search Attributes from a Workflow
description: How to remove Search Attributes from a Workflow
tags:
  - developer-guide
  - typescript
  - client
---

Use [`upsertSearchAttributes`](https://typescript.temporal.io/api/namespaces/workflow/#upsertsearchattributes) to merge the provided [`searchAttributes`](https://typescript.temporal.io/api/namespaces/workflow/#searchattributess) with the existing Search Attributes, `workflowInfo().searchAttributes`:

```typescript
import { upsertSearchAttributes } from '@temporalio/workflow';

async function myWorkflow() {
  upsertSearchAttributes({ CustomIntField: [1, 2, 3] });

  // ... later, to remove:
  upsertSearchAttributes({ CustomIntField: [] });
}
```
