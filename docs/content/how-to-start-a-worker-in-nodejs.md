---
id: how-to-start-a-worker-in-nodejs
title: How to start a Worker in Node.js
description: Import a Worker from the `@temporalio/worker` module and call `Worker.create()` to create a new Worker in Node.js.
tags:
  - guide
---

import DetermineHeader from '../components/DetermineHeader.js'

export const headingText = 'How to start a Worker in Node.js'

<DetermineHeader
hLevel={props.heading}
hText={headingText}
/>

To start a Worker you need to pass the following two parameters to the `Worker.create()` function:

1. The `workDir`: The Node SDK will automatically register all Activities in any `.js` files in `workDir + '/../activities'` and it will register all Workflows in any `.js` files in `workDir + '/../workflows'`.
2. The `taskQueue` the Worker should poll.

Below is an example of starting a Worker that polls the Task Queue named 'tutorial'.

```typescript
import {Worker} from "@temporalio/worker";

main().catch((err) => {
  console.log(err);
  process.exit(1);
});

async function main() {
  const worker = await Worker.create({
    workDir: __dirname,
    taskQueue: "test",
  });
  await worker.run();
}
```

In the above example, the Node SDK will look for `.js` files in `../workflows` that export a `workflow` property, and register their `main` property as Workflows.
For example, suppose `../workflows/example.js`, relative to `workDir`, contains the below code.

```typescript
async function main(): Promise<string> {
  return "Hello, World!";
}

export const workflow = {main};
```

The `Worker.create()` call will automatically register a Workflow named 'example' that returns the string 'Hello, World'.
