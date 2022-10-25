---
id: how-to-send-logs-from-workflows-in-typescript
title: How to send logs from Workflows in TypeScript
sidebar_label: Send logs from Workflows
description: Send logs from Workflows
tags:
  - developer-guide
  - sdk
  - typescript
---

**Logging in Workers and Clients**

The Worker comes with a default logger which defaults to log any messages with level `INFO` and higher to `STDERR` using `console.error`.
There are 5 levels in total:

- `TRACE`
- `DEBUG`
- `INFO`
- `WARN`
- `ERROR`

The reason we only offer a default logger is to minimize Worker dependencies and allow SDK users to bring their own logger.

**Customizing the default logger**

Temporal ships a [`DefaultLogger`](https://typescript.temporal.io/api/classes/worker.DefaultLogger/) that implements the basic interface.

**Set Default logger level**

The following example creates a new logger that will log all messages with a level `WARN` and higher.

```ts
import { DefaultLogger, Runtime } from '@temporalio/worker';

// Creating a new logger that will log all messages with level WARN and higher.
const logger = new DefaultLogger('WARN', ({ level, message }) => {
  console.log(`Custom logger: ${level} — ${message}`);
});
Runtime.install({ logger });
```

**Example: Accumulate logs for testing/reporting**

The following example creates a logger that will log all the messages to an array.

```ts
import { DefaultLogger, LogEntry } from '@temporalio/worker';

const logs: LogEntry[] = [];
const logger = new DefaultLogger('TRACE', (entry) => logs.push(entry));
log.debug('hey', { a: 1 });
log.info('ho');
log.warn('lets', { a: 1 });
log.error('go');
```

The log levels are [listed here](https://typescript.temporal.io/api/namespaces/worker#loglevel) in increasing order of severity.
