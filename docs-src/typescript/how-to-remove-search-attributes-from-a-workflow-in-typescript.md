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

```typescript
import { upsertSearchAttributes } from '@temporalio/workflow';

async function yourWorkflow() {
  upsertSearchAttributes({ CustomIntField: [1, 2, 3] });

  // ... later, to remove:
  upsertSearchAttributes({ CustomIntField: [] });
}
```
