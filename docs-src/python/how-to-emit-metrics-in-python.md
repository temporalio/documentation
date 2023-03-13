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
from temporalio.runtime import Runtime, TelemetryConfig, PrometheusConfig

# Create a new runtime that has telemetry enabled. Create this first to avoid
# the default Runtime from being lazily created.
new_runtime = Runtime(telemetry=TelemetryConfig(metrics=PrometheusConfig(bind_address="0.0.0.0:9000")))
my_client = await Client.connect("my.temporal.host:7233", runtime=new_runtime)
```
