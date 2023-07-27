---
id: how-to-use-metrics
title: How to use Temporal Cloud performance metrics
description: Most Temporal Cloud metrics are suffixed with _count. This indicates that they behave largely like a Prometheus counter.
sidebar_label: How to use
tags:
  - temporal-cloud
  - promentheus
  - metrics
---

Most Temporal Cloud metrics are suffixed with `_count`. This indicates that they behave largely like a [Prometheus counter](https://prometheus.io/docs/concepts/metric_types/#counter). You'll want to use a function like `rate` or `increase` to calculate a per-second rate of increase, or an extrapolated total increase over a time period.

```
rate(temporal_cloud_v0_frontend_service_request_count[5m])
```

`temporal_cloud_v0_service_latency` has `_bucket`, `_count`, and `_sum` metrics. This is because it's a [Prometheus Histogram](https://prometheus.io/docs/concepts/metric_types/#histogram). You can use the `_count` and `_sum` metrics to calculate an average latency over a time period, or use the `_bucket` metric to calculate an approximate histogram quartile.

```
# the average latency observation over the last 5 minutes
rate(temporal_cloud_v0_service_latency_sum[5m]) / rate(temporal_cloud_v0_service_latency_count[5m])

# the approximate 99th percentile latency over the last 5 minutes, broken down by operation
histogram_quantile(0.99, sum(rate(temporal_cloud_v0_service_latency_bucket[5m])) by (le, operation))
```
