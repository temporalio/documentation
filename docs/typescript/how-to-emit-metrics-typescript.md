---
id: how-to-emit-metrics-in-typescript
title: How to emit metrics in TypeScript
sidebar_label: Emit metrics
description: Emit metrics
tags:
  - developer-guide
  - sdk
  - typescript
---

Workers can emit metrics and traces. There are two [output options](https://github.com/temporalio/sdk-typescript/blob/9dd17554f3fa514f501d906da26cf710020bf34d/packages/core-bridge/index.d.ts#L74-L98) that can be provided to [`Runtime.install`](https://typescript.temporal.io/api/classes/worker.runtime/#install):

- `oTelCollectorUrl`: The URL of a gRPC [OpenTelemetry collector](https://opentelemetry.io/docs/collector/).
- `prometheusMetricsBindAddress`: Address on the Worker host that will have metrics for [Prometheus](https://prometheus.io/) to scrape.

There are three combinations of these options:

- Only `oTelCollectorUrl` is specified: Metrics and traces are sent to the OpenTelemetry collector.
- Both `oTelCollectorUrl` and `prometheusMetricsBindAddress` are specified: Traces are sent to the collector, and metrics are published for Prometheus.
- Only `prometheusMetricsBindAddress` is specified: Only metrics are published for Prometheus.

In addition to core tracing via `oTelCollectorUrl`, you can set up tracing of Workflows and Activities [with interceptors](/typescript/logging#opentelemetry-tracing).
