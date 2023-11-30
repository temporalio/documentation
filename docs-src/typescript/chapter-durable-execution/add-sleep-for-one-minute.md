---
id: add-sleep-for-one-minute
title: Add a call to sleep
sidebar_label: Add sleep call
description: Add a call to sleep for one minute to the beginning of the Workflow.
tags:
  - timer
  - sleep
  - logger
---

In the following sample, we add a couple of logging statements and a Timer to the Workflow code to see how this affects the Event History.

Use the `sleep()` API to cause the Workflow to sleep for a minute before the call to execute the Activity.

By using Temporal's logging API, the Worker is able to suppress these log messages during replay so that log statements from the original execution aren't duplicated by the re-execution.

```typescript
import { log } from '@temporalio/workflow';
import { proxyActivities, sleep } from '@temporalio/workflow';
import type { Activities } from './activities'; // Assuming 'activities' is the file containing your activity definitions

const activities = proxyActivities<Activities>({
  startToCloseTimeout: '10 seconds',
});

export async function BackgroundCheckWorkflow(param: string): Promise<string> {
  // Sleep for 1 minute
  log.info('Sleeping for 1 minute...');
  await sleep(60 * 1000); // sleep for 60 seconds
  log.info('Finished sleeping');

  // Execute the SSNTraceActivity synchronously
  try {
    const ssnTraceResult = await activities.SSNTraceActivity(param);
    // Return the result of the Workflow
    return ssnTraceResult;
  } catch (err) {
    // Handle the error
    console.error('Error executing SSNTraceActivity:', err);
    throw err;
  }
}
```
