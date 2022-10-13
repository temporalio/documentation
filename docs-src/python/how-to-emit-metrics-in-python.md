---
id: how-to-emit-metrics-in-python
title: How to emit metrics in Python
sidebar_label: Emit metrics
description: Metrics are configured globally be setting a Prometheus endpoint before any other Temporal code.
tags:
  - developer-guide
  - sdk
  - python
---

Metrics in Python are configured globally; therefore, you should set a Prometheus endpoint before any other Temporal code.

The following example exposes a Prometheus endpoint on port `9000`.

```python
from temporalio.bridge.telemetry import init_telemetry, TelemetryConfig, PrometheusMetricsConfig

init_telemetry(TelemetryConfig(prometheus_metrics=PrometheusMetricsConfig(bind_address="0.0.0.0:9000")))
```

<!-- https://github.com/temporalio/sdk-python/issues/125 -->
