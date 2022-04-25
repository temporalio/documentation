To spawn an Activity Execution, you'll need to write a Workflow function that calls your Activity.

For example, the following would be executed inside of `temporal/src/workflows.ts` to call an Activity.

```typescript
import { proxyActivities } from '@temporalio/workflow';
import { sleep } from '@temporalio/workflow';
import type * as activities from './activities'; // purely for type safety

const { purchase } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function OneClickBuy(id: string): Promise<string> {
  const result = await purchase(id); // calling the activity
  console.log(`Activity ID: ${result} executed!`);
}
```
