---
id: how-to-emit-metrics-typescript
title: How to emit metrics in TypeScript
sidebar_label: Emit metrics
description: Emit metrics
tags:
  - developer-guide
  - sdk
  - typescript
---

Workers can emit metrics and traces. There are a few [telemetry options](https://typescript.temporal.io/api/interfaces/worker.TelemetryOptions) that can be provided to [`Runtime.install`](https://typescript.temporal.io/api/classes/worker.Runtime/#install). The common options are:

- `metrics: { otel: { url } }`: The URL of a gRPC [OpenTelemetry collector](https://opentelemetry.io/docs/collector/).
- `metrics: { prometheus: { bindAddress } }`: Address on the Worker host that will have metrics for [Prometheus](https://prometheus.io/) to scrape.

To set up tracing of Workflows and Activities, use our [opentelemetry-interceptors](/typescript/logging#opentelemetry-tracing) package.

```typescript
telemetryOptions: {
    metrics: {
      prometheus: { bindAddress: '0.0.0.0:9464' },
    },
    logging: { forward: { level: 'DEBUG' } },
  },
```
