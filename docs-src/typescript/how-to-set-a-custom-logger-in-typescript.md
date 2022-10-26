---
id: how-to-set-a-custom-logger-in-typescript
title: How to set a custom logger in TypeScript
sidebar_label: Set a custom logger
description: Set a custom logger
tags:
  - developer-guide
  - sdk
  - typescript
---

**Logging in Workers and Clients**

The Worker comes with a default logger which defaults to log any messages with level `INFO` and higher to `STDERR` using `console.error`.
The following [log levels](https://typescript.temporal.io/api/namespaces/worker#loglevel) are listed in increasing order of severity.

**Customizing the default logger**

Temporal uses a [`DefaultLogger`](https://typescript.temporal.io/api/classes/worker.DefaultLogger/) that implements the basic interface:

```ts
import { DefaultLogger, Runtime } from '@temporalio/worker';

const logger = new DefaultLogger('WARN', ({ level, message }) => {
  console.log(`Custom logger: ${level} — ${message}`);
});
Runtime.install({ logger });
```

The previous code example sets the default logger to only log messages with level `WARN` and higher.

**Accumulate logs for testing and reporting**

```ts
import { DefaultLogger, LogEntry } from '@temporalio/worker';

const logs: LogEntry[] = [];
const logger = new DefaultLogger('TRACE', (entry) => logs.push(entry));
log.debug('hey', { a: 1 });
log.info('ho');
log.warn('lets', { a: 1 });
log.error('go');
```

A common logging use case is logging to a file to be picked up by a collector like the [Datadog Agent](https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30).

```ts
import { Runtime } from '@temporalio/worker';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new transports.File({ filename: '/path/to/worker.log' })],
});
Runtime.install({ logger });
```
