---
id: local-activities
title: Local Activities
description: To call Local Activities in TypeScript, use proxyLocalActivities.
sidebar_label: Local Activities
tags:
  - guide-context
---

To call [Local Activities](/concepts/what-is-a-local-activity/) in TypeScript, use [`proxyLocalActivities`](https://typescript.temporal.io/api/namespaces/workflow/#proxylocalactivities).

```ts
import * as workflow from '@temporalio/workflow';

const { getEnvVar } = workflow.proxyLocalActivities({
  startToCloseTimeout: '2 seconds',
});

export async function yourWorkflow(): Promise<void> {
  const someSetting = await getEnvVar('SOME_SETTING');
  // ...
}
```

Local Activities must be registered with the Worker the same way non-local Activities are.
