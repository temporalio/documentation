---
id: single-entity-pattern
title: Single-entity design pattern in TypeScript
description: An example that demonstrates how to represent a single entity with a Workflow.
sidebar_label: Single-entity pattern
tags:
  - guide-context
---

The following is a simple pattern that represents a single entity.
It tracks the number of iterations regardless of frequency, and calls `continueAsNew` while properly handling pending updates from Signals.

```tsx
interface Input {
  /* Define your Workflow input type here */
}
interface Update {
  /* Define your Workflow update type here */
}

const MAX_ITERATIONS = 1;

export async function entityWorkflow(
  input: Input,
  isNew = true,
): Promise<void> {
  try {
    const pendingUpdates = Array<Update>();
    setHandler(updateSignal, (updateCommand) => {
      pendingUpdates.push(updateCommand);
    });

    if (isNew) {
      await setup(input);
    }

    for (let iteration = 1; iteration <= MAX_ITERATIONS; ++iteration) {
      // Ensure that we don't block the Workflow Execution forever waiting
      // for updates, which means that it will eventually Continue-As-New
      // even if it does not receive updates.
      await condition(() => pendingUpdates.length > 0, '1 day');

      while (pendingUpdates.length) {
        const update = pendingUpdates.shift();
        await runAnActivityOrChildWorkflow(update);
      }
    }
  } catch (err) {
    if (isCancellation(err)) {
      await CancellationScope.nonCancellable(async () => {
        await cleanup();
      });
    }
    throw err;
  }
  await continueAsNew<typeof entityWorkflow>(input, false);
}
```
