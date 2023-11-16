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

Use the `console.log()` API to log from Workflows to avoid seeing repeated logs from the Replay of the Workflow code.

```typescript
import { proxyActivities, sleep } from '@temporalio/workflow';
import type { Activities } from './activities'; // Assuming 'activities' is the file containing your activity definitions

const activities = proxyActivities<Activities>({
  startToCloseTimeout: '10 seconds', // Setting the StartToCloseTimeout as in the Go example
});

export async function BackgroundCheckWorkflow(param: string): Promise<string> {
  // Sleep for 1 minute
  console.log('Sleeping for 1 minute...');
  await sleep(60 * 1000); // sleep for 60 seconds
  console.log('Finished sleeping');

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
