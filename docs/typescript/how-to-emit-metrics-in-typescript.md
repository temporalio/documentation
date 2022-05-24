---
id: how-to-emit-metrics-in-typescript
title: How to emit metrics in TypeScript
sidebar_label: Metrics
tags:
- explanation
- concepts
---
 
To emit metrics, use Telemetry options to control how metrics are exported out of the Rust Core.
To export metrics using [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/getting-started/), use `oTelCollectorUrl`.
To expose a port for [Prometheus](https://prometheus.io/docs/prometheus/latest/getting_started/) to collect metrics, use `prometheusMetricsBindAddress`. You can verify metrics are exported with `curl -fail localhost:9464/metrics`.
 
There are two output options that can be provided to `Runtime.install`:
- `oTelCollectorUrl`: The address of a gRPC Open Telemetry collector.
- `prometheusMetricsBindAddress`: Address on the Worker host that will have metrics for Prometheus to scrape.
 
There are three combinations of these options:
 
 
- Only `oTelCollectorUrl` is specified: Metrics and traces are sent to the Open Telemetry collector.
- Both `oTelCollectorUrl` and `prometheusMetricsBindAddress` are specified: Traces are sent to the collector, and metrics are published to Prometheus.
- Only `prometheusMetricsBindAddress` is specified: Only metrics are published to Prometheus.
 
```typescript
async function main() {
   telemetryOptions: {
       oTelCollectorUrl: `7233`,
       prometheusMetricsBindAddress: '0.0.0.0:9464',
 
   },
 });
```