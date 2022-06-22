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
