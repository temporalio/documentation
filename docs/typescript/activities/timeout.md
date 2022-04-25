To create a timeout.

```typescript
import { CancellationScope, proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

export function multipleActivitiesSingleTimeout(
  urls: string[],
  timeoutMs: number
): Promise<any> {
  const { httpGetJSON } = proxyActivities<typeof activities>({
    startToCloseTimeout: timeoutMs,
  });

  // If timeout triggers before all activities complete
  // the Workflow will fail with a CancelledError.
  return CancellationScope.withTimeout(timeoutMs, () =>
    Promise.all(urls.map((url) => httpGetJSON(url)))
  );
}
```

To create a Timeout, use the `CancellationScope` and create a new `proxyActivities` with a `startToCloseTImeout` of `timeoutMs`.
Call the `proxyActivitivies.httpGetJSON()` method on each url in the array. The array returns a promise that resovles when the Activity complets.

<!-- The code above does the following, explained in English:
1. Creates a new CancellationScope
2. Creates a new proxyActivities with a startToCloseTimeout of timeoutMs
3. Calls the proxyActivities.httpGetJSON() method on each url in the urls array,
   which returns a promise that resolves when the activity completes.
4. Calls CancellationScope.withTimeout() with a timeout of timeoutMs and an
   async function that returns a promise that resolves after all the promises
   returned by the httpGetJSON() method are resolved.
5. Calls CancellationScope.withTimeout() again with a timeout of timeoutMs and
   an async function that returns a promise that resolves after all the promises
   returned by the httpGetJSON() method are resolved.
6. Cancels the CancellationScope and returns a promise that rejects with the
   CancelledError. -->
