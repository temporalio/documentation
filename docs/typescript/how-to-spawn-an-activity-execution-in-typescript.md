To spawn an Activity Execution, you must retrieve the _Activitiy handle_ in you Workflow.

```typescript
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```

This imports the indivuidal Activities and declares the type alias for each Activity.
