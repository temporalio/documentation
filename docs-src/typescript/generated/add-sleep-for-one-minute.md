---
id: add-sleep-for-one-minute
title: Workflow Sleep Sample
sidebar_label: Info node label (often becomes the anchor if node is used as a header)
description: Longer description of the info node used in link page previews.
---

In the following sample, we add a couple of logging statements and a Timer to the Workflow code to see how this affects the Event History.

Use the `sleep()` API to cause the Workflow to sleep for a minute before the call to execute the Activity.

By using Temporal's logging API, the Worker is able to suppress these log messages during replay so that log statements from the original execution aren't duplicated by the re-execution.

```typescript
import { log } from '@temporalio/workflow';
import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities'; // Assuming 'activities' is the file containing your activity definitions

const { ssnTraceActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export async function backgroundCheckWorkflow(param: string): Promise<string> {
  // Sleep for 1 minute
  log.info('Sleeping for 1 minute...');
  await sleep(60 * 1000); // sleep for 60 seconds
  log.info('Finished sleeping');

  // Execute the SSNTraceActivity synchronously
  try {
    const ssnTraceResult = await ssnTraceActivity(param);
    // Return the result of the Workflow
    return ssnTraceResult;
  } catch (err) {
    throw err;
  }
}
```
