To define Return Types in your Activity, retrieve an Activity from an _Activity Handle_ before you can call it. Import the types of the activities defined in `./activities`.

```typescript
import type * as activities from './activities';
const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```
