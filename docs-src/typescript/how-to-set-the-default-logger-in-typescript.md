---
id: how-to-set-the-default-logger-in-typescript
title: How to set the default logger in TypeScript
sidebar_label: Set the default logger
description: Set the default logger
tags:
  - developer-guide
  - sdk
  - typescript
---

Set the [`DefaultLogger`](https://typescript.temporal.io/api/classes/worker.DefaultLogger) to one of the following log levels: `'TRACE'` | `'DEBUG'` | `'INFO'` | `'WARN'` | `'ERROR'`.

The following is an example of setting the `DefaultLogger` to `'Debug'`.

```typescript
Runtime.install({
  logger: new DefaultLogger('DEBUG'),
  telemetryOptions: {
    tracingFilter: 'temporal_sdk_core=DEBUG',
    logging: { forward: { level: 'DEBUG' } },
  },
});
```

The following code sets the `DefaultLogger` to `'Debug'` and creates a Worker that can execute Activities or Workflows.

```typescript
import { DefaultLogger, Runtime, Worker } from '@temporalio/worker';
import * as activities from './activities';
async function main() {
  const argv = arg({
    '--debug': Boolean,
  });
  /* Setting the log level to DEBUG. */
  if (argv['--debug']) {
    Runtime.install({
      logger: new DefaultLogger('DEBUG'),
      telemetryOptions: {
        tracingFilter: 'temporal_sdk_core=DEBUG',
        logging: { forward: { level: 'DEBUG' } },
      },
    });
  }
  const worker = await Worker.create({
    activities,
    workflowsPath: require.resolve('./workflows'),
    taskQueue: 'test',
  });
  await worker.run();
  console.log('Worker gracefully shutdown');
}
```
