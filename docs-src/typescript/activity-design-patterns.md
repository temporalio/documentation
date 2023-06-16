---
id: activity-design-patterns
title: Important design patterns for Activities
sidebar_label: Activity design patterns
description: Patterns that illustrate using Activity APIs to address common needs and use cases.
tags:
  - guide-context
---

The following are some important (and frequently requested) patterns for using our Activities APIs.
These patterns address common needs and use cases.

### Share dependencies in Activity functions (dependency injection)

Because Activities are "just functions," you can also create functions that create Activities.
This is a helpful pattern for using closures to do the following:

- Store expensive dependencies for sharing, such as database connections.
- Inject secret keys (such as environment variables) from the Worker to the Activity.

<!--SNIPSTART typescript-activity-with-deps-->

[activities-dependency-injection/src/activities.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-dependency-injection/src/activities.ts)

```ts
export interface DB {
  get(key: string): Promise<string>;
}

export const createActivities = (db: DB) => ({
  async greet(msg: string): Promise<string> {
    const name = await db.get('name'); // simulate read from db
    return `${msg}: ${name}`;
  },
  async greet_es(mensaje: string): Promise<string> {
    const name = await db.get('name'); // simulate read from db
    return `${mensaje}: ${name}`;
  },
});
```

<!--SNIPEND-->

<details>
  <summary>See full example</summary>

When you register these in the Worker, pass your shared dependencies accordingly:

<!--SNIPSTART typescript-activity-deps-worker {"enable_source_link": false}-->

```ts
import { createActivities } from './activities';

async function run() {
  // Mock DB connection initialization in Worker
  const db = {
    async get(_key: string) {
      return 'Temporal';
    },
  };

  const worker = await Worker.create({
    taskQueue: 'dependency-injection',
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(db),
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

<!--SNIPEND-->

Because Activities are always referenced by name, inside the Workflow they can be proxied as normal, although the types need some adjustment:

<!--SNIPSTART typescript-activity-deps-workflow-->

[activities-dependency-injection/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-dependency-injection/src/workflows.ts)

```ts
import type { createActivities } from './activities';

// Note usage of ReturnType<> generic since createActivities is a factory function
const { greet, greet_es } = proxyActivities<
  ReturnType<typeof createActivities>
>({
  startToCloseTimeout: '30 seconds',
});
```

<!--SNIPEND-->

</details>

### Import multiple Activities simultaneously

You can proxy multiple Activities from the same `proxyActivities` call if you want them to share the same timeouts, retries, and options:

```ts
export async function Workflow(name: string): Promise<string> {
  // destructuring multiple activities with the same options
  const { act1, act2, act3 } = proxyActivities<typeof activities>();
  /* activityOptions */
  await act1();
  await Promise.all([act2, act3]);
}
```

### Dynamically reference Activities

Because Activities are referenced only by their string names, you can reference them dynamically if needed:

```js
export async function DynamicWorkflow(activityName, ...args) {
  const acts = proxyActivities(/* activityOptions */);

  // these are equivalent
  await acts.activity1();
  await acts['activity1']();

  // dynamic reference to activities using activityName
  let result = await acts[activityName](...args);
}
```

Type safety is still supported here, but we encourage you to validate and handle mismatches in Activity names.
An invalid Activity name leads to a `NotFoundError` with a message that looks like this:

```
ApplicationFailure: Activity function actC is not registered on this Worker, available activities: ["actA", "actB"]
```
