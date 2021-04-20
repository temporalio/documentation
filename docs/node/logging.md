# Logging

The worker comes with a default logger which defaults to log any messages with level `INFO` and higher to `STDERR` using `console.error`.

The rationale behind this is to minimize worker dependencies and allow SDK users to bring their own logger.

#### Customizing the default logger

```ts
import { Worker, DefaultLogger } from '@temporalio/worker';

// Set up the DefaultLogger to log only WARNING and ERROR messages with a custom log function
const logger = new DefaultLogger('WARNING', (severity, message, meta) => {
  /* Implement this in order to generate custom log output */
});
const worker = await Worker.create(__dirname, { logger });
```

#### BYOL - Bring your own logger

A common logging use case is logging to a file to be picked up by a collector like the [Datadog Agent](https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30).

```ts
import { Worker } from '@temporalio/worker';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new transports.File({ filename: '/path/to/worker.log' })],
});
const worker = await Worker.create(__dirname, { logger });
```
